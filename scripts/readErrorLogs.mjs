// Reads the most recent errorLogs docs from Firestore (reuses the Firebase CLI
// token, like seedPromoCodes). Usage: node scripts/readErrorLogs.mjs [limit]
import { readFileSync } from 'fs';
import { homedir } from 'os';

const PROJECT = 'everybodytakes';
const LIMIT = Number(process.argv[2] || 15);

async function accessToken() {
  const cfg = JSON.parse(readFileSync(`${homedir()}/.config/configstore/firebase-tools.json`, 'utf8'));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
      client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
      refresh_token: cfg.tokens.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  return (await res.json()).access_token;
}

const token = await accessToken();
const res = await fetch(
  `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents:runQuery`,
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'errorLogs' }],
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
        limit: LIMIT,
      },
    }),
  },
);
const rows = await res.json();
const flat = (f = {}) =>
  Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.stringValue ?? v.integerValue ?? v.timestampValue ?? JSON.stringify(v)]));
const docs = (rows || []).filter((r) => r.document).map((r) => flat(r.document.fields));
if (docs.length === 0) console.log('No errorLogs found.');
for (const d of docs) console.log(JSON.stringify(d, null, 2));
