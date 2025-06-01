import { Locator, Page, expect } from '@playwright/test';

export class InvoiceDetailsPage {
  billingAddressHeading: Locator;
  street:Locator;
  city:Locator;
  state:Locator;
  postalCode:Locator;
  country:Locator;

  constructor(private page: Page) {
    this.billingAddressHeading = page.getByRole('heading', { name: 'Billing Address' });
    this.street = page.locator('[data-test=street]');
    this.city = page.locator('[data-test=city]');
    this.state = page.locator('[data-test=state]');
    this.postalCode = page.locator('[data-test=postal_code]');
    this.country = page.locator('[data-test=country]');
  }
  async verifyInvoiceDetailsPageLoaded() {
    await expect(this.billingAddressHeading).toBeVisible();
  }

  async verifyBillingAddressDetails(payload: { address: { street: string; city: string; state: string; postal_code: string; country: string } }) {
    await expect(this.street).toHaveValue(payload.address.street);
    await expect(this.city).toHaveValue(payload.address.city);
    await expect(this.state).toHaveValue(payload.address.state);
    await expect(this.postalCode).toHaveValue(payload.address.postal_code);
    await expect(this.country).toHaveValue(payload.address.country);
  }
}
