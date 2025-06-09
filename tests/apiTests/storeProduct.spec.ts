import { test, expect, APIRequestContext } from '@playwright/test';
import { storeProduct } from '../../api/productsApi';
import { getAllCategories } from '../../api/categoriesApi';
import { getAllBrands } from '../../api/brandsApi';
import { getAllImages } from '../../api/imagesApi';
import { describe } from 'node:test';
import { ProductPayload } from '../../types/types';

describe('Store Product API Tests', () => {
  describe('Store Product API - POSITIVE', () => {
    test('verify product stored successfully', async ({ request }) => {
      //getCategoryId
      const responseCategories = await getAllCategories(request);
      const responseCategoriesBody = await responseCategories.json();
      //console.log('responseCategoriesBody:', responseCategoriesBody);
      const categoryId = responseCategoriesBody[0].id;

      //getBrandId
      const responseBrands = await getAllBrands(request);
      const responseBrandsBody = await responseBrands.json();
      const brandId = responseBrandsBody[0].id;

      //getImageId
      const responseImages = await getAllImages(request);
      const responseImagesBody = await responseImages.json();
      const imageId = responseImagesBody[0].id;

      function generateRandomProductName() {
        const timestamp = Date.now(); // Get current timestamp
        return `Product name: ${timestamp}`;
      }

      const randomProductName = generateRandomProductName();
      //create new product
      const payload: ProductPayload = {
        name: randomProductName,
        description: 'test',
        price: 1.99,
        category_id: categoryId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: true,
        is_rental: false,
      };

      //create new product
      const response = await storeProduct(request, payload);
      expect(response.ok()).toBeTruthy(); //status code 200 - 299

      // get newProductResponseBody
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);

      // Create validation data from the response body
      const validationData = {
        name: responseBody.name,
        description: responseBody.description,
        price: responseBody.price,
        is_location_offer: responseBody.is_location_offer,
        is_rental: responseBody.is_rental,
        category_id: responseBody.category.id,
        brand_id: responseBody.brand.id,
        product_image_id: responseBody.product_image.id,
      };

      // Check that all fields from payload exist in the response (with appropriate nesting)
      expect(validationData).toMatchObject(payload);
      // Check that the response contains the expected fields
      expect(validationData.name).toBe(payload.name);
      expect(validationData.description).toBe(payload.description);
      expect(validationData.price).toBe(payload.price);
      expect(validationData.category_id).toBe(payload.category_id);
      expect(validationData.brand_id).toBe(payload.brand_id);
      expect(validationData.product_image_id).toBe(payload.product_image_id);
      expect(validationData.is_location_offer).toBe(payload.is_location_offer);
      expect(validationData.is_rental).toBe(payload.is_rental);
    });
  });


  //‼️-------PARAMETRISATION!!!!-----------------

  describe('Store Product API - NEGATIVE', () => {
    [
      { categoryId: 'WrongCategoryId', errorMessage: 'Something went wrong' },
      { categoryId: 12345, errorMessage: 'Something went wrong' },
     
    ].forEach(({ categoryId, errorMessage }) => {
      test(`verify cannot store product with wrong category id type with ${categoryId}`, async ({ request }) => {
        //getBrandId
        const responseBrands = await getAllBrands(request);
        const responseBrandsBody = await responseBrands.json();
        const brandId = responseBrandsBody[0].id;
        //getImageId
        const responseImages = await getAllImages(request);
        const responseImagesBody = await responseImages.json();
        const imageId = responseImagesBody[0].id;
  
        function generateRandomProductName() {
          const timestamp = Date.now(); // Get current timestamp
          return `Product name: ${timestamp}`;
        }
  
        const randomProductName = generateRandomProductName();
        //create new product
        const payload = {
          name: randomProductName,
          description: 'test',
          price: 1.99,
          category_id: categoryId,
          brand_id: brandId,
          product_image_id: imageId,
          is_location_offer: true,
          is_rental: false,
        };
  
        //create new product
        const response = await storeProduct(request, payload);
        expect(response.status()).toBe(500); 
        //get response body
        const responseBody = await response.json();
        console.log('Response Body:', responseBody);
        expect(responseBody.message).toEqual(errorMessage);
      });   
    });    
  });
});
