# JavaScript Guidelines

This guide covers JavaScript-specific patterns and best practices.

## Variables

### References

Use `const` by default and `let` only when reassignment is necessary. Never use `var`:

```javascript
// ✅ Good
const workshopTitle = 'Web App Fundamentals';
let counter = 0;
counter += 1;

// ❌ Avoid
var title = 'Web App Fundamentals';
```

> **Note**: `const` ensures constant reference, not immutability. Object properties can still be modified.

### Naming Conventions

Use descriptive names that explain the value's purpose:

```javascript
// ✅ Good
const workshopTitle = 'Web App Fundamentals';
const instructorName = 'Kent C. Dodds';
const isEnabled = true;
const sum = numbers.reduce((total, n) => total + n, 0);
const names = people.map((p) => p.name);

// ❌ Avoid
const t = 'Web App Fundamentals';
const n = 'Kent C. Dodds';
const e = true;
```

For detailed naming conventions, refer to [the naming cheatsheet](https://github.com/kettanaito/naming-cheatsheet).

### Constants

Use uppercase with underscores for cross-file constants:

```javascript
const BASE_URL = 'https://epicweb.dev';
const DEFAULT_PORT = 3000;
```

## Objects

### Object Creation

Use object literal syntax with property shorthand:

```javascript
// ✅ Good
const name = 'Kent';
const age = 36;
const person = { name, age };

// ❌ Avoid
const person = { name: name, age: age };
```

### Computed Properties

Use computed property names for dynamic properties:

```javascript
// ✅ Good
const key = 'name';
const obj = {
  [key]: 'Kent',
};

// ❌ Avoid
const obj = {};
obj[key] = 'Kent';
```

### Method Shorthand

Use method shorthand syntax:

```javascript
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

### Accessors

Avoid getters and setters to maintain predictable behavior:

```javascript
// ✅ Good
const person = {
  name: 'Hannah',
};

// ❌ Avoid
const person = {
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};
```

## Arrays

### Array Creation

Use array literal syntax:

```javascript
// ✅ Good
const items = [1, 2, 3];

// ❌ Avoid
const items = new Array(1, 2, 3);
```

### Array Methods

Use array methods over loops for transformations:

```javascript
// ✅ Good
const items = [1, 2, 3];
const doubledItems = items.map((n) => n * 2);

// For imperative operations
for (const [i, n] of items.entries()) {
  console.log(`${n} at index ${i}`);
}

// ❌ Avoid
const doubledItems = [];
for (const n of items) {
  doubledItems.push(n * 2);
}

// Never use forEach
items.forEach((n) => {
  // ...
});
```

### Array Transformations

Prefer simple chains over complex `.reduce`:

```javascript
// ✅ Good
const items = [1, 2, 3, 4, 5];
const doubledGreaterThanTwo = items.filter((n) => n > 2).map((n) => n * 2);

// ❌ Avoid
const doubledItems = items.reduce((acc, n) => {
  acc.push(n * 2);
  return acc;
}, []);
```

### Array Copying

Use spread operator for copying:

```javascript
// ✅ Good
const itemsCopy = [...items];
const combined = [...array1, ...array2];

// ❌ Avoid
const itemsCopy = items.slice();
const combined = array1.concat(array2);
```

### Non-mutative Operations

Prefer non-mutative array methods:

```javascript
// ✅ Good
const reversedItems = items.toReversed();
const sortedItems = items.toSorted();
const withNewItem = items.with(0, newItem);

// ❌ Avoid
const reversedItems = items.reverse();
```

## Functions

### Function Declarations

Use function declarations over expressions:

```javascript
// ✅ Good
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item, 0);
}

// ❌ Avoid
const calculateTotal = function (items) {
  return items.reduce((sum, item) => sum + item, 0);
};
```

### Default Parameters

Use parameter defaults over runtime checks:

```javascript
// ✅ Good
function createUser(name, role = 'user') {
  return { name, role };
}

// ❌ Avoid
function createUser(name, role) {
  role ??= 'user';
  return { name, role };
}
```

### Early Returns

Use guard clauses and return early:

```javascript
// ✅ Good
function getMinResolutionValue(resolution) {
  if (!resolution) return undefined;
  if (resolution <= 480) return MinResolution.noLessThan480p;
  if (resolution <= 540) return MinResolution.noLessThan540p;
  return MinResolution.noLessThan1080p;
}

// ❌ Avoid
function getMinResolutionValue(resolution) {
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

Prefer async/await over promise chains:

```javascript
// ✅ Good
async function fetchUserData(userId) {
  const user = await getUser(userId);
  const posts = await getUserPosts(user.id);
  return { user, posts };
}

// ❌ Avoid
function fetchUserData(userId) {
  return getUser(userId).then((user) => {
    return getUserPosts(user.id).then((posts) => ({ user, posts }));
  });
}
```

## Related Documentation

- [Code Style](./code-style.md) - Universal coding standards
- [TypeScript](./typescript.md) - TypeScript-specific guidelines
- [React](./react.md) - React patterns and practices
