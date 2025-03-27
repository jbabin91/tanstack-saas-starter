# Validation Patterns

This guide covers common validation patterns using Zod in the TanStack SaaS Starter project.

## Basic Types

### String Validation

```typescript
import { z } from 'zod';

const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

const emailSchema = z.string().email('Invalid email address').toLowerCase();

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');
```

### Number Validation

```typescript
const ageSchema = z
  .number()
  .int('Age must be a whole number')
  .min(0, 'Age must be positive')
  .max(120, 'Age must be less than 120');

const priceSchema = z
  .number()
  .positive('Price must be positive')
  .multipleOf(0.01, 'Price must have at most 2 decimal places');
```

## Object Schemas

### User Schema

```typescript
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().int().min(0).optional(),
  role: z.enum(['user', 'admin']),
  settings: z
    .object({
      theme: z.enum(['light', 'dark']),
      notifications: z.boolean(),
    })
    .optional(),
});

type User = z.infer<typeof userSchema>;
```

### Form Schema

```typescript
const signupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
```

## Array Validation

### List Validation

```typescript
const todoListSchema = z
  .array(
    z.object({
      id: z.string().uuid(),
      title: z.string().min(1),
      completed: z.boolean(),
    }),
  )
  .min(1, 'List must not be empty');

const tagsSchema = z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed');
```

## Custom Validation

### Custom Types

```typescript
const dateSchema = z.string().refine((value) => !isNaN(Date.parse(value)), 'Invalid date format');

const urlSchema = z
  .string()
  .url()
  .refine((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, 'Invalid URL');
```

### Custom Validation Functions

```typescript
const futureDate = z.date().refine((date) => date > new Date(), 'Date must be in the future');

const uniqueArray = <T extends z.ZodType>(schema: T) => {
  return z.array(schema).refine((items) => new Set(items).size === items.length, 'Duplicate items are not allowed');
};
```

## Form Integration

### React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
      <input type="password" {...form.register('password')} />
      {form.formState.errors.password && (
        <span>{form.formState.errors.password.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Validation

### Request Validation

```typescript
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['user', 'admin']),
});

async function createUser(req: Request) {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return {
      status: 400,
      body: { errors: result.error.flatten() },
    };
  }

  // Process validated data
  const user = result.data;
}
```

### Response Validation

```typescript
const userResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string().datetime(),
});

async function getUser(id: string) {
  const data = await db.user.findUnique({ where: { id } });

  const result = userResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error('Invalid user data from database');
  }

  return result.data;
}
```

## Error Handling

### Custom Error Messages

```typescript
const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(3, {
      message: 'Username must be at least 3 characters',
    }),
});
```

### Error Formatting

```typescript
function formatZodError(error: z.ZodError) {
  return error.errors.reduce((acc, err) => {
    const path = err.path.join('.');
    return {
      ...acc,
      [path]: err.message,
    };
  }, {});
}
```

## Related Documentation

- [Form Validation](./forms.md) - Form validation patterns
- [API Validation](./api.md) - API validation patterns
- [Error Handling](../core/error-handling.md) - Error handling patterns
