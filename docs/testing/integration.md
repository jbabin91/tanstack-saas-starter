# Integration Testing

Integration tests verify that multiple units work together correctly. They test component interactions, data flow, and feature functionality as a whole.

## Core Principles

- Test component interactions
- Test data flow between components
- Test feature functionality
- Use realistic data scenarios
- Mock external dependencies

## Component Integration

```tsx
// features/TodoList/TodoList.tsx
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: uuid(), title: text, completed: false }]);
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <TodoItems
        items={todos}
        onToggle={(id) => {
          /* ... */
        }}
      />
    </div>
  );
};

// features/TodoList/TodoList.test.tsx
test('adds and displays new todo', async () => {
  const user = userEvent.setup();
  render(<TodoList />);

  await user.type(screen.getByRole('textbox'), 'New todo');
  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText('New todo')).toBeInTheDocument();
});
```

## Form Integration

```tsx
// features/Registration/RegistrationForm.tsx
const RegistrationForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    await api.register(data);
  };

  return (
    <Form {...form}>
      <Input name="email" label="Email" />
      <Input name="password" type="password" label="Password" />
      <Button type="submit">Register</Button>
    </Form>
  );
};

// features/Registration/RegistrationForm.test.tsx
test('submits registration form with valid data', async () => {
  const user = userEvent.setup();

  // Mock API
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

## Data Flow Testing

```tsx
// features/Cart/CartContext.tsx
const CartContext = createContext<CartContextType>(null!);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  return <CartContext.Provider value={{ items, addItem }}>{children}</CartContext.Provider>;
};

// features/Cart/Cart.test.tsx
test('adds item to cart and updates total', async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <ProductList />
      <CartSummary />
    </CartProvider>,
  );

  await user.click(screen.getByRole('button', { name: /add to cart/i }));

  expect(screen.getByText('1 item')).toBeInTheDocument();
  expect(screen.getByText('$10.00')).toBeInTheDocument();
});
```

## API Integration

```tsx
// features/Users/UserList.tsx
const UserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

// features/Users/UserList.test.tsx
test('loads and displays users', async () => {
  // Mock API response
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
```

## Error Handling

```tsx
test('displays error message on API failure', async () => {
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<UserList />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test('validates form submission', async () => {
  const user = userEvent.setup();

  render(<RegistrationForm />);

  await user.click(screen.getByRole('button', { name: /register/i }));

  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
});
```

## Best Practices

1. Test Setup

   ```tsx
   // Wrap components with necessary providers
   const wrapper = ({ children }: PropsWithChildren) => (
     <QueryClientProvider client={queryClient}>
       <CartProvider>{children}</CartProvider>
     </QueryClientProvider>
   );

   beforeEach(() => {
     queryClient.clear();
   });
   ```

2. API Mocking

   ```tsx
   // Create reusable handlers
   const handlers = [
     http.get('/api/users', () => {
       return HttpResponse.json(mockUsers);
     }),
   ];

   const server = setupServer(...handlers);

   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());
   ```

3. Complex Interactions

   ```tsx
   test('completes checkout flow', async () => {
     const user = userEvent.setup();

     render(<CheckoutFlow />);

     // Step 1: Add items
     await user.click(screen.getByRole('button', { name: /add/i }));

     // Step 2: Fill shipping
     await user.type(screen.getByLabelText(/address/i), '123 Main St');

     // Step 3: Payment
     await user.type(screen.getByLabelText(/card/i), '4242424242424242');

     // Complete
     await user.click(screen.getByRole('button', { name: /pay/i }));

     expect(await screen.findByText(/success/i)).toBeInTheDocument();
   });
   ```

## Resources

- [Testing Library Integration Testing](https://testing-library.com/docs/react-testing-library/example-intro)
- [MSW API Mocking](https://mswjs.io/docs/getting-started/mocks/rest-api)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)
