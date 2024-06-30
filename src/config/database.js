import mongoose from "mongoose";
import { ServerConfig } from "./index.js";

const Connect = async () => {
  await mongoose.connect(ServerConfig.MONGODB_URI, {
    dbName:"job-listing"
  });
  console.log("MongoDB Connected");
};

export default Connect;
