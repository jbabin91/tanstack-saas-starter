import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const subscriptions = pgTable('subscriptions', {
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
});
