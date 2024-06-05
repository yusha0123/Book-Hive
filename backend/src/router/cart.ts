import { addToCart, getCartItems } from "controllers/cart.js";
import { Router } from "express";
import { authKcUser } from "middlewares/authKcUser.js";

const cartRouter = Router();

cartRouter.route("/").post(authKcUser, addToCart).get(authKcUser, getCartItems);

export default cartRouter;
