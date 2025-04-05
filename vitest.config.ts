import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

// Determine the directory name, falling back to fileURLToPath for ESM environments
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : (
    path.dirname(fileURLToPath(import.meta.url))
  );

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
    hookTimeout: 10000,
    setupFiles: ['.storybook/vitest.setup.ts'],
    // Add test-specific options
    testTimeout: 10000,
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
        },
      },
    ],
  },
});
