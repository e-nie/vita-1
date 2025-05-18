import { APIRequestContext, expect } from '@playwright/test';
import { registerUser } from './../api/usersApi';
import { User } from '../types/types';

export const registerUserStep = async (request: APIRequestContext, payload: User) => {
  const response = await registerUser(request, payload);
  console.log(response.status());
  expect(response.ok()).toBeTruthy(); //status code 200
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody;
};
