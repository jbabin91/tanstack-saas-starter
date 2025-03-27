# TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Common TypeScript Types

| Type      | Description                    | Example                          |
| --------- | ------------------------------ | -------------------------------- |
| `string`  | Text values                    | `let name: string = 'John'`      |
| `number`  | Numeric values                 | `let age: number = 25`           |
| `boolean` | True/false values              | `let active: boolean = true`     |
| `any`     | Any type (avoid when possible) | `let data: any = fetchData()`    |
| `unknown` | Type-safe alternative to `any` | `let input: unknown = userInput` |

## Type Guards

Use type guards with type predicates for runtime type safety:

```typescript
// Type guard with type predicate
function isError(maybeError: unknown): maybeError is Error {
  return (
    maybeError && typeof maybeError === 'object' && 'message' in maybeError && typeof maybeError.message === 'string'
  );
}

// Using schema validation as a type guard
function isUser(data: unknown): data is User {
  return UserSchema.safeParse(data).success;
}

// Usage
const data: unknown = await fetchData();
if (isUser(data)) {
  // TypeScript knows data is User type here
  console.log(data.name);
}
```

## Schema Validation

Use Zod for runtime type checking and type inference:

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

// Infer type from schema
type User = z.infer<typeof UserSchema>;

// Validate external data
const validateUser = (data: unknown) => {
  return UserSchema.parse(data);
};
```

## Type Definitions

Use types for better composability and flexibility:

```typescript
// Basic type definition
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

// Extending types
type BaseUser = {
  id: string;
  name: string;
};

type AdminUser = BaseUser & {
  role: 'admin';
  permissions: string[];
};

// Utility types
type UserWithoutId = Omit<User, 'id'>;
type UserKeys = keyof User;
type PartialUser = Partial<User>;
```

## React Integration

TypeScript integrates seamlessly with React:

```tsx
// Component props typing
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

// React component with TypeScript
const Button = ({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
      {label}
    </button>
  );
};

// Type inference in hooks
const [count, setCount] = useState(0); // TypeScript infers number
const isEven = count % 2 === 0; // TypeScript infers boolean
```

## Best Practices

1. Let TypeScript infer types when possible
2. Use `unknown` over `any` for type safety
3. Use type guards with type predicates
4. Use schema validation for external data
5. Avoid type assertions (`as`)
6. Prefer types over interfaces
   - Types are more flexible and can express more patterns
   - Types can be used for unions, intersections, and mapped types
   - Types provide better error messages
   - Types are more consistent with modern TypeScript practices
7. Use explicit type annotations for function parameters
8. Use type inference for function return types
9. Use schema validation at system boundaries
10. Keep types simple and composable

## Resources

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)

# TypeScript Guidelines

## Core Principles

- Use TypeScript for all new code
- Enable strict mode in tsconfig
- Let TypeScript infer types when possible
- Use `unknown` over `any` for values of unknown type
- Use type guards with type predicates for runtime safety
- Use schema validation (Zod) for external data boundaries

## Type Definitions

### Variables and References

```ts
// ✅ Good
const name: string = 'Kent';
const age = 36; // Type inferred as number
const person = { name, age }; // Type inferred from properties

// ❌ Avoid
const name = 'Kent' as string;
const age: number = 36; // Type inference is sufficient
```

### Arrays

Use Array generic syntax over brackets:

```ts
// ✅ Good
const items: Array<string> = [];
function transform(numbers: Array<number>) {}

// ❌ Avoid
const items: string[] = [];
function transform(numbers: number[]) {}
```

### Objects

```ts
// ✅ Good
type Person = {
  name: string;
  age: number;
  address?: string; // Optional property
};

const person: Person = {
  name: 'Kent',
  age: 36,
};

// ❌ Avoid
interface Person {
  name: string;
  age: number;
  address?: string;
}
```

### Functions

```ts
// ✅ Good
function add(a: number, b: number) {
  return a + b; // Return type inferred
}

// ❌ Avoid
function add(a: number, b: number): number {
  return a + b; // Explicit return type unnecessary
}
```

## Type Guards

Use type guards with type predicates for runtime safety:

```ts
// ✅ Good
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function handleError(error: unknown) {
  if (isError(error)) {
    console.error(error.message); // TypeScript knows error is Error
  }
}

// ❌ Avoid
function handleError(error: any) {
  console.error(error.message); // Unsafe
}
```

## Schema Validation

Use Zod for runtime validation and type inference:

```ts
// ✅ Good
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

function processUserData(data: unknown) {
  const user = UserSchema.parse(data);
  // TypeScript knows user is User
}

// ❌ Avoid
type User = {
  id: string;
  name: string;
  age: number;
  email: string;
};

function processUserData(data: any) {
  const user = data as User; // Unsafe
}
```

## Best Practices

### Type Inference

Let TypeScript infer types when possible:

```ts
// ✅ Good
const numbers = [1, 2, 3]; // Type: number[]
const doubled = numbers.map((n) => n * 2); // Type: number[]

// ❌ Avoid
const numbers: Array<number> = [1, 2, 3];
const doubled: Array<number> = numbers.map((n: number): number => n * 2);
```

### Unknown vs Any

Use `unknown` for values of unknown type:

```ts
// ✅ Good
function processValue(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  throw new Error('Value must be string');
}

// ❌ Avoid
function processValue(value: any) {
  return value.toUpperCase(); // Unsafe
}
```

### Type Guards

Use type guards for runtime safety:

```ts
// ✅ Good
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
}

// ❌ Avoid
function processUser(user: unknown) {
  return (user as User).name; // Unsafe
}
```

### Avoid Type Assertions

Avoid type assertions (`as`) when possible:

```ts
// ✅ Good
function getLength(value: string | Array<unknown>) {
  if (Array.isArray(value)) {
    return value.length;
  }
  return value.length;
}

// ❌ Avoid
function getLength(value: string | Array<unknown>) {
  return (value as any).length;
}
```

### Use Proper Error Types

Define proper error types:

```ts
// ✅ Good
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ❌ Avoid
throw new Error('Invalid input'); // Generic error
```

## Common Patterns

### Optional Properties

Use optional properties over union with undefined:

```ts
// ✅ Good
type Config = {
  name: string;
  port?: number;
};

// ❌ Avoid
type Config = {
  name: string;
  port: number | undefined;
};
```

### Discriminated Unions

Use discriminated unions for type-safe handling of different cases:

```ts
// ✅ Good
type Result<T> = { status: 'success'; data: T } | { status: 'error'; error: Error };

function handleResult<T>(result: Result<T>) {
  if (result.status === 'success') {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
}
```

### Generic Constraints

Use generic constraints to ensure type safety:

```ts
// ✅ Good
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ❌ Avoid
function getProperty(obj: any, key: string): any {
  return obj[key];
}
```
