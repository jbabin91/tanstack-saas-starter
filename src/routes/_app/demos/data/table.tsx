import {
  compareItems,
  type RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { createFileRoute } from '@tanstack/react-router';
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingFn,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { makeData, type Person } from '@/data/demo-table-data';

export const Route = createFileRoute('/_app/demos/data/table')({
  component: TableDemo,
});

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function TableDemo() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: 'id',
        filterFn: 'equalsString', //note: normal non-fuzzy filter column - exact match required
      },
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy', //using our custom fuzzy filter function
        // filterFn: fuzzyFilter, //or just define with the function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
    ],
    [],
  );

  const [data, setData] = React.useState<Person[]>(() => makeData(5_000));
  const refreshData = () => setData((_old) => makeData(50_000)); //stress test

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  //apply the fuzzy sort if the fullName column is being filtered
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div>
        <DebouncedInput
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="Search all columns..."
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </div>
      <div className="h-4" />
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm text-gray-200">
          <thead className="bg-gray-800 text-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left"
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={
                              header.column.getCanSort() ?
                                'cursor-pointer transition-colors select-none hover:text-blue-400'
                              : ''
                            }
                            role={
                              header.column.getCanSort() ? 'button' : undefined
                            }
                            tabIndex={
                              header.column.getCanSort() ? 0 : undefined
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ?
                            <div className="mt-2">
                              <Filter column={header.column} />
                            </div>
                          : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-700">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap items-center gap-2 text-gray-200">
        <button
          className="rounded-md bg-gray-800 px-3 py-1 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!table.getCanPreviousPage()}
          type="button"
          onClick={() => table.setPageIndex(0)}
        >
          {'<<'}
        </button>
        <button
          className="rounded-md bg-gray-800 px-3 py-1 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!table.getCanPreviousPage()}
          type="button"
          onClick={() => table.previousPage()}
        >
          {'<'}
        </button>
        <button
          className="rounded-md bg-gray-800 px-3 py-1 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!table.getCanNextPage()}
          type="button"
          onClick={() => table.nextPage()}
        >
          {'>'}
        </button>
        <button
          className="rounded-md bg-gray-800 px-3 py-1 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!table.getCanNextPage()}
          type="button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            className="w-16 rounded-md border border-gray-700 bg-gray-800 px-2 py-1 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            defaultValue={table.getState().pagination.pageIndex + 1}
            type="number"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-gray-400">
        {table.getPrePaginationRowModel().rows.length} Rows
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          type="button"
          onClick={() => rerender()}
        >
          Force Rerender
        </button>
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          type="button"
          onClick={() => refreshData()}
        >
          Refresh Data
        </button>
      </div>
      <pre className="mt-4 overflow-auto rounded-lg bg-gray-800 p-4 text-gray-300">
        {JSON.stringify(
          {
            columnFilters: table.getState().columnFilters,
            globalFilter: table.getState().globalFilter,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className="w-full rounded-md border border-gray-600 bg-gray-700 px-2 py-1 text-white outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
    />
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  // Use a ref to track the previous initialValue and current value
  const prevInitialValueRef = React.useRef(initialValue);
  const valueRef = React.useRef<string | number>(initialValue);

  // Initialize state with initialValue
  const [value, setValue] = React.useState(initialValue);

  // Synchronize the value with initialValue when it changes
  // This is a custom hook that doesn't directly call setValue in useEffect
  React.useLayoutEffect(() => {
    // Only update if initialValue has changed from previous render
    if (prevInitialValueRef.current !== initialValue) {
      prevInitialValueRef.current = initialValue;

      // Only update state if the current value is different
      if (valueRef.current !== initialValue) {
        setValue(initialValue);
      }
    }
  }, [initialValue]);

  // Keep valueRef in sync with value
  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
