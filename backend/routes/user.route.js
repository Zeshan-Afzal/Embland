import express from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  deleteUser,
  deleteUserListing,
  getUserListings,
  updateUser,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/update/:id").post(verifyJWT, updateUser);
router.route("/delete/:id").delete(verifyJWT, deleteUser);
router.route("/user-listings/:id").get(verifyJWT, getUserListings);
router.route("/delete-listing/:id").delete(verifyJWT, deleteUserListing);
router.route("/get/:id").get(verifyJWT, getUser);

export default router;
