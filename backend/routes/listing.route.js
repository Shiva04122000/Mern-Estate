import express from "express";
import { validateUser } from "../utils/validateUser.js";
import {
  allListings,
  createListing,
  deleteListing,
  filterListing,
  getListingDetail,
  ownerListings,
  updateListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", validateUser, createListing);
router.get("/get-listings", validateUser, ownerListings);
router.get("/all", allListings);
router.get("/get", filterListing);
router.get("/:id", getListingDetail);
router.put("/update/:id", validateUser, updateListing);
router.delete("/delete/:id", validateUser, deleteListing);

export default router;
