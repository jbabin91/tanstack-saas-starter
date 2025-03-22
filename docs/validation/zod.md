# Zod

Zod is a TypeScript-first schema validation library with comprehensive type inference. It's used in this project for form validation and data parsing.

## Key Features

- TypeScript-first with full type inference
- Composable schemas for complex validation
- Rich error messages
- Runtime type checking
- Parse and transform data

## Validation Methods

| Method      | Description            | Example               |
| ----------- | ---------------------- | --------------------- |
| `string()`  | Validates string type  | `z.string()`          |
| `number()`  | Validates number type  | `z.number()`          |
| `boolean()` | Validates boolean type | `z.boolean()`         |
| `date()`    | Validates Date objects | `z.date()`            |
| `array()`   | Validates arrays       | `z.array(z.string())` |

## Basic Usage

```tsx
import { z } from 'zod';

// Define a schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().int().min(18, 'Must be at least 18 years old'),
  role: z.enum(['admin', 'user', 'editor']),
});

// Type inference
type User = z.infer<typeof userSchema>;

// Validation
const result = userSchema.safeParse(data);
if (result.success) {
  // Use result.data (typed as User)
  const user = result.data;
  console.log(user.name); // TypeScript knows this is a string
} else {
  // Handle validation errors in result.error
  console.error(result.error.format());
}
```

## Common Schema Types

```tsx
// String validations
const stringSchema = z
  .string()
  .min(2, 'Too short')
  .max(100, 'Too long')
  .email('Invalid email')
  .url('Invalid URL')
  .regex(/pattern/, 'Invalid pattern');

// Number validations
const numberSchema = z
  .number()
  .int('Must be an integer')
  .positive('Must be positive')
  .min(0, 'Must be at least 0')
  .max(100, 'Must be at most 100');

// Boolean
const booleanSchema = z.boolean();

// Date
const dateSchema = z.date();

// Arrays
const arraySchema = z.array(z.string()).min(1, 'Must have at least one item').max(10, 'Too many items');

// Optional fields
const optionalSchema = z.object({
  required: z.string(),
  optional: z.string().optional(),
  nullish: z.string().nullish(), // null or undefined
});

// Union types
const unionSchema = z.union([z.string(), z.number()]);
// Or shorthand:
const unionSchema2 = z.string().or(z.number());

// Enums
const roleSchema = z.enum(['admin', 'user', 'editor']);
```

## String Validations

| Method    | Purpose          | Example                        |
| --------- | ---------------- | ------------------------------ |
| `min()`   | Minimum length   | `.min(2, 'Too short')`         |
| `max()`   | Maximum length   | `.max(100, 'Too long')`        |
| `email()` | Email format     | `.email('Invalid email')`      |
| `url()`   | URL format       | `.url('Invalid URL')`          |
| `regex()` | Pattern matching | `.regex(/pattern/, 'Invalid')` |

## Number Validations

| Method       | Purpose            | Example                         |
| ------------ | ------------------ | ------------------------------- |
| `int()`      | Integer validation | `.int('Must be integer')`       |
| `positive()` | Greater than 0     | `.positive('Must be positive')` |
| `min()`      | Minimum value      | `.min(0, 'Min value is 0')`     |
| `max()`      | Maximum value      | `.max(100, 'Max is 100')`       |

## Integration with TanStack Form

In this project, Zod is used with TanStack Form for form validation:

```tsx
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

function MyForm() {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onSubmit: schema,
      onChange: schema,
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  // Form JSX
}
```

## Transformations

Zod can also transform data during validation:

```tsx
const stringToNumber = z.string().transform((val) => parseInt(val, 10));
const dateString = z.string().transform((val) => new Date(val));

// Preprocessing
const trimmedString = z.preprocess((val) => (typeof val === 'string' ? val.trim() : val), z.string().min(1));
```

## Project Usage

In this project, Zod is used for:

- Form validation with TanStack Form
- API request validation
- Type definitions with schema validation

## Resources

- [Official Documentation](https://zod.dev/)
- [GitHub Repository](https://github.com/colinhacks/zod)
- [TanStack Form Integration](https://tanstack.com/form/latest/docs/framework/react/examples/zod)
