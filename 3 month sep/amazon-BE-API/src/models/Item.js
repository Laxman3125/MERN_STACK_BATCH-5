import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, default: 0 }, // original price (for showing discount)
    image: { type: String, default: "" },
    category: { type: String, default: "General" },
    brand: { type: String, default: "" },
    rating: { type: Number, default: 4, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 100, min: 0 },
    // which admin created this item
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
