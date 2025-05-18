import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  URL: string = '/account/';

  pageTitle: Locator;
  navFavorites: Locator;
  navProfile: Locator;
  navInvoices: Locator;
  page: Page;


  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test=page-title]');
    this.navFavorites = page.locator('[data-test=nav-favorites]');
    this.navProfile = page.locator('[data-test=nav-profile]');
    this.navInvoices = page.locator('[data-test=nav-invoices]');
  }

  // Method to verify that the page is loaded
  async goToMyAccountPage() {
    await this.page.goto(this.URL);
    await this.pageTitle.waitFor({ state: 'visible' });
  }
  //❓но мы должны проверить, что у нас сработал сабмит при лошине корректно или нет? 
  //на всякий случай метод ниже. 
  async verifyMyAccountPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.navFavorites.waitFor({ state: 'visible' });
    await this.navProfile.waitFor({ state: 'visible' });
    await this.navInvoices.waitFor({ state: 'visible' });
  }

}