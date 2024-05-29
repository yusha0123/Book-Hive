import axios from "axios";
import { Request, Response } from "express";
import { verifyToken } from "helpers/verifyToken.js";
import Book from "models/book.js";
import { Book as TBook, LoginRequestBody, openIdResponse } from "types.js";
import { keycloakAdmin, keycloakConfig } from "utils/keyCloak.js";

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
    const { isAdmin, error, statusCode } = verifyToken(access_token);

    if (!isAdmin) {
      return res.status(statusCode || 403).json({
        success: false,
        message: error || "Unauthorized access!",
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
  req: Request<{}, {}, TBook>,
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

export const updateBook = async (
  req: Request<{ id: string }, {}, TBook>,
  res: Response
) => {
  const id = req.params.id;

  try {
    const { title, author, genre, price, description, coverUrl } = req.body;

    if (!title || !author || !genre || !price || !description || !coverUrl) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required!",
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, price, genre, description, coverUrl },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    return res.json(book);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID!",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBook = async (
  req: Request<{ id: string }, {}>,
  res: Response
) => {
  const id = req.params.id;
  try {
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    return res.json({ success: true, message: "Book deleted successfully!" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID!",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await keycloakAdmin.users.find({});
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
