import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly activeSidebar: Locator;
  readonly testuser: string;
  readonly testPassword: string;
  static randomJobTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = this.page.locator('.sidebar-container.show-sidebar');
    this.activeSidebar = this.sidebar.locator('.nav-link.active');
    // this.testuser = process.env.TEST_USER as string;
    // this.testPassword = process.env.TEST_PASSWORD as string;
    this.testuser = 'test@test.com';
    this.testPassword = 'secret123';
  }

  abstract runAllTests(): Promise<void>;

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
