import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <Outlet />
    </div>
  );
}
