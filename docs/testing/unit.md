# Unit Testing

Unit tests verify individual pieces of code in isolation. They are the foundation of our testing strategy, providing fast feedback and confidence in our core logic.

## What to Unit Test

- Pure functions
- Utility functions
- Custom hooks
- Individual components
- Type guards
- Helper functions

## Component Testing

```tsx
// Example of a simple component test
function Greeting({ name }: { name: string }) {
  return <div>Hello {name}</div>;
}

test('renders greeting', () => {
  render(<Greeting name="User" />);
  expect(screen.getByText('Hello User')).toBeInTheDocument();
});

// Example of a component with user interaction
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

test('increments counter', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## Hook Testing

```tsx
// Custom hook example
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

test('useCounter hook', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Pure Function Testing

```tsx
// Pure function examples
function add(a: number, b: number): number {
  return a + b;
}

test('adds numbers correctly', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});

// String manipulation
function formatName(first: string, last: string): string {
  return `${first.trim()} ${last.trim()}`.trim();
}

test('formats names correctly', () => {
  expect(formatName('John', 'Doe')).toBe('John Doe');
  expect(formatName(' John ', ' Doe ')).toBe('John Doe');
  expect(formatName('', 'Doe')).toBe('Doe');
});
```

## Type Guard Testing

```tsx
type User = {
  id: string;
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'name' in value
    && typeof value.id === 'string'
    && typeof value.name === 'string'
  );
}

test('validates user type guard', () => {
  expect(isUser({ id: '1', name: 'Test' })).toBe(true);
  expect(isUser(null)).toBe(false);
  expect(isUser({ id: 1, name: 'Test' })).toBe(false);
});
```

## Utility Function Testing

```tsx
// Date formatting utility
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}

test('formats dates correctly', () => {
  const date = new Date('2024-03-27');
  expect(formatDate(date)).toBe('3/27/2024');
});

// Currency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

test('formats currency correctly', () => {
  expect(formatCurrency(10.99)).toBe('$10.99');
  expect(formatCurrency(1000)).toBe('$1,000.00');
});
```

## Unit Testing Best Practices

1. **Keep Tests Focused**

   - Test one thing at a time
   - Clear arrange-act-assert structure
   - Descriptive test names

2. **Avoid Implementation Details**

   - Test behavior, not implementation
   - Don't test internal state
   - Focus on inputs and outputs

3. **Handle Edge Cases**

   - Test boundary conditions
   - Include error cases
   - Test empty/null values

4. **Write Maintainable Tests**
   - Avoid test interdependence
   - Don't share mutable state
   - Keep setup simple

For shared testing patterns and guidelines, see:

- [Testing Strategy](./README.md)
- [Integration Testing](./integration.md) for component interaction tests
- [E2E Testing](./e2e.md) for full user flow tests

## Common Patterns

```tsx
// Parameterized tests
test.each([
  ['John', 'Doe', 'John Doe'],
  ['Jane', 'Smith', 'Jane Smith'],
  ['', 'Doe', 'Doe'],
])('formats "%s %s" to "%s"', (first, last, expected) => {
  expect(formatName(first, last)).toBe(expected);
});

// Error testing
test('handles errors', () => {
  expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
});

// Async function testing
test('async function', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
