import errorHandler from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id)
      return next(new errorHandler(201, "Unauthorised User !"));

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          userName: req.body.userName,
          avatar: req.body.avatar,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "Profile Updated Succesfully",
      user: { ...rest },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return next(new errorHandler(201, "Unauthorized User"));
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) return next(new errorHandler(400, "No user found"));

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
