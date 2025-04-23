import { expect, test } from "../baseTest";
import { products } from "../data/products";

test.describe.only("Sort products functionality - POSITIVE", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  test.only("should sort products by name in ascending order", async ({
    page,
  }) => {
    //get all products names from test data
    const productsData = products.map((product) => product.name);

    //slice the first 9 products to match the page data
    const subsetProductsData = productsData.slice(0, 9);
    //sort the products data in AZ to compare with the page sorted data
    const sortedSubsetProductsData = subsetProductsData.sort();

    // Select the sort option from dropdown  in AZ
    await page.locator('[data-test="sort"]').selectOption("name,asc");

    //use expect.poll to wait for the page to load
    await expect
      .poll(async () => {
        const productNamesFromPage = await page
          .locator('[data-test="product-name"]')
          .allTextContents();
        return productNamesFromPage.length;
      })
      .toBeGreaterThan(0);

    // Get the actual product names from the page
    const productNamesFromPage = await page
      .locator('[data-test="product-name"]')
      .allTextContents();


    // Trim whitespace from the product names
    const trimmedProductNamesFromPage = productNamesFromPage.map(name => name.trim());


    // Log the results for debugging
    console.log("Products from page:", productNamesFromPage);
    console.log("Expected sorted products:", sortedSubsetProductsData);

    // Sort trimmed names for final comparison
    const sortedTrimmedNamesFromPage = trimmedProductNamesFromPage.sort();

    expect(sortedTrimmedNamesFromPage).toEqual(sortedSubsetProductsData);
  });
});
