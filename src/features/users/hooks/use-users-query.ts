import {
  keepPreviousData,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { useState } from 'react';

import { getUsers } from '@/features/users/api/get-users';
import { initialPagination } from '@/lib/constants/pagination';
import { initialSorting } from '@/lib/constants/sorting';

// Type for the getUsers server function result
type UsersQueryFnData = Awaited<ReturnType<typeof getUsers>>;

/**
 * Build a React Query options object for the `getUsers` server function.
 */
export function getUsersQueryOptions(args: {
  globalFilter?: string;
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
}): UseQueryOptions<UsersQueryFnData> {
  return {
    placeholderData: keepPreviousData,
    queryFn: () =>
      getUsers({
        data: {
          globalFilter: args.globalFilter,
          pageIndex: args.pageIndex,
          pageSize: args.pageSize,
          sorting: args.sorting,
        },
      }),
    queryKey: [
      'users',
      args.pageIndex,
      args.pageSize,
      args.sorting ?? [],
      args.globalFilter ?? '',
    ],
  };
}

// Options to override default pagination/sorting
export type UseUsersQueryOptions = {
  defaultPagination?: Partial<PaginationState>;
  defaultSorting?: SortingState;
};

/**
 * Hook for fetching users with pagination, sorting, and filtering.
 * You can override the initial pagination or sorting via options.
 */
export function useUsersQuery(options: UseUsersQueryOptions = {}) {
  const [pagination, setPagination] = useState<PaginationState>(
    // merge defaults with any override
    { ...initialPagination, ...(options.defaultPagination ?? {}) },
  );
  const [sorting, setSorting] = useState<SortingState>(
    // use override or default
    options.defaultSorting ?? initialSorting,
  );
  const [globalFilter, setGlobalFilter] = useState<string>('');

  // Build React Query options for current state
  const queryOptions = getUsersQueryOptions({
    globalFilter: globalFilter || undefined,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting,
  });
  const query = useQuery(queryOptions);

  // The query object returned by useQuery includes isPlaceholderData
  return {
    // Explicitly return needed query properties
    data: query.data,
    error: query.error,
    globalFilter,
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    isPlaceholderData: query.isPlaceholderData,
    pagination,
    setGlobalFilter,
    setPagination,
    setSorting,
    sorting,
  };
}
