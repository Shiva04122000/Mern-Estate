import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
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
