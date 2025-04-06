import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './src/db/migrations',
  schema: './src/db/schema/*',
  strict: true,
  verbose: true,
});
