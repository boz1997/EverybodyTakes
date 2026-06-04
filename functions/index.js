const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

/**
 * When a guest uploads a photo/video, notify the event host via Expo push —
 * unless the host turned the per-event "Notify me on new photos" toggle off.
 * The host's Expo push token is stored on users/{hostId}.pushToken by the app.
 */
exports.notifyHostOnPhoto = onDocumentCreated('events/{eventId}/photos/{photoId}', async (event) => {
  const photo = event.data && event.data.data();
  if (!photo) return;

  const { eventId } = event.params;
  const eventSnap = await db.doc(`events/${eventId}`).get();
  if (!eventSnap.exists) return;
  const ev = eventSnap.data();

  // Respect the host's preference (default ON when the field is absent).
  if (ev.uploadNotify === false) return;

  const hostId = ev.hostId;
  if (!hostId) return;

  // Don't notify the host about their own uploads.
  if (photo.uploadedBy && photo.uploadedBy === hostId) return;

  const userSnap = await db.doc(`users/${hostId}`).get();
  const token = userSnap.exists ? userSnap.data().pushToken : null;
  if (!token) return;

  const who = (photo.uploaderName && String(photo.uploaderName).trim()) || 'Someone';
  const isVideo = photo.mediaType === 'video';

  const message = {
    to: token,
    sound: 'default',
    title: ev.name || 'New photo',
    body: `${who} added a ${isVideo ? 'video' : 'photo'} 📸`,
    data: { eventId },
  };

  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    const json = await res.json();
    // Expo returns a DeviceNotRegistered error when a token is stale; clear it.
    const status = json && json.data && json.data.status;
    if (status === 'error') {
      const code = json.data.details && json.data.details.error;
      if (code === 'DeviceNotRegistered') {
        await db.doc(`users/${hostId}`).update({ pushToken: null }).catch(() => {});
      }
    }
  } catch (e) {
    console.error('push failed', e);
  }
});
