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

- Use functional components with TypeScript
- Avoid unnecessary `useEffect`
- Don't sync state, derive it
- Test user interactions, not implementation details
- Keep components focused and single-responsibility

## Modern React Patterns

### Custom Hooks

Extract reusable logic into custom hooks:

```tsx
// ✅ Good
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // Use debouncedSearch for API calls
}
```

### Compound Components

Use compound components for flexible, composable interfaces:

```tsx
// ✅ Good
function Select({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<string>()
  return (
    <SelectContext.Provider value={{ value, setValue }}>
      {children}
    </SelectContext.Provider>
  )
}

Select.Option = function Option({ value, children }: OptionProps) {
  const { setValue } = useSelectContext()
  return (
    <button onClick={() => setValue(value)}>
      {children}
    </button>
  )
}

// Usage
<Select>
  <Select.Option value="1">Option 1</Select.Option>
  <Select.Option value="2">Option 2</Select.Option>
</Select>
```

### Render Props

Use render props for flexible component composition:

```tsx
// ✅ Good
function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => React.ReactNode }) {
  return <div>{items.map(renderItem)}</div>;
}

// Usage
<List items={users} renderItem={(user) => <UserCard key={user.id} user={user} />} />;
```

## Component Structure

### Function Components

```tsx
// ✅ Good
function ProductPage({ product, addToCart }: ProductPageProps) {
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={buyProduct}>Buy Now</button>
    </div>
  );
}

// ❌ Avoid
class ProductPage extends React.Component<ProductPageProps> {
  buyProduct() {
    this.props.addToCart(this.props.product);
    showNotification(`Added ${this.props.product.name} to the shopping cart!`);
  }

  render() {
    return (
      <div>
        <h1>{this.props.product.name}</h1>
        <button onClick={this.buyProduct}>Buy Now</button>
      </div>
    );
  }
}
```

## State Management

### Derive State

```tsx
// ✅ Good
const [items, setItems] = useState<Item[]>([]);
const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
const itemCount = items.length;
const hasItems = items.length > 0;

// ❌ Avoid
const [items, setItems] = useState<Item[]>([]);
const [totalPrice, setTotalPrice] = useState(0);
const [itemCount, setItemCount] = useState(0);
const [hasItems, setHasItems] = useState(false);

useEffect(() => {
  setTotalPrice(items.reduce((sum, item) => sum + item.price, 0));
  setItemCount(items.length);
  setHasItems(items.length > 0);
}, [items]);
```

### Context Best Practices

```tsx
// ✅ Good
const CartContext = createContext<CartContextType | null>(null);

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const value = useMemo(
    () => ({
      items,
      setItems,
      totalPrice,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
```

## Rendering

### Conditional Rendering

```tsx
// ✅ Good
<div>
  {contacts.length ? (
    <div>You have {contacts.length} contacts</div>
  ) : null}
</div>

// ❌ Avoid
<div>
  {contacts.length && <div>You have {contacts.length} contacts</div>}
</div>
```

### Use Ternaries

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

// ❌ Avoid
function App({ user }: { user: User }) {
  if (user.role === 'admin') {
    return <AdminPanel />;
  }
  return <UserPanel />;
}
```

## Event Handling

### Event Handler Naming

```tsx
// ✅ Good
function SearchForm() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // ...
  }

  return <form onSubmit={handleSubmit}>...</form>;
}

// ❌ Avoid
function SearchForm() {
  function submitForm(e: FormEvent) {
    e.preventDefault();
    // ...
  }

  return <form onSubmit={submitForm}>...</form>;
}
```

### Inline Event Handlers

```tsx
// ✅ Good
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// ❌ Avoid
function Counter() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount((c) => c + 1);
  }
  return <button onClick={increment}>Count: {count}</button>;
}
```

## Props

### Props Destructuring

```tsx
// ✅ Good
function UserProfile({ name, avatar, email }: UserProfileProps) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// ❌ Avoid
function UserProfile(props: UserProfileProps) {
  return (
    <div>
      <img src={props.avatar} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}
```

### Default Props

```tsx
// ✅ Good
function Button({ variant = 'primary', children }: ButtonProps) {
  return <button className={variant}>{children}</button>;
}

// ❌ Avoid
function Button({ variant, children }: ButtonProps) {
  return <button className={variant ?? 'primary'}>{children}</button>;
}
```

## Testing

### Test User Interactions

```tsx
// ✅ Good
test('User can add items to cart', async () => {
  render(<ProductList />);
  await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  await expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument();
});

// ❌ Avoid
test('Cart state updates when addToCart is called', () => {
  const { container } = render(<ProductList />);
  const addButton = container.querySelector('[data-testid="add-button"]');
  fireEvent.click(addButton);
  expect(container.querySelector('[data-testid="cart-count"]')).toHaveTextContent('1');
});
```

## Best Practices

- Keep components focused and single-responsibility
- Use TypeScript for better type safety
- Avoid unnecessary state
- Derive values from state when possible
- Use proper event handling
- Test user interactions
- Use proper prop types
- Follow consistent naming conventions
- Write descriptive component names
- Document complex logic
- Use proper error boundaries
- Handle loading and error states
- Follow accessibility best practices
- Use proper form handling
- Keep components pure when possible
- Use code splitting for large applications
- Implement proper error handling
- Follow performance best practices
- Use proper state management patterns
- Implement proper testing strategies
