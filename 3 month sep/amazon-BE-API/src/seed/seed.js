// ============================================================
// SEED SCRIPT
// Creates a default super admin + sample Amazon-style products
// Run with: npm run seed
// ============================================================

import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Item from "../models/Item.js";

const sampleItems = [
  {
    title: "Echo Dot (5th Gen) Smart Speaker with Alexa",
    description:
      "Our best sounding Echo Dot yet. Rich, clear sound and Alexa built-in.",
    price: 4499,
    mrp: 5499,
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    category: "Electronics",
    brand: "Amazon",
    rating: 4.5,
    numReviews: 1203,
    stock: 50,
  },
  {
    title: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise cancellation with 30-hour battery life.",
    price: 24990,
    mrp: 29990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    brand: "Sony",
    rating: 4.7,
    numReviews: 8542,
    stock: 30,
  },
  {
    title: "Apple iPhone 15 (128 GB) - Blue",
    description: "A16 Bionic chip, 48MP main camera, USB-C.",
    price: 69999,
    mrp: 79900,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
    category: "Mobiles",
    brand: "Apple",
    rating: 4.6,
    numReviews: 3200,
    stock: 20,
  },
  {
    title: "The Psychology of Money (Paperback)",
    description: "Timeless lessons on wealth, greed, and happiness.",
    price: 299,
    mrp: 399,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    category: "Books",
    brand: "Jaico",
    rating: 4.6,
    numReviews: 45210,
    stock: 200,
  },
  {
    title: "Boat Airdopes 141 Bluetooth Earbuds",
    description: "42H playback, ENx tech, low latency for gaming.",
    price: 1299,
    mrp: 4490,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    category: "Electronics",
    brand: "boAt",
    rating: 4.1,
    numReviews: 65000,
    stock: 150,
  },
  {
    title: "Levi's Men's Slim Fit Jeans",
    description: "Classic slim fit denim, comfortable stretch fabric.",
    price: 1799,
    mrp: 2999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Fashion",
    brand: "Levi's",
    rating: 4.3,
    numReviews: 980,
    stock: 80,
  },
];

const runSeed = async () => {
  try {
    await connectDB();

    // 1. Create / ensure super admin
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@amazon.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Super admin created: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log(`ℹ️  Super admin already exists: ${adminEmail}`);
    }

    // 2. Reset and insert sample items
    await Item.deleteMany({});
    const itemsWithOwner = sampleItems.map((i) => ({ ...i, createdBy: admin._id }));
    await Item.insertMany(itemsWithOwner);
    console.log(`✅ Inserted ${sampleItems.length} sample items`);

    console.log("🌱 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

runSeed();
