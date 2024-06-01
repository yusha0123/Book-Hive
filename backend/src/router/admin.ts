import {
  createBook,
  deleteBook,
  getUsers,
  loginAdmin,
  updateBook,
} from "controllers/admin.js";
import { getBooks } from "controllers/book.js";
import { Router } from "express";
import { authKcAdmin } from "middlewares/authKcAdmin.js";
import { isAdmin } from "middlewares/isAdmin.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.route("/books").get(isAdmin, getBooks).post(isAdmin, createBook);
adminRouter
  .route("/books/:id")
  .put(isAdmin, updateBook)
  .delete(isAdmin, deleteBook);
adminRouter.get("/users", isAdmin, authKcAdmin, getUsers);

export default adminRouter;
