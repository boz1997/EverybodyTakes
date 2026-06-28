import { beforeAll, afterAll, beforeEach, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';

// These run against the Firestore + Storage emulators (npm run test:rules).
// They pin down the CURRENT production rules so the hardening steps that follow
// can prove they don't break any legitimate, already-shipped access pattern.

let env: RulesTestEnvironment;

const HOST = 'host1';
const GUEST = 'guest1';      // has joined event e1 (guest doc exists)
const STRANGER = 'stranger'; // signed in, but NOT a participant of e1

beforeAll(async () => {
  // projectId must match the --project the emulators run under (see test:rules
  // script) so the Storage rules' cross-service firestore.get() reads the same
  // project's seeded data. The demo- prefix keeps the emulator fully offline.
  env = await initializeTestEnvironment({
    projectId: 'demo-guestcam',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
    storage: { rules: readFileSync('storage.rules', 'utf8'), host: '127.0.0.1', port: 9199 },
  });
});

afterAll(async () => { await env.cleanup(); });

beforeEach(async () => {
  await env.clearFirestore();
  await env.clearStorage();
  // Seed an event with a joined guest, one photo, and a promo code — bypassing
  // rules so the fixture mirrors real production documents.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'events/e1'), {
      hostId: HOST, name: 'Wedding', shortCode: 'ABC234', isActive: true,
      guestCount: 1, photoCount: 5, photoCap: 100, maxGuests: 10, plan: 'free',
      notes: true, notesEnabled: true,
    });
    await setDoc(doc(db, 'events/e1/guests', GUEST), { userId: GUEST, shotsRemaining: 3 });
    await setDoc(doc(db, 'events/e1/photos/p1'), { uploadedBy: GUEST, isVisible: true, likedBy: [] });
    await setDoc(doc(db, 'promoCodes/PROMO1'), { used: false });
  });
});

const asHost = () => env.authenticatedContext(HOST).firestore();
const asGuest = () => env.authenticatedContext(GUEST).firestore();
const asStranger = () => env.authenticatedContext(STRANGER).firestore();
const asAnon = () => env.unauthenticatedContext().firestore();

describe('firestore rules — events', () => {
  it('any signed-in user can read an event', async () => {
    await assertSucceeds(getDoc(doc(asStranger(), 'events/e1')));
  });

  it('an unauthenticated user cannot read an event', async () => {
    await assertFails(getDoc(doc(asAnon(), 'events/e1')));
  });

  it('the host can edit their event freely', async () => {
    await assertSucceeds(updateDoc(doc(asHost(), 'events/e1'), { name: 'Renamed' }));
  });

  it('a non-host cannot edit arbitrary event fields', async () => {
    await assertFails(updateDoc(doc(asGuest(), 'events/e1'), { name: 'Hacked' }));
  });

  it('a guest may bump photoCount by +1 (slot reserve)', async () => {
    await assertSucceeds(updateDoc(doc(asGuest(), 'events/e1'), { photoCount: 6 }));
  });

  it('a guest may bump guestCount by +1', async () => {
    await assertSucceeds(updateDoc(doc(asGuest(), 'events/e1'), { guestCount: 2 }));
  });

  // HARDENED (Step 3): a guest can no longer DECREMENT photoCount — that let a
  // guest hold the count below the cap and keep uploading past it.
  it('a guest cannot decrement photoCount by -1 (cap-bypass fix)', async () => {
    await assertFails(updateDoc(doc(asGuest(), 'events/e1'), { photoCount: 4 }));
  });

  it('a guest cannot decrement guestCount', async () => {
    await assertFails(updateDoc(doc(asGuest(), 'events/e1'), { guestCount: 0 }));
  });

  it('a guest cannot jump photoCount by more than 1', async () => {
    await assertFails(updateDoc(doc(asGuest(), 'events/e1'), { photoCount: 99 }));
  });

  // The host owns the counters outright (isHost branch) and may correct drift.
  it('the host may set counters to any value', async () => {
    await assertSucceeds(updateDoc(doc(asHost(), 'events/e1'), { photoCount: 3 }));
  });

  it('a non-host cannot delete an event', async () => {
    await assertFails(deleteDoc(doc(asGuest(), 'events/e1')));
  });
});

