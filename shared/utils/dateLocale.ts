import { enUS, tr, es, fr, de, type Locale } from 'date-fns/locale';
import i18n from '@translations/index';

// The date-fns locale matching the app's current language (falls back to
// English). Use this for every date format so we never hard-code Turkish —
// otherwise an English user sees Turkish month/day names.
const LOCALES: Record<string, Locale> = { en: enUS, tr, es, fr, de };

export function dateLocale(): Locale {
  return LOCALES[i18n.language] ?? enUS;
}
