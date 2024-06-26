import axios from "axios";
import { Request, Response } from "express";
import { verifyToken } from "helpers/index.js";
import { nodeCache } from "index.js";
import { LoginRequestBody, RegisterRequestBody } from "types.js";
import { keycloakAdmin, keycloakConfig } from "utils/keyCloak.js";

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required!",
    });
  }

  try {
    const newUser = await keycloakAdmin.users.create({
      username: username,
      email: email,
      firstName: firstname,
      lastName: lastname,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
      emailVerified: true,
    });
    nodeCache.del("users");
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "All the fields are required!",
    });
  }

  try {
    await keycloakAdmin.auth({
      grantType: "password",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      username: username,
      password: password,
    });

    const { accessToken, refreshToken } = keycloakAdmin;

    const { decodedToken } = verifyToken(accessToken);

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      name: decodedToken?.name,
      email: decodedToken?.email,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({
          success: false,
          message: "Invalid user credentials!",
        });
      } else {
        return res.status(error.response.status).json({
          success: false,
          message:
            error.response.data.error_description || "Something went wrong!",
        });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
};

export const refreshToken = async (
  req: Request<{}, {}, { refreshToken: string }>,
  res: Response
) => {
  const { refreshToken } = req.body;
  try {
    const { data } = await axios.post(
      `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realmName}/protocol/openid-connect/token`,
      {
        grant_type: "refresh_token",
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Failed to refresh token:", error);
    res.status(500).json({ error: "Failed to refresh token!" });
  }
};
