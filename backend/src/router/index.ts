import { Router } from "express";
import authRouter from "./auth.js";
import booksRouter from "./books.js";
import orderRouter from "./order.js";
import adminRouter from "./admin.js";
import cartRouter from "./cart.js";

const router = Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/orders", orderRouter);
router.use("/cart", cartRouter);

export default router;
