import { APIRequestContext, APIResponse } from "@playwright/test";
import { BrandResponse } from "./requestTypes";


interface BrandAPIResponse extends APIResponse  {
json(): Promise<BrandResponse[]>;
}
export const getAllBrands = async (request:APIRequestContext):Promise<BrandAPIResponse> => {
    return request.get('https://api.practicesoftwaretesting.com/brands', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }

