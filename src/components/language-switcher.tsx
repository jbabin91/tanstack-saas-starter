import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import type { SupportedLanguage } from '@/lib/i18n';

const languages: { code: SupportedLanguage }[] = [
  { code: 'en' },
  { code: 'es' },
];

export function LanguageSwitcher() {
  const { t, currentLanguage, changeLanguage } = useTranslations();

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('common.language')} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {t(`languages.${lang.code}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
