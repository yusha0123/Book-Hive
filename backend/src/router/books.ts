import {
  createBook,
  getBooks,
  getSingleBook,
} from "../controllers/book.controllers";
import { Router } from "express";

export default (router: Router) => {
  router.get("/books", getBooks);
  router.post("/books", createBook);
  router.get("/books/:id", getSingleBook);
};
