# Monetizasyon — Uygulama Planı

Branch: `feature/monetization` · main'den izole, test sonrası merge edilir.

## Kapsam (bu pakette yapılacak 3 iş)

1. **Filigran (free plan)** — galeri görünümünde + indirilen dosyada sol üst köşede "GuestCam" filigranı. Paid planlarda filigran yok.
2. **Kalıcı saklama / retention** — free etkinlikler ilk fotoğraftan **7 gün** sonra silinir. Silmeye **24 saat kala** bildirim ("yükselt, albümün silinmesin"). Yükselten `small` pakete geçer ve etkinlik kalıcı olur.
3. **İndirmede reklam** — sadece **toplu** indirme (seç-indir / tümünü indir / ZIP) öncesi ödüllü (rewarded) reklam. Tekli indirmede reklam yok. Paid planda hiç reklam yok.

## Kapsam dışı (bilinçli)
- Print-on-demand, white label, HD export ayrımı, yeni "pro" paketi. (Mevcut `small/medium/unlimited` yeterli.)
- **Live wall:** `constants/plans.ts`'te alan olarak var ama UI'ı yok ("dead config"). "Basınca app açılıyor" sorunu net bir ekrana bağlanamadı; ayrı ele alınacak.

## Mimari kararlar

### Plan modeli (`constants/plans.ts`)
İki yeni alan:
- `watermark: boolean` — free: `true`, paid: `false`.
- `retentionDays: number | null` — free: `7`, paid: `null` (kalıcı).

`hdExport` alanına **dokunulmuyor** (kapsam dışı).

### Event modeli (`features/events/services/eventService.ts`)
`create()` ve `updatePlan()` plan limitlerini event'e kopyalıyor; aynı yere eklenir:
- `watermark`, `retentionDays` (plandan).
- `retentionExempt: boolean` — grandfathering bayrağı. `create()` yeni event'lerde `false`. Migration mevcut tüm event'lere `true` basar.

### Filigran
- **Görüntüleme (overlay):** `features/gallery/components/WatermarkOverlay.tsx`. Salt görsel; grid hücresi + lightbox + guest galeri. `event.watermark` true ise gösterilir.
- **İndirme (bake-in):** `react-native-view-shot` ile foto + overlay tek View'de capture edilip kaydedilir. Util `expo-image-manipulator` ile overlay basamadığı için (manipulator compositing desteklemiyor) view-shot seçildi. Free planda tekli + çoklu + tümü indirmede filigran gömülür.
- **ZIP:** Cloud function'da üretiliyor (dosyalar storage'da, client değil). Filigran client tarafında gömüldüğü için **ZIP free'de filigransız kalır** — kabul edilen küçük sızıntı; ZIP yine reklam arkasında. (Cloud-side filigran ayrı/büyük iş, over-engineering olur.)

### Reklam
- Paket: `react-native-google-mobile-ads` (AdMob). Native modül → dev-client/EAS build gerekir; Expo Go'da RevenueCat gibi **graceful degrade** (reklam yoksa indirme yine çalışır).
- `features/ads/adService.ts` — lazy-load + `showRewardedAd(): Promise<boolean>`. Reklam hazır değilse `true` döner (kullanıcıyı engelleme).
- **Test ID ile geliştirilir** (Google resmi test app/unit ID). Prod'a çıkmadan kullanıcı kendi AdMob app ID + unit ID'sini `app.json`'a girer. (Not düşülecek.)
- Gate sadece `event.plan === 'free'` ve bulk indirme akışında.

