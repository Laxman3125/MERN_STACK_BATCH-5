// ============================================================
// USER (CLIENT) ROUTES
// Handles: create account, login, and profile for customers
// Base path: /api/users
// ============================================================

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Amazon account (register a new user)
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user's profile (needs token)
router.get("/profile", protect, getProfile);

export default router;
