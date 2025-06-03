import { APIRequestContext, expect } from '@playwright/test';
import { registerUser } from './../api/usersApi';
import { User } from '../types/types';

export const registerUserStep = async (request: APIRequestContext, user: User) => {
  const payload = {
    first_name: user.firstName,
    last_name: user.lastName,
    address: {
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      postal_code: user.address.postal_code,
    },
    phone: user.phone,
    dob: user.dob,
    password: user.password,
    email: user.email,
  };
  const response = await registerUser(request, payload);
  console.log(response.status());
  // expect(response.ok()).toBeTruthy(); //status code 200
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody;
};
