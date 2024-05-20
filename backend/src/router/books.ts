import { createBook, getBooks } from "../controllers/book.controllers";
import { Router } from "express";

export default (router: Router) => {
  router.get("/books", getBooks);
  router.post("/books", createBook);
};
