// ============================================================
// ORDER ROUTES (CLIENT - PRIVATE)
// Handles: place order (purchase), get my orders
// All routes require a logged-in user (protect)
// Base path: /api/orders
// ============================================================

import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createOrder); // place / purchase order
router.get("/", getMyOrders); // get my orders

export default router;
