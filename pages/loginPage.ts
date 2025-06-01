import { Locator, Page } from '@playwright/test';

export class LoginPage {
  URL: string = '/auth/login';

  pageTitle: Locator;
  signInWithGoogleBtn: Locator;
  inputEmail: Locator;
  inputPassword: Locator;
  loginBtn: Locator;
  registerLink: Locator;
  forgotPasswordLink: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'Login' });
    this.signInWithGoogleBtn = page.getByRole('button', { name: 'Sign in with Google' });
    this.inputEmail = page.locator('[data-test=email]');
    this.inputPassword = page.locator('[data-test=password]');
    this.loginBtn = page.locator('[data-test=login-submit]');
    this.registerLink = page.locator('[data-test=register-link]');
    this.forgotPasswordLink = page.locator('[data-test=forgot-password-link]');
  }
  async goToLoginPage() {
    await this.page.goto(this.URL);
    await this.pageTitle.waitFor({ state: 'visible' });
  }
  async verifyLoginPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.signInWithGoogleBtn.waitFor({ state: 'visible' });
    await this.inputEmail.waitFor({ state: 'visible' });
    await this.inputPassword.waitFor({ state: 'visible' });
    await this.loginBtn.waitFor({ state: 'visible' });
    await this.registerLink.waitFor({ state: 'visible' });
    await this.forgotPasswordLink.waitFor({ state: 'visible' });
  }
  async enterLoginDataAndSubmit(fields:{email: string, password: string} ) {
    await this.inputEmail.fill(fields.email);
    await this.inputPassword.fill(fields.password);
    await this.loginBtn.click();
  }  
}
