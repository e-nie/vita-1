import { Locator, Page } from '@playwright/test';

export class BillingAddressPage {
  pageTitle: Locator;
  streetInput: Locator;
  cityInput: Locator;
  stateInput: Locator;
  countryInput: Locator;
  postalCodeInput: Locator;

  proceedToCheckoutBtn: Locator;

  constructor(private page: Page) {
    this.pageTitle = page.getByRole('heading', { name: 'Billing Address' });
    this.streetInput = page.locator('data-test=street');
    this.cityInput = page.locator('data-test=city');
    this.stateInput = page.locator('data-test=state');
    this.countryInput = page.locator('data-test=country');
    this.postalCodeInput = page.locator('data-test=postal_code');
    this.proceedToCheckoutBtn = page.locator('data-test=proceed-3');
  }
}
