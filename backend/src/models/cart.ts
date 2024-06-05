import mongoose, { Types } from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    book: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { _id: false } // This ensures that each cart item does not get a separate _id
);

const CartSchema = new mongoose.Schema(
  {
    items: [CartItemSchema],
    owner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
