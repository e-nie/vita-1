import { APIRequestContext } from "@playwright/test";

export const getAllBrands = async (request:APIRequestContext) => {
    return request.get('https://api.practicesoftwaretesting.com/brands', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }