export interface Book {
  _id?: string;
  title: string;
  coverUrl: string;
  description: string;
  price: number;
  author: string;
  genre: string;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Order {
  orderItems: CartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
}
