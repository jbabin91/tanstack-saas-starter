import { Link } from '@tanstack/react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/mode-toggle';
import { useTranslations } from '@/hooks/use-translations';

export default function Header() {
  const { t } = useTranslations();

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
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}
