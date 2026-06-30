// AdMob (Google Mobile Ads) wrapper. The native module is loaded lazily so a
// build without it — Expo Go, or before the next dev-client build — degrades to
// "no ad, save proceeds" instead of crashing at import. Mirrors purchaseService.
import Constants from 'expo-constants';
import { Platform, TurboModuleRegistry } from 'react-native';

type AdsModule = typeof import('react-native-google-mobile-ads');

// The ads package throws at require-time when its native binary isn't present
// (Expo Go, or before the dev-client rebuild). Probe the native module with
// TurboModuleRegistry.get — which returns null instead of throwing — BEFORE
// requiring, so degraded environments degrade quietly instead of red-screening.
function getAds(): AdsModule | null {
  try {
    if (!TurboModuleRegistry.get('RNGoogleMobileAdsModule')) return null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-google-mobile-ads');
  } catch {
    return null;
  }
}

// Expo Go has no native ads module; ads run on dev-client / TestFlight / store.
const isExpoGo = (): boolean =>
  Constants.executionEnvironment === 'storeClient' || Constants.appOwnership === 'expo';

export function adsReady(): boolean {
  return !isExpoGo() && !!getAds();
}

let initialized = false;
async function ensureInit(ads: AdsModule): Promise<void> {
  if (initialized) return;
  await ads.default().initialize();
  initialized = true;
}

// Live ad unit, falling back to Google's test unit until a real id is set in
// app.json → extra.admobRewarded*. Test ids are safe in dev/review; real revenue
// needs the host's own AdMob unit id.
function rewardedUnitId(ads: AdsModule): string {
  // In dev always use Google's test unit — it fills instantly, whereas a freshly
  // created real unit needs up to an hour before it serves any ads. Prod uses the
  // configured real unit.
  if (__DEV__) return ads.TestIds.REWARDED;
  const extra = Constants.expoConfig?.extra ?? {};
  const configured = Platform.OS === 'ios' ? extra.admobRewardedIos : extra.admobRewardedAndroid;
  return configured || ads.TestIds.REWARDED;
}

// Shows one rewarded ad before a free bulk download, resolving when it closes.
// Resolves true in every non-blocking case (ad shown, unavailable, or errored)
// — a flaky ad must never trap the user. The 12s guard covers an ad that loads
// but never fires a close/error event.
export async function showDownloadAd(): Promise<boolean> {
  const ads = getAds();
  if (!ads || !adsReady()) return true;
  try {
    await ensureInit(ads);
    const { RewardedAd, RewardedAdEventType, AdEventType } = ads;
    const ad = RewardedAd.createForAdRequest(rewardedUnitId(ads), { requestNonPersonalizedAdsOnly: true });

    return await new Promise<boolean>((resolve) => {
      const subs: Array<() => void> = [];
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        subs.forEach((off) => off());
        resolve(true);
      };
      subs.push(ad.addAdEventListener(RewardedAdEventType.LOADED, () => { ad.show().catch(finish); }));
      subs.push(ad.addAdEventListener(AdEventType.CLOSED, finish));
      subs.push(ad.addAdEventListener(AdEventType.ERROR, finish));
      const guard = setTimeout(finish, 12000);
      subs.push(() => clearTimeout(guard));
      ad.load();
    });
  } catch {
    return true;
  }
}
