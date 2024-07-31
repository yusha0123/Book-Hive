import axios from "axios";
import { Request, Response } from "express";
import { generateOtp, refreshUser, verifyToken } from "helpers/index.js";
import { nodeCache } from "index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import emailTemplate from "templates/emailTemplate.js";
import {
  LoginRequestBody,
  RegisterRequestBody,
  UserAttributes,
} from "types.js";
import { keycloakAdmin, keycloakConfig } from "utils/keyCloak.js";

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required!",
    });
  }

  try {
    const usernameUsers = await keycloakAdmin.users.find({
      username,
    });

    if (usernameUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    }

    const emailUsers = await keycloakAdmin.users.find({
      email,
    });

    if (emailUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const newUser = await keycloakAdmin.users.create({
      username,
      email,
      firstName,
      lastName,
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
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required!",
    });
  }

  try {
    await keycloakAdmin.auth({
      grantType: "password",
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      username,
      password,
    });

    const { accessToken, refreshToken } = keycloakAdmin;
    const { decodedToken } = verifyToken(accessToken);

    const userId = decodedToken?.sub;
    const email = decodedToken?.email;

    if (userId && email) {
      const otp = generateOtp();

      const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      await keycloakAdmin.auth({
        grantType: "client_credentials",
        clientId: keycloakConfig.clientId,
        clientSecret: keycloakConfig.clientSecret,
      });

      const attributes: UserAttributes = {
        otp,
        refresh_token: refreshToken,
      };

      await keycloakAdmin.users.update(
        { id: userId },
        {
          attributes: attributes,
          //This step is mandatory since keycloak automatically clears other fields on update
          email,
          firstName: decodedToken?.given_name,
          lastName: decodedToken?.family_name,
        }
      );

      const temp_token = jwt.sign(
        {
          userId,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5m",
        }
      );

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        html: emailTemplate(otp),
      };

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        temp_token,
        message: "OTP sent to your email!",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({
          success: false,
          message: "Invalid user credentials!",
        });
      } else {
        return res.status(error.response?.status).json({
          success: false,
          message:
            error.response.data?.error_description || "Something went wrong!",
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

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required!",
    });
  }

  try {
    const data = await refreshUser(refreshToken);

    res.json(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 400 &&
        error.response.data.error === "invalid_grant"
      ) {
        res.status(400).json({ message: "Invalid refresh token!" });
      } else {
        res.status(error.response.status).json({
          message:
            error.response?.data?.error_description || "An error occurred!",
        });
      }
    } else {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  }
};

export const verifyOtp = async (
  req: Request<{}, {}, { otp: string; temp_token: string }>,
  res: Response
) => {
  const { otp, temp_token } = req.body;

  if (!otp || !temp_token) {
    res.status(400).json({
      success: false,
      message: "Otp or Token is missing!",
    });
  }

  try {
    const token = jwt.verify(
      temp_token,
      process.env.JWT_SECRET_KEY
    ) as JwtPayload & { userId: string };

    const userId = token.userId;
    const user = await keycloakAdmin.users.findOne({ id: userId });

    const attributes = user?.attributes as UserAttributes;

    if (
      attributes?.otp === undefined ||
      attributes?.refresh_token === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please login and request an OTP first!",
      });
    }

    if (Number(attributes.otp) === Number(otp)) {
      await keycloakAdmin.users.update(
        { id: userId },
        {
          attributes: {
            otp: undefined,
            refresh_token: undefined,
          },
          //This step is mandatory since keycloak automatically clears other fields on update
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      );

      const { refresh_token, access_token } = await refreshUser(
        attributes.refresh_token
      );

      res.json({
        success: true,
        message: "Logged in successfully!",
        access_token,
        refresh_token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }
  } catch (error) {
    if (error instanceof Error && error.message === "jwt expired") {
      //If the token is expired that means the OTP is also expired
      return res.status(401).json({
        success: false,
        message: "OTP has expired, Please request a new One.",
      });
    } else if (error?.message) {
      const msg = error.message as string;
      return res.status(400).json({
        success: false,
        message: `${msg.charAt(0).toUpperCase()}${msg.slice(1)}!`,
      });
    }
    console.error("Failed to Verify OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
