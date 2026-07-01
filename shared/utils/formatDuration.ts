// Pure, dependency-free helper for showing a clip length as m:ss (e.g. 0:07,
// 1:03). Used by the voice recorder and the host's voice list. Negative or
// non-finite inputs clamp to 0:00 so a bad duration never renders as "-1:59".
export function formatDuration(ms: number): string {
  const totalSeconds = Number.isFinite(ms) && ms > 0 ? Math.floor(ms / 1000) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
