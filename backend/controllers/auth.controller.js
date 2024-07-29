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

    const { password: pass, __v, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true, //no other 3rd party can excess our token
        expires: new Date(new Date().getTime() + 1000 * 60 * 5), //5min expiry time
      })
      .status(200)
      .json({
        success: true,
        message: "logged in succesfully",
        user: { ...rest, access_token: token },
      });
  } catch (error) {
    next(error);
  }
};

export const googleSignIn = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, __v, ...rest } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true, //no other 3rd party can excess our token
          expires: new Date(new Date().getTime() + 1000 * 60 * 5), //5min expiry time
        })
        .status(200)
        .json({
          success: true,
          message: "logged in succesfully",
          user: { ...rest, access_token: token },
        });
    } else {
      const generatedPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPass, 10);

      const newUser = new User({
        userName: name.split(" ").join(""),
        password: hashedPassword,
        email,
        avatar: photo,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User Registered Succesfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
