import { Locator, Page, expect } from '@playwright/test';

export class InvoicesPage {
  URL = 'account/invoices';
  pageTitle: Locator;
  invoiceDetailsBtn: Locator;

  constructor(private page: Page) {
    this.pageTitle = page.locator('[data-test=page-title]');
    this.invoiceDetailsBtn = page.getByRole('link', { name: 'Details' })
  }

  async goToInvoicesPage() {
    await this.page.goto(this.URL);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Invoices');
  }
  async verifyInvoiceExists() {
    const row = this.page.locator('table tbody tr').first();
    await expect(row.locator('td').nth(0)).toHaveText(/\S/); // Invoice Number
    await expect(row.locator('td').nth(1)).toHaveText(/\S/); // Billing Address
    await expect(row.locator('td').nth(2)).toHaveText(/\S/); // Invoice Date
    await expect(row.locator('td').nth(3)).toHaveText(/\S/); // Total
  }
  //where to put this method?❓❓❓❓❓❓❓❓❓❓Title gehoert zu den invoice details - zu den anderen Seiten
    async clickInvoiceDetails() {
        await this.invoiceDetailsBtn.click();
        // await expect(this.page.locator('h3:has-text("Billing Address")')).toBeVisible();
    }
}
