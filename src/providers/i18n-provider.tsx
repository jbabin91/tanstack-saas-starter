import '@/lib/i18n';

import { useEffect } from 'react';

import { useLanguageDirection } from '@/hooks/use-language-direction';
import { useTranslations } from '@/hooks/use-translations';

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const { currentLanguage } = useTranslations();
  useLanguageDirection(); // Handles RTL/LTR changes

  // Update document language
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return <>{children}</>;
}
