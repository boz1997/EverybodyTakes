const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000];
const PHOTO_WARN_AT = [10, 3];   // photos remaining before the cap
const GUEST_WARN_AT = [2];       // guest spots remaining before the cap

// Localized push copy. Falls back to English for unknown languages.
const STR = {
  en: {
    newPhoto: (w, v) => `${w} added a ${v ? 'video' : 'photo'} 📸`,
    firstGuest: 'Your first guest just joined 🎉',
    milestone: (n) => `${n} photos and counting! 🎉`,
    photoLow: (r) => `Only ${r} photos left — tap to upgrade and remove the limit.`,
    photoFull: 'Photo limit reached. Tap to upgrade and keep collecting.',
    guestLow: (r) => `Only ${r} guest ${r === 1 ? 'spot' : 'spots'} left — tap to upgrade.`,
    guestFull: 'Your event is full. Tap to upgrade and invite more guests.',
    reported: 'A photo was reported. Tap to review it.',
  },
  tr: {
    newPhoto: (w, v) => `${w} bir ${v ? 'video' : 'fotoğraf'} ekledi 📸`,
    firstGuest: 'İlk misafirin katıldı 🎉',
    milestone: (n) => `${n} fotoğraf oldu! 🎉`,
    photoLow: (r) => `Sadece ${r} fotoğraf kaldı — yükseltmek için dokun.`,
    photoFull: 'Foto limiti doldu. Yükseltmek için dokun, toplamaya devam et.',
    guestLow: (r) => `Sadece ${r} kişilik yer kaldı — yükseltmek için dokun.`,
    guestFull: 'Etkinliğin doldu. Daha fazla misafir için yükselt.',
    reported: 'Bir fotoğraf bildirildi. İncelemek için dokun.',
  },
  es: {
    newPhoto: (w, v) => `${w} añadió ${v ? 'un vídeo' : 'una foto'} 📸`,
    firstGuest: '¡Tu primer invitado acaba de unirse! 🎉',
    milestone: (n) => `¡${n} fotos y subiendo! 🎉`,
    photoLow: (r) => `Solo quedan ${r} fotos — toca para mejorar y quitar el límite.`,
    photoFull: 'Límite de fotos alcanzado. Toca para mejorar y seguir.',
    guestLow: (r) => `Solo ${r} ${r === 1 ? 'lugar' : 'lugares'} de invitado — toca para mejorar.`,
    guestFull: 'Tu evento está lleno. Mejora para invitar a más.',
    reported: 'Se reportó una foto. Toca para revisarla.',
  },
  fr: {
    newPhoto: (w, v) => `${w} a ajouté ${v ? 'une vidéo' : 'une photo'} 📸`,
    firstGuest: 'Votre premier invité vient de rejoindre 🎉',
    milestone: (n) => `${n} photos et ça continue ! 🎉`,
    photoLow: (r) => `Plus que ${r} photos — touchez pour passer à l'offre supérieure.`,
    photoFull: 'Limite de photos atteinte. Touchez pour augmenter la limite.',
    guestLow: (r) => `Plus que ${r} ${r === 1 ? 'place' : 'places'} — touchez pour améliorer.`,
    guestFull: 'Votre événement est complet. Améliorez pour inviter plus.',
    reported: 'Une photo a été signalée. Touchez pour vérifier.',
  },
  de: {
    newPhoto: (w, v) => `${w} hat ${v ? 'ein Video' : 'ein Foto'} hinzugefügt 📸`,
    firstGuest: 'Dein erster Gast ist beigetreten 🎉',
    milestone: (n) => `${n} Fotos und es werden mehr! 🎉`,
    photoLow: (r) => `Nur noch ${r} Fotos — tippe zum Upgraden.`,
    photoFull: 'Foto-Limit erreicht. Tippe zum Upgraden und weiter sammeln.',
    guestLow: (r) => `Nur noch ${r} ${r === 1 ? 'Platz' : 'Plätze'} — tippe zum Upgraden.`,
    guestFull: 'Dein Event ist voll. Upgrade, um mehr Gäste einzuladen.',
    reported: 'Ein Foto wurde gemeldet. Tippe zum Prüfen.',
  },
};
const strings = (lang) => STR[(lang || 'en').slice(0, 2)] || STR.en;

