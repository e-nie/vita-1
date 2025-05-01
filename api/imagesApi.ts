export const getAllImages = async (request) => {
    return request.get('https://api.practicesoftwaretesting.com/images', {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        },
    });
    }