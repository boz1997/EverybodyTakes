# RESUBMISSION 2 (build 6) — reply to Apple's June 12 rejection

## Reply message (Resolution Center) — paste after uploading build 6
```
Hello, thank you for the follow-up review. We've addressed each item:

Guideline 5.1.1(v) — Account deletion:
Account deletion already exists in the app (Settings → "Delete account & data": it deletes the auth account, hosted events, uploaded photos and local data). It was previously hidden for brand-new users who had no account or data yet — which is why it may not have been visible during review. It is now always visible in Settings for every user. A screen recording of the full flow (sign in → Settings → Delete account & data → confirmation → deletion) is attached.

Guideline 2.3.3 — Screenshots:
We replaced the 6.5-inch screenshots with captures of the actual app UI (host dashboard, event QR screen, guest camera, shared gallery).

Guideline 2.1(b) — In-App Purchase:
The products are one-time consumables (not subscriptions). Purchases complete successfully in the sandbox — a screen recording of a full sandbox purchase (product sheet → success → event QR screen) is attached. We also hardened product loading in this build: the error you saw was our generic alert shown when the product list was momentarily empty in the sandbox; the app now retries the fetch and the alert includes the underlying StoreKit reason.

Guideline 2.1(a) — Demo QR:
A demo QR code image is attached in App Review Information, and the demo event code 3NSCNM (Guest → "Enter code") opens a pre-populated gallery.

Thank you!
```

## App Review Information — Attachment alanına yüklenecekler
- [ ] Hesap silme akışı ekran kaydı (gerçek cihaz: giriş → Settings → Delete account & data → onay → silindi)
- [ ] Sandbox satın alma ekran kaydı (paywall → sandbox sheet → "Satın alma başarılı" → QR ekranı)
- [ ] Demo QR görseli (3NSCNM share kartı)

---

# RESUBMISSION 1 (build 5) — reply to Apple's June 11 rejection

## Reply message to paste in App Store Connect (Resolution Center)
```
Hello, thank you for the detailed review. We've addressed every item in this build:

Guideline 5.1.1(iv) — Camera permission:
The app now requests camera access through the standard iOS system prompt as soon as the camera/scan screen opens. We no longer point users to Settings before iOS has asked. An "Open Settings" option appears only if access was previously denied. Guests can also join with the 6-digit code without granting the camera.

Guideline 2.1(b) — In-App Purchase:
We fixed a navigation defect where, after a successful purchase on iPad, two stacked modal screens could remain presented and hide the new event's QR screen — which made it look like the event was not created. The event is now created and the QR screen is shown reliably after purchase. The IAP products are consumables tested in the sandbox, and the Paid Applications Agreement is active.

Guideline 2.1(a) — Sign in with Apple:
We fixed a bug in the account-linking flow that could surface an error when an Apple ID already had an account (for example after a reinstall). Sign in with Apple has been tested on device.

Guideline 2.1(a) — Access / demo content:
Sign-in is NOT required — the app is fully usable anonymously. To verify a populated gallery immediately: tap Guest → Enter code → 6Y2UAR. To verify hosting: tap Host → create an event (the free plan needs no purchase) → you receive a QR/6-digit code; join it as a guest (another device or the code) to add photos. A demo event with pre-populated photos is available with the code above.

Thank you!
```
> 6Y2UAR = create a "GuestCam Demo" event on device with a FAR-FUTURE date (so it never auto-ends), join as guest, upload ~6 photos, then put its 6-digit code here.

## Updated App Review Information → Notes (replace the old notes)
```
Sign-in is NOT required. GuestCam is fully usable anonymously.

Pre-populated demo: Guest → "Enter code" → 6Y2UAR  (a gallery with photos, likes, report/delete).

Host flow (no purchase needed): Host → create an event → continue to the plan step → choose the free "Starter" plan → you get a QR + 6-digit code. Switch to Guest, enter that code, and capture photos.

Camera: the system permission prompt appears automatically; if you deny it you can still join and browse via the code.

In-App Purchases (event_small / event_medium / event_unlimited) are one-time consumables that raise guest/photo limits and unlock video. They are optional.

Optional sign-in (Apple / Google / email) is in Settings and is used so a host can recover their events after reinstalling.

Contact: ozdorukberk@gmail.com
```

---

# App Store Connect — GuestCam 1.0 Listing

Bu dosya, App Store Connect "1.0 Prepare for Submission" sayfasına girilecek tüm metinleri içerir.
Build göndermeden önce buradaki alanları ilgili dillerde yapıştır.

App name (App Information): **GuestCam: Event Photos**
Bundle ID: `com.guestcam.app`

---

## Diller arası ORTAK alanlar (tek sefer)

- **Support URL:** https://boz1997.github.io/EverybodyTakes/support.html
- **Marketing URL:** https://boz1997.github.io/EverybodyTakes/
- **Privacy Policy URL** (App Privacy / App Information): https://boz1997.github.io/EverybodyTakes/privacy.html
- **Copyright:** 2026 Berk Özdoruk
- **Primary Category:** Photo & Video · **Secondary:** Lifestyle (öneri)
- **Age Rating:** 17+ (kullanıcı üretimi içerik / UGC nedeniyle)

### App Review Information
- **Sign-In required:** **KAPALI** (uygulama anonim çalışır, hesap gerekmez)
- **Contact:** Berk Özdoruk · ozdorukberk@gmail.com · [TELEFON GİR]
- **Notes:**
```
Sign-in is NOT required. GuestCam works fully anonymously.

How to test the core flow on a single device:
1. Welcome screen → choose "Host". You're signed in anonymously, no credentials needed.
2. Create an event (any name), continue to the QR step. On the free plan you get a QR and a 6-digit join code.
3. Open the event and note the 6-digit code.
4. Go back → choose "Guest" → "Enter code" → type the 6-digit code to join the same event.
5. As a guest, take a photo. It uploads to the shared gallery in real time; open the gallery to view/download.

In-App Purchases (event_small / event_medium / event_unlimited) are one-time, per-event consumables that raise the guest/photo limits and unlock video. They are optional — the free tier is fully functional.

User-generated content: guests can Report or Block photos from the gallery; hosts see flagged content marked. An EULA is included in Terms.

Optional sign-in (Apple / Google / email) is available in Settings but never required.

Contact: ozdorukberk@gmail.com
```

---

## English (Primary)

**Subtitle (≤30):** Shared event camera & album

**Promotional Text (≤170):**
Turn your guests into the photographers. Share a QR code and every photo lands in one live shared gallery — no app sign-up needed.

**Keywords (≤100):**
wedding,party,event camera,shared album,guest photos,QR,disposable,gallery,birthday,reunion,video

**Description (≤4000):**
GuestCam turns every guest into your event photographer.

Create an event in seconds, share a QR code or 6-digit code, and watch the photos roll in. Your guests join instantly — no account, no friction — and capture the moments you'd otherwise miss. Every shot lands in one shared gallery, in real time.

Perfect for weddings, birthdays, parties, reunions, and any moment worth remembering together.

HOW IT WORKS
• Host: create your event, set the vibe, and share the QR or code
• Guests: scan, join, and shoot — no sign-up required
• Everyone: browse the live shared gallery and download favorites

FEATURES
• Instant join via QR or 6-digit code
• One shared gallery, updated live as guests upload
• Disposable mode — capture in the moment, no endless retakes
• Photos and videos in one place (video on paid plans)
• Download a single shot or the whole album
• Optional sign-in with Apple, Google, or email — keep your events across devices
• Available in English, Turkish, Spanish, French, and German

PLANS
Start free with every event. Upgrade per event when you need more guests, unlimited photos, or video:
• Free — up to 15 guests, 100 photos
• Small ($3.99) — up to 30 guests, unlimited photos
• Medium ($14.99) — up to 100 guests, unlimited photos + video
• Unlimited ($29.99) — unlimited guests, unlimited photos + video

Your guests keep the camera. You keep the memories.

---

## Türkçe

**Subtitle (≤30):** Etkinlik kamerası ve albüm

**Promotional Text (≤170):**
Misafirleriniz fotoğrafçınız olsun. QR kodu paylaşın, çekilen her fotoğraf anında ortak galeride toplansın — üyelik gerekmez.

**Keywords (≤100):**
düğün,parti,etkinlik,kamera,fotoğraf,misafir,QR,ortak albüm,galeri,doğum günü,video,davet

**Description (≤4000):**
GuestCam, her misafiri etkinliğinizin fotoğrafçısına dönüştürür.

Saniyeler içinde bir etkinlik oluşturun, QR kodunu veya 6 haneli kodu paylaşın ve fotoğrafların akışını izleyin. Misafirleriniz anında katılır — hesap yok, uğraş yok — ve sizin kaçıracağınız anları yakalar. Her kare, gerçek zamanlı olarak tek bir ortak galeride toplanır.

Düğünler, doğum günleri, partiler, buluşmalar ve birlikte hatırlamaya değer her an için ideal.

NASIL ÇALIŞIR
• Host: etkinliğini oluştur, havasını ayarla, QR veya kodu paylaş
• Misafirler: tara, katıl, çek — üyelik gerekmez
• Herkes: canlı ortak galeriyi gez, beğendiklerini indir

ÖZELLİKLER
• QR veya 6 haneli kod ile anında katılım
• Misafirler yükledikçe canlı güncellenen tek ortak galeri
• Disposable mod — anında çek, sonsuz tekrar yok
• Fotoğraf ve videolar tek yerde (video ücretli paketlerde)
• Tek bir kareyi veya tüm albümü indir
• Apple, Google veya e-posta ile opsiyonel giriş — etkinliklerin cihazlar arası kalsın
• İngilizce, Türkçe, İspanyolca, Fransızca ve Almanca

PAKETLER
Her etkinliğe ücretsiz başla. Daha fazla misafir, sınırsız fotoğraf veya video gerekince etkinlik başına yükselt:
• Ücretsiz — 15 misafire kadar, 100 fotoğraf
• Small ($3.99) — 30 misafire kadar, sınırsız fotoğraf
• Medium ($14.99) — 100 misafire kadar, sınırsız fotoğraf + video
• Unlimited ($29.99) — sınırsız misafir, sınırsız fotoğraf + video

Kamera misafirlerde kalır. Anılar sizde.

---

## Español

**Subtitle (≤30):** Cámara y álbum del evento

**Promotional Text (≤170):**
Convierte a tus invitados en fotógrafos. Comparte un código QR y cada foto llega a una galería compartida en vivo — sin registro.

**Keywords (≤100):**
boda,fiesta,cámara,evento,foto,invitados,QR,álbum compartido,galería,cumpleaños,vídeo,reunión

**Description (≤4000):**
GuestCam convierte a cada invitado en el fotógrafo de tu evento.

Crea un evento en segundos, comparte un código QR o un código de 6 dígitos y mira cómo llegan las fotos. Tus invitados se unen al instante — sin cuenta, sin complicaciones — y capturan los momentos que tú te perderías. Cada foto llega a una sola galería compartida, en tiempo real.

Perfecto para bodas, cumpleaños, fiestas, reuniones y cualquier momento que valga la pena recordar juntos.

CÓMO FUNCIONA
• Anfitrión: crea tu evento y comparte el QR o el código
• Invitados: escanea, únete y dispara — sin registro
• Todos: explora la galería compartida en vivo y descarga tus favoritas

FUNCIONES
• Unión instantánea por QR o código de 6 dígitos
• Una galería compartida que se actualiza en vivo
• Modo desechable — captura el momento, sin repeticiones
• Fotos y vídeos en un solo lugar (vídeo en planes de pago)
• Descarga una foto o todo el álbum
• Inicio de sesión opcional con Apple, Google o correo
• Disponible en inglés, turco, español, francés y alemán

PLANES
Empieza gratis en cada evento. Mejora por evento cuando necesites más:
• Gratis — hasta 15 invitados, 100 fotos
• Small ($3.99) — hasta 30 invitados, fotos ilimitadas
• Medium ($14.99) — hasta 100 invitados, fotos ilimitadas + vídeo
• Unlimited ($29.99) — invitados ilimitados, fotos ilimitadas + vídeo

La cámara se queda con tus invitados. Los recuerdos contigo.

---

## Français

**Subtitle (≤30):** Caméra et album d'événement

**Promotional Text (≤170):**
Transformez vos invités en photographes. Partagez un QR code et chaque photo arrive dans une galerie partagée en direct — sans inscription.

**Keywords (≤100):**
mariage,fête,caméra,événement,photo,invités,QR,album partagé,galerie,anniversaire,vidéo

**Description (≤4000):**
GuestCam transforme chaque invité en photographe de votre événement.

Créez un événement en quelques secondes, partagez un QR code ou un code à 6 chiffres et regardez les photos affluer. Vos invités rejoignent l'événement instantanément — sans compte, sans friction — et capturent les moments que vous manqueriez. Chaque photo arrive dans une seule galerie partagée, en temps réel.

Parfait pour les mariages, anniversaires, fêtes, retrouvailles et tout moment à se souvenir ensemble.

COMMENT ÇA MARCHE
• Hôte : créez votre événement et partagez le QR ou le code
• Invités : scannez, rejoignez et photographiez — sans inscription
• Tous : parcourez la galerie partagée en direct et téléchargez vos favoris

FONCTIONNALITÉS
• Accès instantané par QR ou code à 6 chiffres
• Une galerie partagée mise à jour en direct
• Mode jetable — capturez l'instant, sans reprises
• Photos et vidéos au même endroit (vidéo dans les forfaits payants)
• Téléchargez une photo ou tout l'album
• Connexion facultative avec Apple, Google ou e-mail
• Disponible en anglais, turc, espagnol, français et allemand

FORFAITS
Commencez gratuitement à chaque événement. Améliorez par événement selon vos besoins :
• Gratuit — jusqu'à 15 invités, 100 photos
• Small (3,99 $) — jusqu'à 30 invités, photos illimitées
• Medium (14,99 $) — jusqu'à 100 invités, photos illimitées + vidéo
• Unlimited (29,99 $) — invités illimités, photos illimitées + vidéo

La caméra reste à vos invités. Les souvenirs restent à vous.

---

## Deutsch

**Subtitle (≤30):** Event-Kamera & Album

**Promotional Text (≤170):**
Mach deine Gäste zu Fotografen. Teile einen QR-Code und jedes Foto landet in einer gemeinsamen Live-Galerie — ohne Anmeldung.

**Keywords (≤100):**
Hochzeit,Party,Kamera,Event,Foto,Gäste,QR,geteiltes Album,Galerie,Geburtstag,Video,Treffen

**Description (≤4000):**
GuestCam macht jeden Gast zum Fotografen deines Events.

Erstelle in Sekunden ein Event, teile einen QR-Code oder einen 6-stelligen Code und sieh zu, wie die Fotos eintreffen. Deine Gäste treten sofort bei — kein Konto, kein Aufwand — und halten die Momente fest, die du sonst verpassen würdest. Jedes Foto landet in einer gemeinsamen Galerie, in Echtzeit.

Perfekt für Hochzeiten, Geburtstage, Partys, Wiedersehen und jeden Moment, den man gemeinsam festhalten möchte.

SO FUNKTIONIERT'S
• Gastgeber: Event erstellen und QR oder Code teilen
• Gäste: scannen, beitreten und fotografieren — ohne Anmeldung
• Alle: die gemeinsame Live-Galerie durchstöbern und Favoriten herunterladen

FUNKTIONEN
• Sofortiger Beitritt per QR oder 6-stelligem Code
• Eine gemeinsame Galerie, live aktualisiert
• Einweg-Modus — den Moment festhalten, ohne Wiederholungen
• Fotos und Videos an einem Ort (Video in den Bezahltarifen)
• Einzelne Fotos oder das ganze Album herunterladen
• Optionale Anmeldung mit Apple, Google oder E-Mail
• Verfügbar auf Englisch, Türkisch, Spanisch, Französisch und Deutsch

