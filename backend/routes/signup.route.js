import express from "express";
import {
  createUser,
  googleAuth,
  signIn,
  signOutUser,
} from "../controllers/aurth.js";

const router = express.Router();

router.route("/sign-up").post(createUser);
router.route("/sign-in").post(signIn);
router.route("/google-auth").post(googleAuth);
router.route("/sign-out").get(signOutUser);

export default router;
