const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { randomUUID } = require('crypto');
const archiver = require('archiver');
const { purgeEvent, deleteEventGuarded, deleteAccountGuarded, PurgeError } = require('./lib/purge');
const { dailyTickPlan, retentionPlan } = require('./lib/schedule');

initializeApp();
const db = getFirestore();

// Media lives in the .firebasestorage.app bucket; the admin SDK default can
// resolve to the legacy <project>.appspot.com bucket, so name it explicitly.
const STORAGE_BUCKET = 'everybodytakes.firebasestorage.app';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000];
const PHOTO_WARN_AT = [10, 3];      // photos remaining before the cap
const GUEST_WARN_AT = [2];          // guest spots remaining before the cap
const GUEST_SHOTS_WARN_AT = [2];    // a guest's own shots remaining before empty
const SILENCE_NUDGE_MS = 60 * 60 * 1000;   // no guests within 1h of creating → nudge

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
    guestPhotos: (n) => `${n} photos in the album now 📸`,
    liked: 'Someone liked your photo ❤️',
    shotsLow: (r) => `Only ${r} ${r === 1 ? 'shot' : 'shots'} left — make them count 📸`,
    hostTomorrow: 'Your event is tomorrow — share your QR so guests are ready 🎉',
    nudge: 'No guests yet — share your QR or code to get the photos rolling 📷',
    wrapPrompt: 'Has your event wrapped up? Keep the gallery open, or close it whenever you like 🎉',
    retentionWarn: 'Your free event will be deleted in 24h — upgrade to keep your photos forever.',
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
    guestPhotos: (n) => `Albümde ${n} fotoğraf oldu 📸`,
    liked: 'Fotoğrafını biri beğendi ❤️',
    shotsLow: (r) => `Sadece ${r} hakkın kaldı — iyi değerlendir 📸`,
    hostTomorrow: 'Etkinliğin yarın — QR kodunu paylaş, misafirler hazır olsun 🎉',
    nudge: 'Henüz misafir yok — QR veya kodu paylaş, fotoğraflar gelmeye başlasın 📷',
    wrapPrompt: 'Etkinliğin bitti mi? Galerini açık tutabilir ya da istediğin zaman kapatabilirsin 🎉',
    retentionWarn: 'Ücretsiz etkinliğin 24 saat içinde silinecek — fotoğraflarını kalıcı tutmak için paketini yükselt.',
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
    guestPhotos: (n) => `Ya hay ${n} fotos en el álbum 📸`,
    liked: 'A alguien le gustó tu foto ❤️',
    shotsLow: (r) => `Solo te ${r === 1 ? 'queda' : 'quedan'} ${r} ${r === 1 ? 'foto' : 'fotos'} — aprovéchalas 📸`,
    hostTomorrow: 'Tu evento es mañana — comparte tu QR para que los invitados estén listos 🎉',
    nudge: 'Aún no hay invitados — comparte tu QR o código para empezar 📷',
    wrapPrompt: '¿Tu evento ha terminado? Mantén la galería abierta o ciérrala cuando quieras 🎉',
    retentionWarn: 'Tu evento gratis se eliminará en 24 h — mejora para conservar tus fotos para siempre.',
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
    guestPhotos: (n) => `${n} photos dans l'album maintenant 📸`,
    liked: 'Quelqu\'un a aimé votre photo ❤️',
    shotsLow: (r) => `Plus que ${r} ${r === 1 ? 'photo' : 'photos'} — profitez-en 📸`,
    hostTomorrow: 'Votre événement est demain — partagez votre QR pour que les invités soient prêts 🎉',
    nudge: 'Aucun invité pour l\'instant — partagez votre QR ou code 📷',
    wrapPrompt: 'Ton événement est terminé ? Garde la galerie ouverte ou ferme-la quand tu veux 🎉',
    retentionWarn: 'Ton événement gratuit sera supprimé dans 24 h — améliore pour garder tes photos pour toujours.',
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
    guestPhotos: (n) => `Jetzt ${n} Fotos im Album 📸`,
    liked: 'Jemand mag dein Foto ❤️',
    shotsLow: (r) => `Nur noch ${r} ${r === 1 ? 'Aufnahme' : 'Aufnahmen'} — nutze sie gut 📸`,
    hostTomorrow: 'Dein Event ist morgen — teile deinen QR-Code, damit die Gäste bereit sind 🎉',
    nudge: 'Noch keine Gäste — teile deinen QR-Code oder Code 📷',
    wrapPrompt: 'Ist dein Event vorbei? Lass die Galerie offen oder schließe sie, wann du willst 🎉',
    retentionWarn: 'Dein kostenloses Event wird in 24 Std. gelöscht — upgrade, um deine Fotos dauerhaft zu behalten.',
  },
};
const strings = (lang) => STR[(lang || 'en').slice(0, 2)] || STR.en;

