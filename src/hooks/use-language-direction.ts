import { useEffect } from 'react';

import { useTranslations } from './use-translations';

// List of RTL languages (can be expanded in the future)
const RTL_LANGUAGES = ['ar', 'fa', 'he', 'ur'];

export function useLanguageDirection() {
  const { currentLanguage } = useTranslations();

  useEffect(() => {
    const dir = RTL_LANGUAGES.includes(currentLanguage) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, [currentLanguage]);

  return {
    direction: RTL_LANGUAGES.includes(currentLanguage) ? 'rtl' : 'ltr',
    isRTL: RTL_LANGUAGES.includes(currentLanguage),
  };
}
