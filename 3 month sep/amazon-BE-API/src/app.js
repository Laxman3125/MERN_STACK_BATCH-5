// ============================================================
// EXPRESS APP SETUP
// Registers middleware and mounts all API routes
// (client APIs + admin APIs)
// ============================================================

import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// --- Global middleware ---
app.use(cors()); // allow the client + admin frontends to call the API
app.use(express.json()); // parse JSON request bodies

// --- Health check ---
app.get("/", (req, res) => {
  res.json({ message: "Amazon Clone API is running 🚀" });
});

// --- CLIENT (USER) APIs ---
app.use("/api/users", userRoutes); // create account, login, profile
app.use("/api/items", itemRoutes); // browse items
app.use("/api/cart", cartRoutes); // cart
app.use("/api/orders", orderRoutes); // orders

// --- ADMIN PANEL APIs ---
app.use("/api/admin", adminRoutes); // admin login + item/order/user management

// --- Error handling (keep last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
