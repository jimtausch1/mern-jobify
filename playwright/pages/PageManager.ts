import { Page } from '@playwright/test';
import { AddJobPage } from './AddJobPage';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly addJobPage: AddJobPage;
  private readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.addJobPage = new AddJobPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  onLoginPage() {
    return this.loginPage;
  }

  onAddJobPage() {
    return this.addJobPage;
  }

  onDashboardPage() {
    return this.dashboardPage;
  }
}
