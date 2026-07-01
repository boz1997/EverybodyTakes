import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  documentId,
  orderBy,
  limit as fbLimit,
  serverTimestamp,
  onSnapshot,
  runTransaction,
  increment,
  arrayUnion,
  arrayRemove,
  Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { db, storage } from '@lib/firebase';
import { EventDraft } from '@store/eventStore';
import { getPlan } from '@constants/plans';
import { logError } from '@shared/errorLog';
import { newestFirst, sortPhotosNewestFirst } from '@shared/utils/photoSort';
import { withRetry } from '@shared/utils/retry';
import { nanoid, customAlphabet } from 'nanoid/non-secure';

// 6-char join code: uppercase letters + digits, ambiguous chars (0/O/1/I/L)
// removed so guests can type it without confusion. No separators.
const genShortCode = customAlphabet('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 6);

/** Thrown when a hard plan/event limit is hit. Screens map these to copy. */
export class LimitError extends Error {
  constructor(public code: 'event_full' | 'photo_cap' | 'no_shots' | 'event_ended') {
    super(code);
  }
}

export interface Event {
  id: string;
  hostId: string;
  name: string;
  type: string;
  date: string | null;        // null when the host didn't set one (undated event)
  coverImageUrl: string | null;
  shotsPerGuest: number;
  disposableMode: boolean;
  revealTiming: string;       // instant | next_day | private (also encodes visibility)
  allowGalleryUpload: boolean;
  reminderBefore: '1d' | null;
  uploadNotify: boolean;      // host gets notified on each new photo (push)
  maxGuests: number | null;   // resolved from plan
  photoCap: number | null;    // resolved from plan
  video: boolean;             // resolved from plan
  notes: boolean;             // resolved from plan — "Memory book" capability
  notesEnabled: boolean;      // host toggle (default true) — guests can leave notes
  voices: boolean;            // resolved from plan — "Voice memories" capability
  voicesEnabled: boolean;     // host toggle (default true) — guests can leave a voice
  retentionDays: number | null; // resolved from plan — free auto-deletes N days after first photo
  retentionExempt?: boolean;  // grandfathered events (pre-retention) are never auto-deleted
  endsAt: string | null;      // for reveal timing
  shortCode: string;
  isActive: boolean;
  guestCount: number;
  photoCount: number;
  plan: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  eventId: string;
  uploadedBy: string;
  uploaderName: string | null;
  imageUrl: string;
  thumbnailUrl: string;
  mediaType: 'image' | 'video';   // older docs without this are treated as 'image'
  takenAt: string;
  isVisible: boolean;
  flagged?: boolean;               // hidden from guests after a report, pending host review
  reportCount?: number;
  likesCount: number;
  likedBy?: string[];              // uids who liked — source of truth for the count
  createdAt: string;
}

// A guest-left written memory ("Memory book"). Available on medium/unlimited.
export const NOTE_MAX = 240;

export interface Note {
  id: string;
  authorId: string;
  authorName: string | null;
  text: string;
  createdAt: string;
}

// A guest-left spoken memory ("Voice memories"). Available on medium/unlimited.
// Hard cap on clip length so storage/cost stays trivial (~1 MB/min).
export const VOICE_MAX_MS = 60000;

export interface Voice {
  id: string;
  authorId: string;
  authorName: string | null;
  audioUrl: string;
  durationMs: number;
  createdAt: string;
}

// React Native's fetch(uri).blob() doesn't produce a blob the Firebase SDK can
// upload reliably; XMLHttpRequest with responseType 'blob' is the documented
// workaround for local file:// URIs.
// Photos/thumbs are immutable once uploaded (a new capture gets a new id), so
// let the CDN and on-device cache hold them forever — galleries stop re-fetching
// bytes they already have.
const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable';

// Grid thumbnail width. Cells render ~180pt wide, so 400px covers 2x screens
// while staying a fraction of the full image's bytes.
const THUMB_WIDTH = 400;

function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response as Blob);
    xhr.onerror = () => reject(new Error('Failed to read image file'));
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}

