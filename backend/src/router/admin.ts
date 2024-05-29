import { loginAdmin } from "controllers/admin.js";
import { Router } from "express";
// import { authKcAdmin } from "middlewares/authKcAdmin.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);

export default adminRouter;
