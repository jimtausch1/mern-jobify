import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditJobPage extends BasePage {
  readonly positionInput: Locator;
  readonly companyInput: Locator;
  readonly jobLocationInput: Locator;
  readonly jobStatusSelect: Locator;
  readonly jobTypeSelect: Locator;
  readonly searchInput: Locator;
  readonly submitButton: Locator;
  readonly resetSearchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.positionInput = this.page.getByLabel('Position');
    this.companyInput = this.page.getByLabel('Company');
    this.jobLocationInput = this.page.getByLabel('Job Location');
    this.jobStatusSelect = this.page.getByLabel('Job Status');
    this.jobTypeSelect = this.page.getByLabel('Job Type');
    this.searchInput = this.page.getByLabel('Search');
    this.submitButton = this.page.getByText('Submit');
    this.resetSearchButton = this.page.getByText('Reset Search Values');
  }

  async runAllTests() {
    await this.editExistingJob();
  }

  private async editExistingJob() {
    await this.companyInput.clear();
    await this.companyInput.pressSequentially('Edited Company Name', { delay: 100 });

    await this.jobLocationInput.clear();
    await this.jobLocationInput.pressSequentially('Edited Job Location', { delay: 100 });

    await this.waitForNumberOfSeconds(1);
    await this.submitButton.click();
    await expect(this.activeSidebar).toContainText(/all jobs/);
  }
}
