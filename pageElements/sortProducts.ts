export type SortType = 'name,asc' | 'name,desc' | 'price,desc' | 'price,asc';
import { Locator, Page } from '@playwright/test';


export class SortProducts {
  

  private sortField: Locator;

  constructor(private page: Page) {
    this.sortField = page.locator('data-test=sort');
  }

  async sortBy(sortType: SortType) {
    await this.sortField.selectOption(sortType);
  }
}
