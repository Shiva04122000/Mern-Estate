import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const validateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new errorHandler(201, "Unauthorised User"));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(new errorHandler(200, "No User Found"));

    req.user = user;
    next();
  });
};
