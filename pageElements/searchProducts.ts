import { Locator, Page, expect } from '@playwright/test';

//search functionality  is unique for HomePage, we describe it as page Element here separately  for learning purposes only
export class SearchProducts {
  //made all properties public

  private searchField: Locator;
  private searchSubmit: Locator;
  private searchReset: Locator;
  private searchCaption: Locator;
  private searchResults: Locator;

  constructor(page: Page) {
    this.searchField = page.locator('data-test=search-query');
    this.searchSubmit = page.locator('data-test=search-submit');
    this.searchReset = page.locator('data-test=search-reset');
    this.searchCaption = page.locator('data-test=search-term');
    this.searchResults = page.locator('data-test=search_completed');
  }

  //search methods - my code
  async searchForProduct(query: string) {
    await this.searchField.fill(query);
    await this.searchSubmit.click();
  }
  async verifySearchResults(query: string) {
    await expect(this.searchCaption).toContainText(query);
    await expect(this.searchResults).toContainText(query);
  }

  async resetSearch() {
    await this.searchReset.click();
    await expect(this.searchField).toHaveValue('');
  }
}
