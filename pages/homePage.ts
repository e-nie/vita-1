import { test, Locator, Page, expect } from "@playwright/test"

export class HomePage {
    private URL = '/';
    private productName: Locator;
    //SEARCH
    private searchField: Locator;
    private searchSubmit: Locator;
    private searchReset: Locator;
    private searchCaption: Locator;
    private searchResults: Locator;

    //SORTING
    private sortField: Locator;
    private sortNameAZ: Locator;
    private sortNameZA: Locator;
    private sortPriceHighLow: Locator;
    private sortPriceLowHigh: Locator;

    constructor(private page: Page) {
        this.productName = this.page.locator('data-test=product-name');
        this.searchField = page.locator('data-test=search-query');
        this.searchSubmit = page.locator('data-test=search-submit');
        this.searchReset = page.locator('data-test=search-reset');
        this.searchCaption = page.locator('data-test=search-term');
        this.searchResults = page.locator('data-test=search_completed');

        this.sortField = page.locator('data-test=sort');
        this.sortNameAZ = page.locator('option[value="name,asc"]');
        this.sortNameZA = page.getByText('Name (Z - A)');
        this.sortPriceHighLow = page.getByText('Price (High - Low)');
        this.sortPriceLowHigh = page.getByText('Price (Low - High)');
    }

    async openViaUrl() {
        await this.page.goto(this.URL);
    }

    async verifyPageLoaded() {
        await expect(this.searchField).toBeVisible();
    }

    async searchForProduct(query: string) {
        await this.searchField.fill(query);
        await this.searchSubmit.click();
    }

    async verifySearchResults(query: string) {
        await expect(this.searchCaption).toContainText(query);
        await expect(this.searchResults).toContainText(query);
        
        // Get all product names from the search results
        const foundProductNames = await this.productName.allTextContents();
        
        // Verify at least one product was found
        expect(foundProductNames.length).toBeGreaterThan(0);
        
        // Verify each found product contains the search query (case insensitive)
        const queryLower = query.toLowerCase();
        const matchingProducts = foundProductNames.filter(name => 
            name.toLowerCase().includes(queryLower)
        );
        expect(matchingProducts.length).toBeGreaterThan(0);
    }

    async resetSearch() {
        await this.searchReset.click();
        await expect(this.searchField).toHaveValue("");
    }

