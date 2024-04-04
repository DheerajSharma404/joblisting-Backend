import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { UserValidations } from "../validators/index.js";
const userService = new UserService();

const validateUserRegisterRequest = (req, res, next) => {
  console.log(req.body);
  const validationResult =
    UserValidations.userRegisterValidationSchema.safeParse(req.body);
  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while Authenticating user.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const validateAuthRequest = (req, res, next) => {
  const validationResult = UserValidations.userLoginValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while Authenticating user.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const checkAuth = async (req, res, next) => {
  try {
    const response = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.userId = response;
      next();
    }
  } catch (error) {
    
    return res.status(error.statusCode).json(error);
  }
};

export default {
  validateAuthRequest,
  validateUserRegisterRequest,
  checkAuth,
};
