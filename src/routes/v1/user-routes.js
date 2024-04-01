import express from "express";
import { UserController } from "../../controllers/index.js";
import { AuthMiddleware } from "../../middlewares/index.js";

const router = express.Router();
/**
 * POST
 * Request body:
 * {
 * name: "John Doe"
 * email:"jhon@gmail.com"
 * password:"JhonD@123"
 * mobileNumber:"9856307197"
 * }
 */
router.post(
  "/sign-up",
  AuthMiddleware.validateUserRegisterRequest,
  UserController.registerUser
);


/**
 * POST
 * Request body
 * {
 * email: "jhon@gmail.com"
 * password:"JhonD@123"
 * }
 */
router.post(
  "/sign-in",
  AuthMiddleware.validateAuthRequest,
  UserController.login
);

export default router;
