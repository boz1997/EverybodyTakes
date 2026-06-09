# GuestCam — Claude Code Kuralları

Bu dosya, projede her zaman uyulması gereken kuralları tanımlar.
Her kod yazılmadan önce ve her PR'dan önce bu dosya okunur.

---

## 1. Genel Felsefe

Bu proje bir **consumer social app**. Dropbox gibi değil, BeReal gibi hissetmeli.
Kod da aynı şekilde: araç gibi değil, yaşayan bir ürün gibi.

**Asla yapılmayacaklar:**
- Over-engineering (3 satırlık şey için 3 dosya açma)
- Premature abstraction (kullanılmayan generic yapılar)
- "ileride lazım olur" diye kod yazmak
- Feature flag, backward-compat shim, unused helper
- Yorum satırı ile ne yaptığını açıklamak — iyi isimlendirilmiş kod açıklar kendini
- Var olmayan edge case için error handling
- God object / God component

---

## 2. SOLID Prensipleri

### S — Single Responsibility
Her dosya, her fonksiyon, her component tek bir şey yapar.
`EventCard` hem veri çekip hem format edip hem render etmez.
Veriyi çeken hook ayrı, formatlayan util ayrı, render eden component ayrı.

### O — Open/Closed
Mevcut kodu değiştirmeden yeni özellik eklenebilmeli.
`if (type === 'wedding')... else if (type === 'club')...` zincirleri yasak.
Bunun yerine config/strategy pattern kullan.

### L — Liskov Substitution
Bir component'in prop'u başka bir türle değiştirildiğinde sistem bozulmamalı.
Base interface'leri sağlam tut.

### I — Interface Segregation
Büyük interface yerine küçük, odaklı tipler.
`Event` tipi 40 field taşımasın. `EventCore`, `EventSettings`, `EventStats` olarak böl.

### D — Dependency Inversion
Component'ler concrete implementasyona değil abstraction'a bağımlı olur.
Firebase client doğrudan component'e import edilmez — service/repository katmanından geçer.

---

## 3. Mimari Katmanlar

```
app/                   → Expo Router sayfaları (sadece routing + composition)
  (auth)/
  (host)/
  (guest)/
  (shared)/

features/              → Her feature kendi klasörüne sahip
  events/
    components/        → Sadece bu feature'a ait UI
    hooks/             → Data fetching, state
    services/          → API çağrıları
    types.ts           → Bu feature'ın tipleri
  camera/
  gallery/
  auth/

shared/
  components/          → Gerçekten global, reusable UI
  hooks/               → Global hooks
  utils/               → Pure fonksiyonlar
  types/               → Global tipler
  constants/

lib/
  firebase.ts          → Client init (Auth/Firestore/Storage), sadece burada
```

**Kural:** `app/` içindeki dosyalar import zinciri başlatmaz. Sadece feature modüllerini compose eder.

---

## 4. Component Kuralları

- Bir component dosyası **200 satırı** geçmemelidir. Geçiyorsa bölünür.
- Props interface'i component dosyasının üstünde, export edilir.
- `any` tipi yasak. `unknown` bile dikkatli kullanılır.
- `useEffect` içinde business logic olmaz — hook'a taşınır.
- Client-only state için Zustand. Server state için React Query / SWR.
- Inline style yasak. Tailwind class veya StyleSheet.

---

## 5. Dosya & İsimlendirme

```
PascalCase   → Component dosyaları (EventCard.tsx)
camelCase    → Hook, util, service dosyaları (useEventCamera.ts)
kebab-case   → Route dosyaları (event-detail.tsx)
UPPER_CASE   → Sabitler (MAX_PHOTOS_PER_GUEST)
```

- Barrel export (`index.ts`) sadece feature root'ta kullanılır.
- Import path'i 3 seviyeden derin olamaz. Gerekirse path alias ekle.

---

## 6. State Yönetimi

**Kural:** State nerede yaşamalı?

| Durum | Çözüm |
|---|---|
| Server verisi (events, photos) | React Query |
| UI state (modal open, tab seç) | useState — local |
| Cross-feature shared state | Zustand store |
| Form state | React Hook Form |
| URL state | Expo Router params |

