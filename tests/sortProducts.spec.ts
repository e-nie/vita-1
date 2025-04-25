import { expect, test } from '../baseTest';

test.describe('Sort products functionality - POSITIVE', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  test('should sort products by name in ascending order', async ({ homePage }) => {
    await homePage.sortBy('name,asc');

    await homePage.verifyProductsDisplayed();

    const productsOnThePage = await homePage.getProductNames();

    const sortedProductsOnThePage = productsOnThePage.sort();

    expect(productsOnThePage).toEqual(sortedProductsOnThePage);
  });
});
