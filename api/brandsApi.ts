export const getAllBrands = async (request) => {
    return request.get('https://api.practicesoftwaretesting.com/brands', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }