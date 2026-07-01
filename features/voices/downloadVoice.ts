import * as FileSystem from 'expo-file-system/legacy';

// Downloads one voice clip to a cache file named after its author, then opens the
// iOS share sheet so the host can "Save to Files", AirDrop, or send it. Sharing is
// required lazily (native module) so a build without it doesn't crash at import —
// mirrors exportNotesPdf.
export async function shareVoice(url: string, authorName: string | null): Promise<void> {
  const safe = (authorName?.trim() || 'voice').replace(/[^\p{L}\p{N} _-]/gu, '').slice(0, 40) || 'voice';
  const target = FileSystem.cacheDirectory + `${safe}.m4a`;
  const { uri } = await FileSystem.downloadAsync(url, target);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sharing = require('expo-sharing');
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'audio/m4a', UTI: 'com.apple.m4a-audio' });
  }
}
