import { expect, Locator, Page } from '@playwright/test';

export class SignInPage {
  proceedBtn: Locator;

  //do we need to check the text if we already signed in?
  //Hello nose1 Doe, you are already logged in. You can proceed to checkout.
  //or if we are not logged in?
  constructor(private page: Page) {
    this.proceedBtn = page.locator('data-test=proceed-2');
  }

  //go to sign-in page (if user is signed in!!!)
  async verifySignInPageLoaded() {
    await expect(this.page.locator('[data-test=proceed-2]')).toBeVisible();
  }
  async proceedToBillingAddress() {
    await this.proceedBtn.click();
  }
}