// Loads the event + its host's push token/language in one place.
async function loadHost(eventId) {
  const eventSnap = await db.doc(`events/${eventId}`).get();
  if (!eventSnap.exists) return null;
  const ev = eventSnap.data();
  if (!ev.hostId) return null;
  const userSnap = await db.doc(`users/${ev.hostId}`).get();
  const token = userSnap.exists ? userSnap.data().pushToken || null : null;
  const lang = userSnap.exists ? userSnap.data().lang || 'en' : 'en';
  return { ev, hostId: ev.hostId, token, lang, eventId };
}

async function sendPush(ctx, body, extra) {
  if (!ctx.token) return;
  const data = Object.assign({ eventId: ctx.eventId, hostId: ctx.hostId, type: 'event' }, extra || {});
  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: ctx.token, sound: 'default', title: ctx.ev.name || 'GuestCam', body, data }),
    });
    const json = await res.json();
    const status = json && json.data && json.data.status;
    if (status === 'error' && json.data.details && json.data.details.error === 'DeviceNotRegistered') {
      await db.doc(`users/${ctx.hostId}`).update({ pushToken: null }).catch(() => {});
    }
  } catch (e) {
    console.error('push failed', e);
  }
}

const upgrade = (ctx) => ({ type: 'upgrade', current: ctx.ev.plan || 'free' });

// ---- New photo: per-photo notice, milestones, and photo-cap nudges ----
exports.notifyHostOnPhoto = onDocumentCreated('events/{eventId}/photos/{photoId}', async (event) => {
  const photo = event.data && event.data.data();
  if (!photo) return;
  const ctx = await loadHost(event.params.eventId);
  if (!ctx || !ctx.token) return;
  if (ctx.ev.uploadNotify === false) return;        // host muted this event
  const s = strings(ctx.lang);

  if (photo.uploadedBy !== ctx.hostId) {
    const who = (photo.uploaderName && String(photo.uploaderName).trim()) || 'Someone';
    await sendPush(ctx, s.newPhoto(who, photo.mediaType === 'video'));
  }

  const count = ctx.ev.photoCount || 0;
  if (MILESTONES.includes(count)) await sendPush(ctx, s.milestone(count));

  if (ctx.ev.photoCap != null) {
    const remaining = ctx.ev.photoCap - count;
    if (remaining === 0) await sendPush(ctx, s.photoFull, upgrade(ctx));
    else if (PHOTO_WARN_AT.includes(remaining)) await sendPush(ctx, s.photoLow(remaining), upgrade(ctx));
  }
});

// ---- New guest: first-guest celebration and guest-cap nudges ----
exports.notifyHostOnGuest = onDocumentCreated('events/{eventId}/guests/{guestId}', async (event) => {
  const ctx = await loadHost(event.params.eventId);
  if (!ctx || !ctx.token) return;
  if (ctx.ev.uploadNotify === false) return;
  const s = strings(ctx.lang);

  const count = ctx.ev.guestCount || 0;
  if (count === 1) await sendPush(ctx, s.firstGuest);

  if (ctx.ev.maxGuests != null) {
    const remaining = ctx.ev.maxGuests - count;
    if (remaining === 0) await sendPush(ctx, s.guestFull, upgrade(ctx));
    else if (GUEST_WARN_AT.includes(remaining)) await sendPush(ctx, s.guestLow(remaining), upgrade(ctx));
  }
});

// ---- Reported content: ask the host to review ----
exports.notifyHostOnReport = onDocumentCreated('reports/{reportId}', async (event) => {
  const report = event.data && event.data.data();
  if (!report || !report.eventId) return;
  const ctx = await loadHost(report.eventId);
  if (!ctx || !ctx.token) return;
  if (ctx.ev.uploadNotify === false) return;
  await sendPush(ctx, strings(ctx.lang).reported);
});
