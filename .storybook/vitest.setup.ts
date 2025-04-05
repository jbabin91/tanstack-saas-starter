import '@testing-library/jest-dom/vitest';
import '@storybook/test';

import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

import * as projectAnnotations from './preview';

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock requestAnimationFrame
if (typeof window !== 'undefined') {
  window.requestAnimationFrame = vi.fn(
    (callback: FrameRequestCallback): number => {
      return Number(setTimeout(() => callback(performance.now()), 0));
    },
  );
  window.cancelAnimationFrame = vi.fn((id: number): void => clearTimeout(id));
}

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// This is an important step to apply the right configuration when testing your stories.
const project = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(async () => {
  try {
    await project.beforeAll();
  } catch (error) {
    console.error('Error in beforeAll:', error);
    throw error;
  }
});

afterAll(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
