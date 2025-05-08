import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  URL: string = 'checkout';

  cartIndicator: Locator;
  signInIndicator: Locator;
  billingAddressIndicator: Locator;
  paymentIndicator: Locator;

  constructor(page: Page) {
    this.cartIndicator = page.getByRole('link', { name: 'CART 1' });
    this.signInIndicator = page.getByRole('link', { name: 'SIGN IN 2' });
    this.billingAddressIndicator = page.getByRole('link', { name: 'BILLING ADDRESS 3' });
    this.paymentIndicator = page.getByRole('link', { name: 'PAYMENT 4' });
  }
}
