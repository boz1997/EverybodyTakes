import {
  signInAnonymously,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  linkWithCredential,
  AuthCredential,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  // are preserved. If the identity already has an account (e.g. delete +
  // reinstall), sign into that account to recover the data.
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
        // The link attempt consumed the original Apple/Google token, so we must
        // sign in with the fresh credential Firebase attaches to the error —
        // reusing `credential` here would fail as already-consumed.
        const recovered =
          OAuthProvider.credentialFromError(e as never) ??
          GoogleAuthProvider.credentialFromError(e as never) ??
          credential;
        const { user } = await signInWithCredential(auth, recovered);
        await AuthService.ensureUserDoc(user);
        return user;
      }
    }
    const { user } = await signInWithCredential(auth, credential);
    await AuthService.ensureUserDoc(user);
    return user;
  },

  // Native Google Sign-In. Modules required lazily so a build without them
  // doesn't crash at import; links to the anonymous user to preserve data.
  async signInWithGoogle(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { GoogleSignin } = require('@react-native-google-signin/google-signin');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Constants = require('expo-constants').default;

    const iosClientId = Constants.expoConfig?.extra?.googleIosClientId;
    GoogleSignin.configure({ iosClientId });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }).catch(() => {});
    const res = await GoogleSignin.signIn();
    if (res?.type === 'cancelled') throw new Error('cancelled');
    const idToken = res?.data?.idToken ?? res?.idToken;
    if (!idToken) throw new Error('Google sign-in failed');
    return AuthService.linkOrSignIn(GoogleAuthProvider.credential(idToken));
  },

  // Email + password: signs in to an existing account, or creates a new one.
  // Links to the current anonymous user when possible so data is preserved.
  // Throws 'wrong-password' when the email exists but the password is wrong.
  async signInWithEmail(email: string, password: string): Promise<User> {
    const e = email.trim();
    const current = auth.currentUser;
    if (current && current.isAnonymous) {
      try {
        const { user } = await linkWithCredential(current, EmailAuthProvider.credential(e, password));
        await AuthService.ensureUserDoc(user);
        return user;
      } catch (err) {
        const code = (err as { code?: string })?.code;
        if (code !== 'auth/email-already-in-use' && code !== 'auth/credential-already-in-use') throw err;
        // Account already exists → fall through to sign in below.
      }
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, e, password);
      await AuthService.ensureUserDoc(user);
      return user;
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, e, password);
          await AuthService.ensureUserDoc(user);
          return user;
        } catch (err2) {
          if ((err2 as { code?: string })?.code === 'auth/email-already-in-use') throw new Error('wrong-password');
          throw err2;
        }
      }
      throw err;
    }
  },

  // Native Apple Sign-In (also satisfies "Face ID login" via the system sheet).
  // Modules are required lazily so a build without them doesn't crash at import.
  async signInWithApple(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AppleAuthentication = require('expo-apple-authentication');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Crypto = require('expo-crypto');

    if (!(await AppleAuthentication.isAvailableAsync())) {
      throw new Error('apple-unavailable');
    }

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
