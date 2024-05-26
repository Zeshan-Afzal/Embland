import express from "express";
import {
  createListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = express.Router();

router.route("/create").post(verifyJWT, createListing);
router.route("/update/:id").post(verifyJWT, updateListing);
router.route("/get/:id").get(getListing);
router.route("/get").get(getListings);

export default router;
