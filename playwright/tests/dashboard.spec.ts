import { test } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

test.describe('dashboard page', () => {
  // const authStateFile = path.resolve(__dirname, '../authState.json');
  // test.use({ storageState: authStateFile });

  test.afterAll(async ({ page }) => {
    await page.close();
  });

  test('enter login information', async ({ page }) => {
    const pm = new PageManager(page);
    const loginPage = pm.onLoginPage();
    const dashboardPage = pm.onDashboardPage();
    const addJobPage = pm.onAddJobPage();
    const editJobPage = pm.onEditJobPage();
    const allJobsPage = pm.onAllJobsPage();

    await loginPage.runAllTests();
    await dashboardPage.runAllTests();
    await addJobPage.runAllTests();
    await allJobsPage.runAllTests();
    await editJobPage.runAllTests();
  });
});
