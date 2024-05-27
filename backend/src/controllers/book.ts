import { Request, Response } from "express";
import { CreateBookRequestBody } from "types";
import { Types } from "mongoose";
import Book from "../models/book";

export const createBook = async (
  req: Request<{}, {}, CreateBookRequestBody>,
  res: Response
) => {
  try {
    const { title, author, genre, price, description, coverUrl } = req.body;

    if (!title || !author || !genre || !price || !description || !coverUrl) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required!",
      });
    }

    const book = await Book.create({
      title,
      description,
      genre,
      price,
      author,
      coverUrl,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
