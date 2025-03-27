# Integration Testing

Integration tests verify how multiple components and services work together. They focus on testing component interactions, data flow, and feature functionality.

## Integration Test Types

1. **Component Integration**

   - Parent-child component interactions
   - Context providers and consumers
   - Component composition

2. **Data Flow Integration**

   - Form submissions
   - State management
   - Context updates
   - Data fetching

3. **API Integration**

   - API calls and responses
   - Error handling
   - Loading states
   - Data transformation

4. **Feature Integration**
   - Complete features
   - User workflows
   - Complex interactions

## Component Integration Examples

```tsx
// Testing parent-child interaction
function ParentComponent() {
  const [value, setValue] = useState('');
  return (
    <div>
      <ChildInput onChange={setValue} />
      <ChildDisplay value={value} />
    </div>
  );
}

test('parent-child interaction', async () => {
  render(<ParentComponent />);
  await userEvent.type(screen.getByRole('textbox'), 'test');
  expect(screen.getByText('test')).toBeInTheDocument();
});

// Testing context integration
function TodoList() {
  const { todos, addTodo } = useTodoContext();
  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <TodoItems items={todos} />
    </div>
  );
}

test('todo context integration', async () => {
  render(
    <TodoProvider>
      <TodoList />
    </TodoProvider>,
  );

  await userEvent.type(screen.getByRole('textbox'), 'New Todo');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText('New Todo')).toBeInTheDocument();
});
```

## Data Flow Examples

```tsx
// Form with validation and submission
function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    await api.register(data);
  };

  return (
    <Form {...form}>
      <Input name="email" label="Email" />
      <Input name="password" type="password" label="Password" />
      <Button type="submit">Register</Button>
    </Form>
  );
}

test('form submission flow', async () => {
  const user = userEvent.setup();

  server.use(
    http.post('/api/register', () => {
      return HttpResponse.json({ success: true });
    }),
  );

  render(<RegistrationForm />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /register/i }));

  expect(await screen.findByText(/success/i)).toBeInTheDocument();
});
```

## API Integration Examples

```tsx
// Data fetching and display
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

test('fetches and displays users', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json([
        { id: '1', name: 'John' },
        { id: '2', name: 'Jane' },
      ]);
    }),
  );

  render(<UserList />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
});

test('handles API errors', async () => {
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<UserList />);
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
```

## Feature Integration Examples

```tsx
// Complete checkout flow
test('completes checkout process', async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <CheckoutFlow />
    </CartProvider>,
  );

  // Add items to cart
  await user.click(screen.getByRole('button', { name: /add to cart/i }));
  expect(screen.getByText('1 item')).toBeInTheDocument();

  // Go to checkout
  await user.click(screen.getByRole('link', { name: /checkout/i }));

  // Fill shipping info
  await user.type(screen.getByLabelText(/address/i), '123 Main St');
  await user.click(screen.getByRole('button', { name: /continue/i }));

  // Complete payment
  await user.type(screen.getByLabelText(/card/i), '4242424242424242');
  await user.click(screen.getByRole('button', { name: /pay/i }));

  expect(await screen.findByText(/order confirmed/i)).toBeInTheDocument();
});
```

## Integration Testing Best Practices

1. **Test Real Interactions**

   - Use realistic user interactions
   - Test complete workflows
   - Verify state changes

2. **Mock Wisely**

   - Mock external services
   - Use MSW for API mocking
   - Keep internal logic real

3. **Handle Async Operations**

   - Use proper async utilities
   - Test loading states
   - Verify error states

4. **Maintain Test Independence**
   - Reset state between tests
   - Clean up subscriptions
   - Restore mocks

For shared testing patterns and guidelines, see:

- [Testing Strategy](./README.md)
- [Unit Testing](./unit.md) for individual component tests
- [E2E Testing](./e2e.md) for full user flow tests

## Resources

- [MSW Documentation](https://mswjs.io)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)
- [Testing Library Integration Guide](https://testing-library.com/docs/react-testing-library/example-intro)