Global Zustand store'da sadece gerçekten global olan şeyler yaşar:
- `authUser`
- `activeEventId`
- `cameraPermissions`

---

## 7. API / Service Katmanı

Firestore doğrudan component'ten çağrılmaz. Her zaman service fonksiyonu:

```typescript
// YANLIŞ
const snap = await getDoc(doc(db, 'events', eventId))

// DOĞRU
const event = await EventService.getById(eventId)
```

Service fonksiyonları:
- Pure async function olur
- Return type explicit olur
- Error'ı throw etmez — Result pattern döner: `{ data, error }`

---

## 8. Güvenlik

- Gerçek secret'lar `.env`'e yazılmaz (Firebase web key'leri public'tir, onlar serbest)
- Firestore + Storage güvenlik kuralları her koleksiyon için kısıtlayıcı tutulur ve deploy edilir
- Galeri erişimi katılımcıya bağlıdır (guest doc), event id bilmek yetmez
- Join kodları tahmin edilmesi zor 6 haneli koddur (ambiguous karakterler hariç)

---

## 9. Performans

- Image upload'dan önce client-side compress (max 1920px, 85% quality)
- Infinite scroll, flat list — hiçbir zaman tüm fotoğraflar aynı anda yüklenmez
- Camera preview component'i memory'de tutulur (unmount edilmez, hidden olur)
- Real-time subscription sadece aktif event için açık tutulur

---

## 10. Test Stratejisi

- Unit test: util ve service fonksiyonları (pure fonksiyonlar)
- Integration test: kritik user flow (QR scan → join → capture)
- E2E: MVP sonrası
- Component snapshot testi yazılmaz — değişkenler için değer üretmez

---

## 11. Commit & Branch

```
feat/camera-capture-flow
fix/qr-scan-deeplink
chore/supabase-types-update
```

Commit mesajı ne yaptığını değil **neden** yaptığını açıklar.

---

## 12. Bu Projede Kullanılan Stack

| Alan | Teknoloji |
|---|---|
| Mobile | Expo (React Native) |
| Web (Guest, `web/`) | Vite + React + Tailwind |
| Styling | NativeWind (Tailwind for RN) |
| Backend | Firebase (Auth + Firestore + Storage + Cloud Functions) |
| State | Zustand + React Query |
| QR | react-native-qrcode-svg |
| Camera | expo-camera (app) / input-capture (web) |
| Real-time | Firestore onSnapshot |
| Payments | RevenueCat (App Store IAP) |

---

## 13. MVP Scope

MVP'de olmayan şeyler MVP'de yazılmaz:

**MVP'de VAR:**
- Host: event oluştur, QR üret, galeriyi gör, ZIP indir
- Guest: QR tara, isimsiz katıl, fotoğraf çek (limit dahilinde), galeriyi gör
- Real-time upload feed
- Disposable mode (no delete, no preview)
- Reveal timing (instant / after event)

**MVP'de YOK (Phase 2):**
- AI kategorilendirme
- Live wall / projector mode
- Video upload
- Print entegrasyonu
- Sosyal graph / gamification
- White-label

MVP bitmeden Phase 2 kodu yazılmaz.

---

# PROJE DURUMU & YOL HARİTASI (HANDOFF — güncel)

> Bu bölüm yeni bir Claude Code oturumu için özet/devir notudur. Önce bunu oku.

## Ne bu uygulama
**GuestCam** — etkinlik (düğün/parti/doğum günü) için **misafir kamerası**. Host bir etkinlik oluşturur, **QR/6 haneli kod** paylaşır; misafirler hesapsız katılıp ortak galeriye **foto/video** ekler. BeReal/disposable hissi.
- Repo: `boz1997/EverybodyTakes` · local: `/Users/berk/Desktop/GitBerk/EverybodyTakes`
- Bundle: `com.guestcam.app` · Firebase project: `everybodytakes` · EAS projectId: `b3d702ff-7787-4a6b-8b0b-ffb5a1989da7`
- Dil: kod/iletişim Türkçe. Uygulama 5 dilli: **en, tr, es, fr, de** (`translations/locales/*.ts`). Varsayılan EN; seçim AsyncStorage'da.

