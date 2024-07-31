import express from "express";
import {
  googleSignIn,
  signin,
  signOut,
  signup,
} from "../controllers/auth.controller.js";
import { validateUser } from "../utils/validateUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleSignIn);
router.get("/signout", validateUser, signOut);

export default router;
