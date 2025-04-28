import { Link, useNavigate } from '@tanstack/react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { signIn, signOut, useSession } from '@/lib/auth-client';

export default function Header() {
  const { t } = useTranslations();
  const { data: session } = useSession();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between gap-2 border-b px-4 py-2">
      <nav className="flex flex-row items-center gap-2">
        <Link activeProps={{ className: 'font-bold' }} to="/">
          {t('nav.home')}
        </Link>
        {session ?
          <>
            <Link
              activeProps={{ className: 'font-bold' }}
              to="/demos/start/server-funcs"
            >
              {t('nav.startServerFuncs')}
            </Link>
            <Link
              activeProps={{ className: 'font-bold' }}
              to="/demos/start/api-request"
            >
              {t('nav.startApiRequest')}
            </Link>
            <Link
              activeProps={{ className: 'font-bold' }}
              to="/demos/forms/simple"
            >
              {t('nav.simpleForm')}
            </Link>
            <Link
              activeProps={{ className: 'font-bold' }}
              to="/demos/forms/address"
            >
              {t('nav.addressForm')}
            </Link>
            <Link
              activeProps={{ className: 'font-bold' }}
              to="/demos/data/query"
            >
              {t('nav.tanstackQuery')}
            </Link>
            <Link activeProps={{ className: 'font-bold' }} to="/users">
              {t('nav.tanstackTable')}
            </Link>
          </>
        : null}
      </nav>
      <div className="flex flex-row items-center gap-2">
        {session ?
          <Button
            onClick={() =>
              signOut({}, { onSuccess: () => navigate({ to: '/' }) })
            }
          >
            {t('auth.logout')}
          </Button>
        : <Button onClick={() => signIn.social({ provider: 'github' })}>
            {t('auth.login')}
          </Button>
        }
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}
