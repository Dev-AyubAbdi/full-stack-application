import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import UserRouter from "../backend/routes/task.js";
import getUsers from "./routes/users.js";
import { notFound } from "./middleware/noFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config(); //

const app = express();
const PORT = process.env.PORT || 2000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/users", getUsers);
app.use(notFound);
app.use(errorHandler);
mongoose
  .connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Connection err:", err));

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
