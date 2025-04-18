import type { SortingState } from '@tanstack/react-table';

/**
 * Default sorting state shared across paginated hooks
 * Sort by createdAt descending by default
 */
export const initialSorting: SortingState = [{ desc: true, id: 'createdAt' }];
