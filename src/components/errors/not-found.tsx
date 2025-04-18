import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';

export function NotFound({ children }: { children?: any }) {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        {children ?? <p>{t('errors.pageNotFound')}</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={() => globalThis.history.back()}>
          {t('errors.goBack')}
        </Button>
        <Button asChild>
          <Link to="/">{t('errors.startOver')}</Link>
        </Button>
      </p>
    </div>
  );
}
