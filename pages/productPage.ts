import { Locator, Page } from "@playwright/test";

export class ProductPage {
URL: string = '/product/';

    productImg:Locator
    productTitle: Locator
    categoryLabel: Locator
    brandLabel: Locator
    productPrice: Locator
    productDescription: Locator

    decreaseQuantityBtn: Locator
    quantity: Locator
    increaseQuantity: Locator

    addToCartBtn: Locator
    addToFavouritesBtn: Locator

    constructor(page: Page) {
        this.productImg = page.locator('img[class="figure-img img-fluid"]');
        this.productTitle = page.locator('data-test=product-name');
        this.categoryLabel = page.getByLabel('category');
        this.brandLabel = page.getByLabel('brand');
        this.productPrice = page.locator('data-test=unit-price');
        this.productDescription = page.locator('data-test=product-description');

        this.decreaseQuantityBtn = page.locator('[data-test=decrease-quantity]');
        this.quantity = page.locator('data-test=quantity');
        this.increaseQuantity = page.locator('[data-test=increase-quantity]');

        this.addToCartBtn = page.locator('[data-test=add-to-cart]');
        this.addToFavouritesBtn = page.locator('[data-test=add-to-favorites]');

    }
}