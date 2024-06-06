import { Request, Response } from "express";
import Cart from "models/cart.js";
import { Types } from "mongoose";
import { User } from "types.js";

interface CustomRequest extends Request {
  user?: User;
}

interface UpdateCartRequest extends CustomRequest {
  body: {
    bookId: string;
  };
  query: {
    action: "increment" | "decrement" | "remove";
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

export const updateCartItem = async (req: UpdateCartRequest, res: Response) => {
  const { action } = req.query;
  const { bookId } = req.body;

  let message;

  try {
    let cart = await Cart.findOne({ owner: req.user.email });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    if (!bookId || !Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID!" });
    }

    const existingCartItemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (existingCartItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart!" });
    }

    switch (action) {
      case "increment":
        cart.items[existingCartItemIndex].quantity += 1;
        message = "Item quantity increased!";
        break;

      case "decrement":
        if (cart.items[existingCartItemIndex].quantity > 1) {
          cart.items[existingCartItemIndex].quantity -= 1;
          message = "Item quantity decreased!";
        } else {
          return res.status(400).json({
            success: false,
            message: "Cannot decrement quantity below 1",
          });
        }
        break;

      case "remove":
        cart.items.splice(existingCartItemIndex, 1);
        message = "Item removed from cart!";
        break;

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid action" });
    }

    await cart.save();

    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
