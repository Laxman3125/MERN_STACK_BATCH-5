import User from "../models/User.js";
import Order from "../models/Order.js";

// @desc   Get all users (customers)
// @route  GET /api/admin/users
// @access Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a specific user's ordered items ("user item -> will see")
// @route  GET /api/admin/users/:id/items
// @access Private/Admin
export const getUserItems = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    // Flatten all items from all orders for this user
    const items = orders.flatMap((order) =>
      order.items.map((it) => ({
        ...it.toObject(),
        orderId: order._id,
        orderStatus: order.status,
        orderedAt: order.createdAt,
      }))
    );

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
