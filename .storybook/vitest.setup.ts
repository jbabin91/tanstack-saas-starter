import '@testing-library/jest-dom/vitest';
import '@storybook/test';

import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

import * as projectAnnotations from './preview';

// Create mock instances once and reuse them
const mockFn = vi.fn();
const mockDisconnect = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  disconnect: mockDisconnect,
  observe: mockObserve,
  unobserve: mockUnobserve,
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock requestAnimationFrame with optimized implementation
if (typeof window !== 'undefined') {
  const rAFMock = vi.fn((callback: FrameRequestCallback): number => {
    return Number(setTimeout(() => callback(performance.now()), 0));
  });
  window.requestAnimationFrame = rAFMock;
  window.cancelAnimationFrame = vi.fn((id: number): void => clearTimeout(id));
}

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: mockDisconnect,
  observe: mockObserve,
  unobserve: mockUnobserve,
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock matchMedia with optimized implementation
if (typeof window !== 'undefined') {
  const mediaQueryList = {
    addEventListener: mockFn,
    addListener: mockFn,
    dispatchEvent: mockFn,
    matches: false,
    onchange: null,
    removeEventListener: mockFn,
    removeListener: mockFn,
  };

  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn((query: string) => ({ ...mediaQueryList, media: query })),
    writable: true,
  });
}

// Cache project annotations
const project = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
]);

// Optimize setup and cleanup
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
  // Reset only what's necessary
  mockFn.mockClear();
  mockDisconnect.mockClear();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
});

afterEach(() => {
  cleanup();
});
