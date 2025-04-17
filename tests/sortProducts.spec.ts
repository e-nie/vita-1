import { expect, test } from '../baseTest';

test.describe('Sort products functionality - POSITIVE', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openViaUrl();
        await homePage.verifyPageLoaded();
    })

    test('should display sorting results by NAME(A-Z) and verifying across pages', async ({ homePage }) => {
        await homePage.sortByNameAZ();
        await homePage.sortByNameZA();
        await homePage.sortByPriceHighLow();
        await homePage.sortByPriceLowHigh();       
    })
})


test.describe.skip('Select', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/')
    })

    test('should select a product frm select dropdown', async ({ page }) => {
await page.selectOption('data-test="sort"', 'name-asc')
const selectedValue = await page.$eval('data-test="sort"', (el) => el.value)
expect

    })
})
