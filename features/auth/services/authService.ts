import {
  signInAnonymously,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EMAIL_KEY = '@guestcam_pending_email';

export const AuthService = {
  async signInAnonymous(): Promise<User> {
    const { user } = await signInAnonymously(auth);
    await AuthService.ensureUserDoc(user);
    return user;
  },

  async sendMagicLink(email: string): Promise<void> {
    await AsyncStorage.setItem(EMAIL_KEY, email);
    await sendSignInLinkToEmail(auth, email, {
      url: 'https://guestcam.app/auth/callback',
      handleCodeInApp: true,
      iOS: { bundleId: 'com.guestcam.app' },
      android: { packageName: 'com.guestcam.app', installApp: true, minimumVersion: '12' },
    });
  },

  async signInWithGoogle(idToken: string): Promise<User> {
    const credential = GoogleAuthProvider.credential(idToken);
    const { user } = await signInWithCredential(auth, credential);
    await AuthService.ensureUserDoc(user);
    return user;
  },

  async signInWithApple(identityToken: string): Promise<User> {
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({ idToken: identityToken });
    const { user } = await signInWithCredential(auth, credential);
    await AuthService.ensureUserDoc(user);
    return user;
  },

  async signOut(): Promise<void> {
    await signOut(auth);
  },

  async ensureUserDoc(user: User): Promise<void> {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        displayName: user.displayName ?? null,
        email: user.email ?? null,
        photoURL: user.photoURL ?? null,
        isAnonymous: user.isAnonymous,
        plan: 'free',
        createdAt: serverTimestamp(),
      });
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
