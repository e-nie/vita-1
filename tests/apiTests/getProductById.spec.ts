import { test, expect } from '@playwright/test';
import { storeProduct, getProductById } from '../../api/productsApi';

test('get product by id', async ({ request }) => {
  //create new product

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

  //create new product
  const responseNewProduct = await storeProduct(request, payload);
  expect(responseNewProduct.ok()).toBeTruthy();
  
  // get newProductResponseBody
  const responseNewProductBody = await responseNewProduct.json();
  const productId = responseNewProductBody.id;
  console.log('New Product ID:', productId);
  
//get product by id
  const response = await getProductById(request, productId);
  console.log(response);

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
