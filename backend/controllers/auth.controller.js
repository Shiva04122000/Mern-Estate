import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim() === ""))
      return next(new errorHandler(400, "Some fields are missing"));

    const user = await User.findOne({ email });
    if (!user) return next(new errorHandler(400, "Invalid Cerendials"));

    const passwordValid = await bcrypt.compare(password, user?.password);
    if (!passwordValid)
      return next(new errorHandler(400, "Invalid Cerendials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 1000 * 60 * 5),
      })
      .status(200)
      .json({
        success: true,
        message: "logged in succesfully",
      });
  } catch (error) {
    next(error);
  }
};
