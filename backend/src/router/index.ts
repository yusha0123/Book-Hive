import { Router } from "express";
import books from "./books";
import order from "./order";

const router = Router();

export default (): Router => {
  books(router);
  order(router);
  return router;
};
