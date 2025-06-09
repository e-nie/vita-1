import { AccountPage } from './../pages/accountPage';
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { User } from '../types/types';

export const loginStep = async (
  page: Page,
  loginPage: LoginPage,
  accountPage: AccountPage,
  user: User,
) => {
  await loginPage.goToLoginPage();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.enterLoginDataAndSubmit({
    email: user.email,
    password: user.password,
  });
  await accountPage.verifyAccountPageLoaded();
  console.log(`User ${user.email} logged in successfully`);
};
