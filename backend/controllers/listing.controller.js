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

export const allListings = async (req, res, next) => {
  try {
    const listings = await Listing.find().select("-owner -__v");

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error);
  }
};

export const ownerListings = async (req, res, next) => {
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

export const filterListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.start) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sell"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json({
      success: true,
      count: listing.length,
      listing,
    });
  } catch (error) {
    next(error);
  }
};
