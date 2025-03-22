# Faker.js

Faker.js is a library for generating realistic mock data for development and testing purposes.

## Key Features

- Generates random names, addresses, emails, and more
- Localization support for multiple languages
- Customizable data generation
- TypeScript support
- Deterministic results with seed support

## Basic Usage

```tsx
import { faker } from '@faker-js/faker';

// Generate a random user
const user = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  bio: faker.lorem.paragraph(),
  createdAt: faker.date.recent(),
};

// Generate multiple items
const users = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  // Other fields
}));
```

## Common Generators

```tsx
// Person information
faker.person.firstName();
faker.person.lastName();
faker.person.fullName();
faker.person.gender();
faker.person.jobTitle();

// Internet
faker.internet.email();
faker.internet.userName();
faker.internet.password();
faker.internet.url();
faker.internet.ipv4();

// Date & Time
faker.date.recent();
faker.date.future();
faker.date.past();
faker.date.between({ from: '2020-01-01', to: '2030-01-01' });

// Commerce
faker.commerce.productName();
faker.commerce.price();
faker.commerce.department();

// Image
faker.image.url();
faker.image.avatar();
faker.image.urlPicsumPhotos();

// Text content
faker.lorem.word();
faker.lorem.words(5);
faker.lorem.sentence();
faker.lorem.paragraph();

// Numeric
faker.number.int({ min: 1, max: 100 });
faker.number.float({ min: 0, max: 1, precision: 0.01 });

// Identifiers
faker.string.uuid();
faker.string.alphanumeric(10);
faker.string.numeric(16);
```

## Seeding for Consistent Results

```tsx
// Set a seed for reproducible data
faker.seed(123);

// Now all faker calls will produce the same result
// based on the seed value
const name1 = faker.person.fullName(); // Always the same name with seed 123
const name2 = faker.person.fullName(); // Always the same name with seed 123
```

## Integration with Testing

```tsx
import { faker } from '@faker-js/faker';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('renders user data correctly', () => {
    // Create mock user data
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.lorem.paragraph(),
    };

    render(<UserProfile user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.bio)).toBeInTheDocument();
  });
});
```

## Project Usage

In this project, Faker.js is used for:

- Generating mock data for demos
- Populating tables in the TanStack Table example
- Creating test data for component testing

## Resources

- [Official Documentation](https://fakerjs.dev/)
- [API Reference](https://fakerjs.dev/api/)
- [GitHub Repository](https://github.com/faker-js/faker)
