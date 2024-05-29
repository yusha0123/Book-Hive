import {
  createBook,
  deleteBook,
  getUsers,
  loginAdmin,
  updateBook,
} from "controllers/admin.js";
import { Router } from "express";
import { authKcAdmin } from "middlewares/authKcAdmin.js";
import { isAdmin } from "middlewares/isAdmin.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/books", isAdmin, createBook);
adminRouter.put("/books/:id", isAdmin, updateBook);
adminRouter.delete("/books/:id", isAdmin, deleteBook);
adminRouter.get("/users", isAdmin, authKcAdmin, getUsers);

export default adminRouter;
