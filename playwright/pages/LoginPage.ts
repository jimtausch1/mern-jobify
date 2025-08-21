import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async goto() {
    await this.page.goto('http://localhost:5000/');
    await this.page.getByText('Login / Demo User').click();
  }

  async attemptLogin() {
    const testuser = process.env.TEST_USER as string;
    const testPassword = process.env.TEST_PASSWORD as string;

    await this.page.getByLabel('Email').pressSequentially(testuser, { delay: 100 });
    await this.page.getByLabel('Password').pressSequentially(testPassword, { delay: 100 });
    await this.page.getByText('Submit').click();
    await this.page.context().storageState({ path: 'authState.json' });
  }

  async loginSuccess() {
    await expect(this.page).toHaveTitle(/Jobify/);
    await expect(this.page.locator('.logout-btn')).toContainText(/Bubbles McLaughster/);
    await expect(this.page.locator('.Toastify')).toContainText(/Login successful/);

    const sidebar = this.page.locator('.sidebar-container.show-sidebar');
    await expect(sidebar.locator('.nav-link.active')).toContainText(/add job/);

    await this.waitForNumberOfSeconds(6);
  }
}
