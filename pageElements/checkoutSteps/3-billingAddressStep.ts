import { expect, Locator, Page } from '@playwright/test';

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

  async goToBillingAddress() {
    await this.page.locator('[data-test=proceed-2]').click();
    await expect(this.page.locator('h3:has-text("Billing Address")')).toBeVisible();
  }

        async fillBillingAddress(street: string, city: string, state: string, country: string, postalCode: string) {
        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.countryInput.fill(country);
        await this.postalCodeInput.fill(postalCode);
        }
}
//После заполнения формы кликать не надо на сабмит, верно?
//кнопки перехода на сл страницу мы прямо в тесте добавляем?Не пойму куда их засунуть