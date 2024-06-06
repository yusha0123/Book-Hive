import { NextFunction, Request, Response } from "express";
import { verifyToken } from "helpers/index.js";

export const authKcUser = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message:
        "Access Denied: You need to be authorized to access this resource!",
    });
  }
  try {
    token = token.split(" ")[1];
    const { decodedToken, error } = verifyToken(token);

    if (error) {
      return res.status(401).json({
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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
