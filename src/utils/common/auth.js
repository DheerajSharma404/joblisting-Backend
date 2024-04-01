import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ServerConfig } from "../../config/index.js";

const checkPassword = (plainPasswrod, encryptedPassword) => {
  try {
    return bcrypt.compareSync(plainPasswrod, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createToken = (input) => {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  checkPassword,
  createToken,
  verifyToken,
};
