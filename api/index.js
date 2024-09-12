import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/food", foodRouter);

// Function to handle incoming requests
export default async function handler(req, res) {
  // Ensure DB connection is established for each request
  await connectDB();

  // Pass the request to Express to handle the routing
  app(req, res);
}
