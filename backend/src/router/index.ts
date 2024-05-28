import { Router } from "express";
import authRouter from "./auth.js";
import booksRouter from "./books.js";
import orderRouter from "./order.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/orders", orderRouter);

export default router;
