export const storeProduct = async (request, payload) => {
  return request.post('https://api.practicesoftwaretesting.com/products', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export const getProductById = async (request) => {
  return request.get('https://api.practicesoftwaretesting.com/products/01jsw9b72rwcs28474ha1ca78b', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
