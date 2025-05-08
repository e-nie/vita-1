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

  constructor(page: Page) {
    this.pageTitle = page.getByRole('heading', { name: 'Login' });
    this.signInWithGoogleBtn = page.getByRole('button', { name: 'Sign in with Google' });
    this.inputEmail = page.locator('[data-test=email]');
    this.inputPassword = page.locator('[data-test=password]');
    this.loginBtn = page.locator('[data-test=login-submit]');
    this.registerLink = page.locator('[data-test="register-link]');
    this.forgotPasswordLink = page.locator('[data-test=forgot-password-link]');
  }
}
