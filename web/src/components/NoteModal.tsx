import { useEffect, useState } from 'react';
import { saveNote, getMyNote, NOTE_MAX } from '../events';
import { t } from '../i18n';

interface Props {
  eventId: string;
  uid: string;
  nickname: string;
  onClose: () => void;
  onSaved: () => void;
}

// Guest "leave a memory" composer. One note per guest (loads the existing one to
// edit); capped at NOTE_MAX in the textarea, the service, and the rules.
export function NoteModal({ eventId, uid, nickname, onClose, onSaved }: Props) {
  const [text, setText] = useState('');
  const [existing, setExisting] = useState(false);
  const [busy, setBusy] = useState(false);
  const remaining = NOTE_MAX - text.length;

  useEffect(() => {
    let active = true;
    getMyNote(eventId, uid)
      .then((n) => { if (active) { setText(n?.text ?? ''); setExisting(!!n); } })
      .catch(() => {});
    return () => { active = false; };
  }, [eventId, uid]);

  const close = () => { if (!busy) onClose(); };

  const submit = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      await saveNote(eventId, uid, nickname.trim() || null, text);
      onSaved();
      onClose();
      window.alert(t('memorySent'));
    } catch {
      window.alert(t('uploadFailed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-sm rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(58,38,18,0.55)]">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/12 text-xl">
            📖
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-semibold leading-tight">{existing ? t('editMemory') : t('leaveMemory')}</h2>
            <p className="text-sm text-ink-muted">{t('memorySubtitle')}</p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, NOTE_MAX))}
          placeholder={t('memoryPlaceholder')}
          maxLength={NOTE_MAX}
          rows={4}
          autoFocus
          className="mt-4 w-full resize-none rounded-2xl border border-line bg-paper-card px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
        />
        <div className={`mt-1 text-right text-xs ${remaining <= 20 ? 'text-brand' : 'text-ink-muted'}`}>{remaining}</div>

        <button
          onClick={submit}
          disabled={!text.trim() || busy}
          className="mt-3 w-full rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
        >
          {existing ? t('memoryUpdate') : t('memorySend')}
        </button>
        <button onClick={close} className="mt-1 w-full py-2 text-sm font-semibold text-brand">{t('cancel')}</button>
      </div>
    </div>
  );
}
