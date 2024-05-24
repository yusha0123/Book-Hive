import { createOrder, getOrders } from "../controllers/order.controllers";
import { Router } from "express";

export default (router: Router) => {
  router.post("/orders", createOrder);
  router.post("/orders", getOrders);
};
