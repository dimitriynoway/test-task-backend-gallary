/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter, photoRouter, albumRouter } from "./route";
import { errorHandler } from "./errorHandler";

dotenv.config();
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/photo", photoRouter);
app.use("/album", albumRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on: http://${HOSTNAME}:${PORT}`);
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("MongoDB is connected"))
    .catch(console.error);
});
