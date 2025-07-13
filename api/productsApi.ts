import { APIRequestContext, APIResponse } from '@playwright/test';
import { ProductPayload } from '../types/types';
import { Brand, Category, ProductImage } from './requestTypes';



export type ProductResponseData = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: number;  // Note: API returns numbers instead of booleans
  is_rental: number;          // Note: API returns numbers instead of booleans
  in_stock: number;           // Note: API returns numbers instead of booleans
  brand: Brand
  category: Category;
  product_image:ProductImage
};

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
