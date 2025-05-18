import { BillingAddressPage } from '../pageElements/checkoutSteps/billingAddressStep';
import { CartPage } from '../pageElements/checkoutSteps/cartStep';
import { PaymentPage } from '../pageElements/checkoutSteps/paymentStep';
import { SignInPage } from '../pageElements/checkoutSteps/signInStep';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  URL: string = 'checkout';

  cartIndicator: Locator;
  signInIndicator: Locator;
  billingAddressIndicator: Locator;
  paymentIndicator: Locator;

  // Page elements
  cartPage: CartPage;
  signInPage: SignInPage;
  billingAddressPage: BillingAddressPage;
  paymentPage: PaymentPage;

  constructor(private page: Page) {
    this.cartIndicator = page.getByRole('link', { name: 'CART 1' });
    this.signInIndicator = page.getByRole('link', { name: 'SIGN IN 2' });
    this.billingAddressIndicator = page.getByRole('link', { name: 'BILLING ADDRESS 3' });
    this.paymentIndicator = page.getByRole('link', { name: 'PAYMENT 4' });

    //create instances of the page elements
    this.cartPage = new CartPage(page);
    this.signInPage = new SignInPage(page);
    this.billingAddressPage = new BillingAddressPage(page);
    this.paymentPage = new PaymentPage(page);
  }

async navigateToCheckout() {
    await this.page.goto(this.URL);    
  }

}
// Vitaly Gryaznov
// 20:42
// await checkoutPage.goToCheckoutPage()
// await checkoutPage.firstStepElement.verifyLoaded()
// Vitaly Gryaznov
// 20:44
// await.checkoutPage.firstStepElement.clcikProceed()
// await checkoutPage.fsecondStepElement.verifyLoaded()