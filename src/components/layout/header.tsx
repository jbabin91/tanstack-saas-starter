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
    <header className="flex justify-between gap-2 border-b p-2">
      <nav className="flex flex-row items-center">
        <div className="px-2 font-bold">
          <Link to="/">{t('nav.home')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/start/server-funcs">
            {t('nav.startServerFuncs')}
          </Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/start/api-request">{t('nav.startApiRequest')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/forms/simple">{t('nav.simpleForm')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/forms/address">{t('nav.addressForm')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demos/data/query">{t('nav.tanstackQuery')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/users">{t('nav.tanstackTable')}</Link>
        </div>
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
