# TanStack Start

TanStack Start is a full-stack framework that provides server-side rendering, API routes, and server functions for React applications.

## Key Features

- Server-side rendering (SSR) support
- API route handling
- Type-safe server functions
- Integration with TanStack Router and Query
- File-based routing for API endpoints
- Validation support for server functions

## API Routes

API routes can be created using the `createAPIFileRoute` function:

```tsx
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/path')({
  GET: async ({ request }) => {
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  POST: async ({ request }) => {
    const body = await request.json();
    // Handle POST request
    return new Response(JSON.stringify(result));
  },
});
```

## Server Functions

Server functions provide type-safe RPC-like functionality:

```tsx
import { createServerFn } from '@tanstack/react-start';

// GET server function
const getData = createServerFn({
  method: 'GET',
}).handler(async () => {
  // Fetch or compute data
  return data;
});

// POST server function with validation
const updateData = createServerFn({ method: 'POST' })
  .validator((d: YourDataType) => d) // Type-safe validation
  .handler(async ({ data }) => {
    // Handle data update
  });
```

## Client Usage

### API Routes

```tsx
// Fetch from API route
function fetchData() {
  return fetch('/api/path').then((res) => res.json());
}

function Component() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <div>{/* Render data */}</div>;
}
```

### Server Functions

```tsx
function Component() {
  const router = useRouter();
  const data = Route.useLoaderData();

  return (
    <button
      onClick={() => {
        // Call server function and invalidate router
        updateData({ newValue: 'example' }).then(() => {
          router.invalidate();
        });
      }}
    >
      Update Data
    </button>
  );
}
```

## Integration with TanStack Router

Server functions can be used as route loaders:

```tsx
export const Route = createFileRoute('/path')({
  component: YourComponent,
  loader: async () => await getData(),
});
```

## Integration with TanStack Query

API routes and server functions work seamlessly with TanStack Query:

```tsx
function Component() {
  const { data } = useQuery({
    queryKey: ['key'],
    queryFn: () => getData(),
  });

  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key'] });
    },
  });
}
```

## Project Setup

1. Configure API handler:

```ts
// api.ts
import { createStartAPIHandler, defaultAPIFileRouteHandler } from '@tanstack/react-start/api';

export default createStartAPIHandler(defaultAPIFileRouteHandler);
```

2. Configure SSR handler:

```tsx
// ssr.tsx
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
```

3. Set up client hydration:

```tsx
// client.tsx
import { StartClient } from '@tanstack/react-start';

const router = createRouter();
hydrateRoot(document, <StartClient router={router} />);
```

## Example Implementation

This project includes demo implementations of both API routes and server functions:

### API Route Example

```ts
// filepath: /src/routes/api/demo-names.ts
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/demo-names')({
  GET: async ({ request }) => {
    return new Response(JSON.stringify(['Alice', 'Bob', 'Charlie']), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});
```

### Server Function Example

```tsx
// /src/routes/demo.start.server-funcs.tsx
import { createServerFn } from '@tanstack/react-start';

// File-based counter example
const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

// Route with server function as loader
export const Route = createFileRoute('/demo/start/server-funcs')({
  component: Home,
  loader: async () => await getCount(),
});

// Component using server functions
function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <button
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate();
        });
      }}
    >
      Add 1 to {state}
    </button>
  );
}
```

### Client-Side API Consumer Example

```tsx
// /src/routes/demo.start.api-request.tsx
function getNames() {
  return fetch('/api/demo-names').then((res) => res.json());
}

function Home() {
  const [names, setNames] = useState<Array<string>>([]);
  useEffect(() => {
    getNames().then(setNames);
  }, []);

  return (
    <div className="p-4">
      <div>{names.join(', ')}</div>
    </div>
  );
}
```

## Resources

- [Official Documentation](https://tanstack.com/start/latest)
- [API Reference](https://tanstack.com/start/latest/docs/api)
