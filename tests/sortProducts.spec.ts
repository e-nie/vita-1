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
