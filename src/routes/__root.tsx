import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Header from '@/components/layout/header';
import { Providers } from '@/providers';
import globalsCss from '@/styles/globals.css?url';

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    // Remove timestamp from URL to ensure consistent rendering
    const cssUrl = globalsCss.split('?')[0];

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'TanStack Start Starter',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: cssUrl,
        },
      ],
    };
  },

  component: () => (
    <RootDocument>
      <Providers>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </Providers>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="light" lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <main>{children}</main>
        <Scripts />
      </body>
    </html>
  );
}
