import express from "express";
const app = express();
import dotenv from "dotenv";
const PORT = process.env.PORT || 2000;
import mongoose from "mongoose";
dotenv.config();
import UserRouter from "../backend/routes/task.js";
import { notFound } from "./middleware/noFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
app.use(express.json());



app.get("/test", (req, res, next) => {
  res.json("hello walal welcome");
  next(err)
});

app.use("/api/user", UserRouter);

app.use("/api/user", UserRouter);
app.use("/api/user", UserRouter);
app.use(notFound)
app.use(errorHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connection Successfully"))
  .catch((error) => console.log("❌ Connection Error", error));

app.listen(PORT, () => {
  console.log(`server is runing:http://localhost:${PORT}`);
});
