import { Locator, Page } from "@playwright/test";
export type PaymentType = 'Bank Transfer' | 'Cash on Delivery' | 'Credit Card' | 'Buy Now Pay Later'| 'Gift Card';

export class PaymentPage {
    pageTitle:Locator
    paymentSelect:Locator

    //bank transfer fields
    



    constructor(page: Page) {
        this.pageTitle = page.getByRole('heading', { name: 'Payment' });
        this.paymentSelect = page.locator('data-test=payment-method');
    }
    async selectPaymentMethod(type: PaymentType) {
        await this.paymentSelect.selectOption(type);
    }
}