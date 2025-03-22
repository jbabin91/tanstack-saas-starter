import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  );
}
