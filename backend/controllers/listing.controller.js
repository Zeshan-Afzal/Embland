import { query } from "express";
import ResidentialListing from "../models/listing.model.js";
import errorHandler from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await ResidentialListing.create(req.body);

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const findListing = await ResidentialListing.findById(req.params.id);
    if (!findListing) return errorHandler(404, "listing not found");

    if (!req.user.id === findListing.userRef) {
      return next(errorHandler(402, "Unauthorized request"));
    }
    const updatedListing = await ResidentialListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const findListing = await ResidentialListing.findById(req.params.id);
    if (!findListing) return next(errorHandler(404, "listing not found"));

    return res.status(200).json(findListing);
  } catch (error) {
    next();
  }
};

export const getListings = async (req, res, next) => {
  const limit = req.query.limit || 9;
  const startingIndex = req.query.startingIndex || 0;

  let offer = req.query.offer;
  if (offer === undefined || offer === "false") {
    offer = { $in: [true, false] };
  }
  let parking = req.query.parking;
  if (parking === undefined || parking === "false") {
    parking = { $in: [true, false] };
  }
  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["rent", "sale"] };
  }

  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";
  const searchTerm = req.query.searchTerm || "";
  const listings = await ResidentialListing.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    type,
    parking,
    furnished,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startingIndex);
  res.status(200).json(listings);
};
