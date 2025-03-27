# TypeScript Guide

This guide outlines TypeScript usage, patterns, and best practices for the TanStack SaaS Starter project.

## Quick Reference

### Common Types

| Type      | Use Case                       | Example                          |
| --------- | ------------------------------ | -------------------------------- |
| `string`  | Text values                    | `let name: string = 'John'`      |
| `number`  | Numeric values                 | `let age: number = 25`           |
| `boolean` | True/false values              | `let active: boolean = true`     |
| `unknown` | Type-safe alternative to `any` | `let input: unknown = userInput` |
| `never`   | Never returns or unreachable   | `function fail(): never`         |

### Type Patterns

```typescript
// Type Definition
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

// Generic Type
type Result<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

// Utility Types
type UserUpdate = Partial<User>;
type UserRequired = Required<User>;
type UserReadOnly = Readonly<User>;
```

## Core Principles

1. **Type Safety**

   - Enable strict mode in tsconfig
   - Let TypeScript infer types when possible
   - Use `unknown` over `any` for type safety
   - Use type guards with type predicates
   - Use schema validation at system boundaries

2. **Type Organization**

   - Prefer types over interfaces
   - Keep types simple and composable
   - Use descriptive type names
   - Group related types together
   - Export shared types from feature modules

3. **Type Inference**
   - Let TypeScript infer return types
   - Let TypeScript infer array and object types
   - Let TypeScript infer hook types
   - Explicitly type function parameters
   - Explicitly type complex objects

## Best Practices

### Type Inference

```typescript
// ✅ Good - Let TypeScript infer
function add(a: number, b: number) {
  return a + b;
}

const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);

// ❌ Avoid - Unnecessary type annotations
function add(a: number, b: number): number {
  return a + b;
}

const numbers: number[] = [1, 2, 3];
const doubled: number[] = numbers.map((n: number): number => n * 2);
```

### Type Guards

```typescript
// ✅ Good - Type guard with predicate
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// ✅ Good - Schema validation
function isUser(data: unknown): data is User {
  return UserSchema.safeParse(data).success;
}

// ✅ Good - Composition
function isAdminUser(user: unknown): user is AdminUser {
  return isUser(user) && user.role === 'admin';
}

// Usage
if (isError(result)) {
  console.error(result.message);
}
```

### Schema Validation

```typescript
// ✅ Good - Schema with type inference
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

type User = z.infer<typeof UserSchema>;

// ✅ Good - Validation at boundaries
function processUserData(data: unknown): User {
  return UserSchema.parse(data);
}

// ❌ Avoid - Type assertions
const user = data as User;
```

### React Integration

```typescript
// ✅ Good - Component props
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

// ✅ Good - React component
const Button = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary'
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant}`}
    >
      {label}
    </button>
  );
};

// ✅ Good - Hook types
const [value, setValue] = useState<string>('');
const { data } = useQuery<User>(['user', id]);
```

## Event Handling

### Event Types

```typescript
// ✅ Good - Event constants
export const EVENTS = {
  USER_CODE_RECEIVED: 'USER_CODE_RECEIVED',
  AUTH_RESOLVED: 'AUTH_RESOLVED',
  AUTH_REJECTED: 'AUTH_REJECTED',
} as const;

// ✅ Good - Event type safety
type EventTypes = keyof typeof EVENTS;

const CodeReceivedEventSchema = z.object({
  type: z.literal(EVENTS.USER_CODE_RECEIVED),
  code: z.string(),
  url: z.string(),
});

type CodeReceivedEvent = z.infer<typeof CodeReceivedEventSchema>;
```

### Event Patterns

```typescript
// ✅ Good - Event cleanup
useEffect(() => {
  authEmitter.on(EVENTS.USER_CODE_RECEIVED, handleCodeReceived);
  return () => {
    authEmitter.off(EVENTS.USER_CODE_RECEIVED, handleCodeReceived);
  };
}, []);

// ✅ Good - Error handling
try {
  await handleEvent(event);
} catch (error) {
  authEmitter.emit(EVENTS.AUTH_REJECTED, {
    error: getErrorMessage(error),
  });
}
```

## Naming Conventions

Follow the A/HC/LC pattern for functions:

- **A**: Action (get, set, handle)
- **HC**: High Context (what it operates on)
- **LC**: Low Context (optional)

```typescript
// ✅ Good
const firstName = 'John';
const pageCount = 5;
const hasPagination = true;
function getUserMessages() {}
function handleClickOutside() {}

// ❌ Avoid
const nombre = 'John';
const p_count = 5;
const isPaginatable = true;
function getUsrMsgs() {}
```

For detailed naming guidelines, see [Naming Cheatsheet](https://github.com/kettanaito/naming-cheatsheet).

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Zod Documentation](https://zod.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
