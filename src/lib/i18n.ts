import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: enTranslation,
    zod: enTranslation.zod,
  },
  es: {
    translation: esTranslation,
    zod: esTranslation.zod,
  },
} as const;

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    defaultNS,
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      order: ['localStorage', 'navigator'],
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    lng: DEFAULT_LANGUAGE,
    resources,
  });

// Configure zod to use i18next for error messages
z.setErrorMap(zodI18nMap);

export default i18n;
