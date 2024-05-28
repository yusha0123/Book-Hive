import { Request, Response, NextFunction } from "express";
import { keycloakAdmin, keycloakConfig } from "utils/keyCloak.js";

export const authKcAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await keycloakAdmin.auth({
      grantType: "client_credentials",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
    });

    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate with Keycloak!" });
  }
};
