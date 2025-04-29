import { expect, test } from '../baseTest';

const areEqualShallow = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

test.describe('Sort products functionality - POSITIVE', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  test('should sort products by name in ascending order', async ({ homePage }) => {
    await homePage.sortSelect.sortBy('name,asc'); // sort products on the page

    await expect
      .poll(async () => {
        const productsOnThePage = await homePage.getProductNames(); // ['a', 'b', 'c']// get sorted products on the page
        const sortedProductsOnThePage = [...productsOnThePage].sort(); // ['a', 'b', 'c'] sorts same before sorted products with js
        return areEqualShallow(productsOnThePage, sortedProductsOnThePage); // compare sorted products from page  with products sorted with js
      })
      .toEqual(true);
  });

  test('should sort products by name in desc order', async ({ homePage }) => {
    await homePage.sortSelect.sortBy('name,desc');

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
    //sort the products on the page
    await homePage.sortSelect.sortBy('price,asc');

    await expect
      .poll(async () => {
        //get the prices from the page
        const pricesOnThePage = await homePage.getProductPrices();
        //remove non-numeric characters and convert to numbers
        const pricesAsNumbers = [...pricesOnThePage].map((p) => {
          const price = p.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
          return parseFloat(price);
        });
        const sortedPricesAsNumbers = [...pricesAsNumbers].sort((a: number, b: number) => a - b); // Sort the prices in ascending order
        return areEqualShallow(pricesAsNumbers, sortedPricesAsNumbers);
      })
      .toEqual(true);
  });

  test('should sort products by price in descending order', async ({ homePage }) => {
    await homePage.sortSelect.sortBy('price,desc');
   

    await expect
      .poll(async () => {
        const pricesOnThePage = await homePage.getProductPrices();
        const pricesAsNumbers = [...pricesOnThePage].map((p) => {
          const price = p.replace(/[^0-9.]/g, '');
          return parseFloat(price);
        });
        const sortedPricesAsNumbers = [...pricesAsNumbers].sort((a: number, b: number) => b - a); // Sort the prices in descending order
        return areEqualShallow(pricesAsNumbers, sortedPricesAsNumbers);
      })
      .toEqual(true);
  });
});
