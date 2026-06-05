import {
  signInAnonymously,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  linkWithCredential,
  AuthCredential,
  signOut,
  deleteUser,
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

  // Links the credential to the current anonymous user so their events/photos
  // are preserved. If the credential already belongs to an existing account
  // (e.g. reinstall), sign into that account instead to recover the data.
  async linkOrSignIn(credential: AuthCredential): Promise<User> {
    const current = auth.currentUser;
    if (current && current.isAnonymous) {
      try {
        const { user } = await linkWithCredential(current, credential);
        await AuthService.ensureUserDoc(user);
        return user;
      } catch (e) {
        const code = (e as { code?: string })?.code;
        if (code !== 'auth/credential-already-in-use' && code !== 'auth/email-already-in-use') throw e;
      }
    }
    const { user } = await signInWithCredential(auth, credential);
    await AuthService.ensureUserDoc(user);
    return user;
  },

  async signInWithGoogle(idToken: string): Promise<User> {
    return AuthService.linkOrSignIn(GoogleAuthProvider.credential(idToken));
  },

  // Native Apple Sign-In (also satisfies "Face ID login" via the system sheet).
  // Modules are required lazily so a build without them doesn't crash at import.
  async signInWithApple(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AppleAuthentication = require('expo-apple-authentication');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Crypto = require('expo-crypto');

    const rawNonce = Crypto.randomUUID();
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      rawNonce,
    );
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce: hashedNonce,
    });
    if (!appleCredential.identityToken) throw new Error('Apple sign-in failed');
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: appleCredential.identityToken,
      rawNonce,
    });
    return AuthService.linkOrSignIn(credential);
  },

  async signOut(): Promise<void> {
    await signOut(auth);
  },

  // Deletes the Firebase auth user. Data tied to the account is purged separately
  // via EventService.purgeUserData before this is called.
  async deleteAccount(): Promise<void> {
    if (auth.currentUser) await deleteUser(auth.currentUser);
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