## Stack
Expo SDK 56 (RN 0.85) · expo-router (typed routes) · Firebase v12 web SDK (Auth/Firestore/Storage) · NativeWind/Tailwind3 · Zustand · React Query · i18next · reanimated v4 · expo-camera, expo-video, expo-image-picker, expo-image-manipulator, expo-notifications, expo-apple-authentication, expo-crypto, @react-native-google-signin/google-signin, react-native-purchases (RevenueCat), react-native-view-shot, expo-sharing, react-native-qrcode-svg, react-native-svg, expo-live-activity (software-mansion).

## Mimari / önemli dosyalar
- `app/index.tsx` welcome (rol seçimi; host = anonim otomatik giriş, login zorunlu DEĞİL); `app/auth.tsx` (Apple/Google/E-posta/anonim); `app/settings.tsx` (dil, yasal, **Hesap: Apple/Google/E-posta giriş + çıkış + hesap silme**).
- `app/host/`: dashboard, create, paywall, qr, event, share.
- `app/guest/`: scan (QR + kod + albümden oku), join (event hub: katıl + galeri + report/block + indir/select), camera (foto/video, disposable, kalan-sayaç, Live Activity), joined (My events).
- `features/events/services/eventService.ts` — tüm Firestore işlemleri (Event/Photo tipleri, joinEvent, decrementShots, uploadPhoto, report, purgeUserData, deleteEventDeep, transactional).
- `features/auth/services/authService.ts` — anonim, Apple, Google, e-posta+şifre; **linkOrSignIn** (anonim→kalıcı hesap link → veri korunur).
- `features/purchases/purchaseService.ts` — RevenueCat (lazy, crash-safe).
- `features/share/templates.tsx` — davet kartı şablonları.
- `constants/plans.ts` — planlar + `PAID_PLANS_ENABLED` + ürün ID'leri + USD fiyatlar.
- `constants/links.ts` — Privacy/Terms/Support URL + eventUrl köprüsü.
- `shared/notifications.ts` — push token kaydı + lokal bildirim (lazy).
- `shared/liveActivity.ts`, `shared/components/*` (Icon, Wordmark, Skeleton, RoleArt).
- `functions/index.js` — Cloud Functions (push). `firebase.json` functions+firestore+storage.
- `docs/` — GitHub Pages sitesi (privacy/terms/support/e.html). Canlı: `https://boz1997.github.io/EverybodyTakes/`.

