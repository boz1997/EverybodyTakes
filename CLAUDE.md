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
| Ads | AdMob — rewarded, free-plan toplu indirme (publisher `pub-2047522925796554`) |
| Marketing site | GitHub Pages: `main` branch `/docs` → **guestcam.store** |

---

## 12.1 Deploy & Domain (sık aranıyor — referans)

- **Site + App Store sayfaları:** `docs/` klasörü → GitHub Pages → **https://guestcam.store** (kaynak: `main` branch, `/docs`; CNAME `docs/CNAME` = `guestcam.store`). Yani `docs/<x>` = `guestcam.store/<x>`.
- **app-ads.txt:** `docs/app-ads.txt` → `guestcam.store/app-ads.txt`. AdMob bunu App Store'daki geliştirici domain'inden çeker, o yüzden App Store Connect'teki Marketing/Support/Privacy URL'leri `guestcam.store` üstünden olmalı. Publisher `pub-2047522925796554`.
- **Guest web app** (tarayıcıdan çekim): `web/` (Vite) → ayrı **Vercel** deploy (`web/vercel.json`). `docs/app/` ise landing içine gömülü guest app build'i.
- **Mobil:** Expo/EAS, bundle `com.guestcam.app`.

---

## 12.2 Deploy güvenliği — YÜZLERCE ESKİ KULLANICI VAR (her deploy'dan önce oku)

**`firebase deploy` ne yapar:** Lokal ayarları **canlı** Firebase projesine (`everybodytakes`) anında iter:
- `--only firestore:rules` → canlı Firestore güvenlik kurallarını `firestore.rules` ile **değiştirir**.
- `--only storage` → canlı Storage kurallarını `storage.rules` ile **değiştirir**.
- `--only functions` → `functions/`'daki Cloud Functions'ı **yükler ve aktifleştirir**.

**Neden tehlikeli:** Kurallar ve fonksiyonlar **sunucu tarafında**dır — app binary'sine gömülü değil. Yani deploy, App Store güncellemesinin aksine **eski/yeni TÜM kullanıcıları anında** etkiler (App Store'da hâlâ 1.0.x kullanan yüzlerce kişi dahil). Kötü bir deploy hepsini aynı anda kırar.

**DEMİR KURAL — asla ihlal etme:** Her deploy **geriye dönük uyumlu / SADECE-EKLEME (additive)** olmalı. Eski app install'larının kullandığı hiçbir kural/fonksiyon davranışı değişmez/silinmez. Deploy öncesi kanıtla:
- `git diff main -- firestore.rules storage.rules functions/` → çıktıda **`-` satırı olmamalı** (yalnız `+`). Mevcut bir kuralı/fonksiyonu değiştiriyorsan DUR, önce geriye-uyumu düşün.
- Yeni alanlara gate koyarken eski dokümanları unutma: eski event'lerde alan **yok** → `event.voices == true` gibi kontrol `undefined` → **false** olur (eski event kırılmaz, yeni özellik onlarda kapalı kalır). Bu deseni koru.

**Fonksiyon deploy'unda tuzak:** `--only functions` (isimsiz) **TÜM** fonksiyonları `functions/index.js`'in mevcut hâlinden yeniden deploy eder. Eğer bu branch'in `index.js`'i **canlıdakinden farklıysa** (deploy edilmemiş bir değişiklik ya da branch farkı), blanket deploy canlı bir fonksiyonu **geri alabilir** → eski kullanıcılar zarar görür. Bu yüzden **yeni fonksiyonu tek tek deploy et:** `--only functions:<isim>`. Yeni bir fonksiyonu deploy etmek mevcut hiçbirini etkileyemez.

**Voice notes (bu özellik) — güvenli deploy:** rules + `createVoicesZip` %100 additive (git diff ile doğrulandı, tek `-` yok). Test/yayın için güvenli komut:
```
firebase deploy --only firestore:rules,storage,functions:createVoicesZip
```
(Not: `functions/lib/purge.js`'teki 2 satırlık ses-temizliği `deleteAccountData`'yı ilgilendirir, özellik için ŞART DEĞİL — istersen sonra `--only functions:deleteAccountData` ile, ama önce onun canlı hâliyle aynı olduğundan emin ol.)

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

## ⭐ 2026-06-30 OTURUMU — 1.0.2 build+submit, refund desteği, maliyet analizi — ÖNCE BUNU OKU

