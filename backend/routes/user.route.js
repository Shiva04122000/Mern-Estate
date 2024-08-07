import express from "express";
import {
  deleteUser,
  getUserDetail,
  updateUser,
} from "../controllers/user.controller.js";
import { validateUser } from "../utils/validateUser.js";

const router = express.Router();

router.put("/update/:id", validateUser, updateUser);
router.delete("/delete/:id", validateUser, deleteUser);
router.get("/:id", getUserDetail);

export default router;
