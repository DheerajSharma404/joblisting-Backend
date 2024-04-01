import { StatusCodes } from "http-status-codes";
import { JobService } from "../services/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app-error.js";
import { JobValidations } from "../validators/index.js";
const jobService = new JobService();

const validateJobPostRequest = (req, res, next) => {
  const validationResult = JobValidations.jobPostValidationSchema.safeParse(
    req.body
  );
  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while validating Job";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

export default {
  validateJobPostRequest,
};
