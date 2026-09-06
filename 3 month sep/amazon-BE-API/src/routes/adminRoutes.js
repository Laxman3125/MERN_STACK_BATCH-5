// ============================================================
// ADMIN PANEL ROUTES (SUPER ADMIN)
// Handles:
//   - Super admin login
//   - Item create / edit / delete / get all
//   - Get all orders
//   - Get all users + a user's ordered items
// Base path: /api/admin
// Note: all routes except /login require admin token
// ============================================================

import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { getAllOrders } from "../controllers/orderController.js";
import { getAllUsers, getUserItems } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- Public admin route ---
router.post("/login", loginAdmin); // super admin login

// --- Everything below requires a valid admin token ---
router.use(protect, adminOnly);

// Item management
router.get("/items", getItems); // get all items
router.get("/items/:id", getItemById); // get one item
router.post("/items", createItem); // create item
router.put("/items/:id", updateItem); // edit item
router.delete("/items/:id", deleteItem); // delete item

// Orders
router.get("/orders", getAllOrders); // get all orders

// Users (customers) and their ordered items
router.get("/users", getAllUsers); // get all users
router.get("/users/:id/items", getUserItems); // a user's items

export default router;
