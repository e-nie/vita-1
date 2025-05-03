import { APIRequestContext } from "@playwright/test";

export const getAllCategories = async (request:APIRequestContext) => {
    return request.get('https://api.practicesoftwaretesting.com/categories', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }