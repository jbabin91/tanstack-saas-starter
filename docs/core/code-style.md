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

# Code Style Guide

This guide covers universal code style principles for the TanStack SaaS Starter project.

## Core Principles

1. **Consistency** - Follow established patterns
2. **Clarity** - Write self-documenting code
3. **Simplicity** - Avoid unnecessary complexity
4. **Maintainability** - Write code that's easy to change
5. **Performance** - Consider runtime implications

## Naming

### General Rules

1. Be descriptive and unambiguous
2. Use meaningful distinctions
3. Make names pronounceable
4. Use searchable names
5. Avoid encodings or type information in names

### Casing Conventions

- PascalCase: Classes, interfaces, types, enums, decorators
- camelCase: Variables, functions, methods, properties
- UPPER_CASE: Constants, enum values
- kebab-case: Files, URLs

## Code Organization

### File Structure

- One concept per file
- Related code stays together
- Consistent file naming
- Clear directory structure

### Code Layout

- Logical grouping of related code
- Consistent ordering of imports
- Clear separation of concerns
- Reasonable file lengths

## Comments

See [Comments Guide](./comments.md) for detailed guidelines.

### When to Comment

- Explain "why" not "what"
- Document non-obvious decisions
- Provide context for complex logic
- Mark TODO items and technical debt

### When Not to Comment

- Obvious operations
- Self-documenting code
- Redundant information
- Commented-out code

## Error Handling

### Principles

- Be explicit about errors
- Handle errors at appropriate levels
- Provide meaningful error messages
- Maintain type safety in error handling

### Patterns

- Use try/catch appropriately
- Avoid swallowing errors
- Return early from errors
- Validate inputs early

## Performance

### Guidelines

- Avoid premature optimization
- Profile before optimizing
- Consider memory usage
- Be mindful of bundle size

### Common Pitfalls

- Unnecessary re-renders
- Memory leaks
- Excessive network requests
- Large bundle sizes

## Language-Specific Guidelines

- [JavaScript](./javascript.md) - JavaScript patterns and practices
- [TypeScript](./typescript.md) - TypeScript patterns and types
- [React](./react.md) - React components and hooks

## Tools and Configuration

- [Formatting](./formatting.md) - Prettier and EditorConfig setup
- [Project Structure](./project-structure.md) - Directory organization
- [Modules](./modules.md) - Module system usage

## Related Documentation

- [Comments](./comments.md) - Commenting standards
- [Conventional Commits](./conventional-commits.md) - Git workflow
- [Testing](../testing/README.md) - Testing practices