// Builds a small grid thumbnail and returns its URL. For a video, grabs a poster
// frame first (expo-video-thumbnails — lazily required so a build without the
// native module doesn't crash at import). Best-effort: returns `fallbackUrl` (the
// full media URL) if anything fails, so a missing thumbnail never blocks upload.
async function makeThumbnail(
  eventId: string,
  photoId: string,
  uri: string,
  isVideo: boolean,
  fallbackUrl: string,
): Promise<string> {
  try {
    let source = uri;
    if (isVideo) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const VideoThumbnails = require('expo-video-thumbnails');
      const poster = await VideoThumbnails.getThumbnailAsync(uri, { time: 500, quality: 0.7 });
      source = poster.uri;
    }
    const thumb = await ImageManipulator.manipulateAsync(
      source, [{ resize: { width: THUMB_WIDTH } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG },
    );
    const thumbRef = ref(storage, `events/${eventId}/thumbs/${photoId}.jpg`);
    await uploadBytes(thumbRef, await uriToBlob(thumb.uri), { contentType: 'image/jpeg', cacheControl: IMMUTABLE_CACHE });
    return await getDownloadURL(thumbRef);
  } catch (e) {
    logError('thumbnail', e, { photoId, isVideo });
    return fallbackUrl;
  }
}

export const EventService = {
  async create(hostId: string, draft: EventDraft, plan: string): Promise<Event> {
    const id = nanoid();
    const shortCode = genShortCode();
    const limits = getPlan(plan);

    let coverImageUrl: string | null = null;
    if (draft.coverImageUri) {
      coverImageUrl = await EventService.uploadCoverImage(id, draft.coverImageUri);
    }

    const startDate = draft.date ?? new Date();
    // Reveal-after-event needs an end time; default to +6h from start.
    const endsAt = new Date(startDate.getTime() + 6 * 60 * 60 * 1000).toISOString();

    const event: Omit<Event, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      id,
      hostId,
      name: draft.name,
      type: draft.type,
      // Stored only when the host actually picked a date — undated events drive
      // the "wrap up?" nudge off the first photo instead (see eventDailyTick).
      date: draft.date ? draft.date.toISOString() : null,
      coverImageUrl,
      shotsPerGuest: draft.shotsPerGuest,
      disposableMode: draft.disposableMode,
      revealTiming: draft.revealTiming,
      allowGalleryUpload: draft.allowGalleryUpload,
      reminderBefore: draft.reminderBefore,
      uploadNotify: true,
      maxGuests: limits.maxGuests,
      photoCap: limits.photoCap,
      video: limits.video,
      notes: limits.notes,
      notesEnabled: true,
      voices: limits.voices,
      voicesEnabled: true,
      retentionDays: limits.retentionDays,
      retentionExempt: false,
      endsAt,
      shortCode,
      isActive: true,
      guestCount: 0,
      photoCount: 0,
      plan,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'events', id), event);
    return { ...event, createdAt: new Date().toISOString() } as Event;
  },

  async getById(eventId: string): Promise<Event | null> {
    const snap = await getDoc(doc(db, 'events', eventId));
    return snap.exists() ? (snap.data() as Event) : null;
  },

  // Current server state of the given joined events, in one batched read — powers
  // the welcome "resume" surface and the joined-events list. `existing` are the
  // ids whose event still exists (a host-DELETED event is absent → callers prune
  // it from local storage); `active` are the still-live ones. `in` caps at 30.
  async joinedStatus(ids: string[]): Promise<{ active: Set<string>; existing: Set<string> }> {
    const active = new Set<string>();
    const existing = new Set<string>();
    const unique = [...new Set(ids)];
    for (let i = 0; i < unique.length; i += 30) {
      const chunk = unique.slice(i, i + 30);
      const snap = await getDocs(query(collection(db, 'events'), where(documentId(), 'in', chunk)));
      snap.forEach((d) => {
        existing.add(d.id);
        if ((d.data() as Event).isActive) active.add(d.id);
      });
    }
    return { active, existing };
  },

  async getByShortCode(code: string): Promise<Event | null> {
    const normalized = code.trim().toUpperCase();
    const q = query(collection(db, 'events'), where('shortCode', '==', normalized));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as Event;
  },

  async getHostEvents(hostId: string): Promise<Event[]> {
    const q = query(collection(db, 'events'), where('hostId', '==', hostId));
    const snap = await getDocs(q);
    return newestFirst(snap.docs.map((d) => d.data() as Event));
  },

  // Atomic so concurrent joins can't exceed the guest cap or corrupt the count.
  async joinEvent(eventId: string, userId: string, nickname: string | null): Promise<number> {
    const eventRef = doc(db, 'events', eventId);
    const guestRef = doc(db, 'events', eventId, 'guests', userId);

    return runTransaction(db, async (tx) => {
      const eventSnap = await tx.get(eventRef);
      if (!eventSnap.exists()) throw new Error('Event not found');
      const event = eventSnap.data() as Event;

      const guestSnap = await tx.get(guestRef);
      if (guestSnap.exists()) {
        return (guestSnap.data().shotsRemaining as number) ?? 0;
      }

      if (event.maxGuests != null && (event.guestCount ?? 0) >= event.maxGuests) {
        throw new LimitError('event_full');
      }

      tx.set(guestRef, {
        userId,
        nickname: nickname ?? 'Anonymous',
        shotsRemaining: event.shotsPerGuest,
        joinedAt: serverTimestamp(),
      });
      tx.update(eventRef, { guestCount: increment(1) });
      return event.shotsPerGuest;
    });
  },

  // Atomic decrement so rapid shutter taps can't drive shots below zero.
  async decrementShots(eventId: string, userId: string): Promise<void> {
    const guestRef = doc(db, 'events', eventId, 'guests', userId);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(guestRef);
      if (!snap.exists()) return;
      const current = (snap.data().shotsRemaining as number) ?? 0;
      if (current <= 0) throw new LimitError('no_shots');
      tx.update(guestRef, { shotsRemaining: current - 1 });
    });
  },

  async uploadPhoto(
    eventId: string,
    userId: string,
    uploaderName: string | null,
    uri: string,
    mediaType: 'image' | 'video' = 'image',
  ): Promise<Photo> {
    const photoId = nanoid();
    const eventRef = doc(db, 'events', eventId);

    // Reserve a slot atomically first — this enforces the plan's photoCap and
    // bumps the counter without a read-then-write race.
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(eventRef);
      if (!snap.exists()) throw new Error('Event not found');
      const event = snap.data() as Event;
      if (!event.isActive) throw new LimitError('event_ended');
      if (event.photoCap != null && (event.photoCount ?? 0) >= event.photoCap) {
        throw new LimitError('photo_cap');
      }
      tx.update(eventRef, { photoCount: increment(1) });
    });

    // The reserved slot is intentionally NOT rolled back on failure: security
    // rules only let a guest move photoCount upward (a downward write was a
    // cap-bypass vector). A failed upload therefore leaves the count one high —
    // conservative and rare; the host owns the counter and can correct drift.
    const isVideo = mediaType === 'video';
    const ext = isVideo ? 'mp4' : 'jpg';
    const contentType = isVideo ? 'video/mp4' : 'image/jpeg';
    const storageRef = ref(storage, `events/${eventId}/photos/${photoId}.${ext}`);

    // Upload the media + its thumbnail + the photo doc as one unit, retried on
    // transient network failures (flaky event wifi). The slot is already reserved
    // and photoId is fixed, so retrying re-writes the same paths idempotently and
    // never double-counts. Videos get a real poster frame for the grid.
    return withRetry(async () => {
      await uploadBytes(storageRef, await uriToBlob(uri), { contentType, cacheControl: IMMUTABLE_CACHE });
      const imageUrl = await getDownloadURL(storageRef);
      const thumbnailUrl = await makeThumbnail(eventId, photoId, uri, isVideo, imageUrl);

      const photo: Photo = {
        id: photoId,
        eventId,
        uploadedBy: userId,
        uploaderName,
        imageUrl,
        thumbnailUrl,
        mediaType,
        takenAt: new Date().toISOString(),
        isVisible: true,
        likesCount: 0,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'events', eventId, 'photos', photoId), {
        ...photo,
        createdAt: serverTimestamp(),
      });

      return photo;
    });
  },

  async getPhotos(eventId: string): Promise<Photo[]> {
    const q = query(
      collection(db, 'events', eventId, 'photos'),
      where('isVisible', '==', true),
    );
    const snap = await getDocs(q);
    return newestFirst(snap.docs.map((d) => d.data() as Photo));
  },

  // Newest `max` photos, live. Ordered server-side (single-field index, no
  // composite needed) so we fetch one window instead of the whole gallery; the
  // screen filters isVisible/flagged in memory. `hasMore` lets the UI page in
  // older photos by raising `max`.
  //
  // serverTimestamps:'estimate' makes a just-uploaded photo's pending createdAt
  // read as a local time (not null), so it sorts to the top right away instead of
  // sinking below the limit and "not showing up". We re-sort in memory (createdAt
  // with a takenAt fallback) as a belt-and-suspenders guard against that ordering.
  subscribeToPhotos(
    eventId: string,
    max: number,
    callback: (photos: Photo[], hasMore: boolean) => void,
  ): Unsubscribe {
    const q = query(
      collection(db, 'events', eventId, 'photos'),
      orderBy('createdAt', 'desc'),
      fbLimit(max + 1),
    );
    return onSnapshot(q, (snap) => {
      const rows = sortPhotosNewestFirst(
        snap.docs.map((d) => d.data({ serverTimestamps: 'estimate' }) as Photo),
      );
      const hasMore = rows.length > max;
      callback(hasMore ? rows.slice(0, max) : rows, hasMore);
    });
  },

  // "Memory book": each guest gets ONE note (the doc id is their uid), so calling
  // this again edits theirs rather than adding a second. Text is trimmed and hard
  // capped at NOTE_MAX (the rules enforce the same cap); empty notes are ignored.
  async saveNote(eventId: string, authorId: string, authorName: string | null, text: string): Promise<void> {
    const trimmed = text.trim().slice(0, NOTE_MAX);
    if (!trimmed) return;
    await setDoc(doc(db, 'events', eventId, 'notes', authorId), {
      authorId,
      authorName: authorName?.trim() || null,
      text: trimmed,
      createdAt: serverTimestamp(),
    });
  },

  // The current guest's own note, if they've left one (for the edit flow).
  async getMyNote(eventId: string, uid: string): Promise<Note | null> {
    const snap = await getDoc(doc(db, 'events', eventId, 'notes', uid));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as Note) : null;
  },

  // The host (or the note's author) removes a note — e.g. to tidy the book before
  // exporting. Rules allow the host to delete any note in their event.
  async deleteNote(eventId: string, noteId: string): Promise<void> {
    await deleteDoc(doc(db, 'events', eventId, 'notes', noteId));
  },

  // Live notes feed, newest-first. Estimate + in-memory sort so a just-left note
  // surfaces immediately (same reasoning as subscribeToPhotos).
  subscribeToNotes(eventId: string, callback: (notes: Note[]) => void): Unsubscribe {
    const q = query(collection(db, 'events', eventId, 'notes'), orderBy('createdAt', 'desc'), fbLimit(200));
    return onSnapshot(q, (snap) => {
      callback(sortPhotosNewestFirst(snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) }) as Note)));
    });
  },

  // "Voice memories": each guest gets ONE voice (the doc id is their uid), so
  // recording again overwrites the same storage file and doc rather than piling
  // up clips. Uploads the m4a, then writes the doc pointing at its download URL.
  async saveVoice(eventId: string, authorId: string, authorName: string | null, uri: string, durationMs: number): Promise<void> {
    const storageRef = ref(storage, `events/${eventId}/voices/${authorId}.m4a`);
    await uploadBytes(storageRef, await uriToBlob(uri), { contentType: 'audio/m4a' });
    const audioUrl = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'events', eventId, 'voices', authorId), {
      authorId,
      authorName: authorName?.trim() || null,
      audioUrl,
      durationMs: Math.round(durationMs),
      createdAt: serverTimestamp(),
    });
  },

  // The current guest's own voice, if they've left one (for the replace flow).
  async getMyVoice(eventId: string, uid: string): Promise<Voice | null> {
    const snap = await getDoc(doc(db, 'events', eventId, 'voices', uid));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as Voice) : null;
  },

  // The host (or the voice's author) removes a voice. Deletes the doc, then the
  // audio file best-effort — the doc governs visibility, so a lingering file is
  // harmless (and the whole prefix is wiped when the event is deleted).
  async deleteVoice(eventId: string, voiceId: string): Promise<void> {
    await deleteDoc(doc(db, 'events', eventId, 'voices', voiceId));
    await deleteObject(ref(storage, `events/${eventId}/voices/${voiceId}.m4a`)).catch(() => {});
  },

  // Live voices feed, newest-first (same estimate + in-memory sort as notes).
  subscribeToVoices(eventId: string, callback: (voices: Voice[]) => void): Unsubscribe {
    const q = query(collection(db, 'events', eventId, 'voices'), orderBy('createdAt', 'desc'), fbLimit(200));
    return onSnapshot(q, (snap) => {
      callback(sortPhotosNewestFirst(snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) }) as Voice)));
    });
  },

  async uploadCoverImage(eventId: string, uri: string): Promise<string> {
    const path = `events/${eventId}/cover.jpg`;
    const storageRef = ref(storage, path);
    const blob = await uriToBlob(uri);
    await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
    return getDownloadURL(storageRef);
  },

  async deletePhoto(eventId: string, photoId: string): Promise<void> {
    await updateDoc(doc(db, 'events', eventId, 'photos', photoId), { isVisible: false });
  },

  // Toggle a like. likedBy is the source of truth (arrayUnion/arrayRemove are
  // idempotent); likesCount is kept in sync for any non-detail consumers.
  async toggleLike(eventId: string, photoId: string, uid: string, liked: boolean): Promise<void> {
    await updateDoc(doc(db, 'events', eventId, 'photos', photoId), {
      likedBy: liked ? arrayRemove(uid) : arrayUnion(uid),
      likesCount: increment(liked ? -1 : 1),
    });
  },

  // UGC moderation (App Store Guideline 1.2): records the report for review and
  // immediately flags the photo so it's hidden from guests pending host action.
  async reportPhoto(eventId: string, photoId: string, reporterId: string, reason = 'objectionable'): Promise<void> {
    await setDoc(doc(db, 'reports', nanoid()), {
      eventId, photoId, reporterId, reason, createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'events', eventId, 'photos', photoId), {
      flagged: true, reportCount: increment(1),
    }).catch(() => {});
  },

  // Host-editable settings (the bits we moved out of the create flow).
  async updateSettings(
    eventId: string,
    settings: Partial<Pick<Event, 'disposableMode' | 'allowGalleryUpload' | 'reminderBefore' | 'revealTiming' | 'uploadNotify' | 'notesEnabled' | 'voicesEnabled'>>,
  ): Promise<void> {
    await updateDoc(doc(db, 'events', eventId), settings);
  },

  // Upgrade an event to a higher plan (sales surface in event settings).
  async updatePlan(eventId: string, planId: string): Promise<void> {
    const p = getPlan(planId);
    await updateDoc(doc(db, 'events', eventId), {
      plan: p.id, maxGuests: p.maxGuests, photoCap: p.photoCap, video: p.video, notes: p.notes, voices: p.voices,
      retentionDays: p.retentionDays,
    });
  },

  // Ends the event: stops new joins (join checks isActive) and uploads
  // (uploadPhoto throws event_ended). Irreversible from the UI.
  async endEvent(eventId: string): Promise<void> {
    await updateDoc(doc(db, 'events', eventId), { isActive: false });
  },

  // Redeems a single-use promo code: atomically flips an unused code to used so
  // the same code can never unlock two events. Returns 'ok' on success, or a
  // reason the caller maps to copy ('invalid' = unknown, 'used' = already spent).
  async redeemPromoCode(code: string, uid: string): Promise<'ok' | 'invalid' | 'used'> {
    const ref = doc(db, 'promoCodes', code.trim().toUpperCase());
    try {
      return await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists()) return 'invalid';
        if (snap.data().used) return 'used';
        tx.update(ref, { used: true, usedBy: uid, usedAt: serverTimestamp() });
        return 'ok';
      });
    } catch {
      return 'invalid';
    }
  },
};
