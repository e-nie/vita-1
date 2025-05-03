import { APIRequestContext } from "@playwright/test";

export const getAllImages = async (request: APIRequestContext) => {
    return request.get('https://api.practicesoftwaretesting.com/images', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }