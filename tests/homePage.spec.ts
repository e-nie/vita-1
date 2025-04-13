import { test } from '../baseTest';

test.describe('Search Functionality - POSITIVE', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openViaUrl();
        await homePage.verifyPageLoaded();
    })
    test('should display search results for valid queries', async ({ homePage }) => {
        await homePage.searchFor('hammer');
    })
})

test.describe.only('Sort products functionality - POSITIVE', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.openViaUrl();
        await homePage.verifyPageLoaded();
    })

    test('should display sorting results by NAME(A-Z) and verifying across pages', async ({ homePage }) => {
        await homePage.sortByName();
    })
})