import { test, expect } from '@playwright/test';
import { registerUser } from '../../api/usersApi';

test('verify user registered successfully', async ({ request }) => {
  const payload = {
    first_name: 'Johnbljkla',
    last_name: 'Doe',
    address: {
      street: 'Street 1',
      city: 'City',
      state: 'State',
      country: 'Country',
      postal_code: '1234AA',
    },
    phone: '0987654321',
    dob: '1970-01-01',
    password: 'SuperSecure@123',
    email: 'john@doe.example',
  };
  const response = await registerUser(request, payload);

  expect(response.ok()).toBeTruthy(); //status code 200

  const responseBody = await response.json();
  const validationData = {
    first_name: responseBody.first_name,
    last_name: responseBody.last_name,
    phone: responseBody.phone,
    dob: responseBody.dob,
    email: responseBody.email,
    address: {
      street: responseBody.address.street,
      city: responseBody.address.city,
      state: responseBody.address.state,
      country: responseBody.address.country,
      postal_code: responseBody.address.postal_code,
    },
  };

  expect(payload).toMatchObject(validationData);
});
