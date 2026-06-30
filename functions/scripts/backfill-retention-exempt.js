// One-time backfill: marks every EXISTING event as exempt from retention, so the
// new 7-day free-event auto-delete only ever applies to events created AFTER it
// shipped. Existing hosts never agreed to deletion, so they keep their albums.
//
// Run once, after deploying the retention change, from functions/:
//   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
//     node scripts/backfill-retention-exempt.js
//
// Idempotent and safe to re-run: it only sets a flag (merge), never deletes.
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function main() {
  const snap = await db.collection('events').get();
  console.log(`events found: ${snap.size}`);

  let marked = 0;
  let batch = db.batch();
  let inBatch = 0;
  for (const doc of snap.docs) {
    batch.set(doc.ref, { retentionExempt: true }, { merge: true });
    inBatch += 1;
    marked += 1;
    if (inBatch === 400) {            // Firestore batch limit is 500; stay clear
      await batch.commit();
      batch = db.batch();
      inBatch = 0;
    }
  }
  if (inBatch > 0) await batch.commit();
  console.log(`retentionExempt set on ${marked} events`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
