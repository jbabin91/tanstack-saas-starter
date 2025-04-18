import { createFileRoute } from '@tanstack/react-router';

import { UsersTable } from '@/features/users/components/users-table';
import { getUsersQueryOptions } from '@/features/users/hooks/use-users-query';
import { useTranslations } from '@/hooks/use-translations';
import { initialPagination } from '@/lib/constants/pagination';
import { initialSorting } from '@/lib/constants/sorting';

export const Route = createFileRoute('/_app/users')({
  // Prefetch users data on route load using React Query
  beforeLoad: async ({ context: { queryClient } }) => {
    // Populate the cache with the first page of users
    await queryClient.ensureQueryData(
      getUsersQueryOptions({
        globalFilter: undefined,
        pageIndex: initialPagination.pageIndex,
        pageSize: initialPagination.pageSize,
        sorting: initialSorting,
      }),
    );
  },
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
