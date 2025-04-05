import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

// Determine the directory name, falling back to fileURLToPath for ESM environments
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : (
    path.dirname(fileURLToPath(import.meta.url))
  );

// CI detection
const isCI = process.env.CI === 'true';

// Dependencies that need to be pre-optimized
const optimizeDeps = [
  'react',
  'react/jsx-dev-runtime',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@storybook/react',
  '@storybook/test',
  '@testing-library/react',
  '@testing-library/user-event',
];

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  optimizeDeps: {
    entries: ['src/**/*.stories.{ts,tsx}'],
    force: true,
    include: optimizeDeps,
  },
  test: {
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/.storybook/**',
        '**/*.stories.*',
        '**/storybook-static/*',
      ],
    },
    environment: 'jsdom',
    globals: true,
    hookTimeout: 45000,
    isolate: false, // Disable isolation to prevent suite finding issues
    maxConcurrency: 1, // Run tests sequentially to prevent race conditions
    maxWorkers: 1,
    minWorkers: 1,
    pool: 'threads',
    sequence: {
      shuffle: false, // Ensure consistent test order
    },
    // Use threads consistently across environments
    setupFiles: ['.storybook/vitest.setup.ts'],
    testTimeout: 45000,
    workspace: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'pnpm storybook --ci',
            storybookUrl: 'http://localhost:6006',
            tags: {
              exclude: [],
              include: ['test'],
              skip: [],
            },
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            name: 'chromium',
            provider: 'playwright',
          },
          name: 'storybook',
          retry: isCI ? 2 : 1,
        },
      },
    ],
  },
});
