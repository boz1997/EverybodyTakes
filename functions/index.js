const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

// Fire a one-off upgrade nudge when the remaining quota hits these exact values
// (count increments by 1, so each value triggers once — no extra dedupe needed).
const PHOTO_WARN_AT = [10, 3];
const GUEST_WARN_AT = [2];

async function getHostToken(hostId) {
  if (!hostId) return null;
  const snap = await db.doc(`users/${hostId}`).get();
  return snap.exists ? (snap.data().pushToken || null) : null;
}

async function sendPush(token, title, body, data) {
  if (!token) return;
  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: token, sound: 'default', title, body, data }),
    });
    const json = await res.json();
    const status = json && json.data && json.data.status;
    if (status === 'error' && json.data.details && json.data.details.error === 'DeviceNotRegistered') {
      const hostId = data && data.hostId;
      if (hostId) await db.doc(`users/${hostId}`).update({ pushToken: null }).catch(() => {});
    }
  } catch (e) {
    console.error('push failed', e);
  }
}

// New photo → notify the host (if enabled) and nudge to upgrade as the cap nears.
exports.notifyHostOnPhoto = onDocumentCreated('events/{eventId}/photos/{photoId}', async (event) => {
  const photo = event.data && event.data.data();
  if (!photo) return;

  const eventSnap = await db.doc(`events/${event.params.eventId}`).get();
  if (!eventSnap.exists) return;
  const ev = eventSnap.data();
  const hostId = ev.hostId;
  const token = await getHostToken(hostId);
  if (!token) return;

  // 1) Per-photo notification (respects the host's toggle, skips own uploads).
  if (ev.uploadNotify !== false && photo.uploadedBy !== hostId) {
    const who = (photo.uploaderName && String(photo.uploaderName).trim()) || 'Someone';
    const isVideo = photo.mediaType === 'video';
    await sendPush(token, ev.name || 'New photo', `${who} added a ${isVideo ? 'video' : 'photo'} 📸`, { eventId: event.params.eventId, hostId });
  }

  // 2) Approaching the photo cap → upgrade nudge.
  if (ev.photoCap != null) {
    const remaining = ev.photoCap - (ev.photoCount || 0);
    if (PHOTO_WARN_AT.includes(remaining)) {
      await sendPush(
        token,
        ev.name || 'Almost full',
        remaining === 0
          ? 'Your event photo limit is full. Tap to upgrade and keep the memories coming.'
          : `Only ${remaining} photos left for this event — tap to upgrade and remove the limit.`,
        { eventId: event.params.eventId, hostId, type: 'upgrade', current: ev.plan || 'free' },
      );
    }
  }
});

// New guest → nudge the host to upgrade as the guest cap nears.
exports.notifyHostOnGuest = onDocumentCreated('events/{eventId}/guests/{guestId}', async (event) => {
  const eventSnap = await db.doc(`events/${event.params.eventId}`).get();
  if (!eventSnap.exists) return;
  const ev = eventSnap.data();
  if (ev.maxGuests == null) return;

  const remaining = ev.maxGuests - (ev.guestCount || 0);
  if (!GUEST_WARN_AT.includes(remaining)) return;

  const token = await getHostToken(ev.hostId);
  if (!token) return;

  await sendPush(
    token,
    ev.name || 'Almost full',
    `Only ${remaining} guest ${remaining === 1 ? 'spot' : 'spots'} left — tap to upgrade and invite more.`,
    { eventId: event.params.eventId, hostId: ev.hostId, type: 'upgrade', current: ev.plan || 'free' },
  );
});
