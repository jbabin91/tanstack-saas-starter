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

## Project Usage

In this project, TanStack Router is used for all routing. Key files include:

- `/src/router.tsx`: Main router configuration
- `/src/routes/__root.tsx`: Root layout
- `/src/routes/index.tsx`: Home page
- `/src/routeTree.gen.ts`: Generated route tree

## Resources

- [Official Documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
- [File-Based Routing Guide](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Integration with TanStack Query](https://tanstack.com/router/latest/docs/framework/react/integrations/tanstack-query)
