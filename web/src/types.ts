// Mirrors the native app's Firestore shapes (subset the guest web needs).

export interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
  coverImageUrl: string | null;
  shotsPerGuest: number;
  disposableMode: boolean;
  revealTiming: string; // instant | next_day | private
  isActive: boolean;
  maxGuests: number | null;
  photoCap: number | null;
  shortCode: string;
  guestCount: number;
  photoCount: number;
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
