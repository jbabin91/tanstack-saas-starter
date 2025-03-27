# Code Style & Formatting

This project uses Prettier for automatic code formatting to maintain consistent code style across the codebase.

## Configuration

The project's Prettier configuration is defined in `.prettierrc.js`:

```js
/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};
```

### Standard Options

Below is a list of all standard Prettier options and their configuration in our project:

#### Core Options

| Option        | Setting   | Default | Purpose                    |
| ------------- | --------- | ------- | -------------------------- |
| `printWidth`  | `80`      | `80`    | Line length for code files |
| `tabWidth`    | (default) | `2`     | Spaces per indent level    |
| `useTabs`     | (default) | `false` | Use tabs vs spaces         |
| `semi`        | (default) | `true`  | Add semicolons             |
| `singleQuote` | `true`    | `false` | Use single quotes          |

#### Advanced Options

| Option            | Setting   | Default       | Purpose                         |
| ----------------- | --------- | ------------- | ------------------------------- |
| `quoteProps`      | (default) | `"as-needed"` | When to quote object properties |
| `jsxSingleQuote`  | (default) | `false`       | Quote style in JSX              |
| `trailingComma`   | (default) | `"es5"`       | Trailing comma handling         |
| `bracketSpacing`  | (default) | `true`        | Spaces in object literals       |
| `bracketSameLine` | (default) | `false`       | JSX closing bracket location    |

#### Special Options

| Option                      | Setting   | Default      | Purpose                                      |
| --------------------------- | --------- | ------------ | -------------------------------------------- |
| `arrowParens`               | (default) | `"always"`   | Parentheses around arrow function parameters |
| `proseWrap`                 | (default) | `"preserve"` | Markdown text wrapping                       |
| `htmlWhitespaceSensitivity` | (default) | `"css"`      | HTML whitespace handling                     |
| `endOfLine`                 | (default) | `"lf"`       | Line ending style                            |

### Experimental Options

Current experimental features enabled in our configuration:

| Option                         | Setting      | Purpose                                |
| ------------------------------ | ------------ | -------------------------------------- |
| `experimentalTernaries`        | `true`       | Enhanced ternary expression formatting |
| `objectWrap`                   | `"preserve"` | Object literal wrapping behavior       |
| `singleAttributePerLine`       | `false`      | HTML/JSX attribute formatting          |
| `experimentalOperatorPosition` | `"start"`    | Operator placement in expressions      |

### File-Specific Rules

| File Pattern    | Option       | Value | Reason                            |
| --------------- | ------------ | ----- | --------------------------------- |
| Most files      | `printWidth` | `80`  | Standard code readability         |
| `*.md`, `*.mdx` | `printWidth` | `120` | Enhanced documentation formatting |

### Example Formatting

Here's how each experimental option affects code formatting:

#### Experimental Ternaries

```js
// With experimentalTernaries: true
condition ? consequent : alternate;

// Without experimentalTernaries
condition ? consequent : alternate;
```

#### Object Wrapping

```js
// With objectWrap: 'always'
const obj = {
  foo: 'bar',
  baz: 'qux',
};

// With objectWrap: 'never'
const obj = { foo: 'bar', baz: 'qux' };

// With objectWrap: 'preserve' (maintains existing format)
// Keeps the format as written in the source code
```

#### Operator Position

```js
// With experimentalOperatorPosition: 'start' (our setting)
const sum = first + second + third;

// With experimentalOperatorPosition: 'end'
const sum = first + second + third;
```

#### Single Attribute Per Line

```jsx
// With singleAttributePerLine: true
<button
  onClick={onClick}
  className="button"
  disabled={disabled}
>
  Click me
</button>

// With singleAttributePerLine: false (our setting)
<button onClick={onClick} className="button" disabled={disabled}>
  Click me
</button>
```

### Project-Specific Configuration

Our configuration differs from Prettier defaults in the following ways:

1. **`singleQuote: true`** - We prefer single quotes for string literals for consistency
2. **`printWidth: 120`** - We use a longer line length to better accommodate tables and complex code structures
3. **Additional Plugins:**
   - `prettier-plugin-packagejson`: Ensures consistent formatting of package.json files
   - `prettier-plugin-tailwindcss`: Automatically sorts Tailwind CSS classes according to recommended class order

