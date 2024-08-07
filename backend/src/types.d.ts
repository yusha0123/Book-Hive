import { Types } from "mongoose";

type User = {
  name?: string;
  email?: string;
  username?: string;
};

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
  user?: User;
};

type Book = {
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  coverUrl: string;
};

type LoginRequestBody = {
  username: string;
  password: string;
};

type RegisterRequestBody = LoginRequestBody & {
  email: string;
  firstName: string;
  lastName: string;
};

interface RealmAccess {
  roles: string[];
}

interface ResourceAccess {
  [key: string]: {
    roles: string[];
  };
}

type TokenPayload = {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

type UserAttributes = {
  otp: string;
  refresh_token: string;
};

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
};
