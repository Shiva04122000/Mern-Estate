import express from "express";
import dotenv from "dotenv";
import connectDb from "./data/dbConnect.js";

const app = express();
const PORT = 3000;

dotenv.config();

connectDb();

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server Running ");
});
