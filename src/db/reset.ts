import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';

import * as schema from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!, {
    schema,
  });

  console.log('Resetting database...');
  await reset(db, schema);
  console.log('Database reset complete.');
}

main().catch((e) => {
  console.error('Error resetting database:', e);
  process.exit(1);
});
