import { Locator, Page, expect } from '@playwright/test';
import { SortProducts } from '../pageElements/sortProducts';
import { SearchProducts } from '../pageElements/searchProducts';
import { CheckoutPage } from './checkoutPage';
import { InvoicesPage } from './invoicesPage';

export class HomePage {
  private URL = '/';
  

  productName: Locator;
  banner: Locator;
  firstProduct: Locator;

  /**
   * sortSelect: SortProducts: Declares a field that will hold an instance of the SortProducts class, allowing access to sorting methods.
   * searchField: SearchProducts: Declares a field that will hold an instance of the SearchProducts class, allowing access to search methods.
   * This is a common pattern in Playwright tests to encapsulate page interactions and make the test code cleaner and more maintainable.
   */

  sortSelect: SortProducts;
  searchInput: SearchProducts;
  checkoutPage: CheckoutPage
  invoicesPage: InvoicesPage


  constructor( private page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test=product-name]');
    this.firstProduct =  page.locator('a.card')
    // this.banner = page.locator('img[alt=Banner]');//css option
    this.banner = page.getByRole('img', { name: 'Banner' });//in-built Playwright option (user-visible locator)

    /**
     * Creates an instance of SortProducts, allowing the home page to use its sorting functionality.
     */
    this.sortSelect = new SortProducts(page);
    this.searchInput = new SearchProducts(page);
    this.checkoutPage = new CheckoutPage(page);
    this.invoicesPage = new InvoicesPage(page);
  }

  async openPageViaUrl() {
    await this.page.goto(this.URL);
  }

  async verifyPageLoaded() {
    await expect(this.banner).toBeVisible();
  }

  //mentor's code
  async verifyProductsDisplayed() {
    await expect(this.productName.first()).toBeVisible();
  }

  async getProductNames() {
    const productNames = await this.productName.allTextContents();
    return productNames.map((name) => name.trim());
  }

  async getProductPrices() {
    const productPrices = await this.page.locator('[data-test=product-price]').allTextContents();
    return productPrices.map((price) => price.trim());
  }
  async getFirstProduct() {
    await this.firstProduct.filter({ hasNotText: 'Out of stock' }).first().click();
  }
}
