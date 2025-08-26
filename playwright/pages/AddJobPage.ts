import { faker } from '@faker-js/faker';
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddJobPage extends BasePage {
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
    await this.fillFormAndSubmit();
  }

  private async fillFormAndSubmit() {
    const randomJobTitle = faker.person.jobTitle();
    await this.positionInput.pressSequentially(randomJobTitle, { delay: 100 });
    await this.companyInput.pressSequentially(faker.company.name(), { delay: 100 });

    await this.jobLocationInput.clear();
    await this.jobLocationInput.pressSequentially(faker.location.state(), { delay: 100 });

    await this.jobStatusSelect.selectOption('interview');
    await this.jobTypeSelect.selectOption('part-time');

    await this.waitForNumberOfSeconds(1);
    await this.submitButton.click();
    await expect(this.activeSidebar).toContainText(/add job/);

    await this.searchInput.pressSequentially(randomJobTitle, { delay: 100 });

    await this.waitForNumberOfSeconds(2);
    await this.resetSearchButton.click();
  }
}
