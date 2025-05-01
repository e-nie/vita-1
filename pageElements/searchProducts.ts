import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchProducts {
  //made all properties public

  searchField: Locator;
  searchSubmit: Locator;
  searchReset: Locator;
  searchCaption: Locator;
  searchResults: Locator;

  constructor(private page: Page) {
    this.searchField = page.locator('data-test=search-query');
    this.searchSubmit = page.locator('data-test=search-submit');
    this.searchReset = page.locator('data-test=search-reset');
    this.searchCaption = page.locator('data-test=search-term');
    this.searchResults = page.locator('data-test=search_completed');
  }

  async resetSearch() {
    await this.searchReset.click();
    await expect(this.searchField).toHaveValue('');
   
  }
}
