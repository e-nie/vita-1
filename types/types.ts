
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

type ID = string | number;

export type ProductPayload = {
  name: string;
  description: string;
  price: number;
  category_id: ID;
  brand_id: ID;
  product_image_id: ID;
  is_location_offer: boolean;
  is_rental: boolean;
};