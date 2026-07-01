// One-off backfill: grandfathers EVERY existing event by setting
// retentionExempt=true, so the free-tier retention job (eventRetentionTick) can
// NEVER auto-delete an event that predates the feature. Idempotent (skips events
// already exempt), so it is safe to re-run.
//
// This is belt-and-suspenders: the PRIMARY guard is that pre-retention events
// have no `retentionDays` field (undefined == null → ineligible). Run this once
// BEFORE deploying eventRetentionTick for absolute certainty.
//
// Auth: reuses the Firebase CLI's stored OAuth token (like seedPromoCodes /
// readErrorLogs — no service account needed). Run:
//   node scripts/backfillRetentionExempt.mjs
import { readFileSync } from 'fs';
import { homedir } from 'os';

const PROJECT = 'everybodytakes';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

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
const auth = { Authorization: `Bearer ${token}` };

let pageToken = '';
let scanned = 0;
let exempted = 0;
do {
  const url = `${BASE}/events?pageSize=300${pageToken ? `&pageToken=${pageToken}` : ''}`;
  const json = await (await fetch(url, { headers: auth })).json();
  for (const doc of json.documents || []) {
    scanned += 1;
    const id = doc.name.split('/').pop();
    const already = doc.fields?.retentionExempt?.booleanValue === true;
    if (already) continue;
    const patch = await fetch(`${BASE}/events/${id}?updateMask.fieldPaths=retentionExempt`, {
      method: 'PATCH',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { retentionExempt: { booleanValue: true } } }),
    });
    if (patch.ok) exempted += 1;
    else console.error('patch failed', id, await patch.text());
  }
  pageToken = json.nextPageToken || '';
} while (pageToken);

console.log(`Backfill done: ${scanned} events scanned, ${exempted} newly marked retentionExempt=true.`);
