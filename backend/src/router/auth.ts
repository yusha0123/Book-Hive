import { login, register } from "controllers/auth.js";
import { Router } from "express";
import { authKcAdmin } from "middlewares/authKcAdmin.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", authKcAdmin, register);

export default authRouter;
