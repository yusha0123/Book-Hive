import { createOrder, getOrders } from "controllers/order.js";
import { Router } from "express";
import { authKcUser } from "middlewares/authKcUser.js";

const orderRouter = Router();

orderRouter.post("/", authKcUser, createOrder);
orderRouter.get("/", authKcUser, getOrders);

export default orderRouter;
