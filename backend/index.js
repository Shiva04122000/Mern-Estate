import express, { json } from "express";
import dotenv from "dotenv";
import connectDb from "./data/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import { errorMiddleware } from "./utils/error.js";

const app = express();
const PORT = 3000;

dotenv.config();

connectDb();

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});

app.use(express.json());
app.use("/api/auth", authRouter);

app.use(errorMiddleware);
