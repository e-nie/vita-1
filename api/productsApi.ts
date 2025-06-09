import { APIRequestContext, APIResponse } from '@playwright/test';
import { ProductPayload, ProductResponseData } from '../types/types';

interface ProductAPIResponse extends APIResponse{
  json(): Promise<ProductResponseData>;
}

export const storeProduct = async (request: APIRequestContext, payload: ProductPayload):Promise<ProductAPIResponse> => {
  return request.post('https://api.practicesoftwaretesting.com/products', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
};

export const getProductById = async (
  request: APIRequestContext,
  id: string 
 
): Promise<ProductAPIResponse> => {
  return request.get(`https://api.practicesoftwaretesting.com/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
