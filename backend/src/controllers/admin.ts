import { Request, Response } from "express";
import { isAdminUser, verifyToken } from "helpers/index.js";
import { nodeCache } from "index.js";
import Book from "models/book.js";
import { LoginRequestBody, Book as TBook } from "types.js";
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
    await keycloakAdmin.auth({
      grantType: "password",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      username: username,
      password: password,
    });
    const { accessToken, refreshToken } = keycloakAdmin;

    const { decodedToken } = verifyToken(accessToken);

    if (!isAdminUser(decodedToken)) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden: You are not an Admin!",
      });
    }

    return res.json({
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
    let users;

    if (nodeCache.has("users")) {
      users = JSON.parse(nodeCache.get("users"));
    } else {
      users = await keycloakAdmin.users.find({});
      nodeCache.set("users", JSON.stringify(users));
    }

    res.json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
