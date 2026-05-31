import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@guestcam_joined_events';
const NICK_KEY = '@guestcam_nickname';
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