describe('firestore rules — photos & guests', () => {
  it('a participant can read photos', async () => {
    await assertSucceeds(getDoc(doc(asGuest(), 'events/e1/photos/p1')));
  });

  it('a signed-in non-participant cannot read photos', async () => {
    await assertFails(getDoc(doc(asStranger(), 'events/e1/photos/p1')));
  });

  it('a participant can create their own photo', async () => {
    await assertSucceeds(setDoc(doc(asGuest(), 'events/e1/photos/p2'), { uploadedBy: GUEST, isVisible: true }));
  });

  it('a non-participant cannot create a photo', async () => {
    await assertFails(setDoc(doc(asStranger(), 'events/e1/photos/p3'), { uploadedBy: STRANGER, isVisible: true }));
  });

  it('only the owner or host can read the guest roster doc', async () => {
    await assertSucceeds(getDoc(doc(asGuest(), 'events/e1/guests', GUEST)));
    await assertSucceeds(getDoc(doc(asHost(), 'events/e1/guests', GUEST)));
    await assertFails(getDoc(doc(asStranger(), 'events/e1/guests', GUEST)));
  });
});

describe('firestore rules — promo codes', () => {
  it('a signed-in user can redeem an unused code once', async () => {
    await assertSucceeds(updateDoc(doc(asStranger(), 'promoCodes/PROMO1'), {
      used: true, usedBy: STRANGER, usedAt: new Date(),
    }));
  });

  it('a used code cannot be redeemed again', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await updateDoc(doc(ctx.firestore(), 'promoCodes/PROMO1'), { used: true, usedBy: 'someone' });
    });
    await assertFails(updateDoc(doc(asGuest(), 'promoCodes/PROMO1'), {
      used: true, usedBy: GUEST, usedAt: new Date(),
    }));
  });
});

