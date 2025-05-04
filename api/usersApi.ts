import { APIRequestContext } from "@playwright/test";

export const registerUser = async (request:APIRequestContext, payload) => {
  return request.post('https://api.practicesoftwaretesting.com/users/register', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
