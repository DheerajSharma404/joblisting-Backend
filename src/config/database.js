import mongoose from "mongoose";
import { ServerConfig } from "./index.js";

const Connect = async () => {
  await mongoose.connect(ServerConfig.MONGODB_URI);
  console.log("MongoDB Connected");
};

export default Connect;
