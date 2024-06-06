import { Request, Response } from "express";
import Order from "models/order.js";
import { OrderRequestBody, User } from "types.js";

export const createOrder = async (
  req: Request<{}, {}, OrderRequestBody> & { user?: User },
  res: Response
) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items are required!" });
    }

    if (!shippingAddress || !totalPrice) {
      return res.status(400).json({ message: "All the fields are required!" });
    }

    const order = await Order.create({
      orderedBy: req.user?.email,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("orderItems.book");
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
