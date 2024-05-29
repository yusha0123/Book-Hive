import { Request, Response } from "express";
import Book from "models/book.js";
import { Types } from "mongoose";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const book = await Book.findById(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
