# Testing Strategy

## Overview

This project follows the Testing Trophy approach, emphasizing different types of tests for different purposes:

```sh
🏆 End-to-End (Playwright)
🌟 Integration (Vitest + RTL)
⚡️ Unit (Vitest + RTL)
🔍 Static Analysis (TypeScript + ESLint)
```

## Quick Reference

- [Testing Patterns](./patterns.md) - Common testing patterns and examples
- [Unit Testing](./unit.md) - Component and function testing
- [Integration Testing](./integration.md) - Component interaction testing
- [End-to-End Testing](./e2e.md) - Full user flow testing
- [Static Analysis](./static.md) - Type checking and linting

## Testing Philosophy

Our testing strategy focuses on:

1. **User-Centric Testing**

   - Test what users see and interact with
   - Focus on behaviors over implementation
   - Ensure accessibility by default

2. **Confidence in Changes**

   - Cover critical user flows
   - Test edge cases and error states
   - Prevent regressions

3. **Maintainable Tests**
   - Keep tests simple and readable
   - Follow consistent patterns
   - Minimize test brittleness

## Testing Types

### Static Analysis

Catches errors before runtime:

- TypeScript type checking
- ESLint rules and plugins
- Import sorting
- Style consistency

[Learn more about static analysis](./static.md)

### Unit Testing

Verifies individual pieces:

- React components
- Custom hooks
- Utility functions
- State management

[Learn more about unit testing](./unit.md)

### Integration Testing

Tests component interactions:

- Form submissions
- API integrations
- Data flow
- Feature workflows

[Learn more about integration testing](./integration.md)

### End-to-End Testing

Validates complete flows:

- User journeys
- Critical paths
- Authentication
- Payments

[Learn more about end-to-end testing](./e2e.md)

## Common Patterns

Our [Testing Patterns](./patterns.md) guide provides examples and best practices for:

- Component testing
- Data fetching
- Form testing
- Error handling
- Route testing
- Authentication testing

## Tools

### Core Testing Stack

- **Vitest**: Fast unit and integration testing

  ```bash
  pnpm test        # Run all tests
  pnpm test:watch  # Watch mode
  ```

- **Testing Library**: Component testing

  ```tsx
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  ```

- **Playwright**: End-to-end testing

  ```bash
  pnpm test:e2e  # Run E2E tests
  ```

### Supporting Tools

- **MSW**: API mocking

  ```tsx
  import { rest } from 'msw';
  import { setupServer } from 'msw/node';
  ```

- **Vitest UI**: Visual test runner

  ```bash
  pnpm test:ui
  ```

## Project Structure

```sh
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx  # Component tests
  hooks/
    useAuth/
      useAuth.ts
      useAuth.test.ts  # Hook tests
  __tests__/
    utils/            # Test utilities
    factories/        # Test data factories
  __mocks__/         # Mock implementations
  e2e/               # E2E test specs
```

## Getting Started

1. **Run the Test Suite**

   ```bash
   pnpm test         # All tests
   pnpm test:watch   # Watch mode
   pnpm test:e2e     # E2E tests
   pnpm test:ui      # Visual runner
   ```

2. **Check Types**

   ```bash
   pnpm typecheck    # Run TypeScript
   ```

3. **Lint Code**

   ```bash
   pnpm lint        # Run ESLint
   ```

## Best Practices

See our detailed guides:

- [Testing Patterns](./patterns.md) - Common testing patterns and examples
- [Static Analysis Guide](./static.md)
- [Unit Testing Guide](./unit.md)
- [Integration Testing Guide](./integration.md)
- [End-to-End Testing Guide](./e2e.md)

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Playwright Docs](https://playwright.dev)
- [MSW Documentation](https://mswjs.io)
