/**
 * Storybook Test Utilities
 *
 * A collection of test utilities that combine Storybook testing capabilities with
 * Testing Library patterns for more user-centric testing:
 * - Testing Library queries and user interactions
 * - Waiting for element states and attributes
 * - Checking visibility and focus states
 * - Testing ARIA attributes and accessibility
 * - Managing async test conditions
 * - Handling React state updates safely
 */

import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { prettyDOM } from '@testing-library/dom';
import { render, type RenderResult } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import * as React from 'react';

import { ThemeProvider } from '@/providers/theme-provider';

// Re-export useful Testing Library queries and utilities
export { expect, screen, userEvent, waitFor, within };

/**
 * Wrap component with theme provider for testing
 */
export function renderWithTheme(ui: React.ReactElement): RenderResult {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider forcedTheme="light">{children}</ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper });
}

/**
 * Enhanced waitFor utility that properly handles React state updates
 */
export async function enhancedWaitFor<T>(
  callback: () => T | Promise<T>,
  options?: { timeout?: number; interval?: number },
): Promise<T> {
  return waitFor(callback, {
    interval: options?.interval ?? 50,
    timeout: options?.timeout ?? 1000,
  });
}

/**
 * Setup user event instance with defaults
 */
export function setupUserEvent(
  options?: Parameters<typeof userEvent.setup>[0],
): UserEvent {
  return userEvent.setup({
    delay: 20,
    ...options,
  });
}

/**
 * Find element by role with enhanced waiting
 */
export async function findByRole(
  container: HTMLElement,
  role: string,
  options?: Parameters<typeof within>['findByRole'][1],
) {
  const utils = within(container);
  return enhancedWaitFor(() => utils.findByRole(role, options));
}

/**
 * Find element by text with enhanced waiting
 */
export async function findByText(
  container: HTMLElement,
  text: string | RegExp,
  options?: Parameters<typeof within>['findByText'][1],
) {
  const utils = within(container);
  return enhancedWaitFor(() => utils.findByText(text, options));
}

/**
 * Find element by label text with enhanced waiting
 */
export async function findByLabelText(
  container: HTMLElement,
  text: string | RegExp,
  options?: Parameters<typeof within>['findByLabelText'][1],
) {
  const utils = within(container);
  return enhancedWaitFor(() => utils.findByLabelText(text, options));
}

/**
 * Utility to interact with element and wait for updates
 */
export async function userInteraction(
  element: HTMLElement,
  action: (user: UserEvent) => Promise<void>,
) {
  const user = setupUserEvent();
  try {
    expect(element).toBeTruthy();
    await action(user);
    // Wait for any pending updates
    await waitFor(() => expect(element).toBeTruthy(), { timeout: 100 });
  } catch (error) {
    console.error('Error during user interaction:', error);
    throw error;
  }
}

/**
 * Utility to check accessibility attributes
 */
export async function checkA11y(
  element: HTMLElement,
  options?: {
    expectedRole?: string;
    requiredAttributes?: string[];
    requiredStates?: Record<string, string>;
  },
) {
  await enhancedWaitFor(() => {
    if (options?.expectedRole) {
      expect(element).toHaveAttribute('role', options.expectedRole);
    }

    // Check required attributes
    const attributesToCheck = options?.requiredAttributes ?? [
      'aria-label',
      'tabindex',
    ];
    attributesToCheck.forEach((attr) => {
      expect(element).toHaveAttribute(attr);
    });

    // Check required states
    if (options?.requiredStates) {
      Object.entries(options.requiredStates).forEach(([attr, value]) => {
        expect(element).toHaveAttribute(attr, value);
      });
    }
  });
}

/**
 * Utility to debug element state
 */
export function debugElement(element: HTMLElement) {
  console.log(prettyDOM(element, undefined, { highlight: true }));
}

/**
 * Utility function to wait for element attributes to match expected values
 */
export async function waitForAttribute(
  element: Element | null,
  attribute: string,
  expectedValue: string,
) {
  await enhancedWaitFor(() => {
    expect(element).toHaveAttribute(attribute, expectedValue);
  });
}

/**
 * Utility function to wait for element to have specific class
 */
export async function waitForClass(element: Element | null, className: string) {
  await enhancedWaitFor(() => {
    expect(element).toHaveClass(className);
  });
}

/**
 * Utility function to wait for element state
 */
export async function waitForState(
  element: Element | null,
  state: 'open' | 'closed',
) {
  await enhancedWaitFor(() => {
    expect(element).toHaveAttribute('data-state', state);
  });
}

/**
 * Utility function to wait for element visibility
 */
export async function waitForVisibility(
  element: Element | null,
  shouldBeVisible: boolean,
) {
  await enhancedWaitFor(() => {
    if (shouldBeVisible) {
      expect(element).toBeVisible();
    } else {
      expect(element).not.toBeVisible();
    }
  });
}

/**
 * Utility function to wait for focus state
 */
export async function waitForFocus(
  element: Element | null,
  options?: { contentMatch?: string | RegExp },
) {
  await enhancedWaitFor(() => {
    const focusedElement = document.activeElement;
    if (options?.contentMatch) {
      expect(focusedElement?.textContent).toMatch(options.contentMatch);
    } else {
      expect(focusedElement).toBe(element);
    }
  });
}

/**
 * Utility function to wait for ARIA expanded state
 */
export async function waitForExpandedState(
  element: Element | null,
  expanded: boolean,
) {
  await enhancedWaitFor(() => {
    expect(element).toHaveAttribute(
      'aria-expanded',
      expanded ? 'true' : 'false',
    );
  });
}

/**
 * Utility function to wait for multiple conditions
 */
export async function waitForConditions(
  conditions: (() => void | Promise<void>)[],
  options?: { timeout?: number },
) {
  await enhancedWaitFor(
    async () => {
      try {
        for (const condition of conditions) {
          await Promise.resolve(condition());
        }
      } catch (error) {
        console.error('Error checking conditions:', error);
        throw error;
      }
    },
    { timeout: options?.timeout },
  );
}

/**
 * Utility function to wait for component to render and stabilize
 */
export async function waitForComponentStability(
  container: HTMLElement,
  options?: { timeout?: number; waitForAnimations?: boolean },
) {
  const utils = within(container);
  await waitFor(
    async () => {
      try {
        if (!container) {
          throw new Error(
            'Container element is null - component may not have mounted',
          );
        }

        // Check if container is actually in the document
        if (!document.contains(container)) {
          throw new Error(
            'Container element is not in the document - component may have unmounted',
          );
        }

        // Verify container has content
        if (!container.childNodes.length) {
          throw new Error(
            'Container element is empty - component may not have rendered',
          );
        }

        if (options?.waitForAnimations) {
          const animations = container.getAnimations();
          await Promise.all(animations.map((a) => a.finished));
        }
        return utils;
      } catch (error) {
        console.error('Error waiting for component stability:', {
          childNodes: container?.childNodes.length,
          container: container?.outerHTML,
          error,
          inDocument: document.contains(container),
        });
        throw error;
      }
    },
    {
      interval: 100,
      timeout: options?.timeout ?? 2000, // Check more frequently
    },
  );
}

/**
 * Utility function to wait for image loading
 */
export async function waitForImageLoad(imgElement: HTMLImageElement) {
  if (imgElement.complete) return;

  await enhancedWaitFor(
    () => {
      expect(imgElement.complete).toBe(true);
    },
    { timeout: 5000 },
  );
}

/**
 * Utility function to wait for animation completion
 */
export async function waitForAnimation(element: Element) {
  await enhancedWaitFor(() => {
    const animations = element.getAnimations();
    expect(animations.every((a) => a.playState === 'finished')).toBe(true);
  });
}

/**
 * Utility function to wait for state update and re-render
 */
export async function waitForUpdate<T>(
  getValue: () => T,
  expectedValue: T,
  options?: { timeout?: number },
) {
  await enhancedWaitFor(
    () => {
      expect(getValue()).toEqual(expectedValue);
    },
    { timeout: options?.timeout },
  );
}

/**
 * Type for common test queries
 */
export type TestQueries = ReturnType<typeof within>;

/**
 * Helper to create test queries for a container
 */
export function createQueries(container: HTMLElement): TestQueries {
  return within(container);
}
