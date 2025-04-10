import { createFileRoute } from '@tanstack/react-router';
import { Trans } from 'react-i18next';

import logo from '@/assets/logo.svg';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_public/')({
  component: Home,
});

function Home() {
  const { t } = useTranslations();

  return (
    <div className="text-center">
      <header className="flex flex-col items-center justify-center">
        <img
          alt={t('common.logoAlt')}
          className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]"
          src={logo}
        />
        <p>
          <Trans
            components={[<code key="path" />]}
            i18nKey="landing.editCode.message"
            values={{ path: t('landing.editCode.path') }}
          />
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('landing.learnReact')}
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('landing.learnTanstack')}
        </a>
      </header>
    </div>
  );
}
