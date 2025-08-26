import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly activeSidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = this.page.locator('.sidebar-container.show-sidebar');
    this.activeSidebar = this.sidebar.locator('.nav-link.active');
  }

  abstract runAllTests(): Promise<void>;

  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
