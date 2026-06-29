import { useEffect, useRef, useState } from 'react';
import { ensureAnon, track } from './firebase';
import { getByShortCode, joinEvent, subscribeToPhotos, getMyNote, LimitError } from './events';
import type { Event, Photo } from './types';
import { t } from './i18n';
import { Camera } from './components/Camera';
import { Gallery } from './components/Gallery';
import { NoteModal } from './components/NoteModal';

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
  const [noteOpen, setNoteOpen] = useState(false);
  const [hasNote, setHasNote] = useState(false);
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
          track('web_join', { eventType: ev.type });
        } catch (e) {
          if (e instanceof LimitError && e.code === 'event_full') { /* full: gallery only */ }
        }
      }
      unsubRef.current = subscribeToPhotos(ev.id, setPhotos);
      if (ev.notes && ev.notesEnabled !== false) getMyNote(ev.id, userId).then((n) => setHasNote(!!n)).catch(() => {});
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
    return (
      <Centered>
        <Logo />
        <Spinner />
        <p className="text-ink-soft">{t('joining')}</p>
      </Centered>
    );
  }

  if (phase === 'needCode') {
    return (
      <Centered>
        <div className="w-full max-w-xs rounded-3xl border border-line bg-paper-card/80 px-7 py-9 shadow-[0_30px_60px_-40px_rgba(58,38,18,0.5)] backdrop-blur">
          <Logo />
          <h1 className="mt-6 font-serif text-2xl font-semibold leading-tight">{t('enterCode')}</h1>
          <p className="mt-1.5 text-sm text-ink-muted">{t('codeHint')}</p>
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => { if (e.key === 'Enter') enter(codeInput); }}
            placeholder={t('codePlaceholder')}
            maxLength={6}
            autoFocus
            className="mt-6 w-full rounded-2xl border border-line bg-white/70 px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
          <button
            onClick={() => enter(codeInput)}
            disabled={codeInput.length < 4}
            className="mt-4 w-full rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
          >
            {t('go')}
          </button>
        </div>
      </Centered>
    );
  }

  if (phase === 'error' || !event) {
    return (
      <Centered>
        <Logo />
        <div className="mt-2 grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
        </div>
        <p className="max-w-xs text-ink-soft">{t('notFound')}</p>
        <button onClick={() => setPhase('needCode')} className="rounded-2xl border border-line bg-paper-card px-5 py-2.5 text-sm font-semibold text-ink-soft transition active:scale-95">
          {t('tryAgain')}
        </button>
      </Centered>
    );
  }

  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="min-h-full pb-36">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line/70 bg-paper/80 px-4 py-2.5 backdrop-blur-md">
        <Logo small />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-card px-2.5 py-1 text-xs font-semibold text-ink-soft">
          <IconStack /> {photos.length}
        </span>
      </header>

      {/* Cover */}
      <div className="relative h-60 w-full overflow-hidden">
        {event.coverImageUrl
          ? <img src={event.coverImageUrl} alt="" className="h-full w-full object-cover" />
          : <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark"><Logo /></div>}
        {event.isActive && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" /> {t('live')}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-16">
          <h1 className="font-serif text-3xl font-semibold leading-tight text-white drop-shadow-sm">{event.name}</h1>
          {dateStr && <p className="mt-1 text-sm font-medium text-white/85">{dateStr}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-md px-4">
        {/* Nickname */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-paper-card px-3.5 py-3">
          <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/12 text-brand">
            {nickname.trim()
              ? <span className="font-serif text-lg font-semibold">{nickname.trim()[0].toUpperCase()}</span>
              : <IconUser />}
          </div>
          <div className="min-w-0 flex-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t('yourName')}</label>
            <input
              value={nickname}
              onChange={(e) => onNick(e.target.value)}
              placeholder={t('namePlaceholder')}
              maxLength={30}
              className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:font-normal placeholder:text-ink-muted"
            />
          </div>
        </div>

        {/* Memory book — leave a written note (medium/unlimited, host-enabled) */}
        {event.notes && event.notesEnabled !== false && event.isActive && (
          <button
            onClick={() => setNoteOpen(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand bg-brand/10 py-3 font-semibold text-brand transition active:scale-[0.98]"
          >
            <span className="text-base leading-none">📖</span> {hasNote ? t('editMemory') : t('leaveMemory')}
          </button>
        )}

        <Gallery event={event} uid={uid} photos={photos} />
      </div>

      {/* Capture bar */}
      {event.isActive
        ? <Camera event={event} uid={uid} nickname={nickname} shots={shots} onShotsChange={setShots} />
        : <div className="fixed inset-x-0 bottom-0 bg-paper/90 py-4 text-center text-sm text-ink-muted backdrop-blur">{t('ended')}</div>}

      {noteOpen && (
        <NoteModal eventId={event.id} uid={uid} nickname={nickname} onClose={() => setNoteOpen(false)} onSaved={() => setHasNote(true)} />
      )}
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
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={`${import.meta.env.BASE_URL}guestmark.png`} alt="" className={small ? 'h-7 w-7 rounded-lg' : 'h-9 w-9 rounded-lg shadow-sm'} />
      <span className={`font-serif font-semibold tracking-tight ${small ? 'text-lg' : 'text-2xl'}`}>Guest<span className="text-brand">Cam</span></span>
    </div>
  );
}
function IconUser() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
function IconStack() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.5-3.5L9 20" /></svg>;
}
