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

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
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
    hookTimeout: isCI ? 30000 : 10000,
    isolate: true,
    // Adjust concurrency based on environment
    maxConcurrency: isCI ? 1 : 3,
    maxWorkers: isCI ? 1 : 2,
    minWorkers: 1,
    // Use threads in local dev, vmThreads in CI for better isolation
    pool: isCI ? 'vmThreads' : 'threads',
    poolOptions: {
      threads: {
        singleThread: isCI,
      },
      vmThreads: {
        useAtomics: true,
      },
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
    testTimeout: isCI ? 30000 : 10000,
    workspace: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
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
          // More retries in CI
          retry: isCI ? 2 : 1,
        },
      },
    ],
  },
});
