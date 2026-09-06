// ============================================================
// ITEM ROUTES (CLIENT - PUBLIC)
// Handles: get all items + get single item for the storefront
// Base path: /api/items
// ============================================================

import express from "express";
import { getItems, getItemById } from "../controllers/itemController.js";

const router = express.Router();

// Get all items (supports ?search= and ?category=)
router.get("/", getItems);

// Get single item by id
router.get("/:id", getItemById);

export default router;
