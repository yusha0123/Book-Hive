import { Request, Response } from "express";
import Cart from "models/cart.js";

interface CustomRequest extends Request {
  user?: {
    name?: string;
    email?: string;
    username?: string;
  };
}

export const addToCart = async (req: CustomRequest, res: Response) => {
  const { bookId } = req.body;
  let message;
  try {
    let cart = await Cart.findOne({ owner: req.user?.email });
    if (!cart) {
      cart = new Cart({ owner: req.user?.email, items: [] });
    }
    const existingCartItem = cart.items.find(
      (item) => item.book.toString() === bookId
    );
    if (existingCartItem) {
      // If it exists, increment the quantity
      existingCartItem.quantity += 1;
      message = "Item quantity increased!";
    } else {
      // If it does not exist, add a new item
      cart.items.push({ book: bookId, quantity: 1 });
      message = "Item added to cart!";
    }
    await cart.save();

    return res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCartItems = async (req: CustomRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ owner: req.user?.email }).populate(
      "items.book"
    );

    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
