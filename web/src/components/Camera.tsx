import { useRef, useState } from 'react';
import { decrementShots, refundShot, uploadPhoto, LimitError } from '../events';
import { track } from '../firebase';
import type { Event } from '../types';
import { t } from '../i18n';

interface Props {
  event: Event;
  uid: string;
  nickname: string;
  shots: number;
  onShotsChange: (n: number) => void;
}

export function Camera({ event, uid, nickname, shots, onShotsChange }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const albumRef = useRef<HTMLInputElement>(null);

  const noShots = shots <= 0;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>, forced?: 'image' | 'video') {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || busy || noShots) return;
    const mediaType = forced ?? (file.type.startsWith('video') ? 'video' : 'image');
    setBusy(true);
    setError('');
    let decremented = false;
    try {
      await decrementShots(event.id, uid);
      decremented = true;
      onShotsChange(shots - 1);
      await uploadPhoto(event.id, uid, nickname.trim() || null, file, mediaType);
      track('web_upload', { mediaType });
    } catch (err) {
      if (err instanceof LimitError) {
        setError(err.code === 'no_shots' ? t('noShots') : err.code === 'photo_cap' ? t('capReached') : t('ended'));
      } else {
        // Give the shot back — a flaky network shouldn't cost a capture.
        if (decremented) {
          await refundShot(event.id, uid);
          onShotsChange(shots);
        }
        setError(t('uploadFailed'));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {error && <p className="mb-2 text-center text-xs font-semibold text-brand">{error}</p>}
        {/* Remaining-shots pill */}
        <div className="mb-2 flex justify-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${noShots ? 'bg-brand/10 text-brand' : 'bg-paper-card text-ink-soft'}`}>
            <IconCamera small /> {noShots ? t('noShots') : t('shotsLeft', { n: shots })}
          </span>
        </div>

        <input ref={photoRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onPick(e, 'image')} />
        <input ref={videoRef} type="file" accept="video/*" capture="environment" hidden onChange={(e) => onPick(e, 'video')} />
        <input ref={albumRef} type="file" accept="image/*,video/*" hidden onChange={(e) => onPick(e)} />

        <div className="flex items-center gap-2.5">
          <button
            disabled={busy || noShots}
            onClick={() => photoRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
          >
            <IconCamera /> {busy ? t('uploading') : t('photo')}
          </button>
          <button
            disabled={busy || noShots}
            onClick={() => videoRef.current?.click()}
            aria-label={t('video')}
            className="grid h-[52px] w-[52px] place-items-center rounded-2xl border border-brand text-brand transition active:scale-[0.98] disabled:opacity-40"
          >
            <IconVideo />
          </button>
          {event.allowGalleryUpload && (
            <button
              disabled={busy || noShots}
              onClick={() => albumRef.current?.click()}
              aria-label={t('fromAlbum')}
              className="grid h-[52px] w-[52px] place-items-center rounded-2xl border border-line text-ink-soft transition active:scale-[0.98] disabled:opacity-40"
            >
              <IconAlbum />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function IconCamera({ small }: { small?: boolean }) {
  const s = small ? 14 : 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
function IconVideo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
function IconAlbum() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.5-3.5L9 20" />
    </svg>
  );
}
