import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

// Import translation files
import enCountries from '../locales/en/countries.json';
import enStates from '../locales/en/states.json';
import enTranslation from '../locales/en/translation.json';
import enZod from '../locales/en/zod.json';
import esCountries from '../locales/es/countries.json';
import esStates from '../locales/es/states.json';
import esTranslation from '../locales/es/translation.json';
import esZod from '../locales/es/zod.json';

export const defaultNS = 'translation';

export const resources = {
  en: {
    translation: {
      ...enTranslation,
      countries: enCountries,
      states: enStates,
      zod: enZod.zod,
    },
    zod: enZod.zod,
  },
  es: {
    translation: {
      ...esTranslation,
      countries: esCountries,
      states: esStates,
      zod: esZod.zod,
    },
    zod: esZod.zod,
  },
} as const;

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Only install the browser detector on the client to pick localStorage
const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  i18n.use(LanguageDetector);
}

// Initialize i18next without auto-detection; we'll detect in the provider
i18n.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  defaultNS,
  // Client-side detection config
  detection:
    isBrowser ?
      {
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
        order: ['localStorage', 'navigator'],
      }
    : undefined,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  resources,
  supportedLngs: SUPPORTED_LANGUAGES,
});

// Configure zod to use i18next for error messages, including custom codes
z.setErrorMap((issue, ctx) => {
  // 1) built-in Zod error translations
  const builtIn = zodI18nMap(issue, ctx);
  if (builtIn.message) {
    return builtIn;
  }

  // 2) custom cross-field validation codes
  const code = (issue as any).params?.code as string | undefined;
  switch (code) {
    case 'invalidState':
      return { message: i18n.t('zod.address.invalidState') };
    case 'invalidPostal':
      return { message: i18n.t('zod.address.invalidPostal') };
    case 'invalidPhone':
      return { message: i18n.t('zod.address.invalidPhone') };
  }

  // 3) fallback
  return { message: ctx.defaultError };
});

export default i18n;
