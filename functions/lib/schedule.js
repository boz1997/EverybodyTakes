// Scheduled-tick date logic, kept pure so it can be unit-tested without the
// Cloud Functions runtime.
//
// Cloud Functions run in UTC, but events live on a calendar day in the host's
// region. Comparing days with getDate()/getMonth() (UTC) closed events a day
// early — e.g. a "June 5" event picked at local midnight is stored as
// 2026-06-04T21:00Z, whose UTC day is June 4. We compare calendar days in the
// business timezone instead.

// YYYY-MM-DD for an instant, rendered in a specific IANA timezone.
function ymdInTz(date, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date);
}

// Which one-time daily-tick notifications are due for an event right now. There
// is NO auto-close: events stay open until the host closes them. Pure → testable.
//   • remind: the day before a dated event (calendar day in `timeZone`)
//   • wrap:   a "your event has wrapped — keep or close the gallery?" nudge,
//             48h after a dated event, or 1 week after the first photo for an
//             event with no set date.
// ev = { dateIso, firstPhotoAtMs, reminderSent, wrapSent }
function dailyTickPlan(ev, now, timeZone) {
  const DAY = 24 * 60 * 60 * 1000;

  const remind = !!ev.dateIso && !ev.reminderSent
    && ymdInTz(new Date(ev.dateIso), timeZone) === ymdInTz(new Date(now.getTime() + DAY), timeZone);

  let wrap = false;
  if (!ev.wrapSent) {
    if (ev.dateIso) {
      wrap = now.getTime() >= new Date(ev.dateIso).getTime() + 2 * DAY;          // 48h after a dated event
    } else if (ev.firstPhotoAtMs != null) {
      wrap = now.getTime() >= ev.firstPhotoAtMs + 7 * DAY;                        // 1 week after first photo
    }
  }

  return { remind, wrap };
}

// Free-tier retention. A free event's photos are deleted `retentionDays` after
// its first photo — but ONLY after a single 24h warning, and NEVER for a paid,
// grandfathered (retentionExempt), or photo-less event. Two stages so nothing is
// ever deleted without notice; the host can upgrade in between to keep it.
// Pure → testable.  ev = { plan, retentionExempt, retentionDays, firstPhotoAtMs, warned }
function retentionPlan(ev, now) {
  const DAY = 24 * 60 * 60 * 1000;

  // `retentionDays == null` covers paid plans AND pre-retention events (the field
  // is absent → undefined == null), so old free events are never eligible.
  const eligible = ev.plan === 'free'
    && !ev.retentionExempt
    && ev.retentionDays != null
    && ev.firstPhotoAtMs != null;
  if (!eligible) return { warn: false, purge: false };

  const t = now.getTime();
  const purgeAt = ev.firstPhotoAtMs + ev.retentionDays * DAY;
  const warn = !ev.warned && t >= purgeAt - DAY;    // once, from 24h before the deadline
  const purge = !!ev.warned && t >= purgeAt;         // only after a warning was sent
  return { warn, purge };
}

module.exports = { ymdInTz, dailyTickPlan, retentionPlan };
