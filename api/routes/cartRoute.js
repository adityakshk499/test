import express from "express";
import { AddToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/addcart",authMiddleware,AddToCart);
cartRouter.post("/removecart",authMiddleware,removeFromCart);
cartRouter.post("/getcart",authMiddleware,getCart);

export default cartRouter;