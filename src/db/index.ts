import { drizzle } from 'drizzle-orm/node-postgres';

import { env } from '@/configs/env';

import * as schema from './schema';

export const db = drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
  schema,
});

// Export schema for use in other files
export * from './schema';
export { schema };
