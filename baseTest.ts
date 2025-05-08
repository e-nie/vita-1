import { test as baseTest } from '@playwright/test';
import { HomePage } from './pages/homePage';

type PomFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
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


});

export { expect } from '@playwright/test';
