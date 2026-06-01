import * as Notifications from 'expo-notifications';

async function ensurePermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

// Schedules a one-off local notification at `whenMs`. Uses a stable id so
// re-scheduling (e.g. re-joining) replaces rather than duplicates.
export async function scheduleLocalAt(id: string, whenMs: number, title: string, body: string): Promise<void> {
  try {
    if (whenMs <= Date.now() + 5000) return;
    if (!(await ensurePermission())) return;
    await Notifications.scheduleNotificationAsync({
      identifier: id,
      content: { title, body, sound: true },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(whenMs) },
    });
  } catch {
    /* notifications are best-effort */
  }
}
