import { test } from '../baseTest';
import { products } from '../data/products';

test.describe('Search Functionality - POSITIVE', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.openViaUrl();
        await homePage.verifyPageLoaded();
    });

    // Test exact product name search
    test('should find product by exact name', async ({homePage}) => {
        const testProduct = products[0]; // Combination Pliers
        await homePage.searchForProduct(testProduct.name);
        await homePage.verifySearchResults(testProduct.name);
        await homePage.resetSearch();
    });

    // Test partial name search for hammer products
    test('should find multiple hammer products', async ({homePage}) => {
        const hammerProducts = products.filter(p => p.name.toLowerCase().includes('hammer'));
        const searchTerm = 'Hammer';
        await homePage.searchForProduct(searchTerm);
        await homePage.verifySearchResults(searchTerm);
        
        // Verify each hammer product is found
        for (const product of hammerProducts) {
            await homePage.verifySearchResults(product.name);
        }
        await homePage.resetSearch();
    });

    // Test searching by brand
    test('should find products by brand', async ({homePage}) => {
        const brand = 'ForgeFlex Tools';
        const brandProducts = products.filter(p => p.brand === brand);
        await homePage.searchForProduct(brand);
        
        // Verify at least one brand product is found
        const firstBrandProduct = brandProducts[0];
        await homePage.verifySearchResults(firstBrandProduct.name);
        await homePage.resetSearch();
    });

    // Test searching for out of stock product
    test('should find out of stock product', async ({homePage}) => {
        const outOfStockProduct = products.find(p => p.stock_status === 'OUT_OF_STOCK');
        if (outOfStockProduct) {
            await homePage.searchForProduct(outOfStockProduct.name);
            await homePage.verifySearchResults(outOfStockProduct.name);
            await homePage.resetSearch();
        }
    });
});
