import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase web keys are public by design — security lives in Firestore/Storage
// rules. Same project as the native GuestCam app, so guests share one backend.
const firebaseConfig = {
  apiKey: 'AIzaSyBDZBg0ROX64qVqsqcFi7KoO3svZnkR_Jc',
  authDomain: 'everybodytakes.firebaseapp.com',
  projectId: 'everybodytakes',
  storageBucket: 'everybodytakes.firebasestorage.app',
  messagingSenderId: '759909661412',
  appId: '1:759909661412:web:ba27e79b149d28aeeb4af1',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/** Guests are anonymous — sign in once and reuse the uid. */
export async function ensureAnon(): Promise<string> {
  if (auth.currentUser) return auth.currentUser.uid;
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
}
