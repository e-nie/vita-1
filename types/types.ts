
export type User = {
    firstName: string;
    lastName: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
    };
    phone: string;
    dob: string;
    password: string;
    email: string;
    id?: string;
}

export type CardType ={
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
}


export type ProductPayload = {
  name: string;
  description: string;
  price: number;
  category_id: string;
  brand_id: string;
  product_image_id: string;
  is_location_offer: boolean;
  is_rental: boolean;
};

export type ProductResponseData = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_location_offer: number;  // Note: API returns numbers instead of booleans
  is_rental: number;          // Note: API returns numbers instead of booleans
  in_stock: number;           // Note: API returns numbers instead of booleans
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    parent_id: string;
    name: string;
    slug: string;
    sub_categories: string[];
  };
  product_image: {
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
    id: string;
  };
};

