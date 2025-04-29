export type SortType = 'name,asc' | 'name,desc' | 'price,desc' | 'price,asc';
import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SortProducts {
  // private readonly SORT_NAME_ASC = 'name,asc';
  // private readonly SORT_NAME_DESC = 'name,desc';
  // private readonly SORT_PRICE_ASC = 'price,asc';
  // private readonly SORT_PRICE_DESC = 'price,desc';

  private sortField: Locator;

  constructor(private page: Page) {
    this.sortField = page.locator('data-test=sort');
  }

  async sortBy(sortType: SortType) {
    await this.sortField.selectOption(sortType);
  }
}
