import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hasPass = bcryptjs.hashSync(password, 10);
  const user = new User({ username, email, password: hasPass });

  try {
    await user.save();
    const createdUser = await User.findById(user._id);
    if (createUser) {
      console.log(createdUser);
    }

    res.json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) return next(errorHandler(404, "user not found"));
    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) return next(errorHandler(402, "Wrong Password"));
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = userExist._doc;

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) {
      const token = jwt.sign({ _id: existedUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = existedUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user loggout successfully");
  } catch (error) {
    next(error);
  }
};
