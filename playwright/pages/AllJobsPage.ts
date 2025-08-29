import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AllJobsPage extends BasePage {
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
    await this.filterByJobStatusAndType();
    await this.selectJobToEdit();
  }

  private async filterByJobStatusAndType() {
    await this.jobStatusSelect.selectOption('interview');
    await this.jobTypeSelect.selectOption('part-time');
    await this.waitForNumberOfSeconds(2);

    await this.resetSearchButton.click();
  }

  private async selectJobToEdit() {
    const selectArticleToEdit = this.page
      .locator('article')
      .filter({ hasText: BasePage.randomJobTitle });

    await selectArticleToEdit.locator('.edit-btn').click();
  }
}
