import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async goto() {
    await this.page.goto('http://localhost:5000/dashboard');
  }

  async selectTheme() {
    await this.waitForNumberOfSeconds(1);

    await this.page.locator('.btn-container').getByRole('button').nth(0).click();
    expect(this.page.locator('.dark-theme')).toBeVisible();

    await this.waitForNumberOfSeconds(1);

    await this.page.locator('.btn-container').getByRole('button').nth(0).click();
    expect(this.page.locator('.dark-theme')).not.toBeVisible();
  }
}