### Retention (fail-safe — yanlışlıkla silme riski sıfıra yakın)
İki aşamalı, uyarısız silme yok:
- **Aşama 1 — uyarı:** silme zamanına 24s kala → host'a bildirim, `purgeWarnedAt` damgası.
- **Aşama 2 — silme:** ANCAK şu koşulların **hepsi** sağlanırsa: `plan === 'free'` **ve** `retentionExempt !== true` **ve** `purgeWarnedAt` set **ve** şu an ≥ hesaplanan silme zamanı. Silmeden hemen önce event yeniden okunur (host bu arada upgrade etmiş olabilir).
- Silme zamanı = `firstPhotoAt + 7 gün` (dated/undated tüm event'lerde tutarlı). Hiç foto yoksa retention işlemez.
- Silme `functions/lib/purge.js`'teki mevcut `purgeEvent` ile yapılır.
- Tarih mantığı `functions/lib/schedule.js`'te **saf fonksiyon** olarak (test edilebilir), `eventDailyTick` günlük job'dan tetiklenir.

## Dosya değişiklikleri
- `constants/plans.ts` — watermark + retentionDays alanları.
- `features/events/services/eventService.ts` — Event tipi + create + updatePlan.
- `features/gallery/components/WatermarkOverlay.tsx` — yeni (overlay).
- `features/gallery/components/WatermarkBaker.tsx` — yeni (view-shot bake host).
- `features/gallery/downloadPhotos.ts` — bake entegrasyonu.
- `features/ads/adService.ts` — yeni (rewarded ad).
- `app/host/event.tsx` — overlay + bake + ad gate.
- `app/guest/join.tsx` — guest galeri overlay (varsa).
- `functions/lib/schedule.js` — purgeWarn + purge tarih mantığı.
- `functions/index.js` — eventDailyTick retention + bildirim string'leri.
- `functions/scripts/backfill-retention-exempt.js` — yeni (migration).
- `translations/locales/*.ts` — retention/reklam string'leri (tr, en, es, fr, de).
- `app.json` / `package.json` — AdMob plugin + bağımlılık.

## Doğrulama
- `npm run typecheck` + lint temiz.
- `schedule.js` saf fonksiyonlar için unit test (mevcut `tests/functions` yapısı).
- Manuel: free event'te filigran (grid/lightbox/indirilen dosya); bulk indirmede reklam; retention tarih mantığı testle.
- Build alıp cihazda reklam + filigran bake-in doğrulanır (kullanıcı).

## Riskler / notlar
- AdMob gerçek ID'leri app.json'da (iOS App ID `~3140925389`, rewarded `/4749099061`). Android test ID kaldı (Android build yok).
- ZIP free'de filigransız (kabul edildi).
- Retention migration **bir kez** çalıştırılır; mevcut tüm event'leri muaf tutar.

## Açık Yapılacaklar — 1.0.3 (KULLANICI)
- [ ] **App Privacy beyanı** (App Store Connect): AdMob → "Üçüncü taraf reklamcılık" + "Tanımlayıcılar (Device ID)". ⚠️ Atlanırsa 1.0.3 reddedilir (reklam öncesi bu yoktu).
- [ ] **AdMob ödeme profili** tamamla ("Sorunu gider").
- [ ] **App Store Marketing + Support URL → guestcam.store** (1.0.2 onayı sonrası). app-ads.txt doğrulaması bunu bekliyor: AdMob "doğrulayamadık" diyor çünkü App Store'da hâlâ `boz1997.github.io/...`; URL guestcam.store olunca `guestcam.store/app-ads.txt`'i bulur. **1.0.3 binary GEREKMEZ, sadece URL (metadata).**

## Açık Yapılacaklar — 1.0.3 (KOD/DEPLOY)
- [ ] feature/monetization → main merge.
- [ ] `firebase deploy --only functions` (retention job + bildirimler).
- [ ] `node functions/scripts/backfill-retention-exempt.js` (eskileri muaf tut, ilk daily tick öncesi).
- [ ] Yeni EAS build (google-mobile-ads native modülü için).

## Simülatör Testi
- **Expo Go YETMEZ** — `google-mobile-ads` + `view-shot` native; Expo Go'da graceful degrade (reklam + indirme-filigranı görünmez, crash yok; sadece galeri overlay'i çıkar).
- **Doğru yol:** `npx expo run:ios` (dev-client, native derler). Simülatörde kamera yok ama galeri + indirme + filigran + reklam (test) çalışır.