// Loads the event + its host's push token/language in one place.
async function loadHost(eventId) {
  const eventSnap = await db.doc(`events/${eventId}`).get();
  if (!eventSnap.exists) return null;
  const ev = eventSnap.data();
  ev.id = ev.id || eventId;          // guarantee an id for push payloads/titles
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

// Resolves a single push token + language for any user (host or guest).
async function userPush(uid) {
  if (!uid) return null;
  const snap = await db.doc(`users/${uid}`).get();
  if (!snap.exists || !snap.data().pushToken) return null;
  return { token: snap.data().pushToken, lang: snap.data().lang || 'en', uid };
}

// All joined guests of an event who have a push token, minus `excludeUid`
// (e.g. the person who triggered the event). One batched read for the tokens.
async function guestRecipients(eventId, excludeUid) {
  const guests = await db.collection(`events/${eventId}/guests`).get();
  const uids = guests.docs.map((d) => d.id).filter((uid) => uid && uid !== excludeUid);
  if (uids.length === 0) return [];
  const snaps = await db.getAll(...uids.map((uid) => db.doc(`users/${uid}`)));
  const out = [];
  for (const s of snaps) {
    if (s.exists && s.data().pushToken) out.push({ token: s.data().pushToken, lang: s.data().lang || 'en', uid: s.id });
  }
  return out;
}

// Sends one push to a single resolved recipient ({ token, lang, uid }).
async function sendOne(recipient, ev, body, extra) {
  if (!recipient || !recipient.token) return;
  const data = Object.assign({ eventId: ev.id, type: 'event' }, extra || {});
  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: recipient.token, sound: 'default', title: ev.name || 'GuestCam', body, data }),
    });
    const json = await res.json();
    const ticket = json && json.data;
    if (ticket && ticket.status === 'error' && ticket.details && ticket.details.error === 'DeviceNotRegistered') {
      await db.doc(`users/${recipient.uid}`).update({ pushToken: null }).catch(() => {});
    }
  } catch (e) {
    console.error('push failed', e);
  }
}

// Fan-out to many recipients in 100-message chunks (Expo's batch limit), with
// each guest's copy in their own language. Dead tokens are cleared.
async function sendToMany(recipients, ev, bodyFor, extra) {
  const valid = recipients.filter((r) => r && r.token);
  for (let i = 0; i < valid.length; i += 100) {
    const chunk = valid.slice(i, i + 100);
    const data = Object.assign({ eventId: ev.id, type: 'event' }, extra || {});
    const messages = chunk.map((r) => ({
      to: r.token, sound: 'default', title: ev.name || 'GuestCam', body: bodyFor(strings(r.lang)), data,
    }));
    try {
      const res = await fetch(EXPO_PUSH_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(messages),
      });
      const json = await res.json();
      const tickets = (json && json.data) || [];
      tickets.forEach((tk, idx) => {
        if (tk && tk.status === 'error' && tk.details && tk.details.error === 'DeviceNotRegistered') {
          db.doc(`users/${chunk[idx].uid}`).update({ pushToken: null }).catch(() => {});
        }
      });
    } catch (e) {
      console.error('batch push failed', e);
    }
  }
}

