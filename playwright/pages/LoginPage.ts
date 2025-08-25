import { expect, Locator, Page } from '@playwright/test';
import path from 'path';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginButton: Locator;
  readonly submitButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly logoutButton: Locator;
  readonly sidebar: Locator;
  readonly activeSidebar: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = this.page.getByText('Login / Demo User');
    this.logoutButton = this.page.locator('.logout-btn');
    this.submitButton = this.page.getByText('Submit');
    this.emailInput = this.page.getByLabel('Email');
    this.passwordInput = this.page.getByLabel('Password');
    this.sidebar = this.page.locator('.sidebar-container.show-sidebar');
    this.activeSidebar = this.sidebar.locator('.nav-link.active');
  }

  async runAllTests() {
    await this.goto();
    await this.attemptLogin();
    await this.loginSuccess();
  }

  async goto() {
    await this.page.goto('http://localhost:5000/');
    await this.loginButton.click();
  }

  async attemptLogin() {
    const testuser = process.env.TEST_USER as string;
    const testPassword = process.env.TEST_PASSWORD as string;
    const authStateFile = path.resolve(__dirname, '../authState.json');

    await this.emailInput.pressSequentially(testuser, { delay: 100 });
    await this.passwordInput.pressSequentially(testPassword, { delay: 100 });
    await this.submitButton.click();
    await this.page.context().storageState({ path: authStateFile });
  }

  async loginSuccess() {
    await expect(this.page).toHaveTitle(/Jobify/);
    await expect(this.logoutButton).toContainText(/Bubbles McLaughster/);
    await expect(this.activeSidebar).toContainText(/add job/);

    await this.waitForNumberOfSeconds(6);
  }
}
