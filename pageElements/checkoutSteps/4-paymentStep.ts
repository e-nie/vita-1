import { expect, Locator, Page } from '@playwright/test';
export type PaymentType =
  | 'Bank Transfer'
  | 'Cash on Delivery'
  | 'Credit Card'
  | 'Buy Now Pay Later'
  | 'Gift Card';

export type MonthlyInstallmentsType =
  | '3 Monthly Installments'
  | '6 Monthly Installments'
  | '9 Monthly Installments'
  | '12 Monthly Installments';

export class PaymentPage {
  pageTitle: Locator;
  paymentSelect: Locator;
  proceedToCheckoutBtn: Locator;

  //bank transfer form inputs
  bankNameInput: Locator;
  accountNameInput: Locator;
  accountNumberInput: Locator;

  //credit card form inputs
  cardNumberInput: Locator;
  expirationDateInput: Locator;
  cvvInput: Locator;
  cardHolderNameInput: Locator;
  confirmSuccessMsg: Locator;

  //buy now pay later select
  chooseMonthlyInstallments: Locator;

  //gift card form inputs
  giftCardNumberInput: Locator;
  validationCodeInput: Locator;

  confirmBtn: Locator;
  orderConfirmation: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'Payment' });
    this.paymentSelect = page.locator('data-test=payment-method');
    this.proceedToCheckoutBtn = page.locator('data-test=proceed-3');

    this.bankNameInput = page.locator('data-test=bank_name');
    this.accountNameInput = page.locator('data-test=account_name');
    this.accountNumberInput = page.locator('data-test=account_number');

    this.cardNumberInput = page.locator('data-test=credit_card_number');
    this.expirationDateInput = page.locator('data-test=expiration_date');
    this.cvvInput = page.locator('data-test=cvv');
    this.cardHolderNameInput = page.locator('data-test=card_holder_name');
    this.confirmSuccessMsg = page.locator('data-test=payment-success-message');

    this.chooseMonthlyInstallments = page.locator('data-test=monthly_installments');

    this.giftCardNumberInput = page.locator('data-test=gift_card_number');
    this.validationCodeInput = page.locator('data-test=validation_code');

    this.confirmBtn = page.locator('data-test=finish');
    this.orderConfirmation = page.locator('#order-confirmation');
  }

  // Go to payment page
  async goToPaymentPage() {
    await this.proceedToCheckoutBtn.click();
    await expect(this.pageTitle).toBeVisible();
  }

  async selectPaymentMethod(type: PaymentType) {
    await this.paymentSelect.selectOption(type);
  }

  async fillBankTransferForm(bankName: string, accountName: string, accountNumber: string) {
    await this.bankNameInput.fill(bankName);
    await this.accountNameInput.fill(accountName);
    await this.accountNumberInput.fill(accountNumber);
  }

  async fillCreditCardForm(
    cardNumber: string,
    expirationDate: string,
    cvv: string,
    cardHolderName: string,
  ) {
    await this.cardNumberInput.fill(cardNumber);
    await this.expirationDateInput.fill(expirationDate);
    await this.cvvInput.fill(cvv);
    await this.cardHolderNameInput.fill(cardHolderName);
  }

  async confirmPayment() {
    await this.confirmBtn.click();
    await expect(this.confirmSuccessMsg).toBeVisible(); //'Payment was successful'
  }
  //confirm the order
  async confirmOrder() {
    await expect(this.confirmBtn).toBeVisible();
    await expect(this.confirmBtn).toBeEnabled();
    await this.confirmBtn.click();
    await expect(this.orderConfirmation).toContainText('Thanks for your order!');
  }
}
