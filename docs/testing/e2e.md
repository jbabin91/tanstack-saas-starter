# End-to-End Testing

End-to-end (E2E) tests verify that your application works correctly from a user's perspective, testing complete features and user flows in a real browser environment.

## Test Structure

1. **User Flows**

   - Complete user journeys
   - Critical business paths
   - Multi-step processes

2. **Test Organization**

   - Group by feature
   - Reusable page objects
   - Shared test utilities

3. **Test Coverage**
   - Happy paths
   - Error paths
   - Edge cases
   - Cross-browser scenarios

## Example User Flows

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('completes signup flow', async ({ page }) => {
    await page.goto('/signup');

    // Fill signup form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Verify email verification screen
    await expect(page.getByText('Check your email')).toBeVisible();

    // Simulate email verification
    await page.goto('/verify-email?token=test-token');

    // Verify successful signup
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page).toHaveURL('/dashboard');
  });

  test('handles invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});

// tests/e2e/subscription.spec.ts
test.describe('Subscription', () => {
  test('completes subscription flow', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Log In' }).click();

    // Go to pricing
    await page.goto('/pricing');
    await page.getByRole('button', { name: 'Choose Pro' }).click();

    // Fill payment details
    await page.getByLabel('Card number').fill('4242424242424242');
    await page.getByLabel('Expiry').fill('12/25');
    await page.getByLabel('CVC').fill('123');
    await page.getByRole('button', { name: 'Subscribe' }).click();

    // Verify success
    await expect(page.getByText('Subscription activated')).toBeVisible();
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Page Objects

```typescript
// tests/e2e/pages/auth.ts
export class AuthPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto('/login');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async signup(email: string, password: string) {
    await this.page.goto('/signup');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign Up' }).click();
  }

  async verifyEmail(token: string) {
    await this.page.goto(`/verify-email?token=${token}`);
  }
}

// tests/e2e/pages/subscription.ts
export class SubscriptionPage {
  constructor(private page: Page) {}

  async subscribe(plan: string, cardDetails: CardDetails) {
    await this.page.goto('/pricing');
    await this.page.getByRole('button', { name: `Choose ${plan}` }).click();

    await this.page.getByLabel('Card number').fill(cardDetails.number);
    await this.page.getByLabel('Expiry').fill(cardDetails.expiry);
    await this.page.getByLabel('CVC').fill(cardDetails.cvc);
    await this.page.getByRole('button', { name: 'Subscribe' }).click();
  }
}
```

## Test Utilities

```typescript
// tests/e2e/utils/test-data.ts
export const generateTestUser = () => ({
  email: `test-${Date.now()}@example.com`,
  password: 'password123',
});

export const testCardDetails = {
  number: '4242424242424242',
  expiry: '12/25',
  cvc: '123',
};

// tests/e2e/utils/test-setup.ts
export const setupTestUser = async (page: Page) => {
  const user = generateTestUser();
  const authPage = new AuthPage(page);

  await authPage.signup(user.email, user.password);
  await authPage.verifyEmail('test-token');

  return user;
};
```

## Best Practices

1. **Test Organization**

   - Group tests by feature/user flow
   - Use page objects for reusable actions
   - Create test utilities for common operations
   - Keep tests independent

2. **Test Stability**

   - Use reliable selectors (roles, labels)
   - Handle dynamic content
   - Add appropriate waits
   - Retry flaky operations

3. **Test Data**

   - Use isolated test data
   - Clean up after tests
   - Mock external services
   - Use test utilities

4. **Cross-browser Testing**
   - Test in multiple browsers
   - Handle browser-specific behavior
   - Use consistent viewport sizes
   - Test responsive layouts

For shared testing patterns and guidelines, see:

- [Testing Strategy](./README.md)
- [Integration Testing](./integration.md) for component interaction tests
- [Unit Testing](./unit.md) for individual component tests

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
