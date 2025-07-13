import { APIRequestContext, APIResponse } from "@playwright/test";
import { ProductImageResponse } from "./requestTypes";




interface ImageAPIResponse extends APIResponse {
    json(): Promise<ProductImageResponse[]>;
}

export const getAllImages = async (request: APIRequestContext):Promise<ImageAPIResponse> => {
    return request.get('https://api.practicesoftwaretesting.com/images', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }

     