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

## Utility Types

| Type          | Purpose                                   | Example                      |
| ------------- | ----------------------------------------- | ---------------------------- |
| `Partial<T>`  | Makes all properties optional             | `Partial<User>`              |
| `Required<T>` | Makes all properties required             | `Required<UserForm>`         |
| `Pick<T, K>`  | Creates type with subset of properties    | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>`  | Creates type without specified properties | `Omit<User, 'password'>`     |

## Example Usage

Here's an example of utility types in action:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Using Pick to create a login form type
type LoginForm = Pick<User, 'email' | 'password'>;

// Using Omit to create a public profile type
type PublicProfile = Omit<User, 'password'>;

// Using Partial for optional updates
type UserUpdate = Partial<User>;
```

## Key Features

- Static type checking
- Type inference
- Interface definitions
- Generic types
- Advanced type utilities
- Enhanced IDE support with IntelliSense

## Project Usage

In this project, TypeScript is used throughout the codebase for type safety and improved developer experience. The configuration is defined in `tsconfig.json`.

## Common Patterns

```tsx
// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
}

// Type inference
const users: User[] = [{ id: '1', name: 'John', email: 'john@example.com', role: 'admin' }];

// Generic types
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Type utilities
type UserWithoutId = Omit<User, 'id'>;
type UserKeys = keyof User;
```

## Integration with React

TypeScript integrates seamlessly with React:

```tsx
// Component props typing
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

// React component with TypeScript
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
      {label}
    </button>
  );
};
```

## Resources

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
