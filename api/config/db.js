import mongoose from "mongoose";

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.pfhllru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("db connected"));
};
