// Tiny i18n — guests arrive in many languages; start with EN + TR and grow.
const dict: Record<string, Record<string, string>> = {
  en: {
    joining: 'Joining event…', notFound: 'Event not found', enterCode: 'Enter event code',
    codePlaceholder: '6-digit code', go: 'Go', yourName: 'Your name', anonymous: 'Anonymous',
    namePlaceholder: 'You can stay anonymous', photo: 'Photo', video: 'Video',
    shotsLeft: '{n} shots left', noShots: 'No shots left', uploading: 'Uploading…',
    ended: 'This event has ended', gallery: 'Gallery', empty: 'No photos yet — be the first!',
    all: 'All', mine: 'Mine', by: 'By', download: 'Download', developing: 'Photos reveal after the event',
    full: 'This event is full', capReached: 'Photo limit reached for this event',
  },
  tr: {
    joining: 'Etkinliğe katılıyor…', notFound: 'Etkinlik bulunamadı', enterCode: 'Etkinlik kodunu gir',
    codePlaceholder: '6 haneli kod', go: 'Git', yourName: 'Adın', anonymous: 'Anonim',
    namePlaceholder: 'Anonim kalabilirsin', photo: 'Fotoğraf', video: 'Video',
    shotsLeft: '{n} çekim kaldı', noShots: 'Çekim kalmadı', uploading: 'Yükleniyor…',
    ended: 'Bu etkinlik sona erdi', gallery: 'Galeri', empty: 'Henüz fotoğraf yok — ilk sen ol!',
    all: 'Tümü', mine: 'Benim', by: 'Çeken', download: 'İndir', developing: 'Fotoğraflar etkinlikten sonra açılır',
    full: 'Bu etkinlik dolu', capReached: 'Bu etkinliğin fotoğraf limiti doldu',
  },
};

const lang = (navigator.language || 'en').toLowerCase().startsWith('tr') ? 'tr' : 'en';

export function t(key: string, vars?: Record<string, string | number>): string {
  let s = dict[lang][key] ?? dict.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
