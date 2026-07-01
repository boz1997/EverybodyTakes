// Deletion helpers shared by the deleteEvent / deleteAccountData callables.
// Kept free of any Firebase init so they can be unit-tested against the
// emulators with an admin SDK and bucket passed in.

// Removes every Storage object and Firestore document for one event
// (photos & guests subcollections included, via recursiveDelete).
async function purgeEvent(db, bucket, eventId) {
  await bucket.deleteFiles({ prefix: `events/${eventId}/` });
  await db.recursiveDelete(db.doc(`events/${eventId}`));
}

// Account deletion (App Store 5.1.1): removes everything tied to a user.
//   • events they HOST → full teardown (media + docs)
//   • events they JOINED → only the photos they uploaded + their guest doc
//   • their own user profile doc
// Each event is isolated in its own try/catch so one failure can't strand the
// rest of the deletion (the account must always end up removable).
async function purgeAccountData(db, bucket, uid, joinedEventIds) {
  const hosted = await db.collection('events').where('hostId', '==', uid).get();
  for (const doc of hosted.docs) {
    try {
      await purgeEvent(db, bucket, doc.id);
    } catch (e) {
      console.error('purge hosted event failed', doc.id, e);
    }
  }

  for (const eventId of joinedEventIds || []) {
    try {
      const mine = await db.collection(`events/${eventId}/photos`).where('uploadedBy', '==', uid).get();
      for (const p of mine.docs) {
        // A file-name prefix matches the object regardless of extension
        // (jpg / mp4) and its thumbnail.
        await bucket.deleteFiles({ prefix: `events/${eventId}/photos/${p.id}` }).catch(() => {});
        await bucket.deleteFiles({ prefix: `events/${eventId}/thumbs/${p.id}` }).catch(() => {});
        await p.ref.delete();
      }
      // Their one voice memory (clip file + doc), if any.
      await bucket.deleteFiles({ prefix: `events/${eventId}/voices/${uid}` }).catch(() => {});
      await db.doc(`events/${eventId}/voices/${uid}`).delete().catch(() => {});
      await db.doc(`events/${eventId}/guests/${uid}`).delete();
    } catch (e) {
      console.error('purge joined event failed', eventId, e);
    }
  }

  await db.doc(`users/${uid}`).delete().catch((e) => console.error('purge user doc failed', uid, e));
}

// Carries a Functions error code so the onCall wrapper can rethrow it as an
// HttpsError (the codes used are all valid HttpsError codes).
class PurgeError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

// Auth-gated event deletion: only the host may delete, and a missing event is a
// no-op (already gone). Kept here, separate from the onCall transport, so the
// gating is unit-testable against the emulators.
async function deleteEventGuarded(db, bucket, uid, eventId) {
  if (!uid) throw new PurgeError('unauthenticated');
  if (!eventId) throw new PurgeError('invalid-argument');
  const snap = await db.doc(`events/${eventId}`).get();
  if (!snap.exists) return;                                   // already gone
  if (snap.data().hostId !== uid) throw new PurgeError('permission-denied');
  await purgeEvent(db, bucket, eventId);
}

// Auth-gated account deletion: any signed-in user may delete their own data.
async function deleteAccountGuarded(db, bucket, uid, joinedEventIds) {
  if (!uid) throw new PurgeError('unauthenticated');
  await purgeAccountData(db, bucket, uid, joinedEventIds || []);
}

module.exports = { purgeEvent, purgeAccountData, deleteEventGuarded, deleteAccountGuarded, PurgeError };
