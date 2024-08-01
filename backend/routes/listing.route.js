import express from "express";
import { validateUser } from "../utils/validateUser.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", validateUser, createListing);

export default router;
