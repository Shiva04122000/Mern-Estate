import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { validateUser } from "../utils/validateUser.js";

const router = express.Router();

router.put("/update/:id", validateUser, updateUser);

export default router;
