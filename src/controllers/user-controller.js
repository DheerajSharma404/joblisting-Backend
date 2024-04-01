import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const userService = new UserService();

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    SuccessResponse.message = "User Successfully register";
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    SuccessResponse.message = "Successfully Logged in.";
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export default {
  registerUser,
  login,
};
