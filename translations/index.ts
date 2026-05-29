import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import tr from './locales/tr';
import en from './locales/en';

const LANGUAGE_KEY = '@guestcam_language';

const resources = {
  tr: { translation: tr },
  en: { translation: en },
};

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
  const stored = await getStoredLanguage();
  const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';
  const lang = stored ?? (deviceLang === 'tr' ? 'tr' : 'en');

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
