import { test, expect } from '@playwright/test';
import { storeProduct, getProductById } from '../../api/productsApi';

test('get product by id', async ({ request }) => {

  //create new product
  const payload = {
    "name": "YO Product",
    "description": "test",
    "price": 1.99,
    "category_id": "01JSYEKHEE2M0GZ827NNWTDPGQ",
    "brand_id": "01JSYEKHCR378XGRYYK40F0AVW",
    "product_image_id": "01JSYEKHF0SSC1XT0R7W3K0BTG",
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

  const responseBody = await response.json();// do i need to list all unnoetiged fields here?
  const validationData = {
    id: responseBody.id,
    name: responseBody.name,
    description: responseBody.description,
    price: responseBody.price,
    is_location_offer: responseBody.is_location_offer,
    is_rental: responseBody.is_rental,
    in_stock: responseBody.in_stock,
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

//todo
  expect(validationData.id).toEqual(productId);

  expect(validationData.name).toBe(payload.name);
  expect(validationData.description).toBe(payload.description);
  expect(validationData.price).toBe(payload.price);
  expect(validationData.category.id).toBe(payload.category_id);
  expect(validationData.brand.id).toBe(payload.brand_id);
  expect(validationData.product_image.id).toBe(payload.product_image_id);
  expect(validationData.is_location_offer).toBe(payload.is_location_offer);
  expect(validationData.is_rental).toBe(payload.is_rental);



});
