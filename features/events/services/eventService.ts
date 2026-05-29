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
  Unsubscribe,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@lib/firebase';
import { EventDraft } from '@store/eventStore';
import { nanoid } from 'nanoid/non-secure';

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
  maxGuests: number | null;
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

export const EventService = {
  async create(hostId: string, draft: EventDraft, plan: string): Promise<Event> {
    const id = nanoid();
    const shortCode = nanoid(8).toUpperCase();

    let coverImageUrl: string | null = null;
    if (draft.coverImageUri) {
      coverImageUrl = await EventService.uploadCoverImage(id, draft.coverImageUri);
    }

    const event: Omit<Event, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      id,
      hostId,
      name: draft.name,
      type: draft.type,
      date: draft.date?.toISOString() ?? new Date().toISOString(),
      coverImageUrl,
      shotsPerGuest: draft.shotsPerGuest,
      disposableMode: draft.disposableMode,
      revealTiming: draft.revealTiming,
      allowGalleryUpload: draft.allowGalleryUpload,
      maxGuests: draft.maxGuests,
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
    const q = query(collection(db, 'events'), where('shortCode', '==', code));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as Event;
  },

  async getHostEvents(hostId: string): Promise<Event[]> {
    const q = query(collection(db, 'events'), where('hostId', '==', hostId));
    const snap = await getDocs(q);
    return newestFirst(snap.docs.map((d) => d.data() as Event));
  },

  async joinEvent(eventId: string, userId: string, nickname: string | null): Promise<number> {
    const guestRef = doc(db, 'events', eventId, 'guests', userId);
    const existing = await getDoc(guestRef);

    if (existing.exists()) {
      return (existing.data().shotsRemaining as number) ?? 0;
    }

    const eventSnap = await getDoc(doc(db, 'events', eventId));
    if (!eventSnap.exists()) throw new Error('Event not found');
    const event = eventSnap.data() as Event;

    await setDoc(guestRef, {
      userId,
      nickname: nickname ?? 'Anonymous',
      shotsRemaining: event.shotsPerGuest,
      joinedAt: serverTimestamp(),
    });

    await updateDoc(doc(db, 'events', eventId), {
      guestCount: (event.guestCount ?? 0) + 1,
    });

    return event.shotsPerGuest;
  },

  async decrementShots(eventId: string, userId: string): Promise<void> {
    const ref = doc(db, 'events', eventId, 'guests', userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const current = snap.data().shotsRemaining as number;
    if (current <= 0) throw new Error('No shots remaining');
    await updateDoc(ref, { shotsRemaining: current - 1 });
  },

  async uploadPhoto(eventId: string, userId: string, uploaderName: string | null, uri: string): Promise<Photo> {
    const photoId = nanoid();
    const path = `events/${eventId}/photos/${photoId}.jpg`;
    const storageRef = ref(storage, path);

    const response = await fetch(uri);
    const blob = await response.blob();
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

    await updateDoc(doc(db, 'events', eventId), {
      photoCount: (await getDoc(doc(db, 'events', eventId))).data()!.photoCount + 1,
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
    const response = await fetch(uri);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
    return getDownloadURL(storageRef);
  },

  async deletePhoto(eventId: string, photoId: string): Promise<void> {
    await updateDoc(doc(db, 'events', eventId, 'photos', photoId), { isVisible: false });
  },
};
