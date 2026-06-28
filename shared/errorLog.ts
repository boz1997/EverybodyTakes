import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { auth, db } from '@lib/firebase';

// Error logs self-expire so the collection can't grow without bound. Requires a
// Firestore TTL policy on errorLogs.expireAt (enable once in the console/gcloud);
// the field is harmless if the policy isn't set.
const LOG_TTL_DAYS = 30;

// Lightweight remote error log. Writes to the `errorLogs` Firestore collection
// so failures on other people's devices are actually visible to us. Best-effort:
// it swallows its own errors and never blocks the calling flow.
export async function logError(
  context: string,
  error: unknown,
  extra?: Record<string, unknown>,
): Promise<void> {
  const e = error as { message?: string; code?: string };
  const message = e?.message ?? String(error);
  const code = e?.code ?? null;
  if (__DEV__) console.warn(`[logError:${context}]`, code ?? '', message, extra ?? '');
  try {
    await addDoc(collection(db, 'errorLogs'), {
      context,
      message: String(message).slice(0, 1000),
      code,
      extra: extra ?? null,
      uid: auth.currentUser?.uid ?? null,
      platform: Platform.OS,
      appVersion: Constants.expoConfig?.version ?? null,
      createdAt: serverTimestamp(),
      expireAt: Timestamp.fromMillis(Date.now() + LOG_TTL_DAYS * 24 * 60 * 60 * 1000),
    });
  } catch {
    /* logging must never throw */
  }
}