TARIFE
Starte bei jedem Event kostenlos. Upgrade pro Event bei Bedarf:
• Kostenlos — bis zu 15 Gäste, 100 Fotos
• Small (3,99 $) — bis zu 30 Gäste, unbegrenzte Fotos
• Medium (14,99 $) — bis zu 100 Gäste, unbegrenzte Fotos + Video
• Unlimited (29,99 $) — unbegrenzte Gäste, unbegrenzte Fotos + Video

Die Kamera bleibt bei deinen Gästen. Die Erinnerungen bei dir.

---

## In-App Purchase — ürün metinleri & Review Notes

Plan etiketleri uygulamada: **Starter (free) / Small / Medium / Unlimited**.

| Product ID | Tier | Display Name | Description |
|---|---|---|---|
| `event_small` | $3.99 | Small Event | Up to 30 guests with unlimited photos for one event. |
| `event_medium` | $14.99 | Medium Event | Up to 100 guests with unlimited photos and video for one event. |
| `event_unlimited` | $29.99 | Unlimited Event | Unlimited guests with unlimited photos and video for one event. |

### event_small — Review Notes
```
One-time consumable (non-renewing), purchased per event by the event host.

What it unlocks: raises this event's limit to 30 guests with unlimited photos.

How to reach the purchase:
1. Open the app, choose "Host" on the welcome screen (anonymous, no sign-in needed).
2. Create an event (any name) and continue through the steps.
3. At the plan step you will see Starter (free) / Small / Medium / Unlimited.
4. Select "Small" to trigger this in-app purchase.

The free tier is fully functional without any purchase. Pricing is read live from the App Store.
```

### event_medium — Review Notes
```
One-time consumable (non-renewing), purchased per event by the event host.

What it unlocks: raises this event's limit to 100 guests with unlimited photos, and enables video capture.

How to reach the purchase:
1. Open the app, choose "Host" on the welcome screen (anonymous, no sign-in needed).
2. Create an event (any name) and continue through the steps.
3. At the plan step you will see Starter (free) / Small / Medium / Unlimited.
4. Select "Medium" to trigger this in-app purchase.

The free tier is fully functional without any purchase. Pricing is read live from the App Store.
```

### event_unlimited — Review Notes
```
One-time consumable (non-renewing), purchased per event by the event host.

What it unlocks: removes the guest limit (unlimited guests) with unlimited photos, and enables video capture.

How to reach the purchase:
1. Open the app, choose "Host" on the welcome screen (anonymous, no sign-in needed).
2. Create an event (any name) and continue through the steps.
3. At the plan step you will see Starter (free) / Small / Medium / Unlimited.
4. Select "Unlimited" to trigger this in-app purchase.

The free tier is fully functional without any purchase. Pricing is read live from the App Store.
```

---

## Metinle DOLDURULAMAYAN, elle yapılacaklar (build öncesi/sonrası)

- [ ] **Screenshots** — 6.5" zorunlu (min 3, en fazla 10). 6.9"/iPhone 16 Pro Max boyutu da ekle. Şu an 5/10 var.
- [ ] **Build** — `eas build --profile production` → `eas submit`; sonra bu version'a "Build" olarak seç.
- [ ] **In-App Purchases** — event_small/medium/unlimited "Ready to Submit" yap (fiyat + localization + review screenshot) ve bu version'a ekle (ilk IAP build ile birlikte review'a gider).
- [ ] **App Privacy** (nutrition labels) — toplanan veri: Identifiers (user ID), User Content (fotoğraf/video), Usage Data, Diagnostics. Push token → Identifiers. Tracking yok.
- [ ] **Age Rating** — anketi doldur, UGC nedeniyle 17+ çıkacak.
- [ ] **Export Compliance** — `ITSAppUsesNonExemptEncryption=false` zaten ayarlı; ek belge gerekmez.
- [ ] **App Privacy / Data Use** — "Data Not Linked to You" vs "Linked": hesap açan kullanıcılar için içerik Linked sayılır.
</content>
</invoke>
