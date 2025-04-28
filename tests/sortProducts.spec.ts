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
        const productsOnThePage = await homePage.getProductNames();
        const sortedProductsOnThePage = [...productsOnThePage].sort((a: string, b: string) =>
          b.localeCompare(a),
        ); // ['a', 'b', 'c']
        return areEqualShallow(productsOnThePage, sortedProductsOnThePage);
      })
      .toEqual(true);
  });

  test('should sort products by price in ascending order', async ({ homePage }) => {
    await homePage.sortBy('price,asc');

    await expect
      .poll(async () => {
        const productsOnThePage = await homePage.getProductPrices();
        const sortedProductsOnThePage = [...productsOnThePage].sort(); // ['a', 'b', 'c']
        return areEqualShallow(productsOnThePage, sortedProductsOnThePage);
      })
      .toEqual(true);
  });

  test('should sort products by price in descending order', async ({ homePage }) => {
    await homePage.sortBy('name,asc');

    await expect
      .poll(async () => {
        const productsOnThePage = await homePage.getProductPrices();
        const sortedProductsOnThePage = [...productsOnThePage].sort(); // ['a', 'b', 'c']
        return areEqualShallow(productsOnThePage, sortedProductsOnThePage);
      })
      .toEqual(true);
  });
});