describe('firestore rules — notes (memory book)', () => {
  const note = { authorId: GUEST, authorName: 'Mia', text: 'What a night!' };

  // Extra events for the plan/host gates.
  beforeEach(async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await setDoc(doc(db, 'events/noNotesPlan'), { hostId: HOST, notes: false, notesEnabled: true });
      await setDoc(doc(db, 'events/noNotesPlan/guests', GUEST), { userId: GUEST });
      await setDoc(doc(db, 'events/notesOff'), { hostId: HOST, notes: true, notesEnabled: false });
      await setDoc(doc(db, 'events/notesOff/guests', GUEST), { userId: GUEST });
    });
  });

  it('a participant can leave a valid note (doc id = their uid)', async () => {
    await assertSucceeds(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), note));
  });

  it('a guest can edit their own note by writing it again', async () => {
    await assertSucceeds(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), note));
    await assertSucceeds(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), { ...note, text: 'edited' }));
  });

  it('a guest cannot write to a note id that is not their uid (one per guest)', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/e1/notes/${STRANGER}`), note));
  });

  it('a signed-in non-participant cannot leave a note', async () => {
    await assertFails(setDoc(doc(asStranger(), `events/e1/notes/${STRANGER}`), { ...note, authorId: STRANGER }));
  });

  it('the note author must be the writer', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), { ...note, authorId: STRANGER }));
  });

  it('rejects an empty note', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), { ...note, text: '' }));
  });

  it('rejects a note over 240 chars', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/e1/notes/${GUEST}`), { ...note, text: 'x'.repeat(241) }));
  });

  it('rejects notes when the plan does not include them', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/noNotesPlan/notes/${GUEST}`), note));
  });

  it('rejects notes when the host has switched them off', async () => {
    await assertFails(setDoc(doc(asGuest(), `events/notesOff/notes/${GUEST}`), note));
  });

  it('a participant and the host can read notes; a stranger cannot', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), `events/e1/notes/${GUEST}`), note);
    });
    await assertSucceeds(getDoc(doc(asGuest(), `events/e1/notes/${GUEST}`)));
    await assertSucceeds(getDoc(doc(asHost(), `events/e1/notes/${GUEST}`)));
    await assertFails(getDoc(doc(asStranger(), `events/e1/notes/${GUEST}`)));
  });

  it('the author or host can delete a note', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), `events/e1/notes/${GUEST}`), note);
    });
    await assertSucceeds(deleteDoc(doc(asHost(), `events/e1/notes/${GUEST}`)));
  });
});

describe('firestore rules — error logs', () => {
  const validLog = { context: 'x', message: 'something failed', code: null };

  it('accepts a bounded log even from an unauthenticated client (pre-auth capture)', async () => {
    await assertSucceeds(setDoc(doc(asAnon(), 'errorLogs/l1'), validLog));
  });

  it('accepts a bounded log from a signed-in client', async () => {
    await assertSucceeds(setDoc(doc(asGuest(), 'errorLogs/l2'), validLog));
  });

  it('rejects an oversized message (storage-abuse guard)', async () => {
    await assertFails(setDoc(doc(asAnon(), 'errorLogs/l3'), { message: 'x'.repeat(1001) }));
  });

  it('rejects a non-string message', async () => {
    await assertFails(setDoc(doc(asAnon(), 'errorLogs/l4'), { message: { huge: true } }));
  });

  it('is never readable from the client', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'errorLogs/l5'), validLog);
    });
    await assertFails(getDoc(doc(asGuest(), 'errorLogs/l5')));
  });
});

describe('storage rules — event media', () => {
  it('a participant guest can upload an image to photos', async () => {
    const storage = env.authenticatedContext(GUEST).storage();
    await assertSucceeds(uploadString(ref(storage, 'events/e1/photos/p9.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  it('a participant guest can upload a grid thumbnail', async () => {
    const storage = env.authenticatedContext(GUEST).storage();
    await assertSucceeds(uploadString(ref(storage, 'events/e1/thumbs/p9.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  it('the host can upload to photos (host is a participant)', async () => {
    const storage = env.authenticatedContext(HOST).storage();
    await assertSucceeds(uploadString(ref(storage, 'events/e1/photos/h1.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  // HARDENED (Step 2): a signed-in user who has NOT joined can no longer write.
  it('a signed-in non-participant cannot upload to photos', async () => {
    const storage = env.authenticatedContext(STRANGER).storage();
    await assertFails(uploadString(ref(storage, 'events/e1/photos/x9.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  it('a non-participant cannot upload a thumbnail either', async () => {
    const storage = env.authenticatedContext(STRANGER).storage();
    await assertFails(uploadString(ref(storage, 'events/e1/thumbs/x9.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  it('a participant cannot upload a non-image/video file', async () => {
    const storage = env.authenticatedContext(GUEST).storage();
    await assertFails(uploadString(ref(storage, 'events/e1/photos/evil.txt'), 'x', 'raw', { contentType: 'text/plain' }));
  });

  it('clients cannot write the ZIP export (function-only)', async () => {
    const storage = env.authenticatedContext(HOST).storage();
    await assertFails(uploadString(ref(storage, 'events/e1/export/photos.zip'), 'x', 'raw', { contentType: 'application/zip' }));
  });

  it('an unauthenticated user cannot upload', async () => {
    const storage = env.unauthenticatedContext().storage();
    await assertFails(uploadString(ref(storage, 'events/e1/photos/p10.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });

  // Cover stays open (event doc doesn't exist yet at creation time).
  it('the host can upload a cover image', async () => {
    const storage = env.authenticatedContext(HOST).storage();
    await assertSucceeds(uploadString(ref(storage, 'events/e1/cover.jpg'), 'x', 'raw', { contentType: 'image/jpeg' }));
  });
});
