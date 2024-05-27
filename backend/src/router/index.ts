import { Router } from "express";
import booksRouter from "./books";
import orderRouter from "./order";

const router = Router();

router.use("/books", booksRouter);
router.use("/orders", orderRouter);

export default router;
