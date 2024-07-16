import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    if ([userName, password, email].some((field) => field.trim() === "")) {
      return next(new errorHandler(400, "Some fields are missing"));
    }

    const userExists = await User.findOne({ email });
    if (userExists) return next(new errorHandler(400, "User Already Exists"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, password: hashedPassword, email });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User Registered Succesfully",
    });
  } catch (error) {
    next(error);
  }
};
