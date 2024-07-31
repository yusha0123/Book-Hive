import axios from "axios";
import jwt from "jsonwebtoken";
import { RefreshTokenResponse, TokenPayload } from "types.js";
import { keycloakConfig } from "utils/keyCloak.js";

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

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const refreshUser = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realmName}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
