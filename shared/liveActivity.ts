// Thin, crash-safe wrapper around expo-live-activity. The module is loaded
// lazily so a build without the native target (Expo Go / older dev client)
// degrades to a no-op instead of throwing at import time.
import { colors } from '@constants/theme';

type LiveActivityModule = {
  startActivity: (state: unknown, config?: unknown, relevance?: number) => string | undefined;
  updateActivity: (id: string, state: unknown, relevance?: number) => void;
  stopActivity: (id: string, state: unknown, relevance?: number) => void;
};

function getModule(): LiveActivityModule | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('expo-live-activity') as LiveActivityModule;
  } catch {
    return null;
  }
}

// On-brand lock-screen card: dark ink card, amber accents.
const CONFIG = {
  backgroundColor: colors.text.primary,   // #221D16 ink
  titleColor: '#FFFFFF',
  subtitleColor: colors.brand.light,      // #D68A4C
  progressViewTint: colors.brand.DEFAULT, // #BE6A2E
  progressViewLabelColor: '#FFFFFF',
};

function buildState(title: string, subtitle: string, progress?: number) {
  return { title, subtitle, progressBar: progress != null ? { progress } : {} };
}

/** Starts the "shots remaining" Live Activity. Returns an id to update/stop. */
export function startShotsActivity(title: string, subtitle: string, progress?: number): string | null {
  const m = getModule();
  if (!m) return null;
  try {
    return m.startActivity(buildState(title, subtitle, progress), CONFIG) ?? null;
  } catch {
    return null;
  }
}

export function updateShotsActivity(id: string, title: string, subtitle: string, progress?: number): void {
  const m = getModule();
  if (!m) return;
  try { m.updateActivity(id, buildState(title, subtitle, progress)); } catch { /* ignore */ }
}

export function stopShotsActivity(id: string, title: string, subtitle: string, progress?: number): void {
  const m = getModule();
  if (!m) return;
  try { m.stopActivity(id, buildState(title, subtitle, progress)); } catch { /* ignore */ }
}
