import { expect, test } from '../baseTest';

const areEqualShallow = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

test.describe('Sort products functionality - POSITIVE', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  test('should sort products by name in ascending order', async ({ homePage }) => {
    await homePage.sortBy('name,asc');

    await expect
      .poll(async () => {
        const productsOnThePage = await homePage.getProductNames();
        const sortedProductsOnThePage = [...productsOnThePage].sort(); // ['a', 'b', 'c']
        return areEqualShallow(productsOnThePage, sortedProductsOnThePage);
      })
      .toEqual(true);
  });

  test('should sort products by name in desc order', async ({ homePage }) => {
    await homePage.sortBy('name,desc');

    await expect
      .poll(async () => {
        const productNamesFromPage = await page
          .locator('[data-test="product-name"]')
          .allTextContents();
        return productNamesFromPage.length;
      })
      .toBeGreaterThan(0);

    // Get the actual product names from the page
    const productNamesFromPage = await page.locator('[data-test="product-name"]').allTextContents();

    // Trim whitespace from the product names
    const trimmedProductNamesFromPage = productNamesFromPage.map((name) => name.trim());

    // Log the results for debugging
    console.log('Products from page:', productNamesFromPage);
    console.log('Expected sorted products:', sortedSubsetProductsData);

    // Sort trimmed names for final comparison
    // const sortedTrimmedNamesFromPage = trimmedProductNamesFromPage.sort();

    expect(trimmedProductNamesFromPage).toEqual(sortedSubsetProductsData);
  });
});
