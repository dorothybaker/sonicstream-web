import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import { connectToDB } from "./utils/connectToDB.js";
import authRouter from "./routes/auth.route.js";
import songRouter from "./routes/song.route.js";
import userRouter from "./routes/user.route.js";

config();

const PORT = process.env.PORT;
const APP = express();

const __dirname = path.resolve();

APP.use(express.json());
APP.use(cookieParser());
APP.use(cors({ credentials: true }));

APP.use("/api/auth", authRouter);
APP.use("/api/songs", songRouter);
APP.use("/api/users", userRouter);

APP.use(express.static(path.join(__dirname, "/client/dist")));

APP.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

APP.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});
