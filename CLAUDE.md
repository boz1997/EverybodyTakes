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
Supabase client doğrudan component'e import edilmez — service/repository katmanından geçer.

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
  supabase.ts          → Client init, sadece burada
  storage.ts           → R2/S3 abstraction
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

Supabase doğrudan component'ten çağrılmaz. Her zaman service fonksiyonu:

```typescript
// YANLIŞ
const { data } = await supabase.from('events').select('*')

// DOĞRU
const event = await EventService.getById(eventId)
```

Service fonksiyonları:
- Pure async function olur
- Return type explicit olur
- Error'ı throw etmez — Result pattern döner: `{ data, error }`

---

## 8. Güvenlik

- `.env` dosyasına secret yazılmaz — Expo secret store veya server-side
- RLS (Row Level Security) Supabase'de her tablo için aktif
- Guest token'ları signed JWT olur, plain ID geçilmez
- QR code içindeki URL'ler token tabanlı olur, tahmin edilemez

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
| Web (Host Dashboard) | Next.js |
| Styling | NativeWind (Tailwind for RN) |
| Backend | Supabase (auth + db + realtime + storage) |
| Storage | Supabase Storage (MVP) → Cloudflare R2 (scale) |
| State | Zustand + React Query |
| Forms | React Hook Form + Zod |
| QR | react-native-qrcode-svg |
| Camera | expo-camera |
| Real-time | Supabase Realtime |
| AI (Phase 2) | OpenAI Vision API |

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
