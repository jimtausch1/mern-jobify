import { Page } from '@playwright/test';
import { AddJobPage } from './AddJobPage';
import { AllJobsPage } from './AllJobsPage';
import { DashboardPage } from './DashboardPage';
import { EditJobPage } from './EditJobPage';
import { LoginPage } from './LoginPage';

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly addJobPage: AddJobPage;
  private readonly editJobPage: EditJobPage;
  private readonly allJobsPage: AllJobsPage;
  private readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.addJobPage = new AddJobPage(this.page);
    this.editJobPage = new EditJobPage(this.page);
    this.allJobsPage = new AllJobsPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  onLoginPage() {
    return this.loginPage;
  }

  onAddJobPage() {
    return this.addJobPage;
  }

  onEditJobPage() {
    return this.editJobPage;
  }

  onAllJobsPage() {
    return this.allJobsPage;
  }

  onDashboardPage() {
    return this.dashboardPage;
  }
}
