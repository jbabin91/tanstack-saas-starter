# React 19

React is a JavaScript library for building user interfaces. This project uses React 19, which introduces several new features and improvements over previous versions.

## Key Features in React 19

- Improved performance with automatic memoization
- New concurrent rendering features
- Enhanced support for server components
- Simplified APIs for common patterns

## Project Usage

In this project, React 19 is used as the core UI library. Key integration points include:

- Integration with TanStack Router for routing
- Integration with TanStack Query for data fetching
- Use of modern React patterns like hooks and functional components

## Common Patterns

```tsx
// Functional component with hooks
function MyComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  const { isPending, error } = useTransition();

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, []);

  return <div>{/* JSX content */}</div>;
}
```

## Resources

- [Official React Documentation](https://react.dev/)
- [React 19 Release Notes](https://react.dev/blog)
- [TanStack React Integration](https://tanstack.com/)

# React Guidelines

## Core Principles

### Component Structure

- Use functional components with TypeScript
- Keep components focused and single-responsibility
- Follow proper naming conventions
- Implement error boundaries
- Handle loading and error states

```tsx
// ✅ Good: Functional component with proper structure
function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
}

// ❌ Avoid: Class components
class ProductCard extends React.Component<ProductCardProps> {
  render() {
    return <div>{/* ... */}</div>;
  }
}
```

### Event Handling

- Handle side effects in event handlers
- Use proper event typing
- Follow consistent naming (handle\*)
- Use ref callbacks for DOM interactions

```tsx
// ✅ Good: Event handling
function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Handle form submission
  }

  function handleInputRef(element: HTMLInputElement) {
    if (element) element.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={handleInputRef} />
    </form>
  );
}
```

### State Management

- Derive values from state directly
- Avoid unnecessary state
- Use proper context patterns
- Implement proper state updates

```tsx
// ✅ Good: Derived state
function Cart({ items }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;
  const hasItems = items.length > 0;

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${totalPrice}</p>
      {hasItems ?
        <CheckoutButton />
      : null}
    </div>
  );
}
```

### Rendering Patterns

- Use ternaries for conditional rendering
- Use null for conditional rendering
- Keep JSX expressions simple
- Follow proper list rendering

```tsx
// ✅ Good: Conditional rendering
function UserProfile({ user, isAdmin }: UserProfileProps) {
  return (
    <div>
      <h1>{user.name}</h1>
      {isAdmin ?
        <AdminControls />
      : null}
      {user.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Effects and Lifecycle

- Avoid unnecessary useEffect
- Use proper cleanup in effects
- Handle async operations correctly
- Use proper dependencies

```tsx
// ✅ Good: Necessary effect with cleanup
function KeyboardShortcuts() {
  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          // Handle escape
        }
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, []);

  return null;
}
```

### Testing

- Test user interactions
- Use proper queries
- Test error states
- Follow accessibility in tests

```tsx
// ✅ Good: User interaction testing
test('submits form with user data', async () => {
  render(<UserForm />);

  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

### Performance

- Use proper memoization
- Implement code splitting
- Optimize re-renders
- Handle large lists properly

```tsx
// ✅ Good: Memoization
const MemoizedExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  return <div>{/* Complex rendering */}</div>;
});

function ParentComponent() {
  const memoizedValue = useMemo(() => expensiveCalculation(props), [props]);

  return <MemoizedExpensiveComponent data={memoizedValue} />;
}
```

## Best Practices

1. Component Design

   - Single responsibility
   - Proper prop types
   - Clear component API
   - Consistent naming

2. State Management

   - Minimal state
   - Derived calculations
   - Proper context usage
   - Immutable updates

3. Performance

   - Proper dependencies
   - Controlled re-renders
   - Code splitting
   - Resource cleanup

4. Testing

   - User-centric tests
   - Proper queries
   - Error handling
   - Accessibility checks

5. TypeScript Integration
   - Proper types
   - Type guards
   - Generic components
   - Proper inference

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/)
- [React Performance](https://react.dev/learn/render-and-commit)

# React Best Practices

## Core Principles

### Avoid useEffect When Possible

[You Might Not Need `useEffect`](https://react.dev/learn/you-might-not-need-an-effect)

Instead of using `useEffect`, prefer:

- Event handlers with `flushSync`
- Ref callbacks
- CSS transitions
- `useSyncExternalStore`
- Derived state calculations

```tsx
// ✅ Good: Handle side effects in event handlers
function ProductPage({ product, addToCart }) {
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  return <button onClick={buyProduct}>Buy {product.name}</button>;
}

// ❌ Avoid: Unnecessary useEffect
function ProductPage({ product, addToCart }) {
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  return <button onClick={() => addToCart(product)}>Buy {product.name}</button>;
}
```

Valid useEffect use cases:

```tsx
// ✅ Good: Event listeners with cleanup
useEffect(() => {
  const controller = new AbortController();

  window.addEventListener(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Handle escape key
    },
    { signal: controller.signal },
  );

  return () => {
    controller.abort();
  };
}, []);
```

### Don't Sync State, Derive It

[Don't Sync State, Derive It](https://kentcdodds.com/blog/dont-sync-state-derive-it)

Calculate values directly from state instead of syncing them with useEffect.

```tsx
// ✅ Good: Derive state directly
function Counter() {
  const [count, setCount] = useState(0);
  const isEven = count % 2 === 0;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Is even: {isEven}</p>
    </div>
  );
}

// ❌ Avoid: Syncing state unnecessarily
function Counter() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(false);

  useEffect(() => {
    setIsEven(count % 2 === 0);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Is even: {isEven}</p>
    </div>
  );
}
```

### JSX Rendering Patterns

#### Avoid Rendering Falsy Values

In JSX, use `null` for conditional rendering instead of relying on falsy values.

```tsx
// ✅ Good
function ContactList({ contacts }) {
  return (
    <div>
      {contacts.length ?
        <div>You have {contacts.length} contacts</div>
      : null}
    </div>
  );
}

// ❌ Avoid
function ContactList({ contacts }) {
  return <div>{contacts.length && <div>You have {contacts.length} contacts</div>}</div>;
}
```

#### Use Ternaries for Conditionals

Use ternary operators for conditional rendering. They're expressions and can be used anywhere expressions are allowed.

```tsx
// ✅ Good
function App({ user }: { user: User }) {
  return (
    <div>
      {user.role === 'admin' ?
        <AdminPanel />
      : <UserPanel />}
    </div>
  );
}

// ❌ Avoid if statements in JSX
function App({ user }: { user: User }) {
  if (user.role === 'admin') {
    return <AdminPanel />;
  }
  return <UserPanel />;
}
```
