# End-to-End Testing

End-to-end (E2E) tests verify that your application works correctly from a user's perspective, testing complete user flows and critical business paths.

## Core Principles

- Test complete user journeys
- Focus on critical business flows
- Test in a production-like environment
- Minimize test flakiness
- Test real integrations when possible

## Setting Up E2E Tests

```tsx
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

// e2e/auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('/dashboard');

  // Save signed-in state
  await page.context().storageState({
    path: './e2e/.auth/user.json',
  });
});
```

## Testing User Flows

```tsx
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  // 1. Add items to cart
  await page.goto('/products');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.getByText('1 item')).toBeVisible();

  // 2. Go to cart
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL('/cart');

  // 3. Start checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL('/checkout');

  // 4. Fill shipping info
  await page.getByLabel('Address').fill('123 Main St');
  await page.getByLabel('City').fill('New York');
  await page.getByLabel('ZIP').fill('10001');
  await page.getByRole('button', { name: 'Continue' }).click();

  // 5. Fill payment info
  await page.getByLabel('Card number').fill('4242424242424242');
  await page.getByLabel('Expiry').fill('12/25');
  await page.getByLabel('CVC').fill('123');
  await page.getByRole('button', { name: 'Pay' }).click();

  // 6. Verify success
  await expect(page.getByText('Order Confirmed')).toBeVisible();
  await expect(page).toHaveURL('/order-confirmation');
});
```

## Testing Authentication

```tsx
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('registration flow', async ({ page }) => {
  await page.goto('/register');

  // Fill registration form
  await page.getByLabel('Email').fill('new@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByLabel('Confirm Password').fill('password123');
  await page.getByRole('button', { name: 'Register' }).click();

  // Verify email verification screen
  await expect(page).toHaveURL('/verify-email');
  await expect(page.getByText('Check your email')).toBeVisible();

  // Simulate email verification
  const verifyToken = 'test-token';
  await page.goto(`/verify-email?token=${verifyToken}`);

  // Verify successful registration
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome')).toBeVisible();
});

test('login and protected routes', async ({ page }) => {
  // Try accessing protected route
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/login');

  // Login
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();

  // Verify access to protected route
  await expect(page).toHaveURL('/dashboard');
});
```

## Testing Error Scenarios

```tsx
// e2e/error-handling.spec.ts
import { test, expect } from '@playwright/test';

test('handles network errors', async ({ page }) => {
  // Simulate offline
  await page.route('**/*', (route) => route.abort());

  await page.goto('/dashboard');
  await expect(page.getByText('Connection Error')).toBeVisible();
});

test('handles invalid input', async ({ page }) => {
  await page.goto('/profile');

  // Try invalid email
  await page.getByLabel('Email').fill('invalid-email');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Invalid email')).toBeVisible();
});

test('handles server errors', async ({ page }) => {
  // Mock 500 error
  await page.route('/api/profile', (route) => {
    route.fulfill({
      status: 500,
      body: 'Server Error',
    });
  });

  await page.goto('/profile');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Something went wrong')).toBeVisible();
});
```

## Best Practices

1. Test Setup

   ```tsx
   // Use test fixtures
   const test = base.extend({
     signedInPage: async ({ page }, use) => {
       await page.goto('/login');
       await page.getByLabel('Email').fill('test@example.com');
       await page.getByLabel('Password').fill('password123');
       await page.getByRole('button', { name: 'Log in' }).click();
       await use(page);
     },
   });
   ```

2. Handle Dynamic Content

   ```tsx
   // Wait for dynamic content
   await expect(page.getByRole('list')).not.toBeEmpty();

   // Handle loading states
   await expect(page.getByText('Loading...')).toBeVisible();
   await expect(page.getByText('Loading...')).not.toBeVisible();
   ```

3. Visual Testing

   ```tsx
   // Compare screenshots
   await expect(page).toHaveScreenshot('checkout-form.png');

   // Compare specific element
   await expect(page.getByRole('dialog')).toHaveScreenshot('modal.png');
   ```

## Common Patterns

1. Data Setup

   ```tsx
   test.beforeEach(async ({ request }) => {
     // Setup test data via API
     await request.post('/api/test/seed', {
       data: {
         users: [testUser],
         products: testProducts,
       },
     });
   });
   ```

2. Mobile Testing

   ```tsx
   test.describe('mobile view', () => {
     test.use({ viewport: { width: 375, height: 667 } });

     test('shows mobile menu', async ({ page }) => {
       await page.getByRole('button', { name: 'Menu' }).click();
       await expect(page.getByRole('navigation')).toBeVisible();
     });
   });
   ```

3. Accessibility Testing

   ```tsx
   test('passes accessibility checks', async ({ page }) => {
     await page.goto('/');
     const violations = await page.evaluate(async () => {
       // Run axe-core
       const { axe } = await import('axe-core');
       return axe(document);
     });
     expect(violations.length).toBe(0);
   });
   ```

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [E2E Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Visual Testing Guide](https://playwright.dev/docs/test-snapshots)
- [CI Setup Guide](https://playwright.dev/docs/ci)
