import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
} from 'lucide-react';
import { useMemo } from 'react';

import { DebouncedInput } from '@/components/debounced-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUsersQuery } from '@/features/users/hooks/use-users-query';
import { type UserApiOutput } from '@/features/users/types/user-types';

// Use the specific type inferred from the shared types file
type UserData = UserApiOutput;

// Create columns using the column helper
const columnHelper = createColumnHelper<UserData>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue() ?? 'N/A',
    enableSorting: true,
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: 'Email', // Enable sorting for email
  }),
  columnHelper.accessor('locale', {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: 'Locale',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    enableSorting: true,
    header: 'Created At',
  }),
  // Add more columns as needed, e.g., actions
  // columnHelper.display({
  //   id: 'actions',
  //   cell: (info) => <Button variant="outline" size="sm">View</Button>,
  // }),
];

export function UsersTable() {
  const {
    data: queryResult, // Contains { data: UserData[], pageCount: number, totalCount: number }
    error,
    isLoading,
    isPlaceholderData,
    pagination,
    sorting,
    globalFilter,
    setPagination,
    setSorting,
    setGlobalFilter,
  } = useUsersQuery();

  // Memoize table data to prevent unnecessary recalculations
  const tableData = useMemo(() => queryResult?.data ?? [], [queryResult]);
  const pageCount = useMemo(() => queryResult?.pageCount ?? 0, [queryResult]);

  const table = useReactTable({
    columns,
    data: tableData,
    // Tell the table filtering is handled server-side
    debugTable: process.env.NODE_ENV === 'development',

    // Enable debug logs in dev
    filterFns: {
      // Provide dummy filter function to satisfy types, even though filtering is manual
      fuzzy: () => true,
    },

    getCoreRowModel: getCoreRowModel(),

    // We still need this for header state
    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    // Tell the table sorting is handled server-side
    manualFiltering: true,

    // We still need this for client-side helpers
    manualPagination: true,

    // Tell the table pagination is handled server-side
    manualSorting: true,

    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: setPagination,

    onSortingChange: setSorting,

    pageCount: pageCount,
    state: {
      globalFilter,
      pagination,
      sorting,
    }, // Required by TanStack Table even for manual filtering
  });

  const currentPageIndex = table.getState().pagination.pageIndex;
  const maxPageIndex = pageCount > 0 ? pageCount - 1 : 0;

  const handleIncrementPage = () => {
    const nextPage = Math.min(currentPageIndex + 1, maxPageIndex);
    table.setPageIndex(nextPage);
  };

  const handleDecrementPage = () => {
    const prevPage = Math.max(currentPageIndex - 1, 0);
    table.setPageIndex(prevPage);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Global Filter Input */}
      <DebouncedInput
        className="w-full rounded-md border p-2"
        placeholder="Search name or email..."
        value={globalFilter ?? ''}
        onChange={(value: string | number) => setGlobalFilter(String(value))}
      />

      {/* Loading and Error States */}
      {isLoading ?
        <div className="text-center">Loading users...</div>
      : null}
      {error ?
        <div className="text-center text-red-500">
          Error fetching users: {error.message}
        </div>
      : null}

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ?
                            'hover:text-foreground/80 flex cursor-pointer items-center gap-1 transition-colors select-none'
                          : ''
                        }
                        role={header.column.getCanSort() ? 'button' : undefined}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                        title={
                          header.column.getCanSort() ?
                            header.column.getNextSortingOrder() === 'asc' ?
                              'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc' ?
                              'Sort descending'
                            : 'Clear sort'
                          : undefined
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
                        {header.column.getIsSorted() === 'asc' ?
                          <ArrowDown className="ml-1 h-4 w-4" />
                        : null}
                        {header.column.getIsSorted() === 'desc' ?
                          <ArrowUp className="ml-1 h-4 w-4" />
                        : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ?
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={isPlaceholderData ? 'opacity-50' : ''}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  {!isLoading ? 'No results.' : null}
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="flex items-center gap-1 text-sm">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Go to page:</span>
          <div className="relative flex items-center">
            <Input
              className="h-8 w-20 rounded-md border pr-7 text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              max={pageCount > 0 ? pageCount : 1}
              min="1"
              type="number"
              value={currentPageIndex + 1}
              onChange={(e) => {
                const inputVal = e.target.value;
                const pageNum = inputVal ? Number(inputVal) : 1;
                let pageIndex = 0;
                if (!isNaN(pageNum) && pageNum >= 1) {
                  pageIndex = Math.min(Math.max(pageNum - 1, 0), maxPageIndex);
                }
                table.setPageIndex(pageIndex);
              }}
            />
            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center">
              <Button
                aria-label="Increment page number"
                className="h-4 w-4 rounded-none border-b border-l p-0"
                disabled={currentPageIndex >= maxPageIndex}
                size="icon"
                variant="ghost"
                onClick={handleIncrementPage}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                aria-label="Decrement page number"
                className="h-4 w-4 rounded-none border-l p-0"
                disabled={currentPageIndex <= 0}
                size="icon"
                variant="ghost"
                onClick={handleDecrementPage}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
