import { useEffect, useRef, useState } from 'react';
import { ensureAnon } from './firebase';
import { getByShortCode, joinEvent, subscribeToPhotos, LimitError } from './events';
import type { Event, Photo } from './types';
import { t } from './i18n';
import { Camera } from './components/Camera';
import { Gallery } from './components/Gallery';

type Phase = 'loading' | 'needCode' | 'error' | 'ready';
const NICK_KEY = 'guestcam_nick';

function codeFromUrl(): string {
  const p = new URLSearchParams(window.location.search).get('code');
  return (p ?? '').trim();
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [event, setEvent] = useState<Event | null>(null);
  const [uid, setUid] = useState('');
  const [shots, setShots] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [nickname, setNickname] = useState(() => localStorage.getItem(NICK_KEY) ?? '');
  const [codeInput, setCodeInput] = useState('');
  const unsubRef = useRef<(() => void) | null>(null);

  async function enter(code: string) {
    if (!code) { setPhase('needCode'); return; }
    setPhase('loading');
    try {
      const userId = await ensureAnon();
      setUid(userId);
      const ev = await getByShortCode(code);
      if (!ev) { setPhase('error'); return; }
      setEvent(ev);
      if (ev.isActive) {
        try {
          const remaining = await joinEvent(ev.id, userId, nickname || null);
          setShots(remaining);
        } catch (e) {
          if (e instanceof LimitError && e.code === 'event_full') { /* full: gallery only */ }
        }
      }
      unsubRef.current = subscribeToPhotos(ev.id, setPhotos);
      setPhase('ready');
    } catch {
      setPhase('error');
    }
  }

  useEffect(() => {
    enter(codeFromUrl());
    return () => unsubRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNick = (v: string) => { setNickname(v); localStorage.setItem(NICK_KEY, v); };

  if (phase === 'loading') {
    return <Centered><Spinner /><p className="text-ink-soft">{t('joining')}</p></Centered>;
  }

  if (phase === 'needCode') {
    return (
      <Centered>
        <Logo />
        <h1 className="text-xl font-bold">{t('enterCode')}</h1>
        <input
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
          placeholder={t('codePlaceholder')}
          maxLength={6}
          className="w-56 text-center tracking-[0.3em] text-lg font-semibold rounded-2xl border border-line bg-paper-card px-4 py-3 outline-none focus:border-brand"
        />
        <button onClick={() => enter(codeInput)} className="w-56 rounded-2xl bg-brand py-3 font-semibold text-white active:scale-95 transition">
          {t('go')}
        </button>
      </Centered>
    );
  }

  if (phase === 'error' || !event) {
    return <Centered><Logo /><p className="text-ink-soft">{t('notFound')}</p></Centered>;
  }

  return (
    <div className="min-h-full pb-32">
      {/* Cover */}
      <div className="relative h-44 w-full overflow-hidden bg-paper-deep">
        {event.coverImageUrl
          ? <img src={event.coverImageUrl} alt="" className="h-full w-full object-cover" />
          : <div className="flex h-full items-center justify-center"><Logo small /></div>}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white drop-shadow">{event.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4">
        {/* Nickname */}
        <label className="mt-4 block text-sm font-medium text-ink-soft">{t('yourName')}</label>
        <input
          value={nickname}
          onChange={(e) => onNick(e.target.value)}
          placeholder={t('namePlaceholder')}
          maxLength={30}
          className="mt-1 w-full rounded-xl border border-line bg-paper-card px-3 py-2.5 outline-none focus:border-brand"
        />

        <Gallery event={event} uid={uid} photos={photos} />
      </div>

      {/* Capture bar */}
      {event.isActive
        ? <Camera event={event} uid={uid} nickname={nickname} shots={shots} onShotsChange={setShots} />
        : <div className="fixed inset-x-0 bottom-0 bg-paper/90 py-4 text-center text-sm text-ink-muted backdrop-blur">{t('ended')}</div>}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center">{children}</div>;
}
function Spinner() {
  return <div className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-brand" />;
}
function Logo({ small }: { small?: boolean }) {
  return <div className={`font-bold tracking-tight ${small ? 'text-2xl' : 'text-3xl'}`}>Guest<span className="text-brand">Cam</span></div>;
}
