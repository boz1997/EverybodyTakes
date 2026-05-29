import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  runTransaction,
  increment,
  Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@lib/firebase';
import { EventDraft } from '@store/eventStore';
import { getPlan } from '@constants/plans';
import { nanoid, customAlphabet } from 'nanoid/non-secure';

// 6-char join code: uppercase letters + digits, ambiguous chars (0/O/1/I/L)
// removed so guests can type it without confusion. No separators.
const genShortCode = customAlphabet('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 6);

/** Thrown when a hard plan/event limit is hit. Screens map these to copy. */
export class LimitError extends Error {
  constructor(public code: 'event_full' | 'photo_cap' | 'no_shots') {
    super(code);
  }
}

export interface Event {
  id: string;
  hostId: string;
  name: string;
  type: string;
  date: string;
  coverImageUrl: string | null;
  shotsPerGuest: number;
  disposableMode: boolean;
  revealTiming: string;
  allowGalleryUpload: boolean;
  reminderBefore: '1h' | '24h' | null;
  maxGuests: number | null;   // resolved from plan
  photoCap: number | null;    // resolved from plan
  watermark: boolean;         // resolved from plan
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
  takenAt: string;
  isVisible: boolean;
  likesCount: number;
  createdAt: string;
}

// createdAt is a serverTimestamp (Firestore Timestamp on read) or an ISO
// string locally. Sort newest-first in memory so we don't depend on a
// composite index — result sets are per-event/per-host and stay small.
function toMillis(v: unknown): number {
  if (v && typeof (v as { toMillis?: () => number }).toMillis === 'function') {
    return (v as { toMillis: () => number }).toMillis();
  }
  if (typeof v === 'string') return Date.parse(v) || 0;
  return 0;
}

function newestFirst<T extends { createdAt: unknown }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
}

// React Native's fetch(uri).blob() doesn't produce a blob the Firebase SDK can
// upload reliably; XMLHttpRequest with responseType 'blob' is the documented
// workaround for local file:// URIs.
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
      date: startDate.toISOString(),
      coverImageUrl,
      shotsPerGuest: draft.shotsPerGuest,
      disposableMode: draft.disposableMode,
      revealTiming: draft.revealTiming,
      allowGalleryUpload: draft.allowGalleryUpload,
      reminderBefore: draft.reminderBefore,
      maxGuests: limits.maxGuests,
      photoCap: limits.photoCap,
      watermark: limits.watermark,
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

  async uploadPhoto(eventId: string, userId: string, uploaderName: string | null, uri: string): Promise<Photo> {
    const photoId = nanoid();
    const eventRef = doc(db, 'events', eventId);

    // Reserve a slot atomically first — this enforces the plan's photoCap and
    // bumps the counter without a read-then-write race.
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(eventRef);
      if (!snap.exists()) throw new Error('Event not found');
      const event = snap.data() as Event;
      if (event.photoCap != null && (event.photoCount ?? 0) >= event.photoCap) {
        throw new LimitError('photo_cap');
      }
      tx.update(eventRef, { photoCount: increment(1) });
    });

    const path = `events/${eventId}/photos/${photoId}.jpg`;
    const storageRef = ref(storage, path);

    const blob = await uriToBlob(uri);
    await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
    const imageUrl = await getDownloadURL(storageRef);

    const photo: Photo = {
      id: photoId,
      eventId,
      uploadedBy: userId,
      uploaderName,
      imageUrl,
      thumbnailUrl: imageUrl,
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
  },

  async getPhotos(eventId: string): Promise<Photo[]> {
    const q = query(
      collection(db, 'events', eventId, 'photos'),
      where('isVisible', '==', true),
    );
    const snap = await getDocs(q);
    return newestFirst(snap.docs.map((d) => d.data() as Photo));
  },

  subscribeToPhotos(eventId: string, callback: (photos: Photo[]) => void): Unsubscribe {
    const q = query(
      collection(db, 'events', eventId, 'photos'),
      where('isVisible', '==', true),
    );
    return onSnapshot(q, (snap) => {
      callback(newestFirst(snap.docs.map((d) => d.data() as Photo)));
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

  // Host-editable settings (the bits we moved out of the create flow).
  async updateSettings(
    eventId: string,
    settings: Partial<Pick<Event, 'disposableMode' | 'allowGalleryUpload' | 'reminderBefore'>>,
  ): Promise<void> {
    await updateDoc(doc(db, 'events', eventId), settings);
  },
};
