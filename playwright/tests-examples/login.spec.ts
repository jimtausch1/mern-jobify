import { expect, test } from '@playwright/test';

const testuser = process.env.TEST_USER as string;
const testPassword = process.env.TEST_PASSWORD as string;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('login page', () => {
  test('navigate to login page', async ({ page }) => {
    await page.getByText('Login / Demo User').click();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Jobify/);
  });

  test('enter email password then login', async ({ page }) => {
    await page.getByText('Login / Demo User').click();
    await page.getByLabel('Email').pressSequentially(testuser, { delay: 100 });
    await page.getByLabel('Password').pressSequentially(testPassword, { delay: 100 });
    await page.getByText('Submit').click();

    await expect(page.locator('.logout-btn')).toContainText(/Bubbles McLaughster/);
    await expect(page.locator('.Toastify')).toContainText(/Login successful/);

    const sidebar = page.locator('.sidebar-container.show-sidebar');
    await expect(sidebar.locator('.nav-link.active')).toContainText(/add job/);
  });
});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
