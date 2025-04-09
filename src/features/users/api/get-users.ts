import { createServerFn } from '@tanstack/react-start';
import { type AnyColumn, asc, Column, count, desc, sql } from 'drizzle-orm';
import { z } from 'zod';

import { db, users } from '@/db'; // Assuming db instance and schema are exported from @/db

// Define sorting schema based on TanStack Table's SortingState
const sortingSchema = z
  .array(
    z.object({
      desc: z.boolean(),
      id: z.string(),
    }),
  )
  .optional();

// Define input validation schema
const getUsersInputSchema = z.object({
  globalFilter: z.string().optional(),
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(100).default(10),
  sorting: sortingSchema,
});

// Define the type for valid sortable columns keys
type SortableUserColumns = 'name' | 'email' | 'locale' | 'createdAt';

export const getUsers = createServerFn({ method: 'POST' })
  .validator(getUsersInputSchema)
  .handler(async ({ data }) => {
    const { pageIndex, pageSize, sorting, globalFilter } = data;

    const offset = pageIndex * pageSize;

    // Build WHERE condition for global filter
    const whereCondition =
      globalFilter ?
        sql`(${users.name} ilike ${`%${globalFilter}%`} or ${users.email} ilike ${`%${globalFilter}%`})`
      : undefined;

    // Build ORDER BY clauses using dynamic access on `users` schema object
    const orderByClauses =
      sorting
        ?.map((sort) => {
          const columnKey = sort.id as SortableUserColumns;
          const column = users[columnKey as keyof typeof users];

          // Validate that the accessed property is actually a Drizzle column
          if (!column || !(column instanceof Column)) {
            console.warn(
              `Invalid or non-column sort key requested: ${sort.id}`,
            );
            return null; // Ignore invalid sort columns
          }

          // Cast to AnyColumn before passing to asc/desc
          return sort.desc ?
              desc(column as AnyColumn)
            : asc(column as AnyColumn);
        })
        // Use a type guard to ensure the filtered array has the correct type
        .filter(
          (clause): clause is NonNullable<typeof clause> => clause !== null,
        ) ?? [];

    // Fetch paginated and filtered data
    const userDataQuery = db
      .select({
        createdAt: users.createdAt,
        email: users.email,
        id: users.id,
        locale: users.locale,
        name: users.name,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(whereCondition)
      // Pass the correctly typed clauses
      .orderBy(...orderByClauses)
      .limit(pageSize)
      .offset(offset);

    // Fetch total count matching the filter
    const totalCountQuery = db
      .select({ totalCount: count() })
      .from(users)
      .where(whereCondition);

    // Execute queries in parallel
    const [userData, totalCountResult] = await Promise.all([
      userDataQuery,
      totalCountQuery,
    ]);

    const totalCount = totalCountResult[0]?.totalCount ?? 0;

    return {
      data: userData,
      pageCount: Math.ceil(totalCount / pageSize), // Calculate page count
      totalCount: totalCount,
    };
  });
