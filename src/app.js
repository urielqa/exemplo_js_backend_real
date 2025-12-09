import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clientRouter } from "./modules/client/client.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
export const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/clientes", clientRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);