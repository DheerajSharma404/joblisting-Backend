import express from "express";
import v1Routes from "./v1/index.js";

const router = express.Router();

router.use("/v1", v1Routes);

// Register next version of your api.
export default router;
