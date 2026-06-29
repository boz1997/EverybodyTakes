import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where,
  orderBy, limit as fbLimit, serverTimestamp, onSnapshot, runTransaction, increment,
  arrayUnion, arrayRemove, type Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db, storage } from './firebase';
import type { Event, Note, Photo } from './types';

export const NOTE_MAX = 240;
const PHOTO_PAGE = 150;

export type LimitCode = 'event_full' | 'photo_cap' | 'no_shots' | 'event_ended';
export class LimitError extends Error {
  constructor(public code: LimitCode) { super(code); }
}

const uid = () => crypto.randomUUID().replace(/-/g, '').slice(0, 21);

function millis(v: unknown): number {
  if (v && typeof (v as { toMillis?: () => number }).toMillis === 'function') {
    return (v as { toMillis: () => number }).toMillis();
  }
  return typeof v === 'string' ? Date.parse(v) || 0 : 0;
}
const newestFirst = (rows: Photo[]) => [...rows].sort((a, b) => millis(b.createdAt) - millis(a.createdAt));

export async function getByShortCode(code: string): Promise<Event | null> {
  const normalized = code.trim().toUpperCase();
  const snap = await getDocs(query(collection(db, 'events'), where('shortCode', '==', normalized)));
  return snap.empty ? null : (snap.docs[0].data() as Event);
}

/** Atomic join — respects the guest cap, returns shots remaining. Idempotent. */
export async function joinEvent(eventId: string, userId: string, nickname: string | null): Promise<number> {
  const eventRef = doc(db, 'events', eventId);
  const guestRef = doc(db, 'events', eventId, 'guests', userId);
  return runTransaction(db, async (tx) => {
    const eventSnap = await tx.get(eventRef);
    if (!eventSnap.exists()) throw new Error('Event not found');
    const event = eventSnap.data() as Event;
    const guestSnap = await tx.get(guestRef);
    if (guestSnap.exists()) return (guestSnap.data().shotsRemaining as number) ?? 0;
    if (event.maxGuests != null && (event.guestCount ?? 0) >= event.maxGuests) throw new LimitError('event_full');
    tx.set(guestRef, { userId, nickname: nickname ?? 'Anonymous', shotsRemaining: event.shotsPerGuest, joinedAt: serverTimestamp() });
    tx.update(eventRef, { guestCount: increment(1) });
    return event.shotsPerGuest;
  });
}

/** Atomic per-guest shot decrement — throws no_shots when used up. */
export async function decrementShots(eventId: string, userId: string): Promise<void> {
  const guestRef = doc(db, 'events', eventId, 'guests', userId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(guestRef);
    if (!snap.exists()) return;
    const current = (snap.data().shotsRemaining as number) ?? 0;
    if (current <= 0) throw new LimitError('no_shots');
    tx.update(guestRef, { shotsRemaining: current - 1 });
  });
}

// Resize + re-encode an image blob to JPEG (≤ max px). The classic <img>/canvas
// path is the most compatible across iOS Safari and also converts iPhone HEIC
// captures to JPEG so every browser can render them.
function resizeToJpeg(source: Blob, max: number, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(source);
    const img = new Image();
    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const scale = Math.min(1, max / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
    img.src = url;
  });
}

const compressImage = (file: File) => resizeToJpeg(file, 1920, 0.85);
const THUMB_MAX = 400;

// Grab a poster frame from a video file (early frame), downscaled — so the grid
// shows a real still instead of a blank <img> over an mp4.
function makeVideoPoster(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.onloadeddata = () => { try { video.currentTime = Math.min(0.1, (video.duration || 1) / 2); } catch { reject(new Error('seek failed')); } };
    video.onseeked = () => {
      let w = video.videoWidth, h = video.videoHeight;
      const scale = Math.min(1, THUMB_MAX / Math.max(w, h));
      w = Math.round(w * scale); h = Math.round(h * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d')!.drawImage(video, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('poster failed'))), 'image/jpeg', 0.7);
    };
    video.onerror = () => { URL.revokeObjectURL(url); reject(new Error('video decode failed')); };
    video.src = url;
  });
}

// Best-effort grid thumbnail (image downscale or video poster). Returns null on
// failure so the upload still proceeds with the full media as a fallback.
async function makeThumbnail(file: File, mainBlob: Blob, isVideo: boolean): Promise<Blob | null> {
  try {
    return isVideo ? await makeVideoPoster(file) : await resizeToJpeg(mainBlob, THUMB_MAX, 0.7);
  } catch {
    return null;
  }
}

