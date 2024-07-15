import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://eshiva44:eshiva44@cluster0.ehle298.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((res) => {
      console.log("MongoDB connected Succesfully");
    })
    .catch((err) => {
      console.log("MongoDB Err", err);
    });
};

export default connectDb;
