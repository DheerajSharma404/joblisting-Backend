import bycrpt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { ServerConfig } from "../config/index.js";
import { UserRepository } from "../repositories/index.js";
import Auth from "../utils/common/auth.js";
import AppError from "../utils/error/app-error.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data) {
    try {
      const { email, password } = data;
      const isExistingUser = await this.userRepository.findByEmail(email);
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

      const newUser = await this.userRepository.create(user);
      return newUser;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(data) {
    try {
      const { email, password } = data;
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new AppError("User does not exist", StatusCodes.UNAUTHORIZED);
      }
      const passwordMatch = Auth.checkPassword(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Invalid Credential", StatusCodes.UNAUTHORIZED);
      }
      const jwt = Auth.createToken(user);
      return { token: jwt, ...user };
    } catch (error) {
      if (error instanceof AppError) throw error;
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
      const user = await this.userRepository.get(response.id);
      if (!user) {
        throw new AppError("No user found", StatusCodes.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default UserService;
