import type { PaginationState } from '@tanstack/react-table';

/**
 * Default pagination state shared across paginated hooks
 */
export const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};
