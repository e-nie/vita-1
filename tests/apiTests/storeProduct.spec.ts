import { test, expect } from '@playwright/test';
import { storeProduct } from '../../api/productsApi';

//todo 
test('verify product stored successfully', async ({ request }) => {
  const payload = {
    "name": "YO-1 Product",
    "description": "test",
    "price": 1.99,
    "category_id": "01JSYEKHEE2M0GZ827NNWTDPGQ",
    "brand_id": "01JSYEKHCR378XGRYYK40F0AVW",
    "product_image_id": "01JSYEKHF0SSC1XT0R7W3K0BTF",
    "is_location_offer": true,
    "is_rental": false
  }

  //"id": "01JSYEKHFV3WXEE4QQBV6SEGDY",

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


