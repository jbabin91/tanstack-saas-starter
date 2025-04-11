import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/data/query')({
  component: QueryDemo,
});

function QueryDemo() {
  const { t } = useTranslations();
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: () =>
      fetch('https://swapi.dev/api/people')
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl">{t('demos.data.peopleListTitle')}</h1>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
