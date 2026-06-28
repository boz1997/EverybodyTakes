import { Note } from '@features/events/services/eventService';

// Minimal HTML escaping so a guest's note text can't break (or inject into) the
// generated document.
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// Renders all notes into a warm "memory book" PDF and opens the share sheet so the
// host can save or send it. Print/Sharing are required lazily so a build without
// the native modules doesn't crash at import.
export async function exportNotesPdf(opts: {
  eventName: string;
  bookTitle: string;
  anonymous: string;
  notes: Note[];
}): Promise<void> {
  const { eventName, bookTitle, anonymous, notes } = opts;

  const rows = notes
    .map((n) => `<div class="note"><div class="author">${esc(n.authorName?.trim() || anonymous)}</div><div class="text">${esc(n.text)}</div></div>`)
    .join('');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8" />
<style>
  @page { margin: 44px 36px; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #221D16; }
  .brand { text-align: right; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 6px; }
  .brand .cam { color: #BE6A2E; }
  .cover { text-align: center; padding-bottom: 24px; border-bottom: 2px solid #BE6A2E; margin-bottom: 28px; }
  .cover h1 { font-size: 30px; margin: 0; }
  .cover .sub { font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #BE6A2E; margin-top: 8px; }
  .note { border: 1px solid #E6DCC8; border-radius: 14px; padding: 16px 18px; margin-bottom: 14px; page-break-inside: avoid; background: #FBF7EE; }
  .note .author { font-size: 13px; font-weight: bold; color: #BE6A2E; margin-bottom: 4px; }
  .note .text { font-size: 16px; line-height: 1.5; white-space: pre-wrap; }
</style></head>
<body>
  <div class="brand">Guest<span class="cam">Cam</span></div>
  <div class="cover"><h1>${esc(eventName)}</h1><div class="sub">${esc(bookTitle)}</div></div>
  ${rows}
</body></html>`;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Print = require('expo-print');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sharing = require('expo-sharing');

  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' });
  }
}
