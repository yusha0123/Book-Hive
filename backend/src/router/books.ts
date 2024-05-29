import { getBooks, getSingleBook } from "controllers/book.js";
import { Router } from "express";

const booksRouter = Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getSingleBook);

export default booksRouter;
