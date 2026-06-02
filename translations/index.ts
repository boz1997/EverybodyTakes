import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tr from './locales/tr';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';

const LANGUAGE_KEY = '@guestcam_language';

const resources = {
  tr: { translation: tr },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
};

export const SUPPORTED_LANGUAGES = ['tr', 'en', 'es', 'fr', 'de'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export async function getStoredLanguage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LANGUAGE_KEY);
  } catch {
    return null;
  }
}

export async function saveLanguage(lang: string): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}

export async function initI18n(): Promise<void> {
  // Default to English unless the user has explicitly picked a language before.
  const stored = await getStoredLanguage();
  const lang = stored ?? 'en';

  await i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    interpolation: { escapeValue: false },
    debug: false,
  });
}

export function changeLanguage(lang: string): void {
  saveLanguage(lang);
  i18n.changeLanguage(lang);
}

export default i18n;
