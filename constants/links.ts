// Public legal & support pages (hosted on GitHub Pages from /docs).
// Swap the base to a custom domain later without touching call sites.
const SITE_BASE = 'https://boz1997.github.io/EverybodyTakes';

export const LINKS = {
  privacy: `${SITE_BASE}/privacy.html`,
  terms: `${SITE_BASE}/terms.html`,
  support: `${SITE_BASE}/support.html`,
  supportEmail: 'ozdorukberk@gmail.com',
  // QR target: a real HTTPS page so the phone's native camera can open it.
  // The page bridges into the app (guestcam://) or shows the code as fallback.
  eventUrl: (code: string) => `${SITE_BASE}/e.html?code=${encodeURIComponent(code)}`,
} as const;
