import { create } from 'zustand';

// Reveal also encodes visibility:
//  instant   → everyone sees photos immediately
//  next_day  → everyone, revealed the next day (surprise)
//  private   → only the host sees all; each guest sees only their own
export type RevealTiming = 'instant' | 'next_day' | 'private';
export type EventType = 'wedding' | 'birthday' | 'party' | 'corporate' | 'festival' | 'yacht' | 'club' | 'other';

export interface EventDraft {
  name: string;
  type: EventType;
  date: Date | null;
  coverImageUri: string | null;
  shotsPerGuest: number;
  disposableMode: boolean;
  revealTiming: RevealTiming;
  allowGalleryUpload: boolean;
  reminderBefore: '1h' | '24h' | null;
}

interface EventState {
  draft: EventDraft;
  activeEventId: string | null;
  guestEventId: string | null;
  shotsRemaining: number;
  updateDraft: (updates: Partial<EventDraft>) => void;
  resetDraft: () => void;
  setActiveEventId: (id: string | null) => void;
  setGuestEventId: (id: string | null) => void;
  setShotsRemaining: (count: number) => void;
  decrementShots: () => void;
}

const defaultDraft: EventDraft = {
  name: '',
  type: 'party',
  date: null,
  coverImageUri: null,
  shotsPerGuest: 24,
  disposableMode: true,
  revealTiming: 'instant',
  allowGalleryUpload: false,
  reminderBefore: null,
};

export const useEventStore = create<EventState>((set) => ({
  draft: { ...defaultDraft },
  activeEventId: null,
  guestEventId: null,
  shotsRemaining: 0,
  updateDraft: (updates) => set((s) => ({ draft: { ...s.draft, ...updates } })),
  resetDraft: () => set({ draft: { ...defaultDraft } }),
  setActiveEventId: (activeEventId) => set({ activeEventId }),
  setGuestEventId: (guestEventId) => set({ guestEventId }),
  setShotsRemaining: (shotsRemaining) => set({ shotsRemaining }),
  decrementShots: () => set((s) => ({ shotsRemaining: Math.max(0, s.shotsRemaining - 1) })),
}));
