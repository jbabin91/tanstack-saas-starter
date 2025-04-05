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
    // Longer timeouts in CI, shorter locally for faster feedback
    hookTimeout: isCI ? 45000 : 10000,
    // Keep isolate false as it fixed the suite discovery issue
    isolate: false,
    // Parallel in local, sequential in CI for stability
    maxConcurrency: isCI ? 1 : 3,
    maxWorkers: isCI ? 1 : 2,
    minWorkers: 1,
    pool: 'threads',
    setupFiles: ['.storybook/vitest.setup.ts'],
    testTimeout: isCI ? 45000 : 10000,
    workspace: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            // Keep quiet flag in CI for cleaner logs
            storybookScript:
              isCI ? 'pnpm storybook --ci --quiet' : 'pnpm storybook --ci',
            storybookUrl: 'http://localhost:6006',
            tags: {
              include: ['test'],
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
          // More retries in CI, fewer locally for faster feedback
          retry: isCI ? 2 : 1,
          testTimeout: isCI ? 45000 : 10000,
        },
      },
    ],
  },
});
