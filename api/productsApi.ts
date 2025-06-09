import { APIRequestContext, APIResponse } from '@playwright/test';
import { ProductPayload } from '../types/types';

interface ProductResponse extends APIResponse{
  json(): Promise<{
 id: number|string;
  name?: string;
  description?: string;
  price?: number;
}>;
}

export const storeProduct = async (request: APIRequestContext, payload: ProductPayload) => {
  return request.post('https://api.practicesoftwaretesting.com/products', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export const getProductById = async (
  request: APIRequestContext,
  id: number | string
 
): Promise<ProductResponse> => {
  return request.get(`https://api.practicesoftwaretesting.com/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
