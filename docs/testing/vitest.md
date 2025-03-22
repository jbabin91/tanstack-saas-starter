# Vitest

Vitest is a fast and lightweight testing framework for JavaScript and TypeScript projects, with first-class support for Vite.

## Key Features

- Fast test execution with watch mode
- Native ESM support
- TypeScript support out of the box
- Compatible with Jest API
- UI for viewing test results
- Coverage reporting
- Snapshot testing
- Mocking capabilities

## Basic Usage

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    await screen.getByRole('button').click();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
```

## Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with coverage
pnpm test -- --coverage

# Run specific test file
pnpm test -- path/to/test.test.ts
```

## Testing React Components

This project uses Vitest with React Testing Library for component testing:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form component', () => {
  it('submits the form with valid data', async () => {
    const onSubmitMock = vi.fn();
    render(<Form onSubmit={onSubmitMock} />);

    // Fill out form fields
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Assert the form was submitted with the correct data
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('shows validation errors for invalid data', async () => {
    render(<Form onSubmit={vi.fn()} />);

    // Submit without filling fields
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Assert validation errors are shown
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

## Mocking

Vitest provides built-in mocking capabilities:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { fetchUserData } from './api';
import { UserProfile } from './UserProfile';

// Mock the API module
vi.mock('./api', () => ({
  fetchUserData: vi.fn(),
}));

describe('UserProfile', () => {
  it('displays user data when loaded', async () => {
    // Set up the mock implementation
    fetchUserData.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    });

    render(<UserProfile userId="123" />);

    // Assert loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for data to load
    await screen.findByText('John Doe');

    // Assert user data is displayed
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(fetchUserData).toHaveBeenCalledWith('123');
  });
});
```

## Project Configuration

Vitest configuration in this project is defined in the package.json:

```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

## Resources

- [Official Documentation](https://vitest.dev/)
- [API Reference](https://vitest.dev/api/)
- [React Testing Library Integration](https://vitest.dev/guide/ui-testing.html#react-testing-library)
