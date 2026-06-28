import { beforeAll, afterAll, beforeEach, describe, it, expect } from 'vitest';
import { initializeApp, deleteApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
// The deletion logic under test (plain helpers, no Firebase init of their own).
import { purgeEvent, purgeAccountData, deleteEventGuarded, deleteAccountGuarded } from '../../functions/lib/purge';

// Runs against the Firestore + Storage emulators (npm run test:functions). Proves
// the deletion functions remove exactly the right data — and never a bystander's.

const PROJECT = 'demo-guestcam';
const BUCKET = 'demo-guestcam.appspot.com';

let app: App;
let db: Firestore;
let bucket: ReturnType<ReturnType<typeof getStorage>['bucket']>;

beforeAll(() => {
  // firebase emulators:exec sets FIREBASE_STORAGE_EMULATOR_HOST; the admin
  // storage client reads STORAGE_EMULATOR_HOST — bridge them.
  if (process.env.FIREBASE_STORAGE_EMULATOR_HOST && !process.env.STORAGE_EMULATOR_HOST) {
    process.env.STORAGE_EMULATOR_HOST = `http://${process.env.FIREBASE_STORAGE_EMULATOR_HOST}`;
  }
  app = initializeApp({ projectId: PROJECT, storageBucket: BUCKET });
  db = getFirestore(app);
  bucket = getStorage(app).bucket();
});

afterAll(async () => { await deleteApp(app); });

beforeEach(async () => {
  await fetch(`http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT}/databases/(default)/documents`, { method: 'DELETE' });
  await bucket.deleteFiles();
});

const putFile = (path: string) => bucket.file(path).save(Buffer.from('x'), { contentType: 'image/jpeg' });
const fileExists = async (path: string) => (await bucket.file(path).exists())[0];
const docExists = async (path: string) => (await db.doc(path).get()).exists;

describe('purgeEvent', () => {
  it('removes the event doc, its subcollections, and all its storage objects', async () => {
    await db.doc('events/e1').set({ hostId: 'h1', name: 'Party' });
    await db.doc('events/e1/photos/p1').set({ uploadedBy: 'g1' });
    await db.doc('events/e1/guests/g1').set({ userId: 'g1' });
    await putFile('events/e1/photos/p1.jpg');
    await putFile('events/e1/thumbs/p1.jpg');
    await putFile('events/e1/cover.jpg');
    // A bystander event that must be left untouched.
    await db.doc('events/e2').set({ hostId: 'h2' });
    await putFile('events/e2/photos/keep.jpg');

    await purgeEvent(db, bucket, 'e1');

    expect(await docExists('events/e1')).toBe(false);
    expect(await docExists('events/e1/photos/p1')).toBe(false);
    expect(await docExists('events/e1/guests/g1')).toBe(false);
    expect(await fileExists('events/e1/photos/p1.jpg')).toBe(false);
    expect(await fileExists('events/e1/thumbs/p1.jpg')).toBe(false);
    expect(await fileExists('events/e1/cover.jpg')).toBe(false);

    // Bystander survives.
    expect(await docExists('events/e2')).toBe(true);
    expect(await fileExists('events/e2/photos/keep.jpg')).toBe(true);
  });
});

describe('purgeAccountData', () => {
  it('tears down hosted events, removes only the user\'s own uploads in joined events, and keeps others', async () => {
    // u1 HOSTS h1 (full teardown expected).
    await db.doc('events/h1').set({ hostId: 'u1' });
    await db.doc('events/h1/photos/x1').set({ uploadedBy: 'someone' });
    await db.doc('events/h1/guests/someone').set({ userId: 'someone' });
    await putFile('events/h1/photos/x1.jpg');
    await putFile('events/h1/cover.jpg');

    // u1 JOINED j1 (hosted by 'other'): u1 uploaded pa, pb; u2 uploaded pc.
    await db.doc('events/j1').set({ hostId: 'other' });
    await db.doc('events/j1/photos/pa').set({ uploadedBy: 'u1' });
    await db.doc('events/j1/photos/pb').set({ uploadedBy: 'u1' });
    await db.doc('events/j1/photos/pc').set({ uploadedBy: 'u2' });
    await db.doc('events/j1/guests/u1').set({ userId: 'u1' });
    await db.doc('events/j1/guests/u2').set({ userId: 'u2' });
    await putFile('events/j1/photos/pa.jpg');
    await putFile('events/j1/thumbs/pa.jpg');
    await putFile('events/j1/photos/pb.mp4');     // a video upload (mp4)
    await putFile('events/j1/photos/pc.jpg');
    await putFile('events/j1/thumbs/pc.jpg');

    await db.doc('users/u1').set({ uid: 'u1' });
    await db.doc('users/u2').set({ uid: 'u2' });

    await purgeAccountData(db, bucket, 'u1', ['j1']);

    // Hosted event h1: gone entirely (docs + storage).
    expect(await docExists('events/h1')).toBe(false);
    expect(await docExists('events/h1/photos/x1')).toBe(false);
    expect(await docExists('events/h1/guests/someone')).toBe(false);
    expect(await fileExists('events/h1/photos/x1.jpg')).toBe(false);
    expect(await fileExists('events/h1/cover.jpg')).toBe(false);

    // Joined event j1: survives; only u1's footprint is removed.
    expect(await docExists('events/j1')).toBe(true);
    expect(await docExists('events/j1/photos/pa')).toBe(false);
    expect(await docExists('events/j1/photos/pb')).toBe(false);
    expect(await fileExists('events/j1/photos/pa.jpg')).toBe(false);
    expect(await fileExists('events/j1/thumbs/pa.jpg')).toBe(false);
    expect(await fileExists('events/j1/photos/pb.mp4')).toBe(false);
    expect(await docExists('events/j1/guests/u1')).toBe(false);

    // u2's content in j1 is untouched.
    expect(await docExists('events/j1/photos/pc')).toBe(true);
    expect(await fileExists('events/j1/photos/pc.jpg')).toBe(true);
    expect(await fileExists('events/j1/thumbs/pc.jpg')).toBe(true);
    expect(await docExists('events/j1/guests/u2')).toBe(true);

    // User docs: u1 gone, u2 kept.
    expect(await docExists('users/u1')).toBe(false);
    expect(await docExists('users/u2')).toBe(true);
  });
});

describe('deleteEventGuarded (auth gating)', () => {
  beforeEach(async () => {
    await db.doc('events/e1').set({ hostId: 'owner' });
    await putFile('events/e1/photos/p.jpg');
  });

  it('rejects an unauthenticated caller', async () => {
    await expect(deleteEventGuarded(db, bucket, undefined, 'e1')).rejects.toMatchObject({ code: 'unauthenticated' });
    expect(await docExists('events/e1')).toBe(true); // untouched
  });

  it('rejects a missing eventId', async () => {
    await expect(deleteEventGuarded(db, bucket, 'owner', undefined)).rejects.toMatchObject({ code: 'invalid-argument' });
  });

  it('rejects a non-host caller and leaves the event intact', async () => {
    await expect(deleteEventGuarded(db, bucket, 'someone-else', 'e1')).rejects.toMatchObject({ code: 'permission-denied' });
    expect(await docExists('events/e1')).toBe(true);
    expect(await fileExists('events/e1/photos/p.jpg')).toBe(true);
  });

  it('lets the host delete the event (docs + storage)', async () => {
    await deleteEventGuarded(db, bucket, 'owner', 'e1');
    expect(await docExists('events/e1')).toBe(false);
    expect(await fileExists('events/e1/photos/p.jpg')).toBe(false);
  });

  it('is a no-op for an already-deleted event', async () => {
    await expect(deleteEventGuarded(db, bucket, 'owner', 'does-not-exist')).resolves.toBeUndefined();
  });
});

describe('deleteAccountGuarded (auth gating)', () => {
  it('rejects an unauthenticated caller', async () => {
    await expect(deleteAccountGuarded(db, bucket, undefined, [])).rejects.toMatchObject({ code: 'unauthenticated' });
  });

  it('removes the signed-in user\'s data', async () => {
    await db.doc('users/me').set({ uid: 'me' });
    await db.doc('events/mine').set({ hostId: 'me' });
    await deleteAccountGuarded(db, bucket, 'me', []);
    expect(await docExists('users/me')).toBe(false);
    expect(await docExists('events/mine')).toBe(false);
  });
});
