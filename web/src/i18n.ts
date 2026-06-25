// Tiny i18n — guests arrive in many languages; start with EN + TR and grow.
const dict: Record<string, Record<string, string>> = {
  en: {
    joining: 'Joining event…', notFound: "We couldn't find that event. Check the code and try again.", enterCode: 'Enter event code',
    codeHint: 'Find it on the QR card or invite.', tryAgain: 'Try another code', live: 'Live',
    codePlaceholder: 'ABC123', go: 'Join event', yourName: 'Your name', anonymous: 'Anonymous',
    namePlaceholder: 'You can stay anonymous', photo: 'Photo', video: 'Video', fromAlbum: 'From album',
    shotsLeft: '{n} left', noShots: 'No shots left', uploading: 'Uploading…',
    ended: 'This event has ended', gallery: 'Gallery', empty: 'No photos yet — be the first!',
    all: 'All', mine: 'Mine', by: 'By', download: 'Download', developing: 'Photos reveal after the event',
    full: 'This event is full', capReached: 'Photo limit reached for this event',
    opensAt: 'Opens {time}', uploadFailed: 'Upload failed — your shot was returned. Try again.',
    report: 'Report', reportConfirm: 'Report this photo? It will be hidden and reviewed.',
    reported: 'Thanks — the content was reported and hidden.',
    deleteBtn: 'Delete', deleteConfirm: 'Delete this photo?',
  },
  tr: {
    joining: 'Etkinliğe katılıyor…', notFound: 'Bu etkinliği bulamadık. Kodu kontrol edip tekrar dene.', enterCode: 'Etkinlik kodunu gir',
    codeHint: 'QR kartında ya da davetiyede yazıyor.', tryAgain: 'Başka kod dene', live: 'Canlı',
    codePlaceholder: 'ABC123', go: 'Etkinliğe katıl', yourName: 'Adın', anonymous: 'Anonim',
    namePlaceholder: 'Anonim kalabilirsin', photo: 'Fotoğraf', video: 'Video', fromAlbum: 'Albümden',
    shotsLeft: '{n} kaldı', noShots: 'Çekim kalmadı', uploading: 'Yükleniyor…',
    ended: 'Bu etkinlik sona erdi', gallery: 'Galeri', empty: 'Henüz fotoğraf yok — ilk sen ol!',
    all: 'Tümü', mine: 'Benim', by: 'Çeken', download: 'İndir', developing: 'Fotoğraflar etkinlikten sonra açılır',
    full: 'Bu etkinlik dolu', capReached: 'Bu etkinliğin fotoğraf limiti doldu',
    opensAt: '{time} açılır', uploadFailed: 'Yükleme başarısız — çekim hakkın iade edildi. Tekrar dene.',
    report: 'Bildir', reportConfirm: 'Bu fotoğraf bildirilsin mi? Gizlenir ve incelenir.',
    reported: 'Teşekkürler — içerik bildirildi ve gizlendi.',
    deleteBtn: 'Sil', deleteConfirm: 'Bu fotoğraf silinsin mi?',
  },
};

const lang = (navigator.language || 'en').toLowerCase().startsWith('tr') ? 'tr' : 'en';

export function t(key: string, vars?: Record<string, string | number>): string {
  let s = dict[lang][key] ?? dict.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
