import { validCard } from '../../data/paymentData';
import { test } from '../../baseTest';
import { getValidUser } from '../../helpers/dataHelper';
import { registerUserStep } from '../../steps/userSteps';
import { loginStep } from '../../steps/loginSteps';

test.describe('Billing Address', () => {
  test('verify invoice billing address with default address', async ({
    request,
    page,
    homePage,
    loginPage,
    accountPage,
    checkoutPage,
    invoicesPage,
    invoiceDetailsPage,
    productPage,
  }) => {
    //тут мы создаем пользователя - просто собираем объкт с валидными данными и используем его как payload
    const user = getValidUser();// create a valid user object with default address - use everywhere in the test
    const registeredUser = await registerUserStep(request, user);//🔴 ⁇ why we need to register the user again? We already have a valid user object

    // Debug logging
// console.log('User data:', user);
// console.log('Registered user data:', registeredUser);
// console.log('Email to use:', registeredUser.email);
// console.log('Password to use:', user.password);

    //Login user
    // await loginPage.goToLoginPage();
    // await loginPage.verifyLoginPageLoaded();
    // await loginPage.enterLoginDataAndSubmit({
    //   email: user.email,
    //   password: user.password,
    // });
    // await accountPage.verifyAccountPageLoaded();

    
    //1. Login user using loginSteps
    await loginStep(page, loginPage, accountPage, user);

    //2. Go to home page
    await homePage.openPageViaUrl();
    await homePage.verifyPageLoaded();
    await homePage.verifyProductsDisplayed();

    //3. Add a product to the cart
    await homePage.getFirstProduct();
    await productPage.verifyProductPageLoaded();
    await productPage.addToCart();

    //4. Go to shopping cart page/checkout - DONE
    await checkoutPage.navigateToCheckout();
    await checkoutPage.cartPage.verifyCartLoaded();
    await checkoutPage.cartPage.proceedToCheckout();

    await checkoutPage.signInPage.verifySignInPageLoaded();
    await checkoutPage.signInPage.proceedToBillingAddress();

    await checkoutPage.billingAddressPage.verifyBillingAddressPageLoaded();
    await checkoutPage.billingAddressPage.proceedToPaymentPage();

    await checkoutPage.paymentPage.verifyPaymentPageLoaded();
    await checkoutPage.paymentPage.selectPaymentMethod('Credit Card');
    await checkoutPage.paymentPage.fillCreditCardForm(validCard);
    await checkoutPage.paymentPage.confirmPayment();
    await checkoutPage.paymentPage.confirmOrder();

    //11. Go to the invoice page
    await invoicesPage.goToInvoicesPage();

    //verify that the data is downloaded - and the invoice row is not empty - DONE
    await invoicesPage.verifyInvoiceExists();

    //12. Get the invoice Details
    await invoicesPage.clickInvoiceDetails();
    await invoiceDetailsPage.verifyInvoiceDetailsPageLoaded();

    // Verify each component of the address
    await invoiceDetailsPage.verifyBillingAddressDetails(user);
  });
});
