import dotenv from "dotenv";
import connect from "./db/dbConnection.js";
import signUpUser from "../backend/routes/signup.route.js";
import express from "express";
import updateUserInfo from "../backend/routes/user.route.js";
import listingRout from "../backend/routes/listing.route.js";

import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

connect();
app.listen(3000, () => {
  console.log("app is listening");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", signUpUser);
app.use("/api/user-upd", updateUserInfo);
app.use("/api/listing", listingRout);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
