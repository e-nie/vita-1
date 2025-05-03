import { test, expect } from '@playwright/test';
import { storeProduct, getProductById } from '../../api/productsApi';
import { getAllCategories } from '../../api/categoriesApi';
import { getAllBrands } from '../../api/brandsApi';
import { getAllImages } from '../../api/imagesApi';

test('get product by id -1', async ({ request }) => {
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

  //приводим данные ответа к формату реквеста (аэйлоада)
  const validationData = {
    name: responseBody.name,
    description: responseBody.description,
    price: responseBody.price,
    category_id: responseBody.category.id,
    brand_id: responseBody.brand.id,
    product_image_id: responseBody.product_image.id,
    is_location_offer: responseBody.is_location_offer,
    is_rental: responseBody.is_rental,
  };

  expect(validationData).toEqual(payload);
});

test('get product by id - 2', async ({ request }) => {
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

  const responseNewProduct = await storeProduct(request, payload);

  // get newProductResponseBody
  const responseNewProductBody = await responseNewProduct.json();
  const productId = responseNewProductBody.id;
  console.log('New Product ID:', productId);

  //get product by id
  const response = await getProductById(request, productId);
  console.log(response);

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json(); // do i need to list all unnoetiged fields here?

  //!!!!!!!
  expect(responseBody.id).toEqual(productId);
  expect(responseBody.name).toBe(payload.name);
  expect(responseBody.description).toBe(payload.description);
  expect(responseBody.price).toBe(payload.price);
  expect(responseBody.category.id).toBe(payload.category_id);
  expect(responseBody.brand.id).toBe(payload.brand_id);
  expect(responseBody.product_image.id).toBe(payload.product_image_id);
  expect(responseBody.is_location_offer).toBe(payload.is_location_offer);
  expect(responseBody.is_rental).toBe(payload.is_rental);
});

test('get product by id -3', async ({ request }) => {
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

  //приводим данные запроса к формату ответа (берем ответ из постмана)
  const validationData = {
    name: payload.name,
    description: payload.description,
    price: payload.price,

    is_location_offer: payload.is_location_offer,
    is_rental: payload.is_rental,
    product_image: {
      id: payload.product_image_id,
    },
    category: {
      id: payload.category_id,
    },
    brand: {
      id: payload.brand_id,
    },
  };

  expect(validationData).toMatchObject(responseBody);
});
