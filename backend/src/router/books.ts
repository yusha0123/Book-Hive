import { createBook, getBooks, getSingleBook } from "controllers/book.js";
import { Router } from "express";

const booksRouter = Router();

booksRouter.get("/", getBooks);
booksRouter.post("/", createBook);
booksRouter.get("/:id", getSingleBook);

export default booksRouter;
