# Module Organization

This guide outlines our module organization standards and best practices for the TanStack SaaS Starter project.

## File Organization

Files that change together should be located close to each other. Breaking a single file into multiple files should be avoided unless absolutely necessary.

File structure considerations:

- Framework conventions
- Project size
- Team size
- Keep structure as flat as possible

## Module Exports

Prefer named exports over default exports unless required by framework conventions:

```typescript
// ✅ Good
export function add(a: number, b: number) {
  return a + b;
}

export function subtract(a: number, b: number) {
  return a - b;
}

// ❌ Avoid
export default function add(a: number, b: number) {
  return a + b;
}
```

## Module Guidelines

### Avoid Barrel Files

Do not use barrel files (index files that re-export from multiple modules). They can cause:

- Slower build times
- Harder to trace imports
- Circular dependency issues
- Tree-shaking difficulties

### Pure Modules

Keep modules pure to improve:

- Application startup performance
- Code testability
- Code predictability

```typescript
// ✅ Good
let serverData;
export function init(a: number, b: number) {
  const el = document.getElementById('server-data');
  const json = el.textContent;
  serverData = JSON.parse(json);
}

export function getServerData() {
  if (!serverData) throw new Error('Server data not initialized');
  return serverData;
}

// ❌ Avoid
let serverData;
const el = document.getElementById('server-data');
const json = el.textContent;
export const serverData = JSON.parse(json);
```

> **Note**: While some modules must have side-effects (e.g., app initialization), most modules should remain pure.

## Import/Export Guidelines

### Import Order

Group imports semantically:

```typescript
// 1. Built-in modules
import 'node:fs';

// 2. External packages
import 'match-sorter';

// 3. Internal absolute imports
import '@/app/components';

// 4. Internal relative imports
import '../other-folder';

// 5. Local imports
import './local-file';
```

### Type Imports

Use a single import statement per module:

```typescript
// ✅ Good
import { type MatchSorterOptions, matchSorter } from 'match-sorter';

// ❌ Avoid
import { type MatchSorterOptions } from 'match-sorter';
import { matchSorter } from 'match-sorter';
```

### Import Location

Place all static imports at the top of the file:

```typescript
// ✅ Good
import { matchSorter } from 'match-sorter';

function doStuff() {
  // ...
}

// ❌ Avoid
function doStuff() {
  // ...
}

import { matchSorter } from 'match-sorter';
```

### Export Location

Use inline exports:

```typescript
// ✅ Good
export function add(a: number, b: number) {
  return a + b;
}

// ❌ Avoid
function add(a: number, b: number) {
  return a + b;
}
export { add };
```

## Module Configuration

### Module Type

Use ECMAScript modules:

```json
{
  "type": "module"
}
```

### Export Configuration

Use `exports` field in `package.json`:

```json
{
  "exports": {
    "./utils": "./src/utils.js"
  }
}
```

### Import Aliases

Configure import aliases in `tsconfig.json` to make imports more maintainable and avoid deep relative paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Benefits of path aliases:

- Avoid deep relative imports (`../../../../`)
- Make refactoring easier
- Improve code maintainability
- Provide clear import boundaries

Usage:

```typescript
// ✅ Good
import { add } from '@/utils/math';
import { UserProfile } from '@/components/user-profile';

// ❌ Avoid
import { add } from '../../../../utils/math';
import { UserProfile } from '../../../components/user-profile';
```

> **Note**: While `package.json` can also be used for import aliases, `tsconfig.json` is preferred for TypeScript projects as it provides better IDE support and type checking.

### File Extensions

Include file extensions in import paths:

```typescript
// ✅ Good
import { redirect } from 'react-router';
import { add } from './math.ts';

// ❌ Avoid
import { add } from './math';
```

> **Note**: Exception: modules with `exports` defined in their `package.json`.

## Related Documentation

- [Project Structure](./project-structure.md) - Overall project organization
- [TypeScript](./typescript.md) - TypeScript-specific guidelines
- [Code Style](./code-style.md) - General code style guidelines
