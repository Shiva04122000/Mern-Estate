import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./data/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./utils/error.js";

const app = express();
const PORT = 3000;

dotenv.config();

connectDb();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(errorMiddleware);
