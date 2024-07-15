import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("MongoDB connected Succesfully");
    })
    .catch((err) => {
      console.log("MongoDB Err", err);
    });
};

export default connectDb;
