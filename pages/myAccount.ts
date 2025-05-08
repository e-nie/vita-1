import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  URL: string = '/account/';

  pageTitle: Locator;
  navFavorites: Locator;
  navProfile: Locator;
  navInvoices: Locator;


  constructor(page: Page) {
    this.pageTitle = page.locator('[data-test=page-title]');
    this.navFavorites = page.locator('[data-test=nav-favorites]');
    this.navProfile = page.locator('[data-test=nav-profile]');
    this.navInvoices = page.locator('[data-test=nav-invoices]');
  }
}