# Common Testing Patterns

This guide covers frequently used testing patterns in the TanStack SaaS Starter project.

## Component Testing

### Component Rendering

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### User Interactions

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('increments counter on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole('button'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## Data Fetching

### Mocking API Calls

```typescript
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './UserProfile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('displays user data', async () => {
  server.use(
    rest.get('/api/user', (req, res, ctx) => {
      return res(ctx.json({ name: 'John Doe' }));
    })
  );

  render(
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );

  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

## Form Testing

### Form Submission

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('submits form with user data', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

## Error Handling

### Testing Error States

```typescript
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

test('displays error message', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

## Route Testing

### Testing Navigation

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from '@tanstack/router';
import { App } from './App';

test('navigates to about page', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter({ routes });

  render(<App router={router} />);

  await user.click(screen.getByRole('link', { name: /about/i }));
  expect(screen.getByRole('heading')).toHaveTextContent('About');
});
```

## Authentication Testing

### Testing Protected Routes

```typescript
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

test('redirects unauthenticated user', () => {
  render(
    <AuthProvider initialState={{ isAuthenticated: false }}>
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    </AuthProvider>
  );

  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  expect(screen.getByText('Please login')).toBeInTheDocument();
});
```

## Related Documentation

- [Unit Testing](./unit.md) - Component and function testing
- [Integration Testing](./integration.md) - Component interaction testing
- [End-to-End Testing](./e2e.md) - Full user flow testing
