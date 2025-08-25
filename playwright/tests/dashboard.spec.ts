import { test } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

test.describe('dashboard page', () => {
  // const authStateFile = path.resolve(__dirname, '../authState.json');
  // test.use({ storageState: authStateFile });

  test('enter login information', async ({ page }) => {
    const pm = new PageManager(page);
    const loginPage = pm.onLoginPage();
    const dashboardPage = pm.onDashboardPage();

    await loginPage.runAllTests();
    await dashboardPage.runAllTests();
  });
});
