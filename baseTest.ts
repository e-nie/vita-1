import { CheckoutPage } from './pages/checkoutPage';
import { test as baseTest } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';

type PomFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  invoicesPage: InvoicesPage;
};

export const test = baseTest.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  }
  invoicesPage: async ({ page }, use) => {
    const invoicesPage = new InvoicesPage(page);
    await use(invoicesPage);
  }


});

export { expect } from '@playwright/test';
