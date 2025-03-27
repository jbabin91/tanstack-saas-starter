# Getting Started with TanStack

This guide will help you get started with the TanStack libraries used in this project.

## Overview

TanStack provides a suite of powerful libraries for building modern web applications:

- **TanStack Query**: Data fetching and caching
- **TanStack Router**: Type-safe routing
- **TanStack Form**: Form state management
- **TanStack Table**: Table and data grid functionality

## Installation

All TanStack libraries are pre-installed in this project:

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-router": "^1.0.0",
    "@tanstack/react-form": "^1.0.0",
    "@tanstack/react-table": "^8.0.0"
  }
}
```

## Basic Usage

### Query

Fetch and cache data:

```tsx
import { useQuery } from '@tanstack/react-query';

function UserProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}
```

[Learn more about Query](./query.md)

### Router

Type-safe routing:

```tsx
import { createRoute } from '@tanstack/react-router';

const userRoute = createRoute({
  path: '/users/$userId',
  component: UserComponent,
  loader: ({ params: { userId } }) => fetchUser(userId),
});
```

[Learn more about Router](./router.md)

### Form

Form state management:

```tsx
import { useForm } from '@tanstack/react-form';

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <form.Provider>
      <form.Field name="email">{(field) => <input {...field.props} />}</form.Field>
    </form.Provider>
  );
}
```

[Learn more about Form](./form.md)

### Table

Data grid functionality:

```tsx
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

function UserTable() {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.getValue()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

[Learn more about Table](./table.md)

## Project Setup

### Query Client

The Query Client is configured in `app/providers/query.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

### Router Setup

The router is configured in `app/router.tsx`:

```tsx
import { createRouter } from '@tanstack/react-router';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

export function RouterProvider({ children }) {
  return <router.Provider>{children}</router.Provider>;
}
```

### Form Configuration

Form defaults are set in `app/providers/form.tsx`:

```tsx
import { FormProvider } from '@tanstack/react-form';

const formConfig = {
  defaultValues: {},
  validationMode: 'onChange',
};

export function FormProvider({ children }) {
  return <FormProvider config={formConfig}>{children}</FormProvider>;
}
```

### Table Utilities

Common table utilities are in `app/components/table/`:

```tsx
// app/components/table/DataTable.tsx
import { flexRender, useReactTable } from '@tanstack/react-table';

export function DataTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <table>{/* Table implementation */}</table>;
}
```

## Best Practices

1. **Query Keys**

   - Use array keys for better organization
   - Include all dependencies in the key
   - Keep keys consistent across the app

2. **Route Organization**

   - Group related routes together
   - Use loaders for data fetching
   - Handle errors at the route level

3. **Form Validation**

   - Use Zod for schema validation
   - Handle async validation
   - Show inline error messages

4. **Table Performance**
   - Virtualize large datasets
   - Memoize column definitions
   - Use controlled pagination

## Related Documentation

- [Query Guide](./query.md) - TanStack Query patterns
- [Router Guide](./router.md) - TanStack Router patterns
- [Form Guide](./form.md) - TanStack Form patterns
- [Table Guide](./table.md) - TanStack Table patterns
