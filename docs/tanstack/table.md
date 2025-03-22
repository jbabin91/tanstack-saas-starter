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

## Project Usage

In this project, TanStack Table is used in:

- `/src/routes/demo.table.tsx`: Demo table implementation
- `/src/data/demo-table-data.ts`: Mock data for the table

## Resources

- [Official Documentation](https://tanstack.com/table/latest/docs/framework/react/overview)
- [Sorting Guide](https://tanstack.com/table/latest/docs/guide/sorting)
- [Filtering Guide](https://tanstack.com/table/latest/docs/guide/filtering)
- [Pagination Guide](https://tanstack.com/table/latest/docs/guide/pagination)
