# Code Comments Guide

This guide outlines our commenting standards and best practices across all code in the TanStack SaaS Starter project.

## Core Principles

1. Comments should explain **why**, not what
2. Keep comments concise and meaningful
3. Use comments to document non-obvious decisions
4. Link to external resources when relevant
5. Keep comments up to date with code changes

## Comment Types

### Regular Comments

Use regular comments to explain the reasoning behind code decisions:

```typescript
// ✅ Good
// We need to sanitize lineNumber to prevent malicious use on win32
// via: https://example.com/link-to-issue-or-something
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

Use TODO comments to mark code that needs future attention:

```typescript
// ✅ Good - Clear description of what needs to be done
// TODO: Add support for custom error messages with JSX
function getErrorMessage() {
  // ...
}

// ❌ Avoid - Vague or unhelpful
// TODO: fix this later
function getErrorMessage() {
  // ...
}
```

### FIXME Comments

Use FIXME comments to mark code that needs immediate attention:

```typescript
// ✅ Good - Clear description of the problem
// FIXME: API response type doesn't match our interface
function parseResponse(data: unknown) {
  // ...
}

// ❌ Avoid - Vague description
// FIXME: this is broken
function parseResponse(data: unknown) {
  // ...
}
```

> **Note**: The linter is configured to flag FIXME comments to prevent accidental commits of work in progress.

### TypeScript Directives

When working with TypeScript, use `@ts-expect-error` with explanatory comments:

```typescript
// ✅ Good - Explains why we're ignoring the error
// @ts-expect-error Third-party type definitions are incorrect
const result = thirdPartyFunction();

// ❌ Avoid - Never use @ts-ignore
// @ts-ignore
const result = thirdPartyFunction();
```

### JSDoc Comments

Use JSDoc for documenting public APIs and exported functions:

```typescript
// ✅ Good - Complete and helpful documentation
/**
 * Generates a TOTP code from a configuration.
 * Implements RFC 6238 for secure time-based one-time passwords.
 *
 * @param {OTPConfig} config - The TOTP configuration
 * @returns {string} The generated TOTP code
 * @throws {ValidationError} If config is invalid
 *
 * @example
 * const code = generateTOTP({
 *   secret: 'ABCDEF',
 *   digits: 6,
 *   step: 30
 * });
 */
export function generateTOTP(config: OTPConfig): string {
  // Implementation
}

// ❌ Avoid - Redundant or unhelpful documentation
/**
 * Generate TOTP function
 */
export function generateTOTP(config: OTPConfig): string {
  // Implementation
}
```

## Best Practices

### 1. Avoid Redundant Comments

Don't add comments that just repeat what the code already expresses:

```typescript
// ✅ Good
function calculateTotal(items: Array<number>) {
  return items.reduce((sum, item) => sum + item, 0);
}

// ❌ Avoid - Redundant comment
// This function calculates the total of all items in the array
function calculateTotal(items: Array<number>) {
  return items.reduce((sum, item) => sum + item, 0);
}
```

### 2. Document Complex Logic

Use comments to explain non-obvious implementations or business rules:

```typescript
// ✅ Good
// We use a fuzzy match algorithm with a threshold of 0.8
// because exact matches were too restrictive for user searches
// See: https://example.com/issue/123 for discussion
function findMatches(query: string, items: Array<string>) {
  // Implementation
}
```

### 3. Link to Resources

Include links to relevant documentation, issues, or discussions:

```typescript
// ✅ Good
// Implementation follows the spec from:
// https://example.com/link-to-spec
function implementFeature() {
  // Implementation
}
```

### 4. Document Workarounds

When implementing temporary solutions or workarounds, document why they're needed:

```typescript
// ✅ Good
// FIXME: Using any here because the third-party library
// doesn't provide proper types yet. Track progress at:
// https://github.com/example/lib/issues/123
const result = thirdPartyLib.process(data);
```

### 5. Keep Comments Updated

Remove or update comments when the code changes:

```typescript
// ❌ Avoid - Outdated comment
// Check if user is admin
// This was changed to also check for superadmin role
if (user.role === 'admin' || user.role === 'superadmin') {
  // ...
}

// ✅ Good
// Allow access for users with elevated privileges (admin or superadmin)
if (user.role === 'admin' || user.role === 'superadmin') {
  // ...
}
```

## Comment Style Guide

1. Start comments with a capital letter
2. End full sentences with a period
3. Use proper spelling and grammar
4. Keep line length under 100 characters
5. Use consistent indentation with the code
6. Add a space after the comment marker (`//` or `/*`)

## Resources

- [JSDoc Documentation](https://jsdoc.app/)
- [TypeScript TSDoc](https://tsdoc.org/)
- [Conventional Comments](https://conventionalcomments.org/)
