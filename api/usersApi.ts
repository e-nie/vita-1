import { APIRequestContext } from "@playwright/test";
import { User } from "../types/types";

export const registerUser = async (request:APIRequestContext, payload:User) => {
  return request.post('https://api.practicesoftwaretesting.com/users/register', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
