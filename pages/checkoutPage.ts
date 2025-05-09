import { BillingAddressPage } from '../pageElements/checkoutSteps/3-billingAddressStep';
import { CartPage } from '../pageElements/checkoutSteps/1-cartStep';
import { PaymentPage } from '../pageElements/checkoutSteps/4-paymentStep';
import { SignInPage } from '../pageElements/checkoutSteps/2-signInStep';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  URL: string = 'checkout';

  cartIndicator: Locator;
  signInIndicator: Locator;
  billingAddressIndicator: Locator;
  paymentIndicator: Locator;

  // Page elements
  cartPage: CartPage;
  SignInPage: SignInPage;
  billingAddressPage: BillingAddressPage;
  paymentPage: PaymentPage;

  constructor(private page: Page) {
    this.cartIndicator = page.getByRole('link', { name: 'CART 1' });
    this.signInIndicator = page.getByRole('link', { name: 'SIGN IN 2' });
    this.billingAddressIndicator = page.getByRole('link', { name: 'BILLING ADDRESS 3' });
    this.paymentIndicator = page.getByRole('link', { name: 'PAYMENT 4' });

    //create instances of the page elements
    this.cartPage = new CartPage(page);
    this.SignInPage = new SignInPage(page);
    this.billingAddressPage = new BillingAddressPage(page);
    this.paymentPage = new PaymentPage(page);
  }

// async navigateToCheckout() {
//     await this.page.goto(this.URL);    
//   }

}
