# Static Analysis Testing

Static analysis testing catches type errors, code style issues, and potential bugs before runtime. It's the foundation of the Testing Trophy and provides immediate feedback during development.

## Core Principles

- Catch errors at compile time
- Enforce consistent code style
- Prevent common mistakes
- Zero runtime overhead
- Automated in CI/CD

## TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

## ESLint Configuration

```js
// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      // React Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript Rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Testing Rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/prefer-user-event': 'error',
      'jest-dom/prefer-to-have-value': 'error',
      'jest-dom/prefer-in-document': 'error',

      // Next.js Rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
    },
    settings: {
      next: {
        rootDir: '.',
      },
    },
  },
  {
    // Override rules for test files
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    // Override rules for configuration files
    files: ['*.config.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
```

## Type Safety Examples

```typescript
// 1. Function Parameters and Return Types
type User = {
  id: string;
  name: string;
  email: string;
};

// ✅ DO: Explicit types
function getUser(id: string): Promise<User> {
  return api.users.get(id);
}

// ❌ DON'T: Implicit any
function getUser(id) {
  return api.users.get(id);
}

// 2. React Component Props
type ButtonProps = {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
};

// ✅ DO: Type props interface
const Button = ({ variant, size = 'medium', onClick, children }: ButtonProps) => {
  return (
    <button
      className={`btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// 3. Generic Types
// ✅ DO: Use generics for reusable types
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage
const user = await fetchData<User>('/api/user');
```

## ESLint Rules Examples

```typescript
// 1. React Hooks Rules
// ✅ DO: Follow hooks rules
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Dependency array includes all dependencies
}

// ❌ DON'T: Break hooks rules
function Component() {
  if (condition) {
    const [count, setCount] = useState(0); // Error: Hook inside condition
  }
}

// 2. TypeScript Rules
// ✅ DO: Use explicit types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// ❌ DON'T: Use any
function processData(data: any) { // Error: Explicit any
  return data.value;
}

// 3. Testing Rules
// ✅ DO: Use proper testing queries
test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// ❌ DON'T: Use container queries
test('renders button', () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container.querySelector('button')).toBeInTheDocument();
});
```

## Common Patterns

1. Type Guards

   ```typescript
   // ✅ DO: Use type guards
   function isError(value: unknown): value is Error {
     return value instanceof Error;
   }

   try {
     // Some code
   } catch (error: unknown) {
     if (isError(error)) {
       console.error(error.message);
     }
   }
   ```

2. Exhaustive Checks

   ```typescript
   // ✅ DO: Use exhaustive checks
   type Status = 'idle' | 'loading' | 'success' | 'error';

   function getStatusMessage(status: Status): string {
     switch (status) {
       case 'idle':
         return 'Waiting...';
       case 'loading':
         return 'Loading...';
       case 'success':
         return 'Success!';
       case 'error':
         return 'Error!';
       default:
         const _exhaustiveCheck: never = status;
         return _exhaustiveCheck;
     }
   }
   ```

3. Branded Types

   ```typescript
   // ✅ DO: Use branded types for type safety
   type UserId = string & { readonly brand: unique symbol };

   function createUserId(id: string): UserId {
     return id as UserId;
   }

   function getUserById(id: UserId) {
     // Type-safe ID usage
   }
   ```

## Best Practices

1. Type Inference

   ```typescript
   // ✅ DO: Let TypeScript infer when obvious
   const numbers = [1, 2, 3]; // Type: number[]
   const doubled = numbers.map((n) => n * 2); // Type: number[]

   // ✅ DO: Explicitly type when needed
   const config: Config = {
     api: 'https://api.example.com',
     timeout: 5000,
   };
   ```

2. Null Handling

   ```typescript
   // ✅ DO: Handle null explicitly
   function getName(user: User | null): string {
     if (!user) return 'Guest';
     return user.name;
   }
   ```

3. Type Assertions

   ```typescript
   // ✅ DO: Use type assertions sparingly
   const canvas = document.getElementById('canvas') as HTMLCanvasElement;

   // ❌ DON'T: Use type assertions to silence errors
   const value = data as any; // Error: Avoid type assertions to any
   ```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
