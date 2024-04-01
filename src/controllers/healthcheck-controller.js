import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/common/index.js";

const healthcheck = (req, res) => {
  SuccessResponse.message = "API is live!";
  return res.status(StatusCodes.OK).json(SuccessResponse);
};

export default {
  healthcheck,
};
