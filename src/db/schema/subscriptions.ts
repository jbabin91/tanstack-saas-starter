import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { users } from './users';

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    plan: text().notNull(),
    status: text().notNull(),
    startDate: timestamp().notNull(),
    endDate: timestamp(),
    canceledAt: timestamp(),
    metadata: jsonb(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index('subscriptions_user_id_idx').on(table.userId),
    index('subscriptions_plan_status_idx').on(table.plan, table.status),
    index('subscriptions_start_date_idx').on(table.startDate),
    index('subscriptions_end_date_idx').on(table.endDate),
    index('subscriptions_canceled_at_idx').on(table.canceledAt),
  ],
);
