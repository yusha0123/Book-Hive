import { createOrder, getOrders } from "../controllers/order";
import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);

export default orderRouter;
