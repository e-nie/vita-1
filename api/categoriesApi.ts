import { APIRequestContext, APIResponse } from "@playwright/test";
import { CategoryResponse } from "./requestTypes";



interface CategoryAPIResponse extends APIResponse {
    json(): Promise<CategoryResponse[]>;
}

export const getAllCategories = async (request:APIRequestContext):Promise<CategoryAPIResponse> => {
    return request.get('https://api.practicesoftwaretesting.com/categories', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }


