import { test, expect } from '@playwright/test';
import { storeProduct } from '../../api/productsApi';

//todo 500 error
test('verify product stored successfully', async ({ request }) => {
  const payload = {
    name: 'Drobilka',
    description: 'test',
    price: 1.99,
    category_id: '01JSW6GDJC8BKGR6SQRACWZHDZ',
    brand_id: '01JSW6GDH35XQ5HKRPD5Q9PKBP',
    product_image_id: '01JSW6GDJWT2V5RKHVT354QVCP',
    is_location_offer: true,
    is_rental: false,
  };

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
  const validationData = {
    name: responseBody.name,
    description: responseBody.description,
    price: responseBody.price,
    category_id: responseBody.category_id,
    brand_id: responseBody.brand_id,
    product_image_id: responseBody.product_image_id,
    is_location_offer: responseBody.is_location_offer,
    is_rental: responseBody.is_rental,
  };

  console.log('Response Body:', responseBody);
  expect(validationData).toMatchObject(payload); //проверь что все поля из payload есть в validationData
});