// ---- New photo: per-photo notice, milestones, and photo-cap nudges ----
exports.notifyHostOnPhoto = onDocumentCreated('events/{eventId}/photos/{photoId}', async (event) => {
  const photo = event.data && event.data.data();
  if (!photo) return;
  const ctx = await loadHost(event.params.eventId);
  if (!ctx) return;
  const count = ctx.ev.photoCount || 0;

  // Stamp when the first photo lands — the "wrap up your event?" prompt is timed
  // off this for events with no set date.
  if (!ctx.ev.firstPhotoAt) {
    await db.doc(`events/${event.params.eventId}`).update({ firstPhotoAt: FieldValue.serverTimestamp() }).catch(() => {});
  }

  // Host notices — each new photo, milestones, cap nudges. Respects the host's
  // per-event mute and only runs if the host has a registered device.
  if (ctx.token && ctx.ev.uploadNotify !== false) {
    const s = strings(ctx.lang);
    if (photo.uploadedBy !== ctx.hostId) {
      const who = (photo.uploaderName && String(photo.uploaderName).trim()) || 'Someone';
      await sendPush(ctx, s.newPhoto(who, photo.mediaType === 'video'));
    }
    if (MILESTONES.includes(count)) await sendPush(ctx, s.milestone(count));
    if (ctx.ev.photoCap != null) {
      const remaining = ctx.ev.photoCap - count;
      if (remaining === 0) await sendPush(ctx, s.photoFull, upgrade(ctx));
      else if (PHOTO_WARN_AT.includes(remaining)) await sendPush(ctx, s.photoLow(remaining), upgrade(ctx));
    }
  }

  // Guests get a digest at photo milestones only — never on every upload — so a
  // busy album never spams them. The uploader is skipped (they just added one).
  if (MILESTONES.includes(count)) {
    const recipients = await guestRecipients(event.params.eventId, photo.uploadedBy);
    await sendToMany(recipients, ctx.ev, (s) => s.guestPhotos(count));
  }
});

// ---- Like: tell the photo's owner someone liked it (once per new liker) ----
exports.notifyOnLike = onDocumentUpdated('events/{eventId}/photos/{photoId}', async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (!before || !after) return;
  const beforeLikes = before.likedBy || [];
  const afterLikes = after.likedBy || [];
  if (afterLikes.length <= beforeLikes.length) return;        // not a new like
  const newLiker = afterLikes.find((u) => !beforeLikes.includes(u));
  if (!newLiker || newLiker === after.uploadedBy) return;     // ignore self-likes
  const ctx = await loadHost(event.params.eventId);
  if (!ctx) return;
  const owner = await userPush(after.uploadedBy);
  if (!owner) return;
  await sendOne(owner, ctx.ev, strings(owner.lang).liked, { type: 'event' });
});

// ---- Low shots: nudge a guest when they're almost out (once, deduped) ----
exports.notifyGuestShotsLow = onDocumentUpdated('events/{eventId}/guests/{guestId}', async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (!before || !after) return;
  const remaining = after.shotsRemaining;
  // Fire only when crossing into the warn threshold, and never twice.
  if (typeof remaining !== 'number' || !GUEST_SHOTS_WARN_AT.includes(remaining)) return;
  if (before.shotsRemaining === remaining || after.shotsLowNotified) return;
  const ctx = await loadHost(event.params.eventId);
  if (!ctx) return;
  const guest = await userPush(event.params.guestId);
  if (guest) await sendOne(guest, ctx.ev, strings(guest.lang).shotsLow(remaining), { type: 'event' });
  await event.data.after.ref.update({ shotsLowNotified: true }).catch(() => {});
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

// ---- Silence nudge: an event with no guests an hour after creation ----
// Runs every 30 min. Finds active events created >1h ago that still have zero
// guests and haven't been nudged, and reminds the host to share their code.
exports.eventSilenceNudge = onSchedule('every 30 minutes', async () => {
  const cutoff = Date.now() - SILENCE_NUDGE_MS;
  const snap = await db.collection('events').where('isActive', '==', true).get();
  for (const doc of snap.docs) {
    const ev = doc.data();
    if (ev.silenceNudgedAt || (ev.guestCount || 0) > 0) continue;
    const createdMs = ev.createdAt && ev.createdAt.toMillis ? ev.createdAt.toMillis() : 0;
    if (!createdMs || createdMs > cutoff) continue;          // too new yet
    const ctx = await loadHost(doc.id);
    if (ctx && ctx.token && ctx.ev.uploadNotify !== false) {
      await sendPush(ctx, strings(ctx.lang).nudge);
    }
    await doc.ref.update({ silenceNudgedAt: FieldValue.serverTimestamp() }).catch(() => {});
  }
});

// ---- Daily lifecycle: day-before reminder + "wrap up?" nudge (NO auto-close) ----
// Runs once a day at noon (Istanbul). Events are NEVER closed automatically — the
// host owns that. We only nudge (see lib/schedule.js dailyTickPlan):
//   • remind: the day before a dated event (get ready / share the QR)
//   • wrap:   48h after a dated event, or 1 week after the first photo for an
//             undated event → "your event has wrapped, keep or close the gallery?"
const TICK_TZ = 'Europe/Istanbul';

exports.eventDailyTick = onSchedule({ schedule: '0 12 * * *', timeZone: TICK_TZ }, async () => {
  const now = new Date();
  const snap = await db.collection('events').where('isActive', '==', true).get();
  for (const doc of snap.docs) {
    const ev = doc.data();
    const plan = dailyTickPlan({
      dateIso: ev.date || null,
      firstPhotoAtMs: ev.firstPhotoAt && ev.firstPhotoAt.toMillis ? ev.firstPhotoAt.toMillis() : null,
      reminderSent: !!ev.reminderSentAt,
      wrapSent: !!ev.wrapPromptSentAt,
    }, now, TICK_TZ);

    if (plan.remind) {
      const ctx = await loadHost(doc.id);
      if (ctx && ctx.token && ctx.ev.uploadNotify !== false) await sendPush(ctx, strings(ctx.lang).hostTomorrow);
      await doc.ref.update({ reminderSentAt: FieldValue.serverTimestamp() }).catch(() => {});
    }
    if (plan.wrap) {
      const ctx = await loadHost(doc.id);
      if (ctx && ctx.token && ctx.ev.uploadNotify !== false) await sendPush(ctx, strings(ctx.lang).wrapPrompt);
      await doc.ref.update({ wrapPromptSentAt: FieldValue.serverTimestamp() }).catch(() => {});
    }
  }
});

// ---- Free-tier retention: delete a free event 1 week after its first photo ----
// One 24h warning ("upgrade to keep your data"), then deletion — never a silent
// delete. Paid and grandfathered (retentionExempt) events are never touched, and
// events created before this feature have no `retentionDays` field so they are
// ineligible → existing users are unaffected. Runs daily at 03:00 Istanbul.
exports.eventRetentionTick = onSchedule({ schedule: '0 3 * * *', timeZone: TICK_TZ }, async () => {
  const now = new Date();
  const bucket = getStorage().bucket('everybodytakes.firebasestorage.app');
  const snap = await db.collection('events').where('plan', '==', 'free').get();
  for (const doc of snap.docs) {
    const ev = doc.data();
    const plan = retentionPlan({
      plan: ev.plan,
      retentionExempt: !!ev.retentionExempt,
      retentionDays: ev.retentionDays != null ? ev.retentionDays : null,
      firstPhotoAtMs: ev.firstPhotoAt && ev.firstPhotoAt.toMillis ? ev.firstPhotoAt.toMillis() : null,
      warned: !!ev.retentionWarnedAt,
    }, now);

    if (plan.warn) {
      const ctx = await loadHost(doc.id);
      if (ctx && ctx.token) await sendPush(ctx, strings(ctx.lang).retentionWarn, upgrade(ctx));
      await doc.ref.update({ retentionWarnedAt: FieldValue.serverTimestamp() }).catch(() => {});
    }
    if (plan.purge) {
      await purgeEvent(db, bucket, doc.id).catch((e) => console.error('retention purge failed', doc.id, e));
    }
  }
});

// ---- ZIP export: host downloads the whole gallery as one archive ----
// Streams every photo/video into a store-only zip (media is already
// compressed) and returns a tokenized download URL valid like any other
// Firebase Storage link. Re-running overwrites the previous export.
exports.createEventZip = onCall({ memory: '1GiB', timeoutSeconds: 540 }, async (req) => {
  const uid = req.auth && req.auth.uid;
  const eventId = req.data && req.data.eventId;
  if (!uid) throw new HttpsError('unauthenticated', 'Sign in required');
  if (!eventId) throw new HttpsError('invalid-argument', 'eventId required');

  const eventSnap = await db.doc(`events/${eventId}`).get();
  if (!eventSnap.exists) throw new HttpsError('not-found', 'Event not found');
  // Host or any guest who actually joined may export the gallery.
  const isHost = eventSnap.data().hostId === uid;
  const isGuest = (await db.doc(`events/${eventId}/guests/${uid}`).get()).exists;
  if (!isHost && !isGuest) throw new HttpsError('permission-denied', 'Not a participant');

  // Explicit bucket name — the admin SDK default can resolve to the legacy
  // <project>.appspot.com bucket while media lives in .firebasestorage.app.
  const bucket = getStorage().bucket('everybodytakes.firebasestorage.app');
  const [files] = await bucket.getFiles({ prefix: `events/${eventId}/photos/` });
  if (files.length === 0) throw new HttpsError('not-found', 'No photos yet');

  const zipFile = bucket.file(`events/${eventId}/export/photos.zip`);
  const archive = archiver('zip', { store: true });
  const out = zipFile.createWriteStream({ contentType: 'application/zip' });
  const finished = new Promise((resolve, reject) => {
    out.on('finish', resolve);
    out.on('error', reject);
    archive.on('error', reject);
  });
  archive.pipe(out);
  for (const f of files) {
    archive.append(f.createReadStream(), { name: f.name.split('/').pop() });
  }
  await archive.finalize();
  await finished;

  const token = randomUUID();
  await zipFile.setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(zipFile.name)}?alt=media&token=${token}`;
  return { url, count: files.length };
});

// ---- Voices ZIP export: host downloads every voice memory as one archive ----
// Like createEventZip, but names each clip after its author (read from the voice
// docs) so the host gets "Ayşe.m4a", "Mehmet.m4a" rather than raw uids.
exports.createVoicesZip = onCall({ memory: '512MiB', timeoutSeconds: 300 }, async (req) => {
  const uid = req.auth && req.auth.uid;
  const eventId = req.data && req.data.eventId;
  if (!uid) throw new HttpsError('unauthenticated', 'Sign in required');
  if (!eventId) throw new HttpsError('invalid-argument', 'eventId required');

  const eventSnap = await db.doc(`events/${eventId}`).get();
  if (!eventSnap.exists) throw new HttpsError('not-found', 'Event not found');
  const isHost = eventSnap.data().hostId === uid;
  const isGuest = (await db.doc(`events/${eventId}/guests/${uid}`).get()).exists;
  if (!isHost && !isGuest) throw new HttpsError('permission-denied', 'Not a participant');

  // uid → author name, so the archive entries are human-readable.
  const voiceDocs = await db.collection(`events/${eventId}/voices`).get();
  const nameByUid = {};
  voiceDocs.forEach((d) => { nameByUid[d.id] = (d.data().authorName || '').trim(); });

  const bucket = getStorage().bucket('everybodytakes.firebasestorage.app');
  const [files] = await bucket.getFiles({ prefix: `events/${eventId}/voices/` });
  if (files.length === 0) throw new HttpsError('not-found', 'No voices yet');

  const zipFile = bucket.file(`events/${eventId}/export/voices.zip`);
  const archive = archiver('zip', { store: true });
  const out = zipFile.createWriteStream({ contentType: 'application/zip' });
  const finished = new Promise((resolve, reject) => {
    out.on('finish', resolve);
    out.on('error', reject);
    archive.on('error', reject);
  });
  archive.pipe(out);
  const used = {};
  for (const f of files) {
    const fuid = (f.name.split('/').pop() || '').replace(/\.m4a$/i, '');
    const clean = (nameByUid[fuid] || 'Guest').replace(/[^\p{L}\p{N} _-]/gu, '').trim() || 'Guest';
    used[clean] = (used[clean] || 0) + 1;
    const name = used[clean] > 1 ? `${clean}-${used[clean]}.m4a` : `${clean}.m4a`;
    archive.append(f.createReadStream(), { name });
  }
  await archive.finalize();
  await finished;

  const token = randomUUID();
  await zipFile.setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(zipFile.name)}?alt=media&token=${token}`;
  return { url, count: files.length };
});

// Runs a guarded deletion and maps its PurgeError code onto an HttpsError.
async function runGuarded(fn) {
  try {
    await fn();
    return { ok: true };
  } catch (e) {
    if (e instanceof PurgeError) throw new HttpsError(e.code, e.code);
    throw e;
  }
}

// ---- Delete event: the host tears an event down completely ----
// Removes every Storage object (photos, thumbnails, cover, export) AND every
// Firestore document (photos & guests subcollections + the event doc). Firestore
// does not cascade on its own, so deleting only the event doc would orphan both.
exports.deleteEvent = onCall((req) =>
  runGuarded(() => deleteEventGuarded(
    db, getStorage().bucket(STORAGE_BUCKET), req.auth && req.auth.uid, req.data && req.data.eventId,
  )));

// ---- Delete account: remove all of a user's data (App Store 5.1.1) ----
// Hosted events are fully torn down; in events the user only joined, just their
// own photos and guest doc are removed. The Firebase Auth user itself is deleted
// by the client after this resolves.
exports.deleteAccountData = onCall((req) =>
  runGuarded(() => deleteAccountGuarded(
    db, getStorage().bucket(STORAGE_BUCKET), req.auth && req.auth.uid, req.data && req.data.joinedEventIds,
  )));
