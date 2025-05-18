
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