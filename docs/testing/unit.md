# Unit Testing

Unit tests focus on testing individual functions, components, and utilities in isolation. They are the foundation of the testing pyramid and should be fast, reliable, and focused.

## Core Testing Principles

### Test User Behavior, Not Implementation

> The more your tests resemble the way your software is used, the more confidence they can give you. - [Kent C. Dodds](https://x.com/kentcdodds/status/977018512689455106)

```tsx
// ✅ Good
test('User can increment counter', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button', { name: /increment/i }));
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// ❌ Avoid
test('Counter state updates', () => {
  const { container } = render(<Counter />);
  const button = container.querySelector('[data-testid="increment"]');
  fireEvent.click(button);
  expect(container.querySelector('[data-testid="count"]')).toHaveTextContent('1');
});
```

### Avoid Unnecessary Mocks

Only mock what's absolutely necessary. Most of the time, you don't need to mock your own code.

```tsx
// ✅ Good
function Greeting({ name }: { name: string }) {
  return <div>Hello {name}</div>;
}

test('Greeting displays the name', () => {
  render(<Greeting name="Kent" />);
  expect(screen.getByText('Hello Kent')).toBeInTheDocument();
});

// ❌ Avoid
test('Greeting displays the name', () => {
  const mockName = 'Kent';
  vi.mock('./greeting.tsx', () => ({
    Greeting: () => <div>Hello {mockName}</div>,
  }));
  render(<Greeting name={mockName} />);
  expect(container).toHaveTextContent('Hello Kent');
});
```

### Use Proper Query Priority

Follow this query priority order:

1. `getByRole` (most preferred)
2. `getByLabelText`
3. `getByText`
4. `getByTestId` (least preferred)

```tsx
// ✅ Good
screen.getByRole('textbox', { name: /username/i });

// ❌ Avoid
screen.getByTestId('username');
container.querySelector('.input-username');
```

### Use Query Variants Correctly

```tsx
// ✅ Good - Use queryBy for checking non-existence
expect(screen.queryByRole('alert')).not.toBeInTheDocument();

// ✅ Good - Use findBy for async elements
const submitButton = await screen.findByRole('button', { name: /submit/i });

// ❌ Avoid - Don't use waitFor for elements
const submitButton = await waitFor(() => screen.getByRole('button', { name: /submit/i }));
```

### Keep Tests Flat

Avoid nesting tests with describe blocks. Keep tests simple and direct.

```tsx
// ✅ Good
test('User can log in with valid credentials', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});

// ❌ Avoid
describe('LoginForm', () => {
  describe('when credentials are valid', () => {
    it('should allow login', async () => {
      // ... same test code ...
    });
  });
});
```

### Avoid Shared Setup

```tsx
// ✅ Good
test('renders a greeting', () => {
  render(<Greeting name="Kent" />);
  expect(screen.getByText('Hello Kent')).toBeInTheDocument();
});

// ❌ Avoid
let utils;
beforeEach(() => {
  utils = render(<Greeting name="Kent" />);
});

test('renders a greeting', () => {
  expect(utils.getByText('Hello Kent')).toBeInTheDocument();
});
```

### Use userEvent Over fireEvent

```tsx
// ✅ Good
await userEvent.type(screen.getByRole('textbox'), 'Hello');

// ❌ Avoid
fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
```

## Core Principles

- Test pure functions in isolation
- One assertion per test
- Fast execution
- No external dependencies
- Clear input/output expectations

## Testing Pure Functions

```tsx
// math.ts
export const add = (a: number, b: number): number => a + b;
export const multiply = (a: number, b: number): number => a * b;

// math.test.ts
import { add, multiply } from './math';

test('add combines two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});

test('multiply combines two numbers', () => {
  expect(multiply(2, 3)).toBe(6);
  expect(multiply(-2, 3)).toBe(-6);
  expect(multiply(0, 5)).toBe(0);
});
```

## Testing Utilities

```tsx
// utils/format.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// utils/format.test.ts
import { formatCurrency } from './format';

test('formats currency correctly', () => {
  expect(formatCurrency(10)).toBe('$10.00');
  expect(formatCurrency(10.5)).toBe('$10.50');
  expect(formatCurrency(1000)).toBe('$1,000.00');
});
```

## Testing Hooks

```tsx
// hooks/useCounter.ts
import { useState } from 'react';

export const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return { count, increment, decrement };
};

// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('initializes with default value', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('can increment counter', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Testing Helper Functions

```tsx
// helpers/validation.ts
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// helpers/validation.test.ts
import { isValidEmail } from './validation';

test('validates email format', () => {
  // Valid emails
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('user.name@domain.co.uk')).toBe(true);

  // Invalid emails
  expect(isValidEmail('invalid-email')).toBe(false);
  expect(isValidEmail('@domain.com')).toBe(false);
  expect(isValidEmail('user@')).toBe(false);
});
```

## Testing Type Guards

```tsx
// types/guards.ts
type User = {
  id: string;
  name: string;
  email: string;
};

export const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'name' in value
    && 'email' in value
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.email === 'string'
  );
};

// types/guards.test.ts
import { isUser } from './guards';

test('validates user objects', () => {
  // Valid user
  expect(isUser({ id: '1', name: 'John', email: 'john@example.com' })).toBe(true);

  // Invalid users
  expect(isUser(null)).toBe(false);
  expect(isUser({})).toBe(false);
  expect(isUser({ id: 1, name: 'John', email: 'john@example.com' })).toBe(false);
  expect(isUser({ id: '1', name: 123, email: 'john@example.com' })).toBe(false);
  expect(isUser({ id: '1', name: 'John', email: 123 })).toBe(false);
});
```

## Best Practices

1. Test Structure

   ```tsx
   test('descriptive test name', () => {
     // 1. Arrange
     const input = 'test';

     // 2. Act
     const result = processInput(input);

     // 3. Assert
     expect(result).toBe('TEST');
   });
   ```

2. Edge Cases

   ```tsx
   test('handles edge cases', () => {
     expect(processInput('')).toBe('');
     expect(processInput(null)).toBe('');
     expect(processInput(undefined)).toBe('');
   });
   ```

3. Error Cases

   ```tsx
   test('throws for invalid input', () => {
     expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
   });
   ```

## Common Patterns

1. Setup/Teardown

   ```tsx
   let testData: TestData;

   beforeEach(() => {
     testData = createTestData();
   });

   afterEach(() => {
     cleanup();
   });
   ```

2. Parameterized Tests

   ```tsx
   test.each([
     [1, 1, 2],
     [2, 2, 4],
     [0, 5, 5],
   ])('adds %i + %i to equal %i', (a, b, expected) => {
     expect(add(a, b)).toBe(expected);
   });
   ```

3. Mocking Return Values

   ```tsx
   const mockFn = vi.fn();
   mockFn.mockReturnValue('mocked value');
   // or
   mockFn.mockImplementation(() => 'mocked value');
   ```

## Resources

- [Vitest Unit Testing Guide](https://vitest.dev/guide/testing-types.html)
- [Testing Library Hooks Testing](https://testing-library.com/docs/react-testing-library/api#renderhook)
- [Jest Expect API](https://jestjs.io/docs/expect)
