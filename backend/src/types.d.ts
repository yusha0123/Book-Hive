import { Types } from "mongoose";

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type OrderItem = {
  book: Types.ObjectId;
  qty: number;
  price: number;
};

type OrderRequestBody = {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
};

type CreateBookRequestBody = {
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  coverUrl: string;
};
