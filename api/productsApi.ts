export const registerUser = async (request, payload) => {
  return request.post('https://api-v1.practicesoftwaretesting.com/products', {
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
