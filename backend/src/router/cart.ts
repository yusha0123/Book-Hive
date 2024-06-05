import { addToCart, getCartItems, updateCartItem } from "controllers/cart.js";
import { Router } from "express";
import { authKcUser } from "middlewares/authKcUser.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .get(authKcUser, getCartItems)
  .post(authKcUser, addToCart)
  .patch(authKcUser, updateCartItem);

export default cartRouter;
