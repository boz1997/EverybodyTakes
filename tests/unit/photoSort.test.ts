import { describe, it, expect } from 'vitest';
import { toMillis, newestFirst, photoTimeMs, sortPhotosNewestFirst } from '@shared/utils/photoSort';

// A Firestore Timestamp on read exposes toMillis(); locally createdAt is an ISO
// string (or, for a pending serverTimestamp, null). These tests pin down exactly
// how the gallery's in-memory ordering treats each shape — the safety net for the
// upcoming gallery changes.
const ts = (ms: number) => ({ toMillis: () => ms });

describe('toMillis', () => {
  it('reads a Firestore Timestamp via toMillis()', () => {
    expect(toMillis(ts(1_700_000_000_000))).toBe(1_700_000_000_000);
  });

  it('parses an ISO string', () => {
    expect(toMillis('2026-06-05T12:00:00.000Z')).toBe(Date.parse('2026-06-05T12:00:00.000Z'));
  });

  it('returns 0 for an unparseable string', () => {
    expect(toMillis('not-a-date')).toBe(0);
  });

  it('returns 0 for null / undefined (pending serverTimestamp reads as null)', () => {
    expect(toMillis(null)).toBe(0);
    expect(toMillis(undefined)).toBe(0);
  });

  it('returns 0 for a raw number (no toMillis, not a string)', () => {
    expect(toMillis(1_700_000_000_000 as unknown)).toBe(0);
  });

  it('returns 0 for a plain object without toMillis', () => {
    expect(toMillis({})).toBe(0);
    expect(toMillis({ seconds: 1 })).toBe(0);
  });
});

describe('newestFirst', () => {
  it('orders newest createdAt first', () => {
    const rows = [
      { id: 'a', createdAt: ts(100) },
      { id: 'b', createdAt: ts(300) },
      { id: 'c', createdAt: ts(200) },
    ];
    expect(newestFirst(rows).map((r) => r.id)).toEqual(['b', 'c', 'a']);
  });

  it('mixes Timestamp and ISO-string createdAt correctly', () => {
    const rows = [
      { id: 'iso-old', createdAt: '2020-01-01T00:00:00.000Z' },
      { id: 'ts-new', createdAt: ts(Date.parse('2026-01-01T00:00:00.000Z')) },
    ];
    expect(newestFirst(rows).map((r) => r.id)).toEqual(['ts-new', 'iso-old']);
  });

  it('sinks null/0-valued createdAt to the bottom', () => {
    const rows = [
      { id: 'pending', createdAt: null },
      { id: 'real', createdAt: ts(500) },
    ];
    expect(newestFirst(rows).map((r) => r.id)).toEqual(['real', 'pending']);
  });

  it('does not mutate the input array', () => {
    const rows = [
      { id: 'a', createdAt: ts(1) },
      { id: 'b', createdAt: ts(2) },
    ];
    const snapshot = rows.map((r) => r.id);
    newestFirst(rows);
    expect(rows.map((r) => r.id)).toEqual(snapshot);
  });

  it('handles an empty array', () => {
    expect(newestFirst([])).toEqual([]);
  });
});

describe('photoTimeMs', () => {
  it('uses createdAt when present', () => {
    expect(photoTimeMs({ createdAt: ts(500), takenAt: '2020-01-01T00:00:00.000Z' })).toBe(500);
  });

  it('falls back to takenAt when createdAt is still resolving (0/null)', () => {
    const takenAt = '2026-06-05T12:00:00.000Z';
    expect(photoTimeMs({ createdAt: null, takenAt })).toBe(Date.parse(takenAt));
    expect(photoTimeMs({ createdAt: undefined, takenAt })).toBe(Date.parse(takenAt));
  });

  it('is 0 when neither is usable', () => {
    expect(photoTimeMs({})).toBe(0);
    expect(photoTimeMs({ createdAt: null, takenAt: 'nope' })).toBe(0);
  });
});

describe('sortPhotosNewestFirst', () => {
  it('floats a just-uploaded photo (pending createdAt) to the top via takenAt', () => {
    // The regression: a fresh upload has a null createdAt for a moment. Without
    // the takenAt fallback it would sink below the page limit and "not show up".
    const rows = [
      { id: 'old', createdAt: ts(Date.parse('2026-06-01T10:00:00.000Z')), takenAt: '2026-06-01T10:00:00.000Z' },
      { id: 'fresh', createdAt: null, takenAt: '2026-06-05T18:00:00.000Z' },
      { id: 'older', createdAt: ts(Date.parse('2026-05-01T10:00:00.000Z')), takenAt: '2026-05-01T10:00:00.000Z' },
    ];
    expect(sortPhotosNewestFirst(rows).map((r) => r.id)).toEqual(['fresh', 'old', 'older']);
  });

  it('keeps committed photos in server (createdAt) order', () => {
    const rows = [
      { id: 'a', createdAt: ts(100), takenAt: 'x' },
      { id: 'c', createdAt: ts(300), takenAt: 'x' },
      { id: 'b', createdAt: ts(200), takenAt: 'x' },
    ];
    expect(sortPhotosNewestFirst(rows).map((r) => r.id)).toEqual(['c', 'b', 'a']);
  });

  it('does not mutate the input', () => {
    const rows = [{ id: 'a', createdAt: ts(1) }, { id: 'b', createdAt: ts(2) }];
    const before = rows.map((r) => r.id);
    sortPhotosNewestFirst(rows);
    expect(rows.map((r) => r.id)).toEqual(before);
  });
});
