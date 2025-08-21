import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('dashboard page', () => {
  test.use({ storageState: './playwright/authState.json' });

  let dashboardPage: DashboardPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);
  });

  test('enter login information', async ({ page }) => {
    await loginPage.goto();
    await loginPage.attemptLogin();
    await loginPage.loginSuccess();
  });

  test('theme and sidebar selector', async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.selectTheme();
    await dashboardPage.toggleSidebar();
  });
});
