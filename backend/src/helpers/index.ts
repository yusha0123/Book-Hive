import jwt from "jsonwebtoken";
import { TokenPayload } from "types.js";

export const verifyToken = (
  accessToken: string
): {
  decodedToken: TokenPayload | null;
  error: string | null;
} => {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEY_CLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  try {
    const decodedToken = jwt.verify(accessToken, publicKey, {
      algorithms: ["RS256"],
    }) as TokenPayload;

    return { decodedToken, error: null };
  } catch (error) {
    return {
      error: "Invalid or expired token. Please log in again.",
      decodedToken: null,
    };
  }
};

export const isAdminUser = (decodedToken: TokenPayload | null): boolean => {
  return decodedToken?.realm_access?.roles.includes("admin") ?? false;
};
