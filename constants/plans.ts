// Single source of truth for monetization.
// Model (matches Lense/POV): per-event packages priced by guest band, not a
// monthly subscription. The plan a host buys determines the event's hard
// limits, which are copied onto the event document and enforced server-side.

export type PlanId = 'free' | 'small' | 'medium' | 'unlimited';

export interface Plan {
  id: PlanId;
  /** Max guests who can join. null = unlimited. */
  maxGuests: number | null;
  /** Total photos allowed across the whole event. null = unlimited. */
  photoCap: number | null;
  /** GuestCam watermark burned into exports. */
  watermark: boolean;
  /** Guests can record video (not just photos). */
  video: boolean;
  hdExport: boolean;
  liveWall: boolean;
  /** Price in Turkish Lira for the whole event (one-time). 0 = free. */
  priceTRY: number;
}

export const PLANS: Record<PlanId, Plan> = {
  free: { id: 'free', maxGuests: 10, photoCap: 100, watermark: true, video: false, hdExport: false, liveWall: false, priceTRY: 0 },
  small: { id: 'small', maxGuests: 30, photoCap: null, watermark: false, video: false, hdExport: true, liveWall: false, priceTRY: 149 },
  medium: { id: 'medium', maxGuests: 100, photoCap: null, watermark: false, video: true, hdExport: true, liveWall: true, priceTRY: 449 },
  unlimited: { id: 'unlimited', maxGuests: null, photoCap: null, watermark: false, video: true, hdExport: true, liveWall: true, priceTRY: 1299 },
};

export const PAID_PLAN_ORDER: PlanId[] = ['small', 'medium', 'unlimited'];

export function getPlan(id: string): Plan {
  return PLANS[(id as PlanId)] ?? PLANS.free;
}

export function formatPrice(priceTRY: number): string {
  return priceTRY === 0 ? '₺0' : `₺${priceTRY.toLocaleString('tr-TR')}`;
}
