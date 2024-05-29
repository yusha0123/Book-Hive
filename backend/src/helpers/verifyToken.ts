import jwt from "jsonwebtoken";
import { TokenPayload } from "types.js";

export const verifyToken = (
  accessToken: string
): {
  isAdmin: boolean;
  decodedToken?: TokenPayload;
  error?: string;
  statusCode?: number;
} => {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEY_CLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  try {
    const decodedToken = jwt.verify(accessToken, publicKey, {
      algorithms: ["RS256"],
    }) as TokenPayload;

    const isAdmin = decodedToken.realm_access?.roles.includes("admin");

    if (!isAdmin) {
      return {
        isAdmin: false,
        error: "Access forbidden: You are not an Admin!",
        statusCode: 403,
      };
    }

    return { isAdmin: true, decodedToken };
  } catch (error) {
    return { isAdmin: false, error: "Invalid Token!", statusCode: 401 };
  }
};
