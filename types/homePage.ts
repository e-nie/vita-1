import { Locator, Page } from '@playwright/test';

export interface HomePageType {
    page: Page;
    URL: string;

    // Search
    searchField: Locator;
    searchSubmit: Locator;
    searchReset: Locator;
    searchCaption: Locator;
    searchResults: Locator;

    // Sorting
    sortField: Locator;
    sortNameAZ: Locator;
    sortNameZA: Locator;
    sortPriceHighLow: Locator;
    sortPriceLowHigh: Locator;

    // Methods
    openViaUrl(): Promise<void>;
    verifyPageLoaded(): Promise<void>;
    searchFor(query: string): Promise<void>;
    sortByName(): Promise<void>;
    verifySortingOnCurrentPage(isAscending: boolean): Promise<void>;
    hasNextPage(): Promise<boolean>;
    goToNextPage(): Promise<void>;
}