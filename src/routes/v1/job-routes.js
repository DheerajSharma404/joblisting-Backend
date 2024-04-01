import express from "express";
import { JobController } from "../../controllers/index.js";
import { AuthMiddleware, JobMiddleware } from "../../middlewares/index.js";
const router = express.Router();

router.get("/", JobController.getAllJobs);
router.get("/:jobId", JobController.getJobDetailsById);
router.post(
  "/",
  AuthMiddleware.checkAuth,
  JobMiddleware.validateJobPostRequest,
  JobController.createJobPost
);
router.put(
  "/:jobId",
  AuthMiddleware.checkAuth,
  JobMiddleware.validateJobPostRequest,
  JobController.updateJobDetaileById
);
router.delete(
  "/:jobId",
  AuthMiddleware.checkAuth,
  JobController.deleteJobById
);

export default router;
