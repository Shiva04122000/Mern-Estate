import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const user = new User({ userName, password, email });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User Registered Succesfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};