### Yapılanlar / öğrenilenler
- **1.0.2 ücretsiz LOKAL build + submit BAŞARILI** (EAS cloud kotası bitince reçete). Detay: kişisel memory `project-ios-local-build`. Komut:
  `cd <repo> && LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 SENTRY_DISABLE_AUTO_UPLOAD=true npx eas build --platform ios --profile production --local --non-interactive` → imzalı `.ipa` repo kökünde `build-<ts>.ipa`. Submit: `npx eas submit --platform ios --path build-<ts>.ipa --profile production --non-interactive`.
  **4 gotcha (hepsi build'i bloke etmişti):** (1) `brew install fastlane cocoapods`; (2) **Apple WWDR G3 ara sertifikası login keychain'de olmalı** — yoksa cert `CSSMERR_TP_NOT_TRUSTED` → "Distribution certificate ... hasn't been imported successfully"; düzeltme: `curl -fsSL https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer -o w.cer && security import w.cer -k ~/Library/Keychains/login.keychain-db` (KURULDU); (3) `--non-interactive` (headless'te Apple-login sorusu stdin'siz patlar); (4) `SENTRY_DISABLE_AUTO_UPLOAD=true` (yoksa Xcode Sentry source-map upload token'sız → ARCHIVE FAILED exit 65; **eas.json'a KOYMA**, sadece lokal komutta).
- **eas.json submit profili:** iOS alanları `ios:` altında olmalı → eklendi `submit.production.ios.ascAppId = "6777402204"` (düz koyma → "ascAppId is not allowed"). EAS'te ASC API key zaten kayıtlı (Key ID `Z9MP4N223B`) → submit Apple 2FA istemez.
- **1.0.2 ASC'de "Add for Review" yapıldı** (review bekliyor). İçerik: otomatik-kapanma kaldırma + QR/Safari "adres geçersiz" fix + tarih-dil fix + **Memory book (notes)**. (App Store app id `6777402204`.)
- **Version skew GÜVENLİ:** web'de notes canlı ama eski 1.0.1 host'lar `event.notes:true` set EDEMEZ (sadece 1.0.2 plana göre yazar — `eventService.ts:185` create, `:441` plan değişimi). Üç katman: kural `notesOpen()` (`firestore.rules:124`) + web buton gate (`web/src/App.tsx:168`) + `notes` alanını sadece 1.0.2 yazar. "Misafir not bırakabiliyorsa host okuyabilir" garantisi koddan → öksüz not imkansız. Cloud Functions notes'a dokunmuyor.
- **Refund (IAP) BİZ YAPAMAYIZ — Apple tekeli** (consumable, event başına; `purchaseService.ts:65`). Müşteri **reportaproblem.apple.com**'dan ister, Apple karar verir. Biz: RevenueCat'te **uid (appUserID)** ile bul, Firestore'da event koduyla planı doğrula, goodwill için **promo kod** ver (`node scripts/seedPromoCodes.mjs [adet]` — Firebase CLI token; tek-kullanımlık, süresiz, seçilen plan bedava). Müşteri lookup: service-account ile `auth.getUserByEmail` → `events where hostId==uid` (reopen.js pattern, salt-okunur).

### Maliyet / Firebase (Blaze) — anlık ölçek 2026-06-30
- 94 event (56 aktif, 34 ücretli, 18 video) · 198 user · 142 guest · 291 foto doc (~0.15GB) · 4 not · 50 promo. **Ücretsiz katmanın küçük bir kısmında → fatura ~$0.** Ani sıçrama riski = abuse veya viral, normal kullanım değil.
- **Lokal Firebase:** emulator kurulu (`firebase.json`: firestore:8080, storage:9199, **UI kapalı**). Göz atmak için `"ui":{"enabled":true}` → `firebase emulators:start` → localhost:4000. ⚠️ Emulator BOŞ/lokal (prod verisi DEĞİL — dev/test içindir). Gerçek veri = Firebase Console veya admin script.
- Service-account anahtarı **veri** erişimi verir, **fatura $ tutarını VERMEZ** (GCP Billing; bu makinede `gcloud` yok).

### 🔧 TODO — Maliyet sertleştirme (3 madde, ERTELENDİ — onayla yapılacak)
1. **Budget alert (ÖNCE, 2dk):** GCP Console → Billing → Budgets & alerts → ~$10/ay → %50/%90/%100 mail. ⚠️ Blaze'de SERT/otomatik-durduran limit YOK; bu sadece UYARIR (fatura sessizce şişemez, saatler içinde haber). Sert kesme = billing'i kapatan Cloud Function ama app'i komple offline eder (gereksiz).
2. **App Check (ana abuse savunması; "AÇIK İŞLER #4" ile aynı):** kurulu DEĞİL — grep doğruladı (sadece Google-SignIn transitive `AppCheckCore` pod'u var, gerçek `initializeAppCheck` YOK). Config public → App Check olmadan biri doğrudan Firestore/Storage/Functions'a vurup fatura şişirebilir. iOS DeviceCheck/AppAttest + web reCAPTCHA. Sıra: önce token gönderen build canlıya, SONRA enforce (yoksa eski build'ler kırılır).
3. **Cloud Functions `maxInstances` cap YOK:** hiçbir yerde `setGlobalOptions`/`maxInstances` yok → v2 default'u yüksek ölçeklenir. `setGlobalOptions({ maxInstances: 10 })` ekle (özellikle `createEventZip` **1GiB/540s** en pahalı; spam'lenirse yüzlerce instance). Küçük kod + `firebase deploy --only functions`.

### Karar: `eventSilenceNudge` 30dk'da bir KALSIN (daily YAPMA)
- `functions/index.js:316` — host'a, event başına **TEK** nudge. Guard: `silenceNudgedAt` veya `guestCount>0` ise atla; sadece >1sa eski + 0 misafir event'e "kodunu paylaş" der, sonra damgalar. **Misafirlere 30dk'da bir bildirim ATMAZ**; maliyet ~2700 okuma/gün (önemsiz, 50K/gün free).
- Daily yapılırsa nudge ~24sa geç gelebilir (akşam etkinliği → ertesi gün = işe yaramaz). Timely olmak şart → 30dk (en fazla saatlik) kalsın.

## ⭐ GÜNCEL DURUM (2026-06-28) — WEB SİTESİ + DOMAIN ACİL DÜZELTME — ÖNCE BUNU OKU

Bu tur tamamen **web tarafı** (`docs/` landing + `web/` misafir app) ve **domain/QR** ile ilgiliydi. App (Expo) koduna dokunulmadı. Hepsi `main`'e push'landı.

### 🔴 EN KRİTİK — `go.guestcam.store` köprüsü (SİLME!)
- **Sorun:** App Store'daki **yüklü** sürüm QR'ı eski `go.guestcam.store/e.html?code=...` üretiyor (o build'de `QR_BASE=go.guestcam.store`'du). Domain apex `guestcam.store`'a taşınınca `go.` **404** vermeye başladı → misafir QR'ı kırık. Müşteri (Janis Kukojs) şikayet etti.
- **Çözüm (app update'siz):** Ayrı bir yönlendirme repo'su açıldı: **`boz1997/go-guestcam-redirect`** (public). İçinde `CNAME`=`go.guestcam.store` + `index.html`/`e.html`/`404.html` → gelen isteği **yol + `?code=` korunarak** `https://guestcam.store`'a JS ile yönlendirir. GitHub Pages açık (main / root), domain `go.guestcam.store`, HTTPS aktif. Doğrulandı: `go.guestcam.store/e.html?code=...` → 200 → apex'e düşüyor, çalışıyor.
- **DOKUNMA:** (1) Bu redirect repo'su **kalıcı** — silersen eski kurulumların QR'ı yine 404 olur (eski install'lar sonsuza dek `go.` kullanır). (2) GoDaddy'de **`go` CNAME → `boz1997.github.io`** kaydı silinmemeli (yönlendirmenin DNS ayağı). (3) Ana repo'nun custom domain'i `guestcam.store` kalmalı.
- Kaynak kodda `constants/links.ts` zaten `QR_BASE='https://guestcam.store'`; yeni app build'leri doğrudan apex'e gider, ama `go.` köprüsü yine de kalmalı.

### Domain / GitHub Pages durumu
- `guestcam.store` (apex) → GitHub Pages, **`boz1997/EverybodyTakes`** repo, **main / `docs`** klasörü. `docs/CNAME`=`guestcam.store`. GoDaddy: apex 4× A (185.199.108–111.153), `www` CNAME→`guestcam.store`, `go` CNAME→`boz1997.github.io`.
- `docs/e.html` = tek-QR köprü sayfası (iPhone'da "uygulamada aç / tarayıcıda devam", Android/masaüstü → web app). `APP_STORE_ID='6777402204'` artık dolu.

### Web sitesi yeniden tasarımı (`docs/` landing — guestcam.store)
- Eskiden landing HTML zengindi ama `docs/style.css` eski/minimaldi → stilsiz görünüyordu. **`docs/style.css` sıfırdan yazıldı** (~720+ satır): sıcak film/kağıt estetiği, mobil app renkleri (paper #EFE7D6, brand #BE6A2E, ink #221D16), Fraunces (serif başlık) + Inter, kağıt grain, telefon mockup, animasyonlar. Legal sayfalar (privacy/terms/support) aynı stylesheet'i paylaşıyor, korundu.
- **Gerçek fotoğraflar** `docs/img/`'e indirildi (Unsplash, self-hosted): hero telefon mockup galerisi, polaroidler, "no preview" kartı. Gradient sahte tile'lar kaldırıldı. **`docs/img/qr.png`** = gerçek taranabilir QR (guestcam.store). Emoji ikonlar → SVG.
- **Logo düzeltmesi:** landing eskiden yanlış mavi `favicon.png`'yi kullanıyordu. Gerçek logolar: **`docs/guestmark.png`** (lens ikonu) ve **`docs/app-icon.png`** (yüksek çöz.), **`docs/guestlogo.png`** (wordmark). Header/footer/CTA/favicon hepsi `guestmark.png`/`app-icon.png`'ye çevrildi.

### 5 dilli landing i18n
- **`docs/i18n.js`** — app ile aynı 5 dil (en/tr/es/fr/de). `data-i18n` anahtarları + sözlük. Otomatik tarayıcı dili + `localStorage('gc_lang')` + `?lang=xx` query (paylaşılabilir/test). Header'da küre ikonlu dil seçici. Tüm landing metni (nav, hero, mockup, marquee, adımlar, özellikler, pricing, FAQ, footer, title/meta) çeviriliyor; fiyatlar sabit.

### Reveal kaldırıldı → "herkesin gözünden"
- **Teyit:** `app/host/create.tsx` 4 adım: kapak+isim, tür+tarih, çekim sayısı, capture mode (disposable / açık galeri). **Reveal-timing (anında/ertesi gün/özel) adımı YOK** — üründen kalkmış (`revealTiming` veride duruyor ama create seçtirmiyor; pratikte hep "instant"). Web app (`web/`) ve `app/guest/join.tsx`'te reveal kodu dormant duruyor (zararsız, dokunulmadı).
- Landing reveal pazarlamasından arındırıldı: disposable bölümü + FAQ "herkesin gözünden / anı yaşamak" temasına çekildi; "Developing… ertesi gün açılır" kartı → "Önizleme yok" kartı; özellik kartı "Açılma zamanı sende" → "Herkesin gözünden". 5 dilde güncellendi.

### Misafir web app (`web/` → build → `docs/app/`)
- Vite + React + Tailwind. `web/tailwind.config.js`'e Fraunces/Inter eklendi, `web/index.html`'e font linki. Giriş (kod) ekranı markalı kart oldu; katılım ekranına **sticky üst bar + LIVE rozeti + avatar'lı isim kartı** eklendi. i18n (tr/en) genişletildi.
- **DEPLOY ŞART:** `web/` kaynağı değişince **`cd web && npm run build`** (vite `outDir=../docs/app`, `base=/app/`) → `docs/app/` yeniden üretilir → commit → push. Yoksa canlı `guestcam.store/app/` eski bundle'da kalır. Bu tur build edilip push'landı.
- Doğrulama yöntemi (bu makinede): preview MCP aracı 5173'e kilitlendiği için kullanılmadı; bunun yerine **headless Chrome screenshot** (`/Applications/Google Chrome.app/.../Google Chrome --headless=new --screenshot=...`) + statik `python3 -m http.server` ile kontrol edildi.

## ⭐ GÜNCEL DURUM (2026-06-18) — ÖNCE BUNU OKU
App **App Store'da yayında** (1.0.0). Şu an **1.0.1** ASC'de "Prepare for Submission" (TestFlight test edildi, temiz). **Her yeni sürümde** sadece `app.json` `version`'ı artır (build number EAS `autoIncrement` ile otomatik). Build+submit tek komut:
`eas build --profile production --platform ios --auto-submit`

### Bu turda eklenen ana sistemler (hepsi main'de; functions + rules deploy'lu)
- **Galeri (hızlandırıldı):** `uploadPhoto` gerçek **~400px thumbnail** üretir (foto'da `thumbnailUrl` + immutable Cache-Control); **`expo-image`** her yerde (cache/downsample/recyclingKey/transition); misafir grid artık **FlatList** (virtualize). Ortak mantık: **`features/gallery/hooks/useEventPhotos.ts`** (realtime + sayfalama) ve **`features/gallery/downloadPhotos.ts`** (paralel indirme). `EventService.subscribeToPhotos(eventId, max, cb)` — `orderBy(createdAt desc)+limit`, `(photos, hasMore)` döner.
- **Bildirimler (`functions/index.js`):** Host → yeni foto, ilk misafir, milestone, kota, **sessizlik nudge (1sa/0 misafir)**, **1-gün-önce**, **etkinlikten 1-gün-sonra özet + otomatik kapatma**. Misafir → **foto-milestone digest** (her foto DEĞİL), **kalan-hak (2)**, **beğeni**, etkinlik-günü/1-gün-önce (local, join'de). Scheduled: `eventSilenceNudge` (30dk), `eventDailyTick` (öğlen, Europe/Istanbul). Misafir push token'ı **join'de** kaydedilir. Verimlilik: digest + `uploadNotify` mute + dedup flag'leri + batch + dile duyarlı.
- **Promo kod:** `promoCodes` koleksiyonu; paywall'da "Promosyon kodun var mı?" → tek-kullanımlık kodla **herhangi paket bedava**. `EventService.redeemPromoCode`; rules get-only / list-yok / false→true. Üret: `node scripts/seedPromoCodes.mjs [adet]` (Firebase CLI token'ı ile REST).
- **Sentry:** crash + JS hata takibi. Org `guestcam` / proje `guestcam-mobile` / **EU (de.sentry.io)**. DSN `_layout.tsx`'te (public), `SENTRY_AUTH_TOKEN` **EAS secret**'ta (source map). `Sentry.wrap(RootLayout)`, **release-only** (`enabled:!__DEV__`). Panel: sentry.io → guestcam-mobile → Issues. Yedek native crash: ASC → TestFlight → Crashes.
- **Markalı QR domaini:** QR/uygulama girişi artık **çıplak apex `guestcam.store`** (GitHub Pages; GoDaddy'de apex 4× A → 185.199.108-111.153, `docs/CNAME`=guestcam.store). `constants/links.ts`: `QR_BASE=https://guestcam.store` (eventUrl), legal **hâlâ github.io** (redirect ile çalışır, ASC'de kayıtlı). Not: önce GoDaddy Website Builder apex'i kilitliyordu; Airo sitesi ayrılınca/propagasyon bitince apex GitHub'a döndü. (Eski `go.` subdomain'i artık kullanılmıyor.) İleride istenirse Universal Links (Team ID + AASA + `associatedDomains`) → QR direkt app açar.
- **Bağımlılık disiplini:** native modül eklerken `npx expo install <paket>` + **ardından `npx expo install --fix`** (sürüm hizası ŞART — `expo-image` eklenince expo core uyumsuzluğu TestFlight'ta **açılış çökmesine** yol açmıştı; `expo` 56.0.12'ye hizalanınca düzeldi). errorLogs okumak için `node scripts/readErrorLogs.mjs`.

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
- `app/guest/`: scan (QR + kod + albümden oku), join (event hub: katıl + galeri + kalan-hak + report/kendi-fotosunu-sil + indir/select/ZIP), camera (foto/video, disposable, kalan-sayaç + bitince "shots used up" ekranı, Live Activity), joined (My events).
- `features/events/services/eventService.ts` — tüm Firestore işlemleri (Event/Photo tipleri, joinEvent, decrementShots, uploadPhoto [+thumbnail], subscribeToPhotos [sayfalama], toggleLike, report, redeemPromoCode, deleteEventDeep, transactional).
- `features/gallery/` — `hooks/useEventPhotos.ts` (realtime + sayfalama), `downloadPhotos.ts` (paralel kaydetme). Galeri ekranları (`join.tsx`, `host/event.tsx`) bunları kullanır, `expo-image` ile render eder.
- `features/auth/services/authService.ts` — anonim, Apple, Google, e-posta+şifre; **linkOrSignIn** (anonim→kalıcı hesap link → veri korunur).
- `features/purchases/purchaseService.ts` — RevenueCat (lazy, crash-safe, `isExpoGo` guard).
- `features/share/templates.tsx` — davet kartı şablonları.
- `constants/plans.ts` — planlar + `PAID_PLANS_ENABLED` + ürün ID'leri + USD fiyatlar.
- `constants/links.ts` — `SITE_BASE` (legal=github.io) + `QR_BASE` (go.guestcam.store) + eventUrl köprüsü.
- `shared/notifications.ts` — push token kaydı + lokal bildirim (lazy). `app/_layout.tsx` — Sentry init + wrap.
- `shared/liveActivity.ts`, `shared/components/*` (Icon, Wordmark, Skeleton, RoleArt, PrimaryButton [opsiyonel `icon` prop]).
- `functions/index.js` — Cloud Functions: push (host+misafir), beğeni, kalan-hak, ZIP + scheduled (sessizlik nudge, günlük tick). `firebase.json` functions+firestore+storage.
- `docs/` — GitHub Pages sitesi (privacy/terms/support/e.html + `app/`=web misafir uygulaması). Canlı: **`https://go.guestcam.store/`** (eski `boz1997.github.io/EverybodyTakes/` buna redirect).

## Tamamlananlar ✅
- Host/guest akışları, etkinlik oluşturma, QR (native kameradan da okunur: `docs/e.html` köprüsü), kod ile katılım, albümden QR okuma.
- Kamera: foto + **video kaydı** (15sn), disposable mod, eğlenceli kalan-sayaç, non-disposable'da preview + galeriden seçim, sessiz arka-plan upload (sıraya alınmış — çakışma yok).
- Galeriler: 2 sütun **album grid** (oran `CELL_RATIO=13/9`), skeleton yükleme, video oynatma (expo-video) + play badge, lightbox sol/sağ ok + "by isim" + sayaç, **çoklu seçim indirme** (Select), Download All (ilerlemeli).
- **UGC moderasyonu** (App Store 1.2): report + flagged gizleme + kendi fotosunu silme, host'ta "Flagged" rozeti, `reports` koleksiyonu + EULA (terms). (Kullanıcı "block" özelliği kaldırıldı.)
- **Hesap silme** (5.1.1), **gizlilik/şartlar/destek** sayfaları + uygulama içi linkler, izin açıklamaları net.
- **Auth:** Anonim + **Apple** (Face ID) + **Google** + **E-posta+şifre**; hepsi anonim hesabı linkliyor (veri korunur). Login zorunlu değil; Ayarlar'dan opsiyonel.
- **Bildirimler (push, Cloud Functions, dile duyarlı):** yeni foto, ilk misafir, kilometre taşları (10/25/50/100/250/500/1000), foto/kişi kotası yaklaşıyor + doldu (upgrade nudge), bildirilen içerik. Hepsi event'in `uploadNotify` toggle'ına bağlı. Bildirime dokununca event/paywall açılıyor.
- **Live Activity** (kilit ekranı: etkinlik adı + kalan çekim) — kod hazır, sadece gerçek cihazda görünür.
- **Marka:** yeni ikon (kamera) + "GuestCam" wordmark (Cam = amber), splash/adaptive krem.
- **Monetizasyon kodu:** RevenueCat entegre (paywall'da satın alma + canlı fiyat + Restore), `PAID_PLANS_ENABLED=true`, ürünler `event_small/medium/unlimited`.

## Planlar / Fiyatlandırma (`constants/plans.ts`)
- **Free:** 10 kişi, 100 foto, video yok.
- **Small** `event_small` **$3.99:** 20 kişi.
- **Medium** `event_medium` **$14.99:** 50 kişi.
- **Unlimited** `event_unlimited` **$29.99:** sınırsız kişi + **video** (video YALNIZCA unlimited; medium dahil diğerlerinde yok).
- Enforce edilen farklar: kişi sayısı, foto limiti, video. `watermark` flag **tamamen silindi**. `hdExport/liveWall` kullanılmayan flag (paywall'da reklam edilmiyor). Upgrade = hedef paketin **tam fiyatı** (proration yok).
- **RevenueCat KURULU:** `appl_wexvGCqkWXzUjDvyCfNQlhPxWtn` → `app.json extra.revenueCatIosKey` (DOLU, boş DEĞİL). Expo Go'da configure atlanır (`purchaseService.ts` `isExpoGo` guard). Ücretli paketler dev/preview/TestFlight/App Store build'inde çalışır; Expo Go'da çalışmaz (normal).

## AÇIK İŞLER / YAPILACAKLAR ⚠️
(RevenueCat, rules deploy, push, Apple/Google giriş, ilk listing → **tamamlandı.** Aşağıdakiler kaldı.)
1. **1.0.1 submit:** ASC'de "What's New" dolduruldu; **Build** bölümünden TestFlight build'i versiyona ekle → Add for Review.
2. **`docs/e.html` `APP_STORE_ID`:** app yayında artık — ASC → App Information'daki numerik Apple ID'yi koy ki iPhone'da app kuruluysa "Open in app" App Store'a düşsün.
3. **Universal Links** (ertelendi): apex'i çek + Apple Team ID + `/.well-known/apple-app-site-association` + `app.json associatedDomains` → QR Safari'ye uğramadan direkt app açar. Şu an `e.html` köprüsü `guestcam://` ile zaten açıyor.
4. **App Check** (en büyük sertleştirme, ertelendi): App Attest entegre + yeni build → SONRA Firestore/Storage'da enforce (yoksa eski build'ler kırılır). Sıra: önce token gönderen build canlıya çıksın.
5. **Apple Small Business Program** (komisyon %15) kaydı — yapılmadıysa.
6. **Ertelenenler:** Android sürümü, e-posta magic-link, telefon doğrulama (yapılmayacak), `hdExport/liveWall` gerçek kod (reklam edilmiyor).

## 🛠️ 2026-06-29 OTURUMU — sertleştirme + bugfix yapıldı (STAGED, commit/push/deploy YOK)
Bu değişiklikler working tree'de duruyor, **henüz commit/deploy edilmedi**. Lokal test altyapısı kuruldu: `npm test` (vitest unit), `npm run test:rules` ve `npm run test:functions` (Firebase emülatörü; Java gerekir — `brew install openjdk`, PATH'e ekle). **65 test geçiyor** (31 unit + 32 rules + 2 functions).
- **Storage rules:** foto/thumb yazımı artık katılımcı (host/joined-guest) şartı; cover açık (event doc'u create anında yok); export client-write kapalı.
- **photoCount:** rules sadece +1 (guest -1 → kota bypass'ı kapandı). NOT: kısmi — katılımcı doğrudan foto dokümanı yaratıp kotayı yine aşabilir; tam çözüm sunucu-otoriter sayaç (Option A, ertelendi).
- **Silme (yeni Cloud Functions `deleteEvent` + `deleteAccountData`, `functions/lib/purge.js`):** Storage objelerini + alt-koleksiyonları da siler (eskiden Firestore cascade yoktu → orphan kalıyordu). Client `eventService.deleteEvent/deleteEventDeep/purgeUserData` kalktı; `features/events/services/eventLifecycle.ts`'e bağlandı. **Deploy şart:** yeni app build'i bu function'ları çağırır — önce `firebase deploy --only functions` yoksa silme/hesap-silme kırılır. Eski canlı build etkilenmez.
- **Galeri regresyonu (`subscribeToPhotos`):** `serverTimestamps:'estimate'` + bellekte createdAt→takenAt fallback sıralama → yeni foto anında üstte (pending timestamp artık limit altına düşüp kaybolmuyor). `shared/utils/photoSort.ts`.
- **Otomatik kapanma TAMAMEN KALDIRILDI (`eventDailyTick`, `functions/lib/schedule.js` `dailyTickPlan`):** Event'ler artık asla otomatik kapanmıyor — host kapatır. Yerine "kapatmak ister misin?" nudge'ı: tarihli event → tarihten **48s sonra**; tarihsiz event → **ilk fotodan 1 hafta sonra** (`firstPhotoAt`, `notifyHostOnPhoto`'da damgalanıyor). Tarih artık **nullable** (`create` seçilmezse `date:null` saklar; tüm tüketiciler zaten null-safe'di). `summary` string'i + close mantığı silindi. **KRİTİK:** `firebase deploy --only functions` tek başına **tüm eski+yeni event'lerin kapanmasını anında durdurur — app update GEREKMEDEN** (close %100 server-side'dı). Yeni dated/dateless ayrımı app build ister ama eski event'ler korunur.
- **errorLogs:** self-cleaning `expireAt` (TTL alanı; **policy'yi console'dan bir kez aç**) + abuse guard (rules: mesaj ≤1000). Pre-auth create açık kaldı.
- **Sentry:** `environment:'production'` eklendi (plugin/source-map zaten doğruydu).
- **Deploy sırası (sen onaylayınca):** `firebase deploy --only functions,firestore:rules,storage` → SONRA yeni app build.

## 🔧 TODO — Büyük dosya refactor'u (ERTELENDİ, DOKUNMA)
> Neden ertelendi: kullanıcıya değeri YOK (sadece CLAUDE.md 200-satır kuralı), runtime doğrulaması olmadan (UI = test edilemez, snapshot yasak) **canlı app'te regresyon riski yüksek** ve planın **tek test edilemeyen** parçası. Simülatörle sıkı elle test edilebilecek bir oturuma bırakıldı. Yapmamak fonksiyonel hiçbir şeyi bozmaz — bu teknik borç, bug değil.

Hedef: `app/guest/join.tsx` (632), `app/host/event.tsx` (519), `app/guest/camera.tsx` (507) → her biri ≤200 satır. Yaparken: dosya dosya, her adımda `tsc` + mümkünse pure test + **simülatörde elle davranış teyidi**.

- **join.tsx:** (a) pure timing helper'ları → `features/gallery/revealTiming.ts` (revealAtMs/isRevealed/reminderAtMs/reminderTodayAtMs) — UNIT TEST EDİLEBİLİR; (b) memoize'lı `PhotoCell` → `features/gallery/components/PhotoCell.tsx` (React.memo + useCallback handler) — bonus: gerçek perf (her seçimde tüm grid render olmasın); (c) `PhotoLightbox` → ayrı component (~110 satır; DİKKAT `useVideoPlayer` viewerIndex'e bağlı, player lifecycle'ı koru); (d) join effect → `useGuestJoin` hook (auth→join→pushToken→scheduled bildirim ZİNCİRİ — sırayı bozma).
- **camera.tsx (EN RİSKLİ):** `uploadInBackground` + `uploadChain` ref'i → `features/camera/useCameraUpload.ts`. DİKKAT: upload serialization (`uploadChain.current.then(...)`) transaction çakışmasını önlüyor — birebir koru. Permission gate + kamera kontrolleri ayrı component. Reanimated shared value'lar + Live Activity cleanup effect'i taşırken zamanlamayı koru.
- **event.tsx:** host galeri grid + lightbox join.tsx ile ORTAK → PhotoCell/PhotoLightbox'ı paylaş (DRY). Settings/plan/end/delete aksiyonları ayrı hook/component.
- **Refactor sırasında temizlenecek ÖLÜ KOD (ayrı, düşük risk):** `endsAt` (eventService.create yazıyor, HİÇBİR yerde okunmuyor → tamamen ölü); `revealTiming` (üründen kalktı, hep 'instant'; veri modeli + join/web'de dormant — alanı eski event'lerde durduğu için dikkatli); `hdExport`/`liveWall` (plans.ts, enforce edilmiyor).

## Build / komutlar
- Simülatör (auth/UI testi yeterli): `npx expo run:ios --simulator "iPhone 16 Pro"` (cihaz takılıysa imza ister).
- Bağımsız/cihaz (standalone, Metro'suz): `eas build --profile preview --platform ios` → QR ile kur.
- Production + TestFlight tek komut: `eas build --profile production --platform ios --auto-submit`. **Her sürümde önce `app.json` `version`'ı artır** (1.0.0 store'da → Apple "already submitted" verir; build number EAS `autoIncrement` ile otomatik).
- Native modül/izin/plugin değişince **yeni build şart** (`npx expo prebuild --clean` + build). JS değişiklikleri hot-reload.
- Fonksiyon deploy: `firebase deploy --only functions`. Rules: `firebase deploy --only firestore:rules,storage` (Blaze aktif).
- Stale/yarım bundle çökmesi olursa Metro'yu temiz başlat: `npx expo start -c`.

### Ücretsiz LOKAL build — EAS cloud kotası bitince (elimizin altında dursun)
Ayrı bir sistem değil: aynı **EAS CLI**, `--local` bayrağıyla **bulut yerine kendi Mac'inde** derler → **cloud build kotası harcamaz** (bedava, sınırsız). Kendi Xcode'unla imzalı `.ipa` üretir, `eas submit` ile App Store Connect/TestFlight'a gider. (1.0.2'yi kota bitince böyle çıkardık.)
- **Build** (repo kökünde imzalı `build-<ts>.ipa` üretir):
  `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 SENTRY_DISABLE_AUTO_UPLOAD=true npx eas build --platform ios --profile production --local --non-interactive`
- **Submit** (TestFlight'a): `npx eas submit --platform ios --path build-<ts>.ipa --profile production --non-interactive`
- **4 gotcha — hepsi build'i bloke etmişti:** (1) `brew install fastlane cocoapods`; (2) **Apple WWDR G3 ara sertifikası** login keychain'de olmalı — yoksa cert `CSSMERR_TP_NOT_TRUSTED` → "Distribution certificate ... imported successfully değil"; kur: `curl -fsSL https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer -o w.cer && security import w.cer -k ~/Library/Keychains/login.keychain-db`; (3) **`--non-interactive`** (headless'te Apple-login sorusu stdin'siz çöker); (4) **`SENTRY_DISABLE_AUTO_UPLOAD=true` sadece local komutta** (yoksa Xcode Sentry source-map upload token'sız → ARCHIVE FAILED exit 65; **`eas.json`'a KOYMA**). Detay: kişisel memory `project-ios-local-build`.

## Gotcha'lar
- Native modüller (apple-auth, crypto, google-signin, purchases, live-activity, video, view-shot) **lazy/try-catch** ile yükleniyor → eski build'de çökmesin diye. Yeni özelliği KULLANMAK için yeni build gerekir.
- Simülatörde: video kaydı, Live Activity, push **çalışmaz** (gerçek cihaz). Apple/Google/e-posta giriş + kart + galeri simülatörde test edilebilir.
- `[CoreMotion]/[AVFCapture]/[CoreHaptics]/[RemoteTextInput]/RCTScrollView focusItemsInRect` logları = simülatör gürültüsü, gerçek hata değil.
- Firestore: `experimentalForceLongPolling: true` (RN için). Transaction çakışmalarına karşı kamera upload'ları sıraya alındı.
- Firebase web API anahtarları public (gizli değil); `.env` + `eas.json env`'de. GitHub bir kez uyardı, sorun değil.

## Çalışma kuralı
Her commit: `npx tsc --noEmit` temiz + `npx expo export --platform ios` derleniyor → sonra commit/push (main). (`npx tsc` bazen yanlış global'e gidiyor; o durumda `node_modules/.bin/tsc --noEmit`.) Native modül eklediysen `npx expo install --fix` çalıştır. Commit mesajı sonunda `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Push'tan önce onay iste.
