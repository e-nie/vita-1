import { test, Locator, Page, expect } from "@playwright/test"
import { HomePageType } from '../types/homePage';

export class HomePage implements HomePageType {
    private URL = '/'

    //SEARCH
    private searchField: Locator
    private searchSubmit: Locator
    private searchReset: Locator
    private searchCaption: Locator
    private searchResults: Locator

    //SORTING
    private sortField: Locator
    private sortNameAZ: Locator
    private sortNameZA: Locator
    private sortPriceHighLow: Locator
    private sortPriceLowHigh: Locator

    constructor(private page: Page) {
        this.searchField = page.locator('data-test=search-query')
        this.searchSubmit = page.locator('data-test=search-submit')
        this.searchReset = page.locator('data-test=search-reset')
        this.searchCaption = page.locator('data-test=search-caption')
        this.searchResults = page.locator('data-test=search_completed')

        this.sortField = page.locator('data-test=sort')
        this.sortNameAZ = page.locator('option[value="name,asc"]')
        this.sortNameZA = page.getByText('Name (Z - A)')
        this.sortPriceHighLow = page.getByText('Price (High - Low)')
        this.sortPriceLowHigh = page.getByText('Price (Low - High)')

    }

    async openViaUrl() {
        await test.step("Opening home page via url", async () => {
            await this.page.goto(this.URL)
        })
    }

    async verifyPageLoaded() {
        await test.step("Verifying home page loaded", async () => {
            await expect(this.searchField).toBeVisible()
            // await expect(this.sortField).toBeVisible()
        })
    }

    async searchFor(query: string) {
        await test.step(`Searching for ${query}`, async () => {
            await this.searchField.fill(query)
            await this.searchSubmit.click()
            await expect(this.searchCaption).toContainText(query)
            await expect(this.searchResults).toContainText(query)
            console.log(`Search results: ${await this.searchResults.innerText()}`)
        })
    }



    async hasNextPage(): Promise<boolean> {
        //Locate the Next btn in the Pagination element
        const nextButton = this.page.locator('.pagination .page-item[aria-label="Next"]')
        // Check if the "Next" button exists and is not disabled
        const isVisible = await nextButton.isVisible();
        const isDisabled = await nextButton.evaluate((element) => element.classList.contains('disabled'));
        // Return true if the "Next" button is visible and NOT disabled, otherwise false
        return isVisible && !isDisabled;

    }


    async goToNextPage(): Promise<void> {
        await test.step("Navigating to the next page", async () => {
            const nextButton = this.page.locator('.pagination .page-item[aria-label="Next"]');
            await nextButton.click(); // Click the "Next" button
            await this.page.waitForLoadState('networkidle'); // Wait for the next page to load
        });
    }

    async sortByName(): Promise<void> {
        await test.step("Sorting by name A-Z", async () => {
            //1.apply sorting
            // await this.sortField.hover()
            await this.sortField.selectOption({ value: 'name,asc' })//opens the dropdown
            await this.page.waitForSelector('data-test=dropdown-options', { state: 'visible' }); // Replace with the actual dropdown options selector
            await this.sortNameAZ.click()//selects the option
            //2.verify sorting on the first page
            await this.verifySortingOnCurrentPage(true)//true for A-Z
            //3. Navigate through all pages and verify sorting
            while (await this.hasNextPage()) {
                await this.goToNextPage()
                await this.verifySortingOnCurrentPage(true)//true for A-Z
            }
        })
    }

    async verifySortingOnCurrentPage(isAscending: boolean): Promise<void> {
        //Capture the product names on the current page
        const productNames = await this.page.locator('data-test=product-name').allTextContents()
        console.log(productNames)
        //Create a sorted version of the product names for comparison
        const sortedProductNames = [...productNames].sort((a, b) => {
            return isAscending ? a.localeCompare(b) : b.localeCompare(a)
            //Assert that the product names are sorted correctly
            expect(productNames).toEqual(sortedProductNames)

        })

    }
}