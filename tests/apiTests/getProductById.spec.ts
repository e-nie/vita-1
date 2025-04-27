import { test, expect } from '@playwright/test';
import { getProductById } from '../../api/productsApi';

test('get product by id', async ({ request }) => {
  // const id = '01jsw9b72rwcs28474ha1ca78b';
  const response = await getProductById(request);
  console.log(response);

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const validationData = {
    id: responseBody.id,
    name: responseBody.name,
    description: responseBody.description,
    price: responseBody.price,
    product_image: {
      id: responseBody.product_image.id,
      by_name: responseBody.product_image.by_name,
      by_url: responseBody.product_image.by_url,
      source_name: responseBody.product_image.source_name,
      source_url: responseBody.product_image.source_url,
      file_name: responseBody.product_image.file_name,
      title: responseBody.product_image.title,
    },
    category: {
      id: responseBody.category.id,
      parent_id: responseBody.category.parent_id,
      name: responseBody.category.name,
      slug: responseBody.category.slug,
    },
    brand: {
      id: responseBody.brand.id,
      name: responseBody.brand.name,
      slug: responseBody.brand.slug,
    },
  };

  console.log('Response Body:', responseBody);
  expect(validationData.id).toEqual('01jsw9b72rwcs28474ha1ca78b');
});
