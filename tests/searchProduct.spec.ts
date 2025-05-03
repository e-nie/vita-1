import { test } from '../baseTest';
import { products } from '../data/products';

test.describe('Search Functionality - POSITIVE', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openViaUrl();
    await homePage.verifyPageLoaded();
  });

  // Test exact product name search
  test('should find product by exact name', async ({ homePage }) => {
    const testProduct = products[0]; // Combination Pliers
    await homePage.searchInput.searchForProduct(testProduct.name);
    await homePage.searchInput.verifySearchResults(testProduct.name);
    
  });

  //Test reset search
  test('should reset search results', async ({ homePage }) => {
    await homePage.searchInput.resetSearch();
  });
});
