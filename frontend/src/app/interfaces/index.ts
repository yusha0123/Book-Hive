export interface User {
  access_token: string;
  refresh_token: string;
  name: string;
  email: string;
}

export interface Book {
  _id?: string;
  title: string;
  coverUrl: string;
  description: string;
  price: number;
  author: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface UserCart {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
  __v?: number;
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
