import '@testing-library/jest-dom/vitest';
import '@storybook/test';

import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach } from 'vitest';

import * as projectAnnotations from './preview';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(project.beforeAll);

// Clean up after each test
beforeEach(() => {
  cleanup();
});

// Clean up after each test
afterEach(() => {
  cleanup();
});
