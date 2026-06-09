import {
  collection, doc, getDocs, setDoc, updateDoc, query, where,
  serverTimestamp, onSnapshot, runTransaction, increment,
  arrayUnion, arrayRemove, type Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import type { Event, Photo } from './types';

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

// Resize + re-encode photos client-side (≤1920px, jpeg 0.85). The classic
// <img> path is the most compatible across iOS Safari and also converts iPhone
// HEIC captures to JPEG so every browser can render them.
function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1920;
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      if (width > max || height > max) {
        const scale = max / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
    img.src = url;
  });
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

    const photo: Photo = {
      id: photoId, eventId, uploadedBy: userId, uploaderName,
      imageUrl, thumbnailUrl: imageUrl, mediaType, isVisible: true,
      likesCount: 0, likedBy: [], createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'events', eventId, 'photos', photoId), { ...photo, createdAt: serverTimestamp() });
    return photo;
  } catch (e) {
    await updateDoc(eventRef, { photoCount: increment(-1) }).catch(() => {});
    throw e;
  }
}

export function subscribeToPhotos(eventId: string, cb: (photos: Photo[]) => void): Unsubscribe {
  const q = query(collection(db, 'events', eventId, 'photos'), where('isVisible', '==', true));
  return onSnapshot(q, (snap) => cb(newestFirst(snap.docs.map((d) => d.data() as Photo))));
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
