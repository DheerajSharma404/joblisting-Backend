import bycrpt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { ServerConfig } from "../config/index.js";
import { UserRepository } from "../repositories/index.js";
import Auth from "../utils/common/auth.js";
import AppError from "../utils/error/app-error.js";

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async registerUser(data) {
    try {
      const { email, password } = data;
      const isExistingUser = await this.UserRepository.getUserByEmail(email);
      if (isExistingUser) {
        throw new AppError("Email is already exists", StatusCodes.CONFLICT);
      }
      const hashedPassword = await bycrpt.hash(
        password,
        parseInt(ServerConfig.SALT_ROUNDS)
      );
      const user = {
        ...data,
        password: hashedPassword,
      };

      const newUser = await this.UserRepository.create(user);
      return newUser;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(data) {
    try {
      const { email, password } = data;
      const user = await this.UserRepository.getUserByEmail(email);
      if (!user) {
        throw new AppError("User does not exist", StatusCodes.UNAUTHORIZED);
      }
      const passwordMatch = Auth.checkPassword(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Invalid Credential", StatusCodes.UNAUTHORIZED);
      }
      const jwt = Auth.createToken({ id: user._id, email: user.email });
      return jwt;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isAuthenticated(token) {
    try {
      if (!token) {
        throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
      }
      const response = Auth.verifyToken(token);
      const user = await this.UserRepository.get(response.id);
      if (!user) {
        throw new AppError("No user found", StatusCodes.BAD_REQUEST);
      }
      return user._id;
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invaid JWT Token", StatusCodes.BAD_REQUEST);
      }
      if (error.name === "TokenExpiredError") {
        throw new AppError("JWT token expired", StatusCodes.BAD_REQUEST);
      }
      console.log(error);
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default UserService;
