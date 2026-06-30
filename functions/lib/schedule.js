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

// Two-stage free-event retention: warn 24h before the deadline, then delete —
// but NEVER delete without a prior warning, and never touch paid or
// grandfathered events. Kept pure so the gating is unit-testable.
// ev = { plan, retentionExempt, retentionDays, firstPhotoAtMs, purgeWarnSent }
function retentionPlan(ev, now) {
  const DAY = 24 * 60 * 60 * 1000;
  const eligible = ev.plan === 'free' && !ev.retentionExempt
    && ev.retentionDays != null && ev.firstPhotoAtMs != null;
  if (!eligible) return { warn: false, purge: false };

  const purgeAt = ev.firstPhotoAtMs + ev.retentionDays * DAY;
  const t = now.getTime();
  const warn = !ev.purgeWarnSent && t >= purgeAt - DAY;     // from 24h out, once
  const purge = !!ev.purgeWarnSent && t >= purgeAt;         // only after a warning
  return { warn, purge };
}

module.exports = { ymdInTz, dailyTickPlan, retentionPlan };
