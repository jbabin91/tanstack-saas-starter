import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

function getNames() {
  return fetch('/api/demo-names').then((res) => res.json());
}

export const Route = createFileRoute('/demo/start/api-request')({
  component: Home,
});

function Home() {
  const { data: names = [] } = useQuery({
    queryKey: ['names'],
    queryFn: getNames,
  });

  return (
    <div className="p-4">
      <div>{names.join(', ')}</div>
    </div>
  );
}
