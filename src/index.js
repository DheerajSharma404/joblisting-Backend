import cors from "cors";
import express from "express";
import { Connect, ServerConfig } from "./config/index.js";
import apiRoutes from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on prot: ${ServerConfig.PORT}`);
  await Connect();
});
