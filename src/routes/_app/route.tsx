import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { getUserId } from '@/features/auth/api/user';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: async () => {
    const userId = await getUserId();

    if (!userId) {
      throw redirect({ to: '/' });
    }

    return {
      userId,
    };
  },
});

function AppLayout() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <Outlet />
    </div>
  );
}
