import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/lib/i18n';

type UseTranslationsReturn = {
  t: TFunction;
  i18n: ReturnType<typeof useTranslation>['i18n'];
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  currentLanguage: SupportedLanguage;
  languages: readonly SupportedLanguage[];
};

export function useTranslations(): UseTranslationsReturn {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language: SupportedLanguage) => {
    await i18n.changeLanguage(language);
  };

  return {
    changeLanguage,
    currentLanguage: (i18n.language || DEFAULT_LANGUAGE) as SupportedLanguage,
    i18n,
    languages: SUPPORTED_LANGUAGES,
    t,
  };
}
