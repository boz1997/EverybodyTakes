// Legal/support pages keep the original GitHub Pages URL (already registered in
// App Store Connect). With the custom domain set, GitHub redirects these to
// go.guestcam.store automatically, so the links keep working either way.
const SITE_BASE = 'https://boz1997.github.io/EverybodyTakes';
// QR / app-entry on the branded custom domain (apex, GitHub Pages).
const QR_BASE = 'https://guestcam.store';

export const LINKS = {
  privacy: `${SITE_BASE}/privacy.html`,
  terms: `${SITE_BASE}/terms.html`,
  support: `${SITE_BASE}/support.html`,
  supportEmail: 'ozdorukberk@gmail.com',
  // QR target: a real HTTPS page so the phone's native camera can open it.
  // The page bridges into the app (guestcam://) or shows the code as fallback.
  eventUrl: (code: string) => `${QR_BASE}/e.html?code=${encodeURIComponent(code)}`,
} as const;
