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

export interface OrderItem {
  book: string;
  qty: number;
}

export interface Order {
  _id?: string;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
}

export interface LoginResponse {
  access_token: string;
  expires_in: string;
  refresh_expires_in: string;
  refresh_token: string;
  token_type: string;
  'not-before-policy': string;
  session_state: string;
  scope: string;
  name: string;
  email: string;
}

export interface User {
  access_token: string;
  refresh_token: string;
  name: string;
  email: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  email: string;
  firstname: string;
  lastname: string;
}
