import { describe, it, expect } from 'vitest';
import { PLANS, getPlan, formatPrice, PAID_PLAN_ORDER } from '@constants/plans';

// Characterization tests: lock in the monetization limits exactly as they ship
// today. If a plan's guest/photo/video rule changes by accident, this fails.
describe('plans', () => {
  it('free: 10 guests, 100 photos, no video', () => {
    expect(PLANS.free.maxGuests).toBe(10);
    expect(PLANS.free.photoCap).toBe(100);
    expect(PLANS.free.video).toBe(false);
    expect(PLANS.free.productId).toBeNull();
  });

  it('small: 20 guests, unlimited photos, no video, $3.99', () => {
    expect(PLANS.small.maxGuests).toBe(20);
    expect(PLANS.small.photoCap).toBeNull();
    expect(PLANS.small.video).toBe(false);
    expect(PLANS.small.priceUSD).toBe(3.99);
    expect(PLANS.small.productId).toBe('event_small');
  });

  it('medium: 50 guests, unlimited photos, no video, $14.99', () => {
    expect(PLANS.medium.maxGuests).toBe(50);
    expect(PLANS.medium.photoCap).toBeNull();
    expect(PLANS.medium.video).toBe(false);
    expect(PLANS.medium.priceUSD).toBe(14.99);
    expect(PLANS.medium.productId).toBe('event_medium');
  });

  it('unlimited: no guest cap, unlimited photos, video on, $29.99', () => {
    expect(PLANS.unlimited.maxGuests).toBeNull();
    expect(PLANS.unlimited.photoCap).toBeNull();
    expect(PLANS.unlimited.video).toBe(true);
    expect(PLANS.unlimited.priceUSD).toBe(29.99);
    expect(PLANS.unlimited.productId).toBe('event_unlimited');
  });

  it('video is exclusive to the unlimited plan', () => {
    const withVideo = Object.values(PLANS).filter((p) => p.video).map((p) => p.id);
    expect(withVideo).toEqual(['unlimited']);
  });

  it('getPlan falls back to free for unknown / empty ids', () => {
    expect(getPlan('free')).toBe(PLANS.free);
    expect(getPlan('unlimited')).toBe(PLANS.unlimited);
    expect(getPlan('does-not-exist')).toBe(PLANS.free);
    expect(getPlan('')).toBe(PLANS.free);
  });

  it('paid plan order is small → medium → unlimited (free excluded)', () => {
    expect(PAID_PLAN_ORDER).toEqual(['small', 'medium', 'unlimited']);
    expect(PAID_PLAN_ORDER).not.toContain('free');
  });

  it('formatPrice shows "Free" for 0 and a 2-decimal dollar price otherwise', () => {
    expect(formatPrice(0)).toBe('Free');
    expect(formatPrice(3.99)).toBe('$3.99');
    expect(formatPrice(14.9)).toBe('$14.90');
    expect(formatPrice(29.99)).toBe('$29.99');
  });
});
