// RevenueCat (App Store IAP) wrapper. The native module is loaded lazily so a
// build without it degrades gracefully instead of crashing at import.
import Constants from 'expo-constants';
import { Platform } from 'react-native';

let configured = false;

function getPurchases(): typeof import('react-native-purchases').default | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-purchases').default;
  } catch {
    return null;
  }
}

const apiKey = (): string | undefined =>
  Constants.expoConfig?.extra?.revenueCatIosKey || undefined;

/** True only when RevenueCat is configured (key present + native module). */
export function purchasesReady(): boolean {
  return Platform.OS === 'ios' && !!apiKey() && !!getPurchases();
}

/** Call once after auth so purchases are tied to the user's id. */
export function configurePurchases(appUserId?: string): void {
  if (configured) return;
  const Purchases = getPurchases();
  const key = apiKey();
  if (!Purchases || !key || Platform.OS !== 'ios') return;
  try {
    Purchases.configure({ apiKey: key, appUserID: appUserId });
    configured = true;
  } catch { /* ignore */ }
}

export class PurchaseCancelled extends Error {
  constructor() { super('cancelled'); }
}

/** Buys a one-time event product. Returns true on success, throws PurchaseCancelled on dismiss. */
export async function buyProduct(productId: string): Promise<boolean> {
  const Purchases = getPurchases();
  if (!Purchases || !purchasesReady()) throw new Error('purchases-unavailable');
  const products = await Purchases.getProducts([productId]);
  if (!products.length) throw new Error('product-not-found');
  try {
    await Purchases.purchaseStoreProduct(products[0]);
    return true;
  } catch (e: unknown) {
    if ((e as { userCancelled?: boolean })?.userCancelled) throw new PurchaseCancelled();
    throw e;
  }
}

/** Localized store price strings keyed by productId (for the paywall). */
export async function getPriceStrings(productIds: string[]): Promise<Record<string, string>> {
  const Purchases = getPurchases();
  if (!Purchases || !purchasesReady() || productIds.length === 0) return {};
  try {
    const products = await Purchases.getProducts(productIds);
    const map: Record<string, string> = {};
    for (const p of products) map[p.identifier] = p.priceString;
    return map;
  } catch {
    return {};
  }
}

export async function restorePurchases(): Promise<void> {
  const Purchases = getPurchases();
  if (!Purchases || !purchasesReady()) return;
  await Purchases.restorePurchases();
}
