import { sql } from 'drizzle-orm';
import { index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { type z } from 'zod';

import { users } from './auth';

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => sql`gen_random_uuid()`),
    userId: text()
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

export const subscriptionSelectSchema = createSelectSchema(subscriptions);
export const subscriptionInsertSchema = createInsertSchema(subscriptions);
export const subscriptionUpdateSchema = createUpdateSchema(subscriptions);

export type Subscription = z.infer<typeof subscriptionSelectSchema>;
export type SubscriptionInsert = z.infer<typeof subscriptionInsertSchema>;
export type SubscriptionUpdate = z.infer<typeof subscriptionUpdateSchema>;
