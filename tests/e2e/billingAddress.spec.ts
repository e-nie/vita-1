import { getRandomString } from '../../helpers/getRandomString';
import { registerUser } from './../../api/usersApi';
import { test, expect, Page } from '@playwright/test';
import { validCard } from '../../data/paymentData';
test.describe('Billing Address', () => {
  test('verify invoice billing address with default address', async ({ request, page }) => {
    //1. Register a new user via API
    const randomString = getRandomString(5);

    const payload = {
      first_name: 'nose1',
      last_name: 'Doe',
      address: {
        street: 'Via La Sky',
        city: 'Belaggio',
        state: 'Yo',
        country: 'IT',
        postal_code: '1234AA',
      },
      phone: '0987654321',
      dob: '1970-01-01',
      password: 'SuperSecure@123',
      email: randomString + '@doe.example',
    };
    const response = await registerUser(request, payload);
    console.log(response);

    console.log(response.status());
    expect(response.ok()).toBeTruthy(); //status code 200

    const responseBody = await response.json();
    console.log(responseBody);

    //login registered user via UI
    const loginViaUI = async (page: Page) => {
      await page.goto('https://practicesoftwaretesting.com/auth/login');
      await page.locator('[data-test=email]').fill(responseBody.email);
      await page.locator('[data-test=password]').fill(payload.password);
      await page.locator('[data-test=login-submit]').click();
    };

    await loginViaUI(page);
    expect(await page.locator('[data-test=page-title]').textContent()).toBe('My account');

    //2. Go to home page
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
    const banner = page.locator('img[alt="Banner"]');
    await expect(banner).toBeVisible();

    //3. Add a product to the cart
    await page.locator('a.card').filter({ hasNotText: 'Out of stock' }).first().click();

    await page.locator('[data-test=add-to-cart]').click();

    expect(
      await page.getByRole('alert', { name: 'Product added to shopping cart.' }).textContent(),
    ).toBe(' Product added to shopping cart. ');

    //4. Go to shopping cart page/checkout - DONE
    await page.locator('[data-test=cart-quantity]').click();
    await expect(page.locator('th:has-text("Item")')).toBeVisible();
    await expect(page.locator('th:has-text("Quantity")')).toBeVisible();
    await expect(page.locator('th:has-text("Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Total")')).toBeVisible();

    //5. Go to sign-in page/checkout - DONE
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await page.locator('[data-test=proceed-1]').click();
    await expect(page.locator('[data-test=proceed-2]')).toBeVisible();

    //6. Verify billing address - DONE
    await page.locator('[data-test=proceed-2]').click();
    await expect(page.locator('h3:has-text("Billing Address")')).toBeVisible();

    //7. Go to payment page
    await page.locator('[data-test="proceed-3"]').click();
    const paymentTitle = page.getByRole('heading', { name: 'Payment' });
    await expect(paymentTitle).toBeVisible();

    //8. Choose payment method and fill in card details - create data file with card data - DONE
    await page.locator('[data-test=payment-method]').selectOption('Credit Card');
    await page.locator('[data-test=credit_card_number]').fill(validCard.cardNumber);
    await page.locator('[data-test=expiration_date]').fill(validCard.expirationDate);
    await page.locator('[data-test=cvv]').fill(validCard.cvv);
    await page.locator('[data-test=card_holder_name]').fill(validCard.cardHolderName);

    //9. Click on the "confirm" button and see the success message - DONE
    await page.getByRole('button', { name: 'Confirm' }).click();
    const successMessage = page.locator('[data-test=payment-success-message]');
    await expect(successMessage).toBeVisible(); // ‼️NOT VISIBLE!!
    // const successMessageText = await successMessage.textContent();

    //10. Click on the Confirm button second time and go to confirmation page - DONE
    await expect(page.locator('[data-test=finish]')).toBeVisible();
    await expect(page.locator('[data-test=finish]')).toBeEnabled();
    await page.locator('[data-test=finish]').click();
    await expect(page.locator('#order-confirmation')).toContainText('Thanks for your order!');

    //11. Go to the invoice page - DONE
    await page.goto('https://practicesoftwaretesting.com/account/invoices');
    // await page.locator('[data-test=nav-menu]').click(); //use link text
    // await page.locator('[data-test=nav-my-invoices]').click();
    await expect(page.locator('[data-test=page-title]')).toHaveText('Invoices');

    //verify that the data is downloaded - and the invoice row is not empty - DONE
    const row = page.locator('table tbody tr').first();
    await expect(row.locator('td').nth(0)).toHaveText(/\S/); // Invoice Number
    await expect(row.locator('td').nth(1)).toHaveText(/\S/); // Billing Address
    await expect(row.locator('td').nth(2)).toHaveText(/\S/); // Invoice Date
    await expect(row.locator('td').nth(3)).toHaveText(/\S/); // Total

    //12. Get the invoice Details - DONE
    await page.getByRole('link', { name: 'Details' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h3:has-text("Billing Address")')).toBeVisible();

    // Verify each component of the address
    // const billingAddressForm = page.locator('');

    const street = page.locator('[data-test=street]');
    const postalCode = page.locator('[data-test=postal_code]');
    const city = page.locator('[data-test=city]');
    const state = page.locator('[data-test=state]');
    const country = page.locator('[data-test=country]');

    await expect(street).toHaveValue(payload.address.street); //tag input in DOM,type=text readonly; and input has a value
    await expect(city).toHaveValue(payload.address.city);
    await expect(state).toHaveValue(payload.address.state);
    await expect(postalCode).toHaveValue(payload.address.postal_code);
    await expect(country).toHaveValue(payload.address.country);

    //add screenshot
  });
});
