# GuestCam — Proje Planı

## Vizyon

Her misafirin fotoğrafçı olduğu, mobil-first sosyal etkinlik kamerası.
BeReal'ın gerçekçiliği + tek kullanımlık kameranın nostaljisi + sosyal galeri deneyimi.

**Hedef pazar:** Düğün, doğum günü, gece kulübü, beach club, yat partisi, festival, kurumsal etkinlik.
**Farklılaşma:** Ultra iyi UX, disposable scarcity psikolojisi, live wall, AI, Türkiye event marketi.

---

## Faz 1 — Foundation (Hafta 1-2)

### 1.1 Proje Setup
- [ ] Expo monorepo init (apps/mobile + apps/web)
- [ ] NativeWind kurulumu
- [ ] Supabase proje oluşturma
- [ ] Expo Router yapısı
- [ ] Zustand + React Query kurulumu
- [ ] Zod + React Hook Form
- [ ] ESLint + Prettier + TypeScript strict mode
- [ ] Path aliases (@features, @shared, @lib)

### 1.2 Supabase Schema
- [ ] `users` tablosu + RLS
- [ ] `events` tablosu + RLS
- [ ] `event_guests` tablosu + RLS
- [ ] `photos` tablosu + RLS
- [ ] Storage bucket: `event-photos`
- [ ] Edge Functions: QR token üretimi
- [ ] Realtime: photos channel

### 1.3 Auth Sistemi
- [ ] Supabase Auth entegrasyonu
- [ ] Magic link flow
- [ ] Apple Sign In (Expo)
- [ ] Google Sign In (Expo)
- [ ] Anonymous guest mode (token-based)
- [ ] Auth zustand store

---

## Faz 2 — Host Deneyimi (Hafta 3-4)

### 2.1 Event Oluşturma
- [ ] Event creation form (React Hook Form + Zod)
  - İsim, tarih, tip, cover photo
  - Misafir limiti, fotoğraf limiti per guest
  - Görünürlük ayarları
  - Reveal timing seçimi
- [ ] Cover photo upload (Supabase Storage)
- [ ] Event service katmanı

### 2.2 QR Sistemi
- [ ] Unique event token üretimi (signed)
- [ ] QR code generation (react-native-qrcode-svg)
- [ ] Kısa URL sistemi (eventcode.io/xyz gibi)
- [ ] Paylaşılabilir deep link
- [ ] Printable asset (masa kartı, poster)
- [ ] WhatsApp/Instagram share

### 2.3 Host Dashboard
- [ ] Event listesi
- [ ] Canlı fotoğraf feed
- [ ] Aktif misafir sayısı
- [ ] Moderasyon (sil, gizle)
- [ ] ZIP download (tüm fotoğraflar)
- [ ] Temel analytics (kaç çekim, kim çekti)

---

## Faz 3 — Guest Deneyimi (Hafta 5-6)

### 3.1 QR Scan & Join
- [ ] expo-camera ile QR scan
- [ ] Deep link ile otomatik yönlendirme
- [ ] Event join screen
  - Cover photo
  - Kalan çekim sayısı
  - Etkinlik geri sayımı
  - "Kameraya Gir" butonu
- [ ] Misafir kimlik doğrulama (anonim nickname veya login)

### 3.2 Kamera Deneyimi
- [ ] expo-camera entegrasyonu
- [ ] Ön/arka kamera geçişi
- [ ] Flash toggle
- [ ] Çekim sayacı (kalan X shot)
- [ ] Client-side image compress (max 1920px, 85%)
- [ ] Upload to Supabase Storage
- [ ] Shot limit enforcement (DB + client)

### 3.3 Disposable Film Mode
- [ ] Preview yok — çekince direkt upload
- [ ] Delete yok
- [ ] Retake yok
- [ ] "Film rulonu" UI metaforu (X / 24 çekim)
- [ ] Blur/noise efekti opsiyonel (authenticity)

### 3.4 Shared Gallery
- [ ] Masonry grid layout
- [ ] Reveal timing logic
  - Instant: hemen görünür
  - After event: etkinlik bitince açılır
  - 24h: 24 saat sonra açılır
- [ ] "Geliştiriliyor..." animasyon (film developing)
- [ ] Fotoğraf büyütme
- [ ] Like/reaction

---

## Faz 4 — Real-time & Polish (Hafta 7-8)

### 4.1 Real-time Feed
- [ ] Supabase Realtime subscription
- [ ] Canlı upload notification (galeri güncellenir)
- [ ] Host dashboard live count
- [ ] New photo toast/indicator

