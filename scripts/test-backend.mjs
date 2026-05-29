// End-to-end backend test for GuestCam.
// Runs the real client SDK against the live Firebase project:
//   anonymous auth -> create event -> join as guest -> decrement shots
//   -> upload photo doc -> query photos. Prints a pass/fail report.
//
// Usage: node scripts/test-backend.mjs
// Reads config from .env (EXPO_PUBLIC_FIREBASE_*).

import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore, doc, setDoc, getDoc, updateDoc, collection, query,
  where, getDocs, serverTimestamp,
} from 'firebase/firestore';

function loadEnv() {
  const env = {};
  for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const env = loadEnv();
const app = initializeApp({
  apiKey: env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.EXPO_PUBLIC_FIREBASE_APP_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  ✓ ${m}`); };
const bad = (m, e) => { fail++; console.log(`  ✗ ${m}\n     ${e?.message ?? e}`); };

const id = (p) => `${p}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

async function main() {
  console.log('\nGuestCam backend test\n=====================');

  // 1. Anonymous auth
  let uid;
  try {
    const cred = await signInAnonymously(auth);
    uid = cred.user.uid;
    ok(`anonymous auth (uid ${uid.slice(0, 8)}…)`);
  } catch (e) { bad('anonymous auth', e); return finish(); }

  // 2. Create event
  const eventId = id('evt');
  const shortCode = id('c').slice(0, 8).toUpperCase();
  try {
    await setDoc(doc(db, 'events', eventId), {
      id: eventId, hostId: uid, name: 'Test Event', type: 'party',
      shotsPerGuest: 24, shortCode, isActive: true, guestCount: 0,
      photoCount: 0, plan: 'free', createdAt: serverTimestamp(),
    });
    ok('create event');
  } catch (e) { bad('create event', e); return finish(); }

  // 3. Read it back by shortCode (the guest join query path)
  try {
    const snap = await getDocs(query(collection(db, 'events'), where('shortCode', '==', shortCode)));
    if (snap.empty) throw new Error('event not found by shortCode');
    ok('query event by shortCode');
  } catch (e) { bad('query event by shortCode', e); }

  // 4. Join as guest (subcollection write)
  try {
    await setDoc(doc(db, 'events', eventId, 'guests', uid), {
      userId: uid, nickname: 'Tester', shotsRemaining: 24, joinedAt: serverTimestamp(),
    });
    ok('join event (guest doc)');
  } catch (e) { bad('join event', e); }

  // 5. Decrement shots
  try {
    await updateDoc(doc(db, 'events', eventId, 'guests', uid), { shotsRemaining: 23 });
    const g = await getDoc(doc(db, 'events', eventId, 'guests', uid));
    if (g.data().shotsRemaining !== 23) throw new Error('shots not decremented');
    ok('decrement shots');
  } catch (e) { bad('decrement shots', e); }

  // 6. Write a photo doc + bump photoCount
  const photoId = id('pho');
  try {
    await setDoc(doc(db, 'events', eventId, 'photos', photoId), {
      id: photoId, eventId, uploadedBy: uid, uploaderName: 'Tester',
      imageUrl: 'https://example.com/x.jpg', isVisible: true,
      likesCount: 0, createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'events', eventId), { photoCount: 1 });
    ok('upload photo doc + bump count');
  } catch (e) { bad('upload photo doc', e); }

  // 7. Query visible photos (the gallery path — needs composite index)
  try {
    const snap = await getDocs(query(
      collection(db, 'events', eventId, 'photos'),
      where('isVisible', '==', true),
    ));
    if (snap.empty) throw new Error('no photos returned');
    ok(`query gallery photos (${snap.size})`);
  } catch (e) { bad('query gallery photos', e); }

  finish();
}

function finish() {
  console.log(`\nResult: ${pass} passed, ${fail} failed\n`);
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
