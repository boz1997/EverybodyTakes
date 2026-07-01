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

describe('retentionPlan (free-tier auto-delete)', () => {
  const now = new Date('2026-07-01T12:00:00.000Z');
  const daysAgo = (n: number) => now.getTime() - n * DAY;
  // A free event 7-day plan, first photo N days ago, not yet warned.
  const free = (firstPhotoDaysAgo: number, warned = false) => ({
    plan: 'free', retentionExempt: false, retentionDays: 7,
    firstPhotoAtMs: daysAgo(firstPhotoDaysAgo), warned,
  });

  it('warns (never purges) the first time, even once past the deadline', () => {
    // 8 days after the first photo we are already past purgeAt — but with no prior
    // warning we must WARN, not delete. This is the "never delete without notice" rule.
    expect(retentionPlan(free(8, false), now)).toEqual({ warn: true, purge: false });
  });

  it('purges only after a warning was sent and the deadline passed', () => {
    expect(retentionPlan(free(8, true), now)).toEqual({ warn: false, purge: true });
  });

  it('warns once in the final 24h, then goes quiet until the deadline', () => {
    // 6.5 days in: inside the 24h warning window, before the 7-day deadline.
    expect(retentionPlan(free(6.5, false), now)).toEqual({ warn: true, purge: false });
    // already warned, deadline not reached → nothing (no repeat warning, no purge).
    expect(retentionPlan(free(6.5, true), now)).toEqual({ warn: false, purge: false });
  });

  it('does nothing before the final 24h', () => {
    expect(retentionPlan(free(3, false), now)).toEqual({ warn: false, purge: false });
  });

  it('NEVER touches a paid event (retentionDays null), however old or warned', () => {
    const paid = { plan: 'small', retentionExempt: false, retentionDays: null, firstPhotoAtMs: daysAgo(365), warned: true };
    expect(retentionPlan(paid, now)).toEqual({ warn: false, purge: false });
  });

  it('NEVER touches a grandfathered (retentionExempt) event', () => {
    expect(retentionPlan({ ...free(365, true), retentionExempt: true }, now)).toEqual({ warn: false, purge: false });
  });

  it('NEVER touches an event with no first photo', () => {
    expect(retentionPlan({ ...free(0, true), firstPhotoAtMs: null }, now)).toEqual({ warn: false, purge: false });
  });

  it('NEVER touches a pre-retention event (no retentionDays field) — protects existing users', () => {
    // Events created before this feature have no retentionDays: undefined == null → ineligible.
    const legacy = { plan: 'free', retentionExempt: false, firstPhotoAtMs: daysAgo(365), warned: true } as any;
    expect(retentionPlan(legacy, now)).toEqual({ warn: false, purge: false });
  });
});
