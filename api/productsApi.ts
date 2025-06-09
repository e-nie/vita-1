import { APIRequestContext, APIResponse } from "@playwright/test";
import { ProductPayload } from "../types/types";

interface ProductResponse extends APIResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}



export const storeProduct = async (request:APIRequestContext, payload: ProductPayload) => {
  return request.post('https://api.practicesoftwaretesting.com/products', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export const getProductById = async (request: APIRequestContext, id:number) => {
  return request.get(`https://api.practicesoftwaretesting.com/products/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

 