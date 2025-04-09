import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

function getNames() {
  return fetch('/api/demos/names').then((res) => res.json());
}

export const Route = createFileRoute('/_app/demos/start/api-request')({
  component: Home,
});

function Home() {
  const { data: names = [] } = useQuery({
    queryKey: ['names'],
    queryFn: getNames,
  });

  return (
    <div>
      <div>{names.join(', ')}</div>
    </div>
  );
}
