import { test, expect } from '@playwright/test';
import { storeProduct, getProductById } from '../../api/productsApi';

test('get product by id', async ({ request }) => {

  //create new product
  const payload = {
    "name": "YO Product",
    "description": "test",
    "price": 1.99,
    "category_id": "01JSWM7ZV98V99WA3X5KTKJXED",
    "brand_id": "01JSWM7ZSS1H9EG3W74Q1X2ZEH",
    "product_image_id": "01JSWM7ZW2R89XDDW1S93TEZ37",
    "is_location_offer": true,
    "is_rental": false
  }

   const responseNewProduct = await storeProduct(request, payload);

  
  // get newProductResponseBody
  const responseNewProductBody = await responseNewProduct.json();
  const productId = responseNewProductBody.id;
  console.log('New Product ID:', productId);
  
//get product by id
  const response = await getProductById(request, productId);
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


  expect(validationData.id).toEqual(productId);
});
