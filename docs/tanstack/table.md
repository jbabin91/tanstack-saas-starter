# TanStack Table

TanStack Table provides headless table components with powerful features for building flexible data tables.

## Key Features

- Sorting, filtering, and pagination
- Row selection and column resizing
- Virtual scrolling for performance
- Fully customizable rendering
- TypeScript support with strong typing
- Minimal re-renders for performance

## Basic Table Setup

```tsx
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// Define your data type
type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

// Define columns
const columnHelper = createColumnHelper<Person>();
const columns = [
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
  // More columns
];

// Create table instance
function MyTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Additional features:
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
  });

  // Render table
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Column Definitions

TanStack Table provides multiple ways to define columns:

```tsx
const columns = [
  // Basic column
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),

  // Computed column
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'fullName',
    header: 'Full Name',
  }),

  // Display column (no accessor)
  columnHelper.display({
    id: 'actions',
    cell: (info) => <button onClick={() => handleEdit(info.row.original)}>Edit</button>,
  }),
];
```

### Column Groups

You can organize columns into groups:

```tsx
const columns = [
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', {
        header: 'First Name',
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
      }),
    ],
  }),
];
```

## Adding Sorting

```tsx
import { getSortedRowModel } from '@tanstack/react-table'

// Inside your component
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    sorting,
  },
  onSortingChange: setSorting,
})

// In your header
<th
  className="cursor-pointer"
  onClick={() => header.column.toggleSorting()}
>
  {flexRender(header.column.columnDef.header, header.getContext())}
  {header.column.getIsSorted() ? (
    header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
  ) : null}
</th>
```

## Adding Filtering

```tsx
import { getFilteredRowModel } from '@tanstack/react-table'

// Inside your component
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    globalFilter,
  },
  onGlobalFilterChange: setGlobalFilter,
})

// Global filter input
<input
  value={globalFilter ?? ''}
  onChange={e => setGlobalFilter(e.target.value)}
  placeholder="Search all columns..."
/>
```

## Integration with TanStack Start

TanStack Table can be integrated with TanStack Start's server functions for server-side data fetching and mutations:

```tsx
import { useQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

// Server function for fetching table data
const getTableData = createServerFn({
  method: 'GET',
}).handler(async () => {
  // Fetch data from database or other source
  return data;
});

// Server function for updating rows
const updateRow = createServerFn({ method: 'POST' })
  .validator((d: RowUpdate) => d)
  .handler(async ({ data }) => {
    // Update data in database
    return result;
  });

function ServerSideTable() {
  // Fetch data using TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ['tableData'],
    queryFn: () => getTableData(),
  });

  // Update mutation
  const mutation = useMutation({
    mutationFn: updateRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tableData'] });
    },
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // ... other features
  });

  if (isLoading) return <div>Loading...</div>;

  return <table>{/* ... table rendering */}</table>;
}
```

This integration provides:

- Server-side data fetching with caching through TanStack Query
- Type-safe mutations for updating table data
- Automatic table updates when data changes
- Loading states and error handling

## Advanced Table Patterns

### Infinite Scrolling Table

Using TanStack Virtual for efficient rendering of large datasets:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteTable() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['infiniteUsers'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/users?cursor=${pageParam}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allRows = data ? data.pages.flatMap((page) => page.users) : [];

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), hasNextPage]);

  const table = useReactTable({
    data: allRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <table>
        <thead>{/* ...header rendering... */}</thead>
        <tbody>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return row ?
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              : null;
          })}
        </tbody>
      </table>
    </div>
  );
}
```

### Paginated Table

Implementation of a table with server-side pagination:

```tsx
function PaginatedTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['pagedTable', pageIndex, pageSize],
    queryFn: () => fetchPagedUsers({ page: pageIndex + 1, pageSize }),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages ?? -1,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <table>
        <thead>{/* ...header rendering... */}</thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### Server Integration

Example of server functions for table data:

```tsx
const fetchTablePage = createServerFn({ method: 'GET' })
  .validator((d: { page: number; pageSize: number; sorting?: SortingState }) => d)
  .handler(async ({ data }) => {
    const { page, pageSize, sorting } = data;
    // Implement server-side sorting and pagination
    return {
      users: sortedAndPagedData,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  });
```

## Project Usage

In this project, TanStack Table is used in:

- `/src/routes/demo.table.tsx`: Demo table implementation
- `/src/data/demo-table-data.ts`: Mock data for the table

## Resources

- [Official Documentation](https://tanstack.com/table/latest/docs/framework/react/overview)
- [Sorting Guide](https://tanstack.com/table/latest/docs/guide/sorting)
- [Filtering Guide](https://tanstack.com/table/latest/docs/guide/filtering)
- [Pagination Guide](https://tanstack.com/table/latest/docs/guide/pagination)
