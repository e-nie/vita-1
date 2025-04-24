import { test as baseTest } from '@playwright/test';
import { HomePage } from './pages/homePage';

type PomFixtures = {
  homePage: HomePage;
};

export const test = baseTest.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
