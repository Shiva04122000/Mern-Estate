import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Listing Created Successfully",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const user = req.user;
    const listings = await Listing.find({ owner: user.id });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) return next(new errorHandler(400, "No Listing Found"));

    if (listing.owner == req.user.id) {
      await listing.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Deleted Successfuly",
      });
    } else {
      return next(new errorHandler(400, "No Listing Found"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) return next(new errorHandler(400, "No Listing found"));
    if (listing.owner == req.user.id) {
      const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Updated Successfully",
        listing: updatedListing,
      });
    } else {
      return next(new errorHandler(400, "No Listing found"));
    }
  } catch (error) {
    next(error);
  }
};

export const getListingDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      return next(new errorHandler(400, "No Listing found"));
    }

    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};
