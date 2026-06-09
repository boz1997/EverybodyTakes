import { useRef, useState } from 'react';
import { decrementShots, uploadPhoto, LimitError } from '../events';
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
  const photoRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const noShots = shots <= 0;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>, mediaType: 'image' | 'video') {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-picking the same capture
    if (!file || busy) return;
    if (noShots) return;
    setBusy(true);
    try {
      await decrementShots(event.id, uid);
      onShotsChange(shots - 1);
      await uploadPhoto(event.id, uid, nickname.trim() || null, file, mediaType);
    } catch (err) {
      if (err instanceof LimitError) {
        alert(err.code === 'no_shots' ? t('noShots') : err.code === 'photo_cap' ? t('capReached') : t('ended'));
      } else {
        alert(t('uploading') + ' ✗');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <input ref={photoRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onPick(e, 'image')} />
        <input ref={videoRef} type="file" accept="video/*" capture="environment" hidden onChange={(e) => onPick(e, 'video')} />

        <button
          disabled={busy || noShots}
          onClick={() => photoRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 font-semibold text-white transition active:scale-95 disabled:opacity-40"
        >
          <IconCamera /> {busy ? t('uploading') : t('photo')}
        </button>
        <button
          disabled={busy || noShots}
          onClick={() => videoRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-2xl border border-brand px-4 py-3.5 font-semibold text-brand transition active:scale-95 disabled:opacity-40"
        >
          <IconVideo />
        </button>
      </div>
      <p className="pb-2 text-center text-xs text-ink-muted">
        {noShots ? t('noShots') : t('shotsLeft', { n: shots })}
      </p>
    </div>
  );
}

function IconCamera() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
function IconVideo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
