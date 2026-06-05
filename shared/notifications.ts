import Constants from 'expo-constants';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import i18n from '@translations/index';

// Registers this device's Expo push token on the user's doc so the
// notifyHostOnPhoto Cloud Function can push to the host. Safe no-op if the
// native module is missing (pre-rebuild) or permission is denied.
export async function registerPushTokenForUser(uid: string): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Notifications = require('expo-notifications');

    let granted = (await Notifications.getPermissionsAsync()).granted;
    if (!granted) granted = (await Notifications.requestPermissionsAsync()).granted;
    if (!granted) return;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      (Constants as { easConfig?: { projectId?: string } }).easConfig?.projectId;
    const { data: token } = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );
    // Save language too so the Cloud Functions push in the host's language.
    const lang = (i18n.language || 'en').slice(0, 2);
    if (token) await setDoc(doc(db, 'users', uid), { pushToken: token, lang }, { merge: true });
  } catch {
    /* native module missing (pre-rebuild) or permission denied — ignore */
  }
}

// Local notifications are best-effort. expo-notifications is loaded lazily so
// that a build WITHOUT the native module (e.g. an older dev client) degrades to
// a no-op instead of crashing at import time. Works once the app is rebuilt.
export async function scheduleLocalAt(id: string, whenMs: number, title: string, body: string): Promise<void> {
  try {
    if (whenMs <= Date.now() + 5000) return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Notifications = require('expo-notifications');

    const current = await Notifications.getPermissionsAsync();
    let granted = current.granted;
    if (!granted) {
      const req = await Notifications.requestPermissionsAsync();
      granted = req.granted;
    }
    if (!granted) return;

    await Notifications.scheduleNotificationAsync({
      identifier: id,
      content: { title, body, sound: true },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(whenMs) },
    });
  } catch {
    /* native module missing (pre-rebuild) or permission denied — ignore */
  }
}
