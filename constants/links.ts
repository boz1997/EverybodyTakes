// Public legal & support pages (hosted on GitHub Pages from /docs).
// Swap the base to a custom domain later without touching call sites.
const SITE_BASE = 'https://boz1997.github.io/EverybodyTakes';

export const LINKS = {
  privacy: `${SITE_BASE}/privacy.html`,
  terms: `${SITE_BASE}/terms.html`,
  support: `${SITE_BASE}/support.html`,
  supportEmail: 'ozdorukberk@gmail.com',
} as const;