## Key Features

- **Single Quotes**: Uses single quotes for strings instead of double quotes
- **Package.json Formatting**: Uses `prettier-plugin-packagejson` to consistently format package.json files
- **Tailwind CSS Support**: Uses `prettier-plugin-tailwindcss` to automatically sort Tailwind CSS classes

## Editor Configuration

This project uses EditorConfig to maintain consistent coding styles across various editors and IDEs. The configuration is defined in `.editorconfig`:

| Pattern             | Setting                    | Value   | Purpose                              |
| ------------------- | -------------------------- | ------- | ------------------------------------ |
| All Files           | `indent_style`             | `space` | Use spaces for indentation           |
| All Files           | `indent_size`              | `2`     | Two spaces per indent level          |
| All Files           | `end_of_line`              | `lf`    | Unix-style line endings              |
| All Files           | `charset`                  | `utf-8` | UTF-8 character encoding             |
| `*.{md,mdx}`        | `max_line_length`          | `120`   | Wider lines for documentation        |
| `*.{md,mdx}`        | `trim_trailing_whitespace` | `false` | Preserve trailing spaces in Markdown |
| `*.{js,jsx,ts,tsx}` | `max_line_length`          | `80`    | Standard code line length            |
| `*.json`            | `insert_final_newline`     | `false` | No final newline in JSON             |
| `*.{yml,yaml}`      | `insert_final_newline`     | `true`  | Required final newline in YAML       |

### Integration with Prettier

EditorConfig works alongside Prettier to ensure consistent formatting:

- EditorConfig handles basic file formatting (indentation, line endings)
- Prettier handles code-specific formatting (quotes, brackets, etc.)
- Both tools respect file-specific settings for different file types

## Usage

### Command Line

```bash
# Format all files
pnpm prettier --write .

# Check formatting without changing files
pnpm prettier --check .

# Format specific files
pnpm prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

### VS Code Integration

1. Install the Prettier extension for VS Code
2. Enable "Format on Save" in VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Best Practices

1. Always run Prettier before committing code
2. Use VS Code's "Format on Save" feature for automatic formatting
3. Don't override Prettier's formatting with manual formatting
4. Keep the Prettier configuration minimal to maintain consistency

## Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier Plugin for Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [Prettier Plugin for package.json](https://github.com/matzkoh/prettier-plugin-packagejson)

# Code Style Guidelines

## Core Principles

- Write code that is easy to understand, maintain, and scale
- Follow the principle of least surprise
- Keep code DRY but not at the expense of clarity
- Use descriptive names that explain purpose
- Write self-documenting code

## Variables

### References

```ts
// ✅ Good
const workshopTitle = 'Web App Fundamentals';
const instructorName = 'Kent C. Dodds';
const isEnabled = true;

// ❌ Avoid
const t = 'Web App Fundamentals';
const n = 'Kent C. Dodds';
const e = true;
```

### Constants

For truly constant values used across files:

```ts
// ✅ Good
const BASE_URL = 'https://epicweb.dev';
const DEFAULT_PORT = 3000;
```

## Objects

### Literal Syntax

```ts
// ✅ Good
const name = 'Kent';
const age = 36;
const person = { name, age };

// ❌ Avoid
const name = 'Kent';
const age = 36;
const person = { name: name, age: age };
```

### Computed Properties

```ts
// ✅ Good
const key = 'name';
const obj = {
  [key]: 'Kent',
};

// ❌ Avoid
const key = 'name';
const obj = {};
obj[key] = 'Kent';
```

### Method Shorthand

```ts
// ✅ Good
const obj = {
  method() {
    // ...
  },
  async asyncMethod() {
    // ...
  },
};

// ❌ Avoid
const obj = {
  method: function () {
    // ...
  },
  asyncMethod: async function () {
    // ...
  },
};
```

## Arrays

### Array Methods

Use array methods over loops for transformations:

```ts
// ✅ Good
const items = [1, 2, 3];
const doubledItems = items.map((n) => n * 2);

// ❌ Avoid
const doubledItems = [];
for (const n of items) {
  doubledItems.push(n * 2);
}
```

### Filtering Falsey Values

```ts
// ✅ Good
const items = [1, null, 2, undefined, 3];
const filteredItems = items.filter(Boolean);

// ❌ Avoid
const filteredItems = items.filter((item) => item != null);
```

### Non-mutative Methods

```ts
// ✅ Good
const reversedItems = items.toReversed();
const sortedItems = items.toSorted();

// ❌ Avoid
const reversedItems = items.reverse();
const sortedItems = items.sort();
```

## Functions

### Function Declarations

```ts
// ✅ Good
function calculateTotal(items: Array<number>) {
  return items.reduce((sum, item) => sum + item, 0);
}

// ❌ Avoid
const calculateTotal = function (items: Array<number>) {
  return items.reduce((sum, item) => sum + item, 0);
};
```

### Early Returns

```ts
// ✅ Good
function getMinResolutionValue(resolution: number | undefined) {
  if (!resolution) return undefined;
  if (resolution <= 480) return MinResolution.noLessThan480p;
  if (resolution <= 540) return MinResolution.noLessThan540p;
  return MinResolution.noLessThan1080p;
}

// ❌ Avoid
function getMinResolutionValue(resolution: number | undefined) {
  if (resolution) {
    if (resolution <= 480) {
      return MinResolution.noLessThan480p;
    } else if (resolution <= 540) {
      return MinResolution.noLessThan540p;
    } else {
      return MinResolution.noLessThan1080p;
    }
  } else {
    return undefined;
  }
}
```

### Async/Await

```ts
// ✅ Good
async function fetchUserData(userId: string) {
  const user = await getUser(userId);
  const posts = await getUserPosts(user.id);
  return { user, posts };
}

// ❌ Avoid
function fetchUserData(userId: string) {
  return getUser(userId).then((user) => {
    return getUserPosts(user.id).then((posts) => ({ user, posts }));
  });
}
```

## Modules

### Import Order

```ts
// Group imports in this order:
import 'node:fs'; // Built-in
import 'match-sorter'; // external packages
import '#app/components'; // Internal absolute imports
import '../other-folder'; // Internal relative imports
import './local-file'; // Local imports
```

### File Extensions

```ts
// ✅ Good
import { redirect } from 'react-router';
import { add } from './math.ts';

// ❌ Avoid
import { add } from './math';
```

### Export Location

```ts
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

## Comments

### Explain Why, Not What

```ts
// ✅ Good
// We need to sanitize lineNumber to prevent malicious use on win32
// via: https://example.com/link-to-issue
if (lineNumber && !(Number.isInteger(lineNumber) && lineNumber > 0)) {
  return { status: 'error', message: 'lineNumber must be a positive integer' };
}

// ❌ Avoid
// Check if lineNumber is valid
if (lineNumber && !(Number.isInteger(lineNumber) && lineNumber > 0)) {
  return { status: 'error', message: 'lineNumber must be a positive integer' };
}
```

### TODO Comments

```ts
// ✅ Good
// TODO: figure out how to send error messages as JSX from here...
function getErrorMessage() {
  // ...
}

// ❌ Avoid
// FIXME: this is broken
function getErrorMessage() {
  // ...
}
```

### TypeScript Comments

```ts
// ✅ Good
// @ts-expect-error no idea why this started being an issue suddenly 🤷‍♂️
if (jsxEl.name !== 'EpicVideo') return;

// ❌ Avoid
// @ts-ignore
if (jsxEl.name !== 'EpicVideo') return;
```

## File Naming

Use kebab-case for file names:

```sh
// ✅ Good
highlight-button.tsx
user-profile.ts
api-utils.ts

// ❌ Avoid
HighlightButton.tsx
userProfile.ts
apiUtils.ts
```

## Best Practices

- Write self-documenting code with clear variable and function names
- Keep functions focused and single-purpose
- Use early returns to reduce nesting
- Follow the principle of least surprise
- Keep code DRY but not at the expense of clarity
- Use proper error handling
- Write descriptive error messages
- Document complex logic with comments
- Use proper TypeScript types
- Follow consistent naming conventions
- Use proper formatting (Prettier)
- Follow linting rules (ESLint)
- Write tests for critical functionality

# File Naming

## Use kebab-case for Files and Directories

Use kebab-case for file and directory names to ensure consistency across different operating systems.

```tsx
// ✅ Good
src / components / user - profile / user - avatar.tsx;
user - details.tsx;
forms / login - form.tsx;
registration - form.tsx;
utils / string - helpers.ts;
date - formatters.ts;

// ❌ Avoid
src / components / UserProfile / UserAvatar.tsx;
UserDetails.tsx;
Forms / LoginForm.tsx;
RegistrationForm.tsx;
utils / StringHelpers.ts;
DateFormatters.ts;
```

### Special Cases

1. **Tanstack Router Routes**: Route files follow Tanstack Router's file-based routing conventions

   ```tsx
   // Route files can use special casing
   src / routes / _index.tsx;
   users.$userId.tsx;
   posts.$postId.tsx;
   ```

2. **Test Files**: Keep the same case as the file being tested, but with the test suffix

   ```tsx
   user - profile.tsx;
   user - profile.test.tsx;
   ```

3. **Component Imports**: Always use the kebab-case path in imports

   ```tsx
   // ✅ Good
   import { UserProfile } from './user-profile';
   import { LoginForm } from './forms/login-form';

   // ❌ Avoid
   import { UserProfile } from './UserProfile';
   import { LoginForm } from './Forms/LoginForm';
   ```

### Benefits

- Consistent behavior across Windows and Unix-based systems
- Avoids case-sensitivity issues in git
- Improves readability in URLs and imports
- Reduces cognitive load with a single naming convention

# Code Style Guide

This guide outlines our code style standards and best practices for the TanStack SaaS Starter project.

## Property Access

### Use Dot Notation

Use dot notation for property access unless syntactically impossible:

```typescript
const user = { name: 'Brittany', 'data-id': '123' };

// ✅ Good
const name = user.name;
const id = user['data-id'];
function getUserProperty(user: User, property: string) {
  return user[property];
}

// ❌ Avoid
const name = user['name'];
```

## Comparison and Equality

### Triple Equals

Use triple equals (`===` and `!==`) for comparisons to avoid type coercion:

```typescript
// ✅ Good
const user = { id: '123' };
if (user.id === '123') {
  // ...
}

// Exception: Comparing with null/undefined
const a = null;
if (a === null) {
  // ...
}
if (b != null) {
  // ...
}

// ❌ Avoid
if (a == null) {
  // ...
}
if (b !== null && b !== undefined) {
  // ...
}
```

### Use Truthiness

Rely on truthiness instead of explicit comparisons:

```typescript
// ✅ Good
if (user) {
  // ...
}

// ❌ Avoid
if (user === true) {
  // ...
}
```

### Avoid Unnecessary Ternaries

```typescript
// ✅ Good
const isAdmin = user.role === 'admin';
const value = input ?? defaultValue;

// ❌ Avoid
const isAdmin = user.role === 'admin' ? true : false;
const value = input != null ? input : defaultValue;
```

## Code Blocks

### Use Braces for Multi-line Blocks

Use braces for multi-line blocks, even for single statements:

```typescript
// ✅ Good
if (!user) return;
if (user.role === 'admin') {
  abilities = ['add', 'remove', 'edit', 'create', 'modify', 'fly', 'sing'];
}

// ❌ Avoid
if (user.role === 'admin') abilities = ['add', 'remove', 'edit', 'create', 'modify', 'fly', 'sing'];
```

### Switch Statement Braces

Use braces in switch statements to clarify scope and prevent variable leakage:

```typescript
// ✅ Good
switch (action.type) {
  case 'add': {
    const { amount } = action;
    add(amount);
    break;
  }
  case 'remove': {
    const { removal } = action;
    remove(removal);
    break;
  }
}

// ❌ Avoid
switch (action.type) {
  case 'add':
    const { amount } = action;
    add(amount);
    break;
  case 'remove':
    const { removal } = action;
    remove(removal);
    break;
}
```

## Control Statements

### Use Statements Over Expressions

Use statements instead of expressions unless you need the value:

```typescript
// ✅ Good
if (user) {
  makeUserHappy(user);
}

// ❌ Avoid
user && makeUserHappy(user);
```

## Related Documentation

- [TypeScript](./typescript.md) - TypeScript-specific guidelines
- [Modules](./modules.md) - Module organization guidelines
- [Comments](./comments.md) - Code commenting guidelines
