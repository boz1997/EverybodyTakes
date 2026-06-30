import { describe, it, expect } from 'vitest';
// CommonJS helper from the Cloud Functions package (no Firebase init inside).
import { ymdInTz, dailyTickPlan, retentionPlan } from '../../functions/lib/schedule';

const TZ = 'Europe/Istanbul'; // permanent UTC+3, no DST
const DAY = 24 * 60 * 60 * 1000;

describe('ymdInTz', () => {
  it('renders the calendar day in the given timezone, not UTC', () => {
    // 21:00 UTC is already the next calendar day in Istanbul (+3 → 00:00).
    expect(ymdInTz(new Date('2026-06-04T21:00:00.000Z'), TZ)).toBe('2026-06-05');
    // 20:30 UTC is still the same day in Istanbul (23:30).
    expect(ymdInTz(new Date('2026-06-04T20:30:00.000Z'), TZ)).toBe('2026-06-04');
  });
});

describe('dailyTickPlan', () => {
  // A "June 5" event picked at local midnight is stored as 2026-06-04T21:00Z.
  const juneFifth = '2026-06-04T21:00:00.000Z';
  const noonIstanbul = (isoDay: string) => new Date(`${isoDay}T09:00:00.000Z`); // 12:00 Istanbul
  const base = { dateIso: null as string | null, firstPhotoAtMs: null as number | null, reminderSent: false, wrapSent: false };

  it('NEVER closes an event — even on its own day nothing fires', () => {
    const plan = dailyTickPlan({ ...base, dateIso: juneFifth }, noonIstanbul('2026-06-05'), TZ);
    expect(plan).toEqual({ remind: false, wrap: false }); // stays open, no 'close'
  });

  it('reminds the host the day before a dated event', () => {
    const plan = dailyTickPlan({ ...base, dateIso: juneFifth }, noonIstanbul('2026-06-04'), TZ);
    expect(plan.remind).toBe(true);
  });

  it('does not remind again once reminderSent', () => {
    const plan = dailyTickPlan({ ...base, dateIso: juneFifth, reminderSent: true }, noonIstanbul('2026-06-04'), TZ);
    expect(plan.remind).toBe(false);
  });

  it('sends the wrap-up nudge 48h after a dated event', () => {
    // date+48h = 2026-06-06T21:00Z; June 7 noon Istanbul is past it.
    expect(dailyTickPlan({ ...base, dateIso: juneFifth }, noonIstanbul('2026-06-07'), TZ).wrap).toBe(true);
    // June 6 noon is still before date+48h.
    expect(dailyTickPlan({ ...base, dateIso: juneFifth }, noonIstanbul('2026-06-06'), TZ).wrap).toBe(false);
  });

  it('does not send the wrap nudge twice', () => {
    const plan = dailyTickPlan({ ...base, dateIso: juneFifth, wrapSent: true }, noonIstanbul('2026-06-10'), TZ);
    expect(plan.wrap).toBe(false);
  });

  it('for an undated event, wraps 1 week after the first photo', () => {
    const now = new Date('2026-06-20T09:00:00.000Z');
    const eightDaysAgo = now.getTime() - 8 * DAY;
    const threeDaysAgo = now.getTime() - 3 * DAY;
    expect(dailyTickPlan({ ...base, firstPhotoAtMs: eightDaysAgo }, now, TZ).wrap).toBe(true);
    expect(dailyTickPlan({ ...base, firstPhotoAtMs: threeDaysAgo }, now, TZ).wrap).toBe(false);
  });

  it('an undated event with no photos yet does nothing', () => {
    expect(dailyTickPlan(base, new Date('2026-06-20T09:00:00.000Z'), TZ)).toEqual({ remind: false, wrap: false });
  });
});

describe('retentionPlan', () => {
  const now = new Date('2026-06-20T09:00:00.000Z');
  const ago = (days: number) => now.getTime() - days * DAY;
  const freeBase = { plan: 'free', retentionExempt: false, retentionDays: 7, firstPhotoAtMs: ago(0), purgeWarnSent: false };

  it('warns once, from 24h before the 7-day deadline', () => {
    // First photo 6 days ago → deadline in 1 day → inside the warn window.
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: ago(6) }, now)).toEqual({ warn: true, purge: false });
  });

  it('does not warn before the 24h window', () => {
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: ago(5) }, now)).toEqual({ warn: false, purge: false });
  });

  it('does not warn twice once purgeWarnSent', () => {
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: ago(6), purgeWarnSent: true }, now).warn).toBe(false);
  });

  it('purges only after the deadline AND a prior warning', () => {
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: ago(8), purgeWarnSent: true }, now).purge).toBe(true);
  });

  it('NEVER purges without a prior warning, even long past the deadline', () => {
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: ago(30), purgeWarnSent: false }, now).purge).toBe(false);
  });

  it('never touches paid events (retentionDays null)', () => {
    expect(retentionPlan({ ...freeBase, plan: 'small', retentionDays: null, firstPhotoAtMs: ago(30), purgeWarnSent: true }, now))
      .toEqual({ warn: false, purge: false });
  });

  it('never touches grandfathered (exempt) events', () => {
    expect(retentionPlan({ ...freeBase, retentionExempt: true, firstPhotoAtMs: ago(30), purgeWarnSent: true }, now))
      .toEqual({ warn: false, purge: false });
  });

  it('does nothing for a free event with no photos yet', () => {
    expect(retentionPlan({ ...freeBase, firstPhotoAtMs: null }, now)).toEqual({ warn: false, purge: false });
  });
});
