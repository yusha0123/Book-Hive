import { Request, Response } from "express";
import Cart from "models/cart.js";
import Order from "models/order.js";
import mongoose from "mongoose";
import { OrderRequestBody } from "types.js";

export const createOrder = async (
  req: Request<{}, {}, OrderRequestBody>,
  res: Response
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items are required!" });
    }

    if (!shippingAddress || !totalPrice) {
      return res.status(400).json({ message: "All the fields are required!" });
    }

    const order = await Order.create(
      [
        {
          orderedBy: req.user?.email,
          orderItems,
          shippingAddress,
          totalPrice,
        },
      ],
      {
        session,
      }
    );

    await Cart.deleteMany({ owner: req.user?.email }, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
