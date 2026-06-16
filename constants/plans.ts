// Single source of truth for monetization.
// Model (matches Lense/POV): per-event packages priced by guest band, one-time
// (not a subscription). The plan a host buys determines the event's hard limits,
// copied onto the event document and enforced server-side.

// Paid plans are live. The purchase runs through RevenueCat (App Store IAP).
export const PAID_PLANS_ENABLED = true;

export type PlanId = 'free' | 'small' | 'medium' | 'unlimited';

export interface Plan {
  id: PlanId;
  maxGuests: number | null;   // null = unlimited
  photoCap: number | null;    // null = unlimited
  watermark: boolean;
  video: boolean;
  hdExport: boolean;
  liveWall: boolean;
  /** App Store IAP product id (must match App Store Connect + RevenueCat). */
  productId: string | null;
  /** Reference USD price (display fallback; the live price comes from the store). */
  priceUSD: number;
}

export const PLANS: Record<PlanId, Plan> = {
  free: { id: 'free', maxGuests: 10, photoCap: 100, watermark: true, video: false, hdExport: false, liveWall: false, productId: null, priceUSD: 0 },
  small: { id: 'small', maxGuests: 20, photoCap: null, watermark: false, video: false, hdExport: true, liveWall: false, productId: 'event_small', priceUSD: 3.99 },
  medium: { id: 'medium', maxGuests: 50, photoCap: null, watermark: false, video: false, hdExport: true, liveWall: true, productId: 'event_medium', priceUSD: 14.99 },
  unlimited: { id: 'unlimited', maxGuests: null, photoCap: null, watermark: false, video: true, hdExport: true, liveWall: true, productId: 'event_unlimited', priceUSD: 29.99 },
};

export const PAID_PLAN_ORDER: PlanId[] = ['small', 'medium', 'unlimited'];

export function getPlan(id: string): Plan {
  return PLANS[(id as PlanId)] ?? PLANS.free;
}

// Fallback display price. The paywall prefers the live localized store price.
export function formatPrice(priceUSD: number): string {
  return priceUSD === 0 ? 'Free' : `$${priceUSD.toFixed(2)}`;
}
