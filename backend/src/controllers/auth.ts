import { Request, Response } from "express";
import axios from "axios";
import { LoginRequestBody, RegisterRequestBody } from "types.js";
import { keycloakAdmin, keycloakConfig } from "utils/keyCloak.js";

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {
    res.status(400).json({
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
    });
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
    const response = await axios.post(
      `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realmName}/protocol/openid-connect/token`,
      {
        grant_type: "password",
        client_id: keycloakConfig.clientId,
        client_secret: keycloakConfig.clientSecret,
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
