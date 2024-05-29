import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  CreateBookRequestBody,
  LoginRequestBody,
  openIdResponse,
  TokenPayload,
} from "types.js";
import { keycloakConfig } from "utils/keyCloak.js";
import Book from "models/book.js";

const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEY_CLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

export const loginAdmin = async (
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
    const { access_token } = response.data as openIdResponse;
    //decode the access token
    const decodedToken = jwt.verify(access_token, publicKey, {
      algorithms: ["RS256"],
    });

    const { realm_access } = decodedToken as TokenPayload;
    //check if the access token has admin as a payload
    const isAdmin = realm_access?.roles.includes("admin");
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden: You are not an admin!",
      });
    }

    return res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        res.status(401).json({
          success: false,
          message: "Invalid user credentials!",
        });
      } else {
        console.log(error.response.data);
        res.status(error.response.status).json({
          success: false,
          message:
            error.response.data.error_description || "Something went wrong!",
        });
      }
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  }
};

export const createBook = async (
  req: Request<{}, {}, CreateBookRequestBody>,
  res: Response
) => {
  try {
    const { title, author, genre, price, description, coverUrl } = req.body;

    if (!title || !author || !genre || !price || !description || !coverUrl) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required!",
      });
    }

    const book = await Book.create({
      title,
      description,
      genre,
      price,
      author,
      coverUrl,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
