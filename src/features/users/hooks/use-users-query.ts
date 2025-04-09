import { keepPreviousData, useQuery } from '@tanstack/react-query'; // Import keepPreviousData
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { useState } from 'react';

import { getUsers } from '@/features/users/api/get-users';

// Define the initial state for pagination
const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

// Define the initial state for sorting
const initialSorting: SortingState = [
  // Default sort by createdAt descending
  { desc: true, id: 'createdAt' },
];

export function useUsersQuery() {
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  // Define the query key, including the full state objects and primitives
  const queryKey = [
    'users',
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    globalFilter,
  ];

  const query = useQuery({
    // Use placeholderData to keep showing old data while fetching new data
    placeholderData: keepPreviousData,

    // The query function calls the server function with the current state
    queryFn: () =>
      getUsers({
        // Wrap arguments in 'data' object for POST server function
        data: {
          globalFilter: globalFilter || undefined,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting: sorting, // Pass undefined if filter is empty
        },
      }),

    queryKey,
    // Consider adding staleTime if appropriate for your use case
    // staleTime: 1000 * 60 * 1, // 1 minute
  });

  // The query object returned by useQuery includes isPlaceholderData
  return {
    // Explicitly return needed query properties
    data: query.data,
    error: query.error,
    globalFilter,
    isFetching: query.isFetching,
    isLoading: query.isLoading,

    isPlaceholderData: query.isPlaceholderData,
    // Current table state and setters remain the same
    pagination,
    setGlobalFilter,
    setPagination,
    setSorting,
    sorting,
  };
}
