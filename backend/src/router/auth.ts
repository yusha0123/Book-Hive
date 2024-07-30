import { login, refreshToken, register, verifyOtp } from "controllers/auth.js";
import { Router } from "express";
import { authKcAdmin } from "middlewares/authKcAdmin.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", authKcAdmin, register);
authRouter.post("/refresh", refreshToken);
authRouter.post("/verify-otp", authKcAdmin, verifyOtp)

export default authRouter;
