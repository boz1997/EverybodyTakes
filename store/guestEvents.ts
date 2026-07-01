import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@guestcam_joined_events';
const NICK_KEY = '@guestcam_nickname';
const BLOCKED_KEY = '@guestcam_blocked_users';
const MAX = 30;

export async function getSavedNickname(): Promise<string> {
  try { return (await AsyncStorage.getItem(NICK_KEY)) ?? ''; } catch { return ''; }
}

export async function saveNickname(name: string): Promise<void> {
  try { await AsyncStorage.setItem(NICK_KEY, name); } catch { /* ignore */ }
}

export interface JoinedEvent {
  id: string;
  code: string;
  name: string;
  coverImageUrl: string | null;
  type: string;
  joinedAt: number;
}

export async function getJoinedEvents(): Promise<JoinedEvent[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as JoinedEvent[]) : [];
  } catch {
    return [];
  }
}

// Most-recent first; de-dupe by id so re-joining just bumps it to the top.
export async function addJoinedEvent(event: JoinedEvent): Promise<void> {
  const existing = await getJoinedEvents();
  const next = [event, ...existing.filter((e) => e.id !== event.id)].slice(0, MAX);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function removeJoinedEvent(id: string): Promise<void> {
  const existing = await getJoinedEvents();
  await AsyncStorage.setItem(KEY, JSON.stringify(existing.filter((e) => e.id !== id)));
}

// Drop locally-remembered events the server no longer has (host deleted them),
// keyed by the set of ids that still exist. Returns the pruned list. Caller
// supplies the existing-id set (from EventService.joinedStatus) so this stays a
// pure storage helper. No-op if nothing was removed.
export async function pruneDeletedJoined(existingIds: Set<string>): Promise<JoinedEvent[]> {
  const events = await getJoinedEvents();
  const kept = events.filter((e) => existingIds.has(e.id));
  if (kept.length !== events.length) await AsyncStorage.setItem(KEY, JSON.stringify(kept));
  return kept;
}

// Wipe all local GuestCam state (used on account deletion).
export async function clearAllLocal(): Promise<void> {
  await AsyncStorage.multiRemove([KEY, NICK_KEY, BLOCKED_KEY]).catch(() => {});
}
