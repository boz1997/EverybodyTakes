// Pure, dependency-free helpers for ordering documents by their createdAt field.
//
// createdAt is a serverTimestamp (Firestore Timestamp on read) or an ISO string
// locally. Sorting newest-first in memory means we don't depend on a composite
// index — result sets are per-event/per-host and stay small.

// Normalizes a createdAt value to epoch milliseconds. Accepts a Firestore
// Timestamp (has toMillis()), an ISO string, or anything else (→ 0).
export function toMillis(v: unknown): number {
  if (v && typeof (v as { toMillis?: () => number }).toMillis === 'function') {
    return (v as { toMillis: () => number }).toMillis();
  }
  if (typeof v === 'string') return Date.parse(v) || 0;
  return 0;
}

// Returns a new array sorted newest-first by createdAt (does not mutate input).
export function newestFirst<T extends { createdAt: unknown }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
}

// Best available timestamp for a photo. While a just-uploaded photo's
// serverTimestamp is still resolving, createdAt reads as 0 — fall back to the
// client-set takenAt so the new photo sorts to the TOP immediately instead of
// sinking to the bottom (and getting cut by the page limit, i.e. "not showing up").
export function photoTimeMs(p: { createdAt?: unknown; takenAt?: unknown }): number {
  return toMillis(p.createdAt) || toMillis(p.takenAt);
}

// Newest-first by photoTimeMs (createdAt with a takenAt fallback). New uploads
// surface at the top right away; committed photos keep their server order.
export function sortPhotosNewestFirst<T extends { createdAt?: unknown; takenAt?: unknown }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => photoTimeMs(b) - photoTimeMs(a));
}
