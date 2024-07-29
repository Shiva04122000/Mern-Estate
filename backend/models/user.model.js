import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.pngitem.com/middle/ixwxbwh_user-profile-dummy-hd-png-download/",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
