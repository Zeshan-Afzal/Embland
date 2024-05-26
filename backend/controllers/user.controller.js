import ResidentialListing from "../models/listing.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
export const updateUser = async (req, res, next) => {
  let { username, avatar, password, email } = req.body;
  if (req.user._id !== req.params.id) {
    return next(errorHandler(404, "user not authorized"));
  }
  try {
    if (password) {
      password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
          password: password,
          avatar: avatar,
        },
      },
      { new: true }
    ).select("-password");

    console.log("updated ", updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) return next(404, "Unauthorized request");
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user._id === req.params.id) {
    try {
      const userListings = await ResidentialListing.find({
        userRef: req.params.id,
      });

      return res.status(200).json(userListings);
    } catch (error) {
      next(error);
    }
  } else {
    next("not authorized");
  }
};

export const deleteUserListing = async (req, res, next) => {
  try {
    const listingToBeDeleted = await ResidentialListing.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(errorHandler(404, "user not found"));

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
