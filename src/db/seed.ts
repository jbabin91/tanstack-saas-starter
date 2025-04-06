import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';

import * as schema from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!, {
    schema,
  });

  await seed(db, schema, { seed: 1234 }).refine((f) => ({
    users: {
      columns: {
        created_at: f.date({ maxDate: new Date() }),
        email: f.email(),
        locale: f.valuesFromArray({
          isUnique: false,
          values: ['en', 'es', 'fr', 'de'],
        }),
        metadata: f.json(),
        name: f.fullName({ isUnique: true }),
      },
      count: 50,
    },
    subscriptions: {
      columns: {
        end_date: f.date({ minDate: new Date() }),
        metadata: f.json(),
        plan: f.valuesFromArray({
          isUnique: false,
          values: ['free', 'pro', 'enterprise'],
        }),
        start_date: f.date({
          maxDate: new Date(),
          minDate: '2023-01-01',
        }),
        status: f.valuesFromArray({
          isUnique: false,
          values: ['active', 'canceled', 'past_due'],
        }),
        // We'll let Drizzle handle the user_id relationship automatically
      },
      count: 60, // Slightly more than users to ensure some users get multiple subscriptions
    },
  }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