    //pagination methods
    async hasNextPage(): Promise<boolean> {
        try {
            const nextButton = this.page.locator('.pagination .page-item[aria-label="Next"]');
            const exists = await nextButton.count() > 0;
            if (!exists) return false;
            
            const isVisible = await nextButton.isVisible();
            if (!isVisible) return false;
            
            try {
                const isDisabled = await nextButton.evaluate(
                    (element) => element.classList.contains('disabled'),
                    { timeout: 5000 }
                );
                return isVisible && !isDisabled;
            } catch (error) {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async goToNextPage(): Promise<void> {
        const nextButton = this.page.locator('a[aria-label="Next"].page-link');
        await nextButton.click();
        await this.waitForSortedResults();
    }

    /**
     * Helper method to wait for sorted results to be available
     * Uses polling to check for products presence
     */
    private async waitForSortedResults(maxAttempts = 5): Promise<void> {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const productElements = await this.productName.all();
                if (productElements.length > 0) {
                    await this.page.waitForTimeout(500); // Small wait for UI stability
                    return;
                }
            } catch (error) {
                if (attempt === maxAttempts - 1) {
                    throw new Error(`Failed to load sorted products after ${maxAttempts} attempts`);
                }
            }
            await this.page.waitForTimeout(1000);
        }
        throw new Error('Timed out waiting for sorted products to load');
    }

    async sortByNameAZ(): Promise<void> {
        try {
            await this.sortField.selectOption('name,asc');
            await this.waitForSortedResults();
            
            const sortValue = await this.sortField.inputValue();
            expect(sortValue).toBe('name,asc');
            
            await this.verifyProductsSortedAZ();
            
            while (await this.hasNextPage()) {
                await this.goToNextPage();
                await this.verifyProductsSortedAZ();
            }
        } catch (error) {
            throw new Error(`Error during sortByNameAZ: ${error.message}`);
        }
    }

    async verifyProductsSortedAZ(): Promise<void> {
        try {
            const productNames = await this.productName.allTextContents();
            const products = productNames.map(name => name.trim());
            
            if (products.length === 0) {
                throw new Error('No product names found on the page');
            }
            
            for (let i = 0; i < products.length - 1; i++) {
                const currentProduct = products[i].toLowerCase();
                const nextProduct = products[i + 1].toLowerCase();
                
                const comparison = currentProduct.localeCompare(nextProduct);
                if (comparison > 0) {
                    const error = `Products not in A-Z order: "${products[i]}" should come before "${products[i + 1]}"`;
                    expect.soft(comparison <= 0, error).toBeTruthy();
                }
            }
        } catch (error) {
            throw new Error(`Verification error: ${error.message}`);
        }
    }

    async sortByNameZA(): Promise<void> {
        try {
            await this.sortField.selectOption('name,desc');
            await this.waitForSortedResults();
            
            const sortValue = await this.sortField.inputValue();
            expect(sortValue).toBe('name,desc');
            
            await this.verifyProductsSortedZA();
            
            while (await this.hasNextPage()) {
                await this.goToNextPage();
                await this.verifyProductsSortedZA();
            }
        } catch (error) {
            throw new Error(`Error during sortByNameZA: ${error.message}`);
        }
    }

    private async verifyProductsSortedZA(): Promise<void> {
        try {
            const productNames = await this.productName.allTextContents();
            const products = productNames.map(name => name.trim());
            
            if (products.length === 0) {
                throw new Error('No product names found on the page');
            }
            
            for (let i = 0; i < products.length - 1; i++) {
                const currentProduct = products[i].toLowerCase();
                const nextProduct = products[i + 1].toLowerCase();
                
                const comparison = nextProduct.localeCompare(currentProduct);
                if (comparison > 0) {
                    const error = `Products not in Z-A order: "${products[i]}" should come after "${products[i + 1]}"`;
                    expect.soft(comparison <= 0, error).toBeTruthy();
                }
            }
        } catch (error) {
            throw new Error(`Verification error: ${error.message}`);
        }
    }

    async sortByPriceHighLow(): Promise<void> {
        try {
            await this.sortField.selectOption('price,desc');
            await this.waitForSortedResults();
            
            const sortValue = await this.sortField.inputValue();
            expect(sortValue).toBe('price,desc');
            
            await this.verifyProductsSortedByPriceHighLow();
            
            while (await this.hasNextPage()) {
                await this.goToNextPage();
                await this.verifyProductsSortedByPriceHighLow();
            }
        } catch (error) {
            throw new Error(`Error during sortByPriceHighLow: ${error.message}`);
        }
    }

    async sortByPriceLowHigh(): Promise<void> {
        try {
            await this.sortField.selectOption('price,asc');
            await this.waitForSortedResults();
            
            const sortValue = await this.sortField.inputValue();
            expect(sortValue).toBe('price,asc');
            
            await this.verifyProductsSortedByPriceLowHigh();
            
            while (await this.hasNextPage()) {
                await this.goToNextPage();
                await this.verifyProductsSortedByPriceLowHigh();
            }
        } catch (error) {
            throw new Error(`Error during sortByPriceLowHigh: ${error.message}`);
        }
    }

    private async verifyProductsSortedByPriceHighLow(): Promise<void> {
        await this.verifyProductsSortedByPrice('desc');
    }

    private async verifyProductsSortedByPriceLowHigh(): Promise<void> {
        await this.verifyProductsSortedByPrice('asc');
    }

    private async verifyProductsSortedByPrice(order: 'asc' | 'desc'): Promise<void> {
        try {
            const priceLocator = this.page.locator('data-test=product-price');
            const priceTexts = await priceLocator.allTextContents();
            
            const prices = priceTexts.map(price => {
                return parseFloat(price.replace(/[^0-9.-]+/g, ''));
            });

            if (prices.length === 0) {
                throw new Error('No product prices found on the page');
            }

            for (let i = 0; i < prices.length - 1; i++) {
                const currentPrice = prices[i];
                const nextPrice = prices[i + 1];
                
                if (order === 'desc') {
                    if (currentPrice < nextPrice) {
                        const error = `Prices not in High-Low order: ${currentPrice} should be >= ${nextPrice}`;
                        expect.soft(currentPrice >= nextPrice, error).toBeTruthy();
                    }
                } else {
                    if (currentPrice > nextPrice) {
                        const error = `Prices not in Low-High order: ${currentPrice} should be <= ${nextPrice}`;
                        expect.soft(currentPrice <= nextPrice, error).toBeTruthy();
                    }
                }
            }
        } catch (error) {
            throw new Error(`Price verification error: ${error.message}`);
        }
    }
}
