const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

export const registerUser = async (request, payload) => {
    return request.post('https://api.practicesoftwaretesting.com/users/register', {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
};


