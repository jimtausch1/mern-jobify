import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly themeButton: Locator;
  readonly themeClass: Locator;
  readonly sideBarToggle: Locator;
  readonly sideBarClass: Locator;

  constructor(page: Page) {
    super(page);
    this.themeButton = this.page.locator('.btn-container').getByRole('button').nth(0);
    this.themeClass = this.page.locator('.dark-theme');
    this.sideBarToggle = this.page.locator('.toggle-btn');
    this.sideBarClass = this.page.locator('.show-sidebar');
  }

  async runAllTests(): Promise<void> {
    await this.selectTheme();
    await this.toggleSidebar();
  }

  private async goto() {
    await this.page.goto('/dashboard');
  }

  private async selectTheme() {
    await this.waitForNumberOfSeconds(1);

    await this.themeButton.click();
    expect(this.themeClass).toBeVisible();

    await this.waitForNumberOfSeconds(1);

    await this.themeButton.click();
    expect(this.themeClass).not.toBeVisible();
  }

  private async toggleSidebar() {
    await this.waitForNumberOfSeconds(1);

    await this.sideBarToggle.click();
    expect(this.sideBarClass).not.toBeVisible();

    await this.waitForNumberOfSeconds(1);

    await this.sideBarToggle.click();
    expect(this.sideBarClass).toBeVisible();
  }
}
