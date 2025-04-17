import {test} from '../baseTest';

test.describe.only('HomePage - POSITIVE', () => {
    test.beforeEach(async ({homePage}) => {
        await homePage.openViaUrl();
        await homePage.verifyPageLoaded();
    })
    // test('should display search results for valid queries', async ({homePage}) => {
    //     //enter product name in search field
    //     await homePage.searchForProduct('hammer');
    //     //check and assert the search results are displayed
    //     //check and assert the caption contains the search query
    //     await homePage.verifySearchResults('hammer');
    //     //reset the search
    //     await homePage.resetSearch()
    // })


    test.describe('Sort products functionality - POSITIVE', () => {
        test('should display sorting results by NAME(A-Z) and verifying across pages', async ({homePage}) => {
            await homePage.sortByName();
        })
    })
})
