import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

import { DefaultCatchBoundary } from '@/components/errors/default-catch-boundary';
import { NotFound } from '@/components/errors/not-found';
import * as TanstackQuery from '@/integrations/tanstack-query/root-provider';
// Import the generated route tree
import { routeTree } from '@/routeTree.gen';

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      context: {
        ...TanstackQuery.getContext(),
      },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      defaultPreloadStaleTime: 0,
      routeTree,
      scrollRestoration: true,
    }),
    TanstackQuery.getContext().queryClient,
  );

  return router;
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
