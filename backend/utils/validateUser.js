import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const validateUser = (req, res, next) => {
  let token = req.cookies.access_token || req.headers.authorization;
  if (token.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  if (!token) return next(new errorHandler(201, "Unauthorised User"));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.log("error", error);
      return next(new errorHandler(200, "No User Found"));
    }

    req.user = user;
    next();
  });
};