## Tamamlananlar ✅
- Host/guest akışları, etkinlik oluşturma, QR (native kameradan da okunur: `docs/e.html` köprüsü), kod ile katılım, albümden QR okuma.
- Kamera: foto + **video kaydı** (15sn), disposable mod, eğlenceli kalan-sayaç, non-disposable'da preview + galeriden seçim, sessiz arka-plan upload (sıraya alınmış — çakışma yok).
- Galeriler: 2 sütun **album grid** (oran `CELL_RATIO=13/9`), skeleton yükleme, video oynatma (expo-video) + play badge, lightbox sol/sağ ok + "by isim" + sayaç, **çoklu seçim indirme** (Select), Download All (ilerlemeli).
- **UGC moderasyonu** (App Store 1.2): report + block, flagged gizleme, host'ta "Flagged" rozeti, `reports` koleksiyonu + EULA (terms).
- **Hesap silme** (5.1.1), **gizlilik/şartlar/destek** sayfaları + uygulama içi linkler, izin açıklamaları net.
- **Auth:** Anonim + **Apple** (Face ID) + **Google** + **E-posta+şifre**; hepsi anonim hesabı linkliyor (veri korunur). Login zorunlu değil; Ayarlar'dan opsiyonel.
- **Bildirimler (push, Cloud Functions, dile duyarlı):** yeni foto, ilk misafir, kilometre taşları (10/25/50/100/250/500/1000), foto/kişi kotası yaklaşıyor + doldu (upgrade nudge), bildirilen içerik. Hepsi event'in `uploadNotify` toggle'ına bağlı. Bildirime dokununca event/paywall açılıyor.
- **Live Activity** (kilit ekranı: etkinlik adı + kalan çekim) — kod hazır, sadece gerçek cihazda görünür.
- **Marka:** yeni ikon (kamera) + "GuestCam" wordmark (Cam = amber), splash/adaptive krem.
- **Monetizasyon kodu:** RevenueCat entegre (paywall'da satın alma + canlı fiyat + Restore), `PAID_PLANS_ENABLED=true`, ürünler `event_small/medium/unlimited`.

## Fiyatlandırma (POV'un altında)
- Free: 15 kişi, 100 foto, video yok, filigranlı(görsel uygulanmıyor).
- Small `event_small` **$3.99**: 30 kişi.
- Medium `event_medium` **$14.99**: 100 kişi + video.
- Unlimited `event_unlimited` **$29.99**: sınırsız kişi + video.
- Gerçekten **enforce edilen** farklar: kişi sayısı, foto limiti, video. (watermark/HD/liveWall sadece flag — kodlanmadı, paywall'da reklam edilmiyor.)
- Upgrade = hedef paketin **tam fiyatı** (fark/proration yok; basit tutuldu).

## EKSİKLER / YAPILACAKLAR ⚠️
1. **RevenueCat bitir:** App Store Connect'te 3 IAP ürünü "Ready to Submit" (fiyat+localization+review screenshot). RevenueCat'e App Store app + In-App Purchase key (.p8/KeyID/Issuer) + shared secret + ürünler. Sonra **iOS public key `appl_...`** → `app.json` `extra.revenueCatIosKey`'e koy (şu an boş → ücretli paket "satın alma kullanılamıyor" der, free çalışır).
2. **Firebase güvenlik kurallarını DEPLOY et** (kritik — hâlâ test modunda olabilir): `firebase deploy --only firestore:rules,storage`. (`functions` zaten deploy'lu; değişince tekrar deploy.)
3. **Cloud Functions push'u** gerçek cihazda doğrula (host izin verince token `users/{uid}.pushToken`).
4. **Google sign-in:** app.json'da iOS client id + iosUrlScheme ekli; Firebase'de Google sağlayıcı açık. Gerçek cihaz/sim build'de test.
5. **App Store Connect listing:** screenshots (1290×2796 veya 1284×2778), description/keywords (CLAUDE'a metinler verildi), App Privacy nutrition labels, age rating (UGC→17+), build yükle, IAP'leri submit'e ekle.
6. **Apple Small Business Program** kaydı (komisyon %15).
7. **Ertelenenler:** filigran/HD-export/live-wall gerçek kodu, e-posta magic-link (deep link), Android sürümü, zamanlı host hatırlatmaları (Cloud Scheduler), telefon doğrulama (gereksiz/masraflı — yapılmayacak).

## Build / komutlar
- Simülatör (auth/UI testi yeterli): `npx expo run:ios --simulator "iPhone 16 Pro"` (cihaz takılıysa imza ister).
- Bağımsız/cihaz (standalone, Metro'suz): `eas build --profile preview --platform ios` → QR ile kur.
- Production: `eas build --profile production --platform ios` → `eas submit`.
- Native modül/izin/plugin değişince **yeni build şart** (`npx expo prebuild --clean` + build). JS değişiklikleri hot-reload.
- Fonksiyon deploy: `firebase deploy --only functions` (Blaze planı aktif).

## Gotcha'lar
- Native modüller (apple-auth, crypto, google-signin, purchases, live-activity, video, view-shot) **lazy/try-catch** ile yükleniyor → eski build'de çökmesin diye. Yeni özelliği KULLANMAK için yeni build gerekir.
- Simülatörde: video kaydı, Live Activity, push **çalışmaz** (gerçek cihaz). Apple/Google/e-posta giriş + kart + galeri simülatörde test edilebilir.
- `[CoreMotion]/[AVFCapture]/[CoreHaptics]/[RemoteTextInput]/RCTScrollView focusItemsInRect` logları = simülatör gürültüsü, gerçek hata değil.
- Firestore: `experimentalForceLongPolling: true` (RN için). Transaction çakışmalarına karşı kamera upload'ları sıraya alındı.
- Firebase web API anahtarları public (gizli değil); `.env` + `eas.json env`'de. GitHub bir kez uyardı, sorun değil.

## Çalışma kuralı
Her commit: `npx tsc --noEmit` temiz + `npx expo export --platform ios` derleniyor → sonra commit/push (main). Commit mesajı sonunda `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
