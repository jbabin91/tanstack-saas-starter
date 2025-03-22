# TanStack Router

TanStack Router is a type-safe router for React applications with first-class support for nested routing.

## Key Features

- 100% TypeScript support with full type inference
- File-based routing (using the `/src/routes` directory)
- Nested layouts with outlet components
- Type-safe navigation and params
- Support for loaders and actions
- Integration with TanStack Query

## Basic Routing

### Route Definition

```tsx
// File-based route definition
export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
  loader: ({ params }) => fetchUser(params.userId),
});
```

### Navigation

```tsx
// Navigate programmatically
const navigate = useNavigate()
navigate({ to: '/users/$userId', params: { userId: '123' } })

// Link component
<Link to="/users/$userId" params={{ userId: '123' }}>User Profile</Link>
```

## Special Routes

- `__root.tsx`: Root layout for the entire application
- Index routes: Using the filename `index.tsx` in a directory

## Nested Layouts

```tsx
// In __root.tsx
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <RootLayout>
      <Outlet /> {/* Child routes render here */}
    </RootLayout>
  ),
});

// In a nested layout
export const Route = createFileRoute('/dashboard')({
  component: () => (
    <DashboardLayout>
      <Outlet /> {/* Child dashboard routes render here */}
    </DashboardLayout>
  ),
});
```

## Integration with TanStack Query

```tsx
// In router.tsx
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      // ...other options
    }),
    queryClient,
  );
  return router;
};
```

## Integration with TanStack Start

TanStack Router integrates deeply with TanStack Start for server-side rendering and data loading:

```tsx
// In router.tsx
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';

export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      // Enable SSR
      ssr: true,
      // Use TanStack Start manifest
      manifest: getRouterManifest(),
    }),
    queryClient,
  );
  return router;
};

// Using server functions in routes
export const Route = createFileRoute('/data')({
  component: DataComponent,
  // Server function as loader
  loader: async () => await getDataServerFn(),
});
```

Server-side rendering is handled by TanStack Start's SSR handler:

```tsx
// ssr.tsx
import { createStartHandler } from '@tanstack/react-start/server';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
```

The router is then hydrated on the client:

```tsx
// client.tsx
import { StartClient } from '@tanstack/react-start';

const router = createRouter();
hydrateRoot(document, <StartClient router={router} />);
```

## Project Usage

In this project, TanStack Router is used for all routing. Key files include:

- `/src/router.tsx`: Main router configuration
- `/src/routes/__root.tsx`: Root layout
- `/src/routes/index.tsx`: Home page
- `/src/routeTree.gen.ts`: Generated route tree

## Route File Naming Convention

When creating routes in this project, we follow these conventions:

### Special Route Files

- `__root.tsx`: Root layout that wraps all routes
- `index.tsx`: Home page or directory index
- `route.tsx`: Layout or parent route file (preferred over `layout.tsx`)

### Pathless Directories

Prefix a directory with `_` to make it pathless - the directory name won't appear in the URL path. This is useful for:

1. **`_app`**: Application-level organization

   - Routes inside `_app` are mounted at the root level
   - Good for core application routes
   - Example: `_app/settings.tsx` → `/settings`

2. **`_public`**: Public-facing routes

   - Routes accessible without authentication
   - Landing pages, marketing pages, etc.
   - Example: `_public/pricing.tsx` → `/pricing`

3. **`_auth`**: Authentication-related routes
   - Login, signup, password reset, etc.
   - Example: `_auth/login.tsx` → `/login`

### Directory Structure Example

```plaintext
src/routes/
├── __root.tsx               # Root layout
├── index.tsx               # Home page
├── _app/                   # Core app routes (pathless)
│   ├── route.tsx          # App layout
│   ├── dashboard.tsx      # /dashboard
│   └── settings/          # /settings
│       ├── route.tsx      # Settings layout
│       ├── profile.tsx    # /settings/profile
│       └── billing.tsx    # /settings/billing
├── _public/               # Public routes (pathless)
│   ├── route.tsx         # Public layout
│   ├── about.tsx         # /about
│   ├── pricing.tsx       # /pricing
│   └── contact.tsx       # /contact
└── _auth/                # Auth routes (pathless)
    ├── route.tsx         # Auth layout
    ├── login.tsx         # /login
    └── signup.tsx       # /signup
```

### Organization Benefits

1. **Logical Grouping**: Group related routes without affecting URLs
2. **Access Control**: Easily apply middleware or layouts to specific groups
3. **Code Organization**: Better file organization without impacting URL structure
4. **Maintainability**: Clear separation of concerns in the routing structure

### Route File Examples

```tsx
// __root.tsx - Root layout
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

// route.tsx - Section layout
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
});

// Nested page route
export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
});

// _app/route.tsx - App layout (mounts at /)
export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

// _app/dashboard.tsx - Dashboard page (mounts at /dashboard)
export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

// _public/about.tsx - About page (mounts at /about)
export const Route = createFileRoute('/about')({
  component: AboutPage,
});
```

## Resources

- [Official Documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
- [File-Based Routing Guide](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Integration with TanStack Query](https://tanstack.com/router/latest/docs/framework/react/integrations/tanstack-query)
