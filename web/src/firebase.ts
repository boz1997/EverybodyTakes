import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';

// Firebase web keys are public by design — security lives in Firestore/Storage
// rules. Same project as the native GuestCam app, so guests share one backend.
const firebaseConfig = {
  apiKey: 'AIzaSyBDZBg0ROX64qVqsqcFi7KoO3svZnkR_Jc',
  authDomain: 'everybodytakes.firebaseapp.com',
  projectId: 'everybodytakes',
  storageBucket: 'everybodytakes.firebasestorage.app',
  messagingSenderId: '759909661412',
  appId: '1:759909661412:web:ba27e79b149d28aeeb4af1',
  measurementId: 'G-5QQFFZ0ZBR',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Analytics is best-effort (blocked browsers, private mode) — never break the app for it.
let analytics: Analytics | null = null;
isSupported().then((ok) => { if (ok) analytics = getAnalytics(app); }).catch(() => {});

export function track(event: string, params?: Record<string, string | number>): void {
  if (analytics) logEvent(analytics, event, params);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/** Guests are anonymous — sign in once and reuse the uid. */
export async function ensureAnon(): Promise<string> {
  if (auth.currentUser) return auth.currentUser.uid;
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
}
