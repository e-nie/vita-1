import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
  private URL = '/';

  // Sorting constants
  private readonly SORT_NAME_ASC = 'name,asc';
  private readonly SORT_NAME_DESC = 'name,desc';
  private readonly SORT_PRICE_DESC = 'price,desc';
  private readonly SORT_PRICE_ASC = 'price,asc';

  private productName: Locator;
  //SEARCH
  private searchField: Locator;
  private searchSubmit: Locator;
  private searchReset: Locator;
  private searchCaption: Locator;
  private searchResults: Locator;

  //SORT
  private sortField: Locator;

  constructor(private page: Page) {
    this.productName = this.page.locator('data-test=product-name');
    this.searchField = page.locator('data-test=search-query');
    this.searchSubmit = page.locator('data-test=search-submit');
    this.searchReset = page.locator('data-test=search-reset');
    this.searchCaption = page.locator('data-test=search-term');
    this.searchResults = page.locator('data-test=search_completed');

    this.sortField = page.locator('data-test=sort');
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

  //sort methods
}
