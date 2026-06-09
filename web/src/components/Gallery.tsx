import { useEffect, useRef, useState } from 'react';
import { toggleLike } from '../events';
import type { Event, Photo } from '../types';
import { t } from '../i18n';

interface Props { event: Event; uid: string; photos: Photo[]; }

function revealAtMs(e: Event): number {
  if (e.revealTiming !== 'next_day') return 0;
  const d = e.date ? new Date(e.date) : new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return d.getTime();
}

export function Gallery({ event, uid, photos }: Props) {
  const [items, setItems] = useState<Photo[]>(photos);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [viewer, setViewer] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<number | null>(null);

  useEffect(() => setItems(photos), [photos]);

  const hostOnly = event.revealTiming === 'private';
  const revealed = event.revealTiming !== 'next_day' || Date.now() >= revealAtMs(event);

  const visible = items.filter((p) => {
    if (p.flagged) return false;
    if (hostOnly || filter === 'mine') return p.uploadedBy === uid;
    return true;
  });

  const open = (idx: number) => { pendingScroll.current = idx; setViewer(idx); };

  useEffect(() => {
    if (viewer != null && pendingScroll.current != null && scrollerRef.current) {
      scrollerRef.current.scrollLeft = pendingScroll.current * scrollerRef.current.clientWidth;
      pendingScroll.current = null;
    }
  }, [viewer]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || pendingScroll.current != null) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== viewer && idx >= 0 && idx < visible.length) setViewer(idx);
  };

  const like = (p: Photo) => {
    const liked = (p.likedBy ?? []).includes(uid);
    setItems((prev) => prev.map((x) => x.id === p.id ? {
      ...x,
      likedBy: liked ? (x.likedBy ?? []).filter((u) => u !== uid) : [...(x.likedBy ?? []), uid],
      likesCount: (x.likesCount ?? 0) + (liked ? -1 : 1),
    } : x));
    toggleLike(event.id, p.id, uid, liked).catch(() => {});
  };

  const current = viewer != null ? visible[viewer] : null;

  return (
    <section className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">{t('gallery')}</h2>
        {!hostOnly && revealed && (
          <div className="flex gap-1 rounded-full border border-line bg-paper-card p-0.5">
            {(['all', 'mine'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === f ? 'bg-brand text-white' : 'text-ink-muted'}`}>
                {f === 'all' ? t('all') : t('mine')}
              </button>
            ))}
          </div>
        )}
      </div>

      {!revealed ? (
        <Empty>{t('developing')}</Empty>
      ) : visible.length === 0 ? (
        <Empty>{t('empty')}</Empty>
      ) : (
        <div className="grid grid-cols-2 gap-1.5">
          {visible.map((p, idx) => {
            const likes = p.likedBy?.length ?? 0;
            return (
              <button key={p.id} onClick={() => open(idx)} className="relative aspect-[9/13] overflow-hidden rounded-lg bg-paper-deep">
                <img src={p.thumbnailUrl || p.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                {p.mediaType === 'video' && <span className="absolute left-1.5 top-1.5 rounded-full bg-black/55 p-1"><IconPlay /></span>}
                {p.uploadedBy === uid && <span className="absolute right-1.5 top-1.5 h-4 w-4 rounded-full bg-brand" />}
                {likes > 0 && (
                  <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/55 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    <IconHeart filled /> {likes}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {current && (
        <div className="fixed inset-0 z-50 bg-black">
          <div ref={scrollerRef} onScroll={onScroll}
            className="no-scrollbar snap-x-mandatory flex h-full w-full overflow-x-auto overflow-y-hidden">
            {visible.map((p) => (
              <div key={p.id} className="snap-center flex h-full w-full flex-none items-center justify-center">
                {p.mediaType === 'video'
                  ? <video src={p.imageUrl} controls playsInline className="max-h-full max-w-full" />
                  : <img src={p.imageUrl} alt="" className="max-h-full max-w-full object-contain" />}
              </div>
            ))}
          </div>

          <button onClick={() => setViewer(null)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white"><IconX /></button>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            <p className="text-sm text-white/70">{t('by')} <span className="font-semibold text-white">{current.uploaderName?.trim() || t('anonymous')}</span> · {viewer! + 1}/{visible.length}</p>
            <div className="flex items-center gap-8 text-white">
              <button onClick={() => like(current)}
                className={`flex flex-col items-center gap-1 text-xs ${(current.likedBy ?? []).includes(uid) ? 'text-brand' : 'text-white'}`}>
                <IconHeart filled={(current.likedBy ?? []).includes(uid)} big />
                {(current.likedBy?.length ?? 0) > 0 ? current.likedBy!.length : ''}
              </button>
              <a href={current.imageUrl} target="_blank" rel="noreferrer" download className="flex flex-col items-center gap-1 text-xs">
                <IconDownload /> {t('download')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-paper-card py-12 text-center text-sm text-ink-muted">{children}</div>;
}
function IconPlay() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>;
}
function IconX() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
}
function IconDownload() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
}
function IconHeart({ filled, big }: { filled?: boolean; big?: boolean }) {
  const s = big ? 24 : 12;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
}
