import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';

export class POManager {
    page: Page; // import page first
    loginPage: LoginPage; //loginpage type is LoginPage
    dashboardPage: DashboardPage;
    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);

    }

    getLoginPage() { return this.loginPage }

    getDashboardPage() { return this.dashboardPage }

}
