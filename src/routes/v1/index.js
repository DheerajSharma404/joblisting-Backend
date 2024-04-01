import express from "express";

import userRoutes from "./user-routes.js";

import { HealthCheckController } from "../../controllers/index.js";
import jobRoutes from "./job-routes.js";

const router = express.Router();

router.get("/healthcheck", HealthCheckController.healthcheck);

router.use("/user", userRoutes);

router.use("/jobs", jobRoutes);

export default router;
