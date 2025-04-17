import '@/lib/i18n';

import { useEffect } from 'react';

import { useLanguageDirection } from '@/hooks/use-language-direction';
import { useTranslations } from '@/hooks/use-translations';

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const { currentLanguage, changeLanguage, languages } = useTranslations();
  useLanguageDirection(); // Handles RTL/LTR changes

  // On initial client mount, detect and apply persisted or navigator language
  useEffect(() => {
    const stored = localStorage.getItem('i18nextLng');
    if (stored && stored !== currentLanguage) {
      changeLanguage(stored as any);
    } else if (!stored) {
      const nav = navigator.language.split('-')[0];
      if (languages.includes(nav as any) && nav !== currentLanguage) {
        changeLanguage(nav as any);
      }
    }
  }, []);

  // Update document language
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return <>{children}</>;
}
