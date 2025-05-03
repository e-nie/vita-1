import { test } from '../baseTest';

test.describe('HomePage - POSITIVE', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  test('should display search results for valid queries', async ({ homePage }) => {
    await homePage.searchInput.searchForProduct('hammer');
    await homePage.searchInput.verifySearchResults('hammer');
  });
});
