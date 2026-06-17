// One-off seeder: creates promo codes in Firestore (promoCodes collection).
// Each code is single-use; the app flips `used` to true on redeem.
//
// Auth: reuses the Firebase CLI's stored OAuth token (no service account
// needed). Run:  node scripts/seedPromoCodes.mjs [count]
import { readFileSync } from 'fs';
import { homedir } from 'os';

const PROJECT = 'everybodytakes';
const COUNT = Number(process.argv[2] || 50);
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O/1/I/L
const LEN = 8;

function genCode() {
  let s = '';
  for (let i = 0; i < LEN; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return s;
}

async function accessToken() {
  const cfg = JSON.parse(readFileSync(`${homedir()}/.config/configstore/firebase-tools.json`, 'utf8'));
  const refresh = cfg.tokens?.refresh_token;
  if (!refresh) throw new Error('No firebase CLI refresh token — run `firebase login`.');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
      client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
      refresh_token: refresh,
      grant_type: 'refresh_token',
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error('Token exchange failed: ' + JSON.stringify(json));
  return json.access_token;
}

async function createCode(token, code) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/promoCodes?documentId=${code}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        code: { stringValue: code },
        used: { booleanValue: false },
        createdAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (res.status === 409) return 'exists';
  if (!res.ok) throw new Error(`${code}: ${res.status} ${await res.text()}`);
  return 'created';
}

const token = await accessToken();
const codes = new Set();
while (codes.size < COUNT) codes.add(genCode());

const created = [];
for (const code of codes) {
  const r = await createCode(token, code);
  if (r === 'created') created.push(code);
}

console.log(`\n✅ ${created.length} promo code created in '${PROJECT}':\n`);
console.log(created.join('\n'));
