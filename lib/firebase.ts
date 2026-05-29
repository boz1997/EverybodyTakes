import { initializeApp, getApps, getApp } from 'firebase/app';
// getReactNativePersistence ships in firebase's react-native build (Metro
// resolves it); the node/browser typings omit it, hence the suppression.
// @ts-expect-error - RN-only export, present at runtime under Metro
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Persist auth across launches via AsyncStorage (v2 API: pass the store
// directly). initializeAuth throws if called twice on hot reload, so fall
// back to the existing instance.
let auth: Auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  auth = getAuth(app);
}

let db: Firestore;
try {
  // React Native's WebChannel transport is unreliable; force long polling.
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
} catch {
  db = getFirestore(app);
}

export const storage = getStorage(app);
export { auth, db };
export default app;
