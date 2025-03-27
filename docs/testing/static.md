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

## Best Practices

1. **Type Safety**

   - Enable strict mode
   - Follow TypeScript best practices
   - Use proper type annotations
   - See [TypeScript Guide](../core/typescript.md)

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

For shared patterns and guidelines, see:

- [Testing Strategy](./README.md)
- [TypeScript Guide](../core/typescript.md)
- [Unit Testing](./unit.md)
- [Integration Testing](./integration.md)

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/)
