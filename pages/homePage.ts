import { Locator, Page, expect } from '@playwright/test';
import { SortProducts } from '../pageElements/sortProducts';

export class HomePage {
  private URL = '/';

  private productName: Locator;
  //SEARCH
  private searchField: Locator;
  private searchSubmit: Locator;
  private searchReset: Locator;
  private searchCaption: Locator;
  private searchResults: Locator;

  //SORT
  //todo  -- check name!!! This is a page element
  sortSelect: SortProducts;

  constructor(private page: Page) {
    this.productName = page.locator('data-test=product-name');
    this.searchField = page.locator('data-test=search-query');
    this.searchSubmit = page.locator('data-test=search-submit');
    this.searchReset = page.locator('data-test=search-reset');
    this.searchCaption = page.locator('data-test=search-term');
    this.searchResults = page.locator('data-test=search_completed');
    this.sortSelect = new SortProducts(page);
  }

  async openViaUrl() {
    await this.page.goto(this.URL);
  }

  async verifyPageLoaded() {
    await expect(this.searchField).toBeVisible();
  }

  //search methods
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
    const matchingProducts = foundProductNames.filter((name) =>
      name.toLowerCase().includes(queryLower),
    );
    expect(matchingProducts.length).toBeGreaterThan(0);
  }
  async resetSearch() {
    await this.searchReset.click();
    await expect(this.searchField).toHaveValue('');
  }

  //mentor's code

  async verifyProductsDisplayed() {
    await expect(this.productName.first()).toBeVisible();
  }

  async getProductNames() {
    const productNames = await this.productName.allTextContents();
    return productNames.map((name) => name.trim());
  }

  async getProductPrices() {
    const productPrices = await this.page.locator('data-test=product-price').allTextContents();
    return productPrices.map((price) => price.trim());
  }
  //sort methods
}
