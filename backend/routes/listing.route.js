import express from "express";
import { validateUser } from "../utils/validateUser.js";
import {
  createListing,
  deleteListing,
  getListingDetail,
  getMyListings,
  updateListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", validateUser, createListing);
router.get("/get-listings", validateUser, getMyListings);
router.get("/:id", validateUser, getListingDetail);
router.put("/update/:id", validateUser, updateListing);
router.delete("/delete/:id", validateUser, deleteListing);

export default router;
