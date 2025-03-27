# Static Analysis

Static analysis tools help catch errors and enforce code quality standards before runtime. They analyze code without executing it, identifying potential issues, enforcing conventions, and ensuring type safety.

## Tools Overview

1. **TypeScript**

   - Static type checking
   - Type inference
   - Type assertions
   - Generics and utility types

2. **ESLint**

   - Code style enforcement
   - Best practices
   - Error prevention
   - Custom rules

3. **Prettier**
   - Code formatting
   - Style consistency
   - Automatic fixes

## TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
```

## Prettier Configuration

```javascript
// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

## Type Safety Examples

```typescript
// Type inference
const numbers = [1, 2, 3]; // inferred as number[]
const user = {
  name: 'John',
  age: 30,
}; // inferred as { name: string; age: number }

// Type assertions
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Generics
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Utility types
type User = {
  id: string;
  name: string;
  email: string;
};

type UserUpdate = Partial<User>;
type UserRequired = Required<User>;
type UserReadOnly = Readonly<User>;
```

## Common Patterns

1. **Type Guards**

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function handleResult(result: unknown) {
  if (isError(result)) {
    console.error(result.message);
    return;
  }
  // result is not Error type here
}
```

2. **Discriminated Unions**

```typescript
type Success<T> = {
  type: 'success';
  data: T;
};

type Failure = {
  type: 'failure';
  error: string;
};

type Result<T> = Success<T> | Failure;

function handleResult<T>(result: Result<T>) {
  switch (result.type) {
    case 'success':
      return result.data; // T type
    case 'failure':
      throw new Error(result.error);
  }
}
```

3. **Branded Types**

```typescript
type UserId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUserById(id: UserId) {
  // Type safe ID handling
}

// Error: Argument of type 'string' is not assignable to parameter of type 'UserId'
getUserById('123');

// OK
getUserById(createUserId('123'));
```

## Best Practices

1. **Type Safety**

   - Enable strict mode
   - Avoid `any` type
   - Use type guards
   - Leverage utility types

2. **Code Quality**

   - Follow ESLint rules
   - Use Prettier formatting
   - Write descriptive types
   - Document complex types

3. **Error Prevention**

   - Check null/undefined
   - Handle edge cases
   - Use exhaustive checks
   - Validate input types

4. **Performance**
   - Optimize type imports
   - Use type-only imports
   - Avoid type recursion
   - Minimize union types

For shared testing patterns and guidelines, see:

- [Testing Strategy](./README.md)
- [Unit Testing](./unit.md) for runtime type checking
- [Integration Testing](./integration.md) for API type safety

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/)
