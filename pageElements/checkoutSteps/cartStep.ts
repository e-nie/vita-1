import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  productName: Locator;
  productQuantity: Locator;
  productPrice: Locator;
  linePrice: Locator;
  deleteBtn: Locator;
  priceTotal: Locator;
  proceedBtn: Locator;

  constructor(private page: Page) {
    this.productName = page.locator('data-test=product-name'); //verdoppelt
    this.productQuantity = page.locator('data-test=product-quantity'); //??isto
    this.productPrice = page.locator('data-test=product-price');
    this.linePrice = page.locator('data-test=line-price');
    this.deleteBtn = page.locator('[.btn.btn-danger]');
    this.priceTotal = page.locator('data-test=cart-total');
    this.proceedBtn = page.locator('data-test=proceed-1');
  }

  //check if the cart is visible
  async verifyCartLoaded() {
    await expect(this.page.locator('th:has-text("Item")')).toBeVisible();
    await expect(this.page.locator('th:has-text("Quantity")')).toBeVisible();
    await expect(this.page.locator('th:has-text("Price")')).toBeVisible();
    await expect(this.page.locator('th:has-text("Total")')).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedBtn.click();
    // await expect(this.page.locator('h3:has-text("Sign In")')).toBeVisible();
  }
}
