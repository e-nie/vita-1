import { test, expect } from '@playwright/test';
import { storeProduct } from '../../api/productsApi';

//todo 
test('verify product stored successfully', async ({ request }) => {
  const payload = {
    "name": "VeryNEw Product",
    "description": "test",
    "price": 1.99,
    "category_id": "01JSWGT172Q8AAFDWX4WN11VRM",
    "brand_id": "01JSWGT15NA87EH2KSN0JYSB3E",
    "product_image_id": "01JSWGT17GPGHC4BEQ9JSJ9ER0",
    "is_location_offer": true,
    "is_rental": false
  }

  const response = await storeProduct(request, payload);

  // Log detailed error information
  if (!response.ok()) {
    console.log('Status:', response.status());
    console.log('Status Text:', response.statusText());
    const errorBody = await response.text();
    console.log('Error Body:', errorBody);
  }

  expect(response.ok()).toBeTruthy(); //status code 200 - 299

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
    product_image_id: responseBody.product_image.id
  };
  
  // Check that all fields from payload exist in the response (with appropriate nesting)
  expect(validationData).toMatchObject(payload);
});


