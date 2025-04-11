import { createFileRoute } from '@tanstack/react-router';

import { UsersTable } from '@/features/users/components/users-table';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/users')({
  component: UsersPage,
});

function UsersPage() {
  const { t } = useTranslations();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">{t('pageTitles.users')}</h1>
      <UsersTable />
    </div>
  );
}
