import {
  ErrorComponent,
  type ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false,
  });

  console.error(error);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            router.invalidate();
          }}
        >
          {t('common.tryAgain')}
        </Button>
        {isRoot ?
          <Button asChild>
            <Link to="/">{t('nav.home')}</Link>
          </Button>
        : <Button asChild>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                globalThis.history.back();
              }}
            >
              {t('errors.goBack')}
            </Link>
          </Button>
        }
      </div>
    </div>
  );
}
