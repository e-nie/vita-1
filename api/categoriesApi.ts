
export const getAllCategories = async (request) => {
    return request.get('https://api.practicesoftwaretesting.com/categories', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }