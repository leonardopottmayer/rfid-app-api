import "dotenv/config";
import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

export { connectToDatabase };
