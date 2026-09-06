// ============================================================
// CART ROUTES (CLIENT - PRIVATE)
// Handles: create cart, get cart, update qty, remove, clear
// All routes require a logged-in user (protect)
// Base path: /api/cart
// ============================================================

import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.get("/", getCart); // get current user's cart
router.post("/", addToCart); // create cart / add item
router.put("/:itemId", updateCartItem); // update quantity
router.delete("/:itemId", removeFromCart); // remove one item
router.delete("/", clearCart); // clear whole cart

export default router;
