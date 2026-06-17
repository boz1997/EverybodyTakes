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

// NOTE: The RevenueCat App Store key IS configured — it lives in
// app.json → expo.extra.revenueCatIosKey (appl_…). It is NOT empty.
// (An old handoff note wrongly said it was missing; ignore that.)
const apiKey = (): string | undefined =>
  Constants.expoConfig?.extra?.revenueCatIosKey || undefined;

// Expo Go has no native StoreKit module, so react-native-purchases falls back to
// a web shim that throws "Invalid API key" for an appl_ key. Skip RevenueCat
// entirely there — purchases work in dev-client / TestFlight / App Store builds.
// Check both signals: executionEnvironment is the modern one, appOwnership the
// legacy fallback (still set to 'expo' inside Expo Go).
const isExpoGo = (): boolean =>
  Constants.executionEnvironment === 'storeClient' || Constants.appOwnership === 'expo';

/** True only when RevenueCat is configured (key present + native module). */
export function purchasesReady(): boolean {
  return Platform.OS === 'ios' && !isExpoGo() && !!apiKey() && !!getPurchases();
}

/** Call once after auth so purchases are tied to the user's id. */
export function configurePurchases(appUserId?: string): void {
  if (configured) return;
  const Purchases = getPurchases();
  const key = apiKey();
  if (!Purchases || !key || Platform.OS !== 'ios' || isExpoGo()) return;
  try {
    Purchases.configure({ apiKey: key, appUserID: appUserId });
    configured = true;
  } catch { /* ignore */ }
}

export class PurchaseCancelled extends Error {
  constructor() { super('cancelled'); }
}

// StoreKit product fetches are flaky right after configure (and in the review
// sandbox): an empty first response is common. One short retry absorbs it.
async function fetchProducts(productIds: string[]) {
  const Purchases = getPurchases();
  if (!Purchases) return [];
  let products = await Purchases.getProducts(productIds);
  if (!products.length) {
    await new Promise((r) => setTimeout(r, 1500));
    products = await Purchases.getProducts(productIds);
  }
  return products;
}

/** Buys a one-time event product. Returns true on success, throws PurchaseCancelled on dismiss. */
export async function buyProduct(productId: string): Promise<boolean> {
  const Purchases = getPurchases();
  if (!Purchases || !purchasesReady()) throw new Error('purchases-unavailable');
  configurePurchases();   // safety net — don't depend on auth-listener timing
  const products = await fetchProducts([productId]);
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
  configurePurchases();   // paywall can mount before the auth listener configures us
  try {
    const products = await fetchProducts(productIds);
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
