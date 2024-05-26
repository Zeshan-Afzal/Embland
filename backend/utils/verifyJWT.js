import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = async (req, res, next) => {
  let token = req.cookies.access_token;

  if (!token) return next(errorHandler(404, "Unauthorized request"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(402, "Unauthorized user"));
    if (user) {
      req.user = user;

      next();
    }
  });
};
