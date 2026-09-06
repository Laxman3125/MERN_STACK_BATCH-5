import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";

// @desc   Create / place an order
// @route  POST /api/orders
// @access Private
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    let orderItems = items;

    // If no items sent explicitly, build from the user's cart
    if (!orderItems || orderItems.length === 0) {
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.item");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "No items to order" });
      }
      orderItems = cart.items.map((line) => ({
        item: line.item._id,
        title: line.item.title,
        image: line.item.image,
        price: line.item.price,
        quantity: line.quantity,
      }));
    } else {
      // Normalize provided items and pull fresh prices
      orderItems = await Promise.all(
        orderItems.map(async (line) => {
          const dbItem = await Item.findById(line.item || line.itemId);
          return {
            item: dbItem?._id,
            title: dbItem?.title,
            image: dbItem?.image,
            price: dbItem?.price,
            quantity: line.quantity || 1,
          };
        })
      );
    }

    const itemsPrice = orderItems.reduce(
      (sum, l) => sum + (l.price || 0) * l.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      itemsPrice,
      totalPrice: itemsPrice,
    });

    // Empty the cart after ordering
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged-in user's orders
// @route  GET /api/orders
// @access Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all orders (admin)
// @route  GET /api/admin/orders
// @access Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