### 4.2 Live Wall (Temel)
- [ ] Web URL ile açılabilen full-screen galeri
- [ ] Auto-refresh / realtime
- [ ] TV/projeksiyon için optimize edilmiş layout
- [ ] QR code overlay

### 4.3 UX Polish
- [ ] Onboarding flow (ilk kez kullanıcı)
- [ ] Loading states (skeleton screens)
- [ ] Haptic feedback (çekim anında)
- [ ] Ses efektleri (retro shutter sound)
- [ ] Empty states
- [ ] Error states

---

## Faz 5 — Monetization & Growth (Hafta 9-10)

### 5.1 Freemium Model
- [ ] Free tier limitleri (1 etkinlik, 100 foto, watermark)
- [ ] Stripe entegrasyonu
- [ ] Subscription planları
  - Starter: 5 etkinlik/ay
  - Pro: Unlimited + HD + custom branding
  - Business: White-label + API + analytics

### 5.2 Viral Mekanikler
- [ ] Etkinlik sonrası recap sayfası
  - "87 farklı perspektiften gecen"
  - Paylaşılabilir link
- [ ] "Powered by GuestCam" watermark (free tier)
- [ ] Guest davet flow (etkinlikten sonra app indir CTA)

---

## Faz 6 — AI & Advanced (Post-MVP)

### 6.1 AI Auto-Categorization
- [ ] OpenAI Vision API entegrasyonu
- [ ] Otomatik tag: dans pisti, tören, yemek, gün batımı, selfie
- [ ] Kategoriye göre filtreli galeri

### 6.2 AI Best Shots
- [ ] En iyi gülümseme tespiti
- [ ] En keskin kareler
- [ ] "Gecenin Top 20 Anısı" özelliği

### 6.3 Event Timeline / Recap
- [ ] Kronolojik film modu
- [ ] TikTok-style recap video
- [ ] Story modu

### 6.4 Print Entegrasyonu
- [ ] QR bağlantılı print station
- [ ] Anlık termal baskı
- [ ] Event photo book üretimi

---

## Teknik Mimari

```
EverybodyTakes/
├── apps/
│   ├── mobile/          # Expo React Native
│   └── web/             # Next.js (Host Dashboard + Live Wall)
├── packages/
│   ├── ui/              # Shared components
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Shared utilities
├── supabase/
│   ├── migrations/      # DB migrations
│   └── functions/       # Edge functions
├── CLAUDE.md
└── PLAN.md
```

---

## Database Schema (Detaylı)

```sql
-- Users
users (
  id uuid PRIMARY KEY,
  name text,
  avatar_url text,
  auth_provider text,
  created_at timestamptz
)

-- Events
events (
  id uuid PRIMARY KEY,
  host_id uuid REFERENCES users,
  title text,
  cover_image_url text,
  event_type text,  -- wedding, birthday, club, yacht, corporate...
  start_date timestamptz,
  end_date timestamptz,
  guest_limit int,
  photo_limit_per_guest int DEFAULT 24,
  visibility text DEFAULT 'private',  -- private, unlisted, public
  reveal_timing text DEFAULT 'instant',  -- instant, after_event, 24h
  disposable_mode boolean DEFAULT true,
  allow_gallery_upload boolean DEFAULT false,
  is_active boolean DEFAULT true,
  short_code text UNIQUE,  -- URL kısa kodu
  created_at timestamptz
)

-- Event Guests
event_guests (
  id uuid PRIMARY KEY,
  event_id uuid REFERENCES events,
  user_id uuid REFERENCES users,
  nickname text,
  shots_remaining int,
  joined_at timestamptz
)

-- Photos
photos (
  id uuid PRIMARY KEY,
  event_id uuid REFERENCES events,
  uploaded_by uuid REFERENCES users,
  image_url text,
  thumbnail_url text,
  taken_at timestamptz,
  is_visible boolean DEFAULT true,
  is_approved boolean DEFAULT true,
  ai_tags jsonb,
  likes_count int DEFAULT 0,
  created_at timestamptz
)

-- Photo Likes
photo_likes (
  photo_id uuid REFERENCES photos,
  user_id uuid REFERENCES users,
  PRIMARY KEY (photo_id, user_id)
)
```

---

## Başlangıç Sırası

**Bugün başlanacak:**
1. Expo monorepo setup
2. Supabase project + schema
3. Auth flow (magic link + anonymous)
4. Event creation (host)
5. QR generation
6. Guest join flow
7. Camera capture
8. Gallery reveal

Her fazı bitirmeden bir sonrakine geçilmez.
Her feature kendi branch'inde geliştirilir.
