import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getUsers } from '@/features/users/api/get-users';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/data/query')({
  component: QueryDemo,
});

function QueryDemo() {
  const { t } = useTranslations();
  const { data } = useQuery({
    queryKey: ['users-demo'],
    queryFn: () =>
      getUsers({
        data: { pageIndex: 0, pageSize: 10 },
      }),
    initialData: { data: [], pageCount: 0, totalCount: 0 },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl">{t('demos.data.peopleListTitle')}</h1>
      <ul>
        {data.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