/** Reserve a photo slot atomically (enforces photoCap), then upload + write the doc. */
export async function uploadPhoto(
  eventId: string, userId: string, uploaderName: string | null,
  file: File, mediaType: 'image' | 'video',
): Promise<Photo> {
  const photoId = uid();
  const eventRef = doc(db, 'events', eventId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(eventRef);
    if (!snap.exists()) throw new Error('Event not found');
    const event = snap.data() as Event;
    if (!event.isActive) throw new LimitError('event_ended');
    if (event.photoCap != null && (event.photoCount ?? 0) >= event.photoCap) throw new LimitError('photo_cap');
    tx.update(eventRef, { photoCount: increment(1) });
  });

  try {
    const isVideo = mediaType === 'video';
    let blob: Blob;
    let contentType: string;
    if (isVideo) {
      blob = file;
      contentType = file.type || 'video/mp4';
    } else {
      // Fall back to the original file if canvas re-encoding fails for any reason.
      try { blob = await compressImage(file); contentType = 'image/jpeg'; }
      catch { blob = file; contentType = file.type || 'image/jpeg'; }
    }
    const ext = isVideo ? (contentType.split('/')[1] || 'mp4') : 'jpg';
    const storageRef = ref(storage, `events/${eventId}/photos/${photoId}.${ext}`);
    await uploadBytes(storageRef, blob, { contentType });
    const imageUrl = await getDownloadURL(storageRef);

    // Grid thumbnail (image downscale / video poster). Falls back to the full
    // media if generation or upload fails.
    let thumbnailUrl = imageUrl;
    const thumb = await makeThumbnail(file, blob, isVideo);
    if (thumb) {
      try {
        const thumbRef = ref(storage, `events/${eventId}/thumbs/${photoId}.jpg`);
        await uploadBytes(thumbRef, thumb, { contentType: 'image/jpeg' });
        thumbnailUrl = await getDownloadURL(thumbRef);
      } catch { /* keep the full url */ }
    }

    const photo: Photo = {
      id: photoId, eventId, uploadedBy: userId, uploaderName,
      imageUrl, thumbnailUrl, mediaType, isVisible: true,
      likesCount: 0, likedBy: [], createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'events', eventId, 'photos', photoId), { ...photo, createdAt: serverTimestamp() });
    return photo;
  } catch (e) {
    await updateDoc(eventRef, { photoCount: increment(-1) }).catch(() => {});
    throw e;
  }
}

// Newest photos, live. Ordered server-side (single-field index) + an in-memory
// sort with serverTimestamps:'estimate' so a just-uploaded photo shows at the top
// immediately. The screen filters isVisible/flagged in memory.
export function subscribeToPhotos(eventId: string, cb: (photos: Photo[]) => void): Unsubscribe {
  const q = query(collection(db, 'events', eventId, 'photos'), orderBy('createdAt', 'desc'), fbLimit(PHOTO_PAGE));
  return onSnapshot(q, (snap) =>
    cb(newestFirst(snap.docs.map((d) => d.data({ serverTimestamps: 'estimate' }) as Photo))));
}

// "Memory book": one note per guest (doc id = uid), so saving again edits it.
// Text is trimmed and capped at NOTE_MAX (rules enforce the same).
export async function saveNote(eventId: string, authorId: string, authorName: string | null, text: string): Promise<void> {
  const trimmed = text.trim().slice(0, NOTE_MAX);
  if (!trimmed) return;
  await setDoc(doc(db, 'events', eventId, 'notes', authorId), {
    authorId, authorName: authorName?.trim() || null, text: trimmed, createdAt: serverTimestamp(),
  });
}

export async function getMyNote(eventId: string, uid: string): Promise<Note | null> {
  const snap = await getDoc(doc(db, 'events', eventId, 'notes', uid));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Note) : null;
}

// Whole-gallery ZIP — the createEventZip Cloud Function (us-central1) builds it
// server-side and returns a tokenized download URL. Any participant may call it.
export async function createEventZip(eventId: string): Promise<{ url: string; count: number }> {
  const fn = httpsCallable<{ eventId: string }, { url: string; count: number }>(getFunctions(), 'createEventZip');
  const res = await fn({ eventId });
  return res.data;
}

export async function toggleLike(eventId: string, photoId: string, userId: string, liked: boolean): Promise<void> {
  await updateDoc(doc(db, 'events', eventId, 'photos', photoId), {
    likedBy: liked ? arrayRemove(userId) : arrayUnion(userId),
    likesCount: increment(liked ? -1 : 1),
  });
}

/** Guests may remove their own photo (soft-hide, same as the app). */
export async function deletePhoto(eventId: string, photoId: string): Promise<void> {
  await updateDoc(doc(db, 'events', eventId, 'photos', photoId), { isVisible: false });
}

// UGC moderation (mirrors the app): record the report and flag the photo so
// it's hidden from guests pending host review.
export async function reportPhoto(eventId: string, photoId: string, reporterId: string): Promise<void> {
  await setDoc(doc(db, 'reports', uid()), {
    eventId, photoId, reporterId, reason: 'objectionable', createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, 'events', eventId, 'photos', photoId), {
    flagged: true, reportCount: increment(1),
  }).catch(() => {});
}

/** Give a shot back when an upload fails after the optimistic decrement. */
export async function refundShot(eventId: string, userId: string): Promise<void> {
  await updateDoc(doc(db, 'events', eventId, 'guests', userId), {
    shotsRemaining: increment(1),
  }).catch(() => {});
}
