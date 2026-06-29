// Mirrors the native app's Firestore shapes (subset the guest web needs).

export interface Event {
  id: string;
  name: string;
  type: string;
  date: string | null;
  coverImageUrl: string | null;
  shotsPerGuest: number;
  disposableMode: boolean;
  allowGalleryUpload: boolean;
  revealTiming: string; // instant | next_day | private
  isActive: boolean;
  maxGuests: number | null;
  photoCap: number | null;
  notes?: boolean;        // "Memory book" capability (medium/unlimited)
  notesEnabled?: boolean; // host toggle (default on)
  shortCode: string;
  guestCount: number;
  photoCount: number;
}

export interface Note {
  id: string;
  authorId: string;
  authorName: string | null;
  text: string;
  createdAt: unknown;
}

export interface Photo {
  id: string;
  eventId: string;
  uploadedBy: string;
  uploaderName: string | null;
  imageUrl: string;
  thumbnailUrl: string;
  mediaType: 'image' | 'video';
  isVisible: boolean;
  flagged?: boolean;
  likesCount: number;
  likedBy?: string[];
  createdAt: unknown;
}
