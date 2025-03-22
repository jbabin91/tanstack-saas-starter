# TanStack Query

TanStack Query (formerly React Query) is a powerful data-fetching and state management library for React applications.

## Key Concepts

- **Queries**: For fetching data
- **Mutations**: For updating data
- **Query Invalidation**: For refreshing stale data
- **Prefetching**: For optimistic data loading
- **Query Keys**: For cache management
- **Query Functions**: For data fetching

## Basic Usage

### Setting Up

```tsx
// src/integrations/tanstack-query/root-provider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Provide the client to your App
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Queries

```tsx
import { useQuery } from '@tanstack/react-query';

// Define a query
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Mutations

```tsx
import { useMutation } from '@tanstack/react-query';

function CreateUserForm() {
  const mutation = useMutation({
    mutationFn: (newUser) => axios.post('/users', newUser),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully!');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ name: 'New User', email: 'user@example.com' });
      }}
    >
      {/* Form fields */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

## Integration with TanStack Router

```tsx
// In router.tsx
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
      },
    }),
    TanstackQuery.getContext().queryClient,
  );
  return router;
};
```

## Advanced Features

- **Dependent Queries**: Queries that depend on data from other queries
- **Infinite Queries**: For pagination or infinite scrolling
- **Query Invalidation**: Refresh data when it becomes stale
- **Optimistic Updates**: Update UI before the server responds
- **Query Cancellation**: Cancel in-flight requests

## Project Usage

In this project, TanStack Query is used for all data fetching needs. Key integration points:

- `/src/integrations/tanstack-query/root-provider.tsx`: Main query client setup
- `/src/integrations/tanstack-query/layout.tsx`: Query devtools integration
- Multiple demo components showing practical usage

## Resources

- [Official Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Examples](https://tanstack.com/query/latest/docs/framework/react/examples/basic)
- [Migration Guide from v4 to v5](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5)
