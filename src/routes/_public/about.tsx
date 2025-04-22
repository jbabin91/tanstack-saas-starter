import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { getUserAvatar, getUserId } from '@/features/auth/api/user';

export const Route = createFileRoute('/_public/about')({
  component: RouteComponent,
  beforeLoad: async () => {
    const userId = await getUserId();

    if (!userId) {
      throw redirect({ to: '/' });
    }

    return {
      userId,
    };
  },
  loader: ({ context: { userId } }) => {
    if (!userId) {
      throw redirect({ to: '/' });
    }
    return {
      userId,
    };
  },
});

function RouteComponent() {
  const { userId } = Route.useLoaderData();
  const [avatar, setAvatar] = useState<string | null | undefined>(null);

  useEffect(() => {
    getUserAvatar().then(setAvatar);
  }, []);

  const { data: user } = useQuery({
    queryKey: ['name'],
    queryFn: () => fetch('/api/name').then((res) => res.json()),
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p>User Id: {userId}</p>
      {user ?
        <p>User Name: {user.name}</p>
      : null}
      {avatar ?
        <img alt="Avatar" src={avatar} />
      : null}
    </div>
  );
}
