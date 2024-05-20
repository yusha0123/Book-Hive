import { Router } from "express";
import books from "./books";

const router = Router();

export default (): Router => {
  books(router);
  return router;
};
