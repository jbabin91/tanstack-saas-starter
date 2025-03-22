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
