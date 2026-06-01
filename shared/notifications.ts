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
