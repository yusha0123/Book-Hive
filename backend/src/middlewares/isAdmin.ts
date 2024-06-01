import { Request, Response, NextFunction } from "express";
import { verifyToken } from "helpers/verifyToken.js";

interface CustomRequest extends Request {
  user?: {
    name?: string;
    email?: string;
    username?: string;
  };
}

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message:
        "Access Denied: You need to be authorized to access this resource!",
    });
  }

  try {
    token = token.split(" ")[1];
    const { isAdmin, decodedToken, statusCode, error } = verifyToken(token);
    if (!isAdmin) {
      return res.status(statusCode).json({
        success: false,
        message: error,
      });
    }

    if (!req.user) {
      req.user = {};
    }

    req.user.name = decodedToken?.name;
    req.user.email = decodedToken?.email;
    req.user.username = decodedToken?.preferred_username;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};
