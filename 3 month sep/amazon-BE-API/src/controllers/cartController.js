import Cart from "../models/Cart.js";

// @desc   Get current user's cart
// @route  GET /api/cart
// @access Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.item");
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Add / update item in cart (create cart if missing)
// @route  POST /api/cart
// @access Private
export const addToCart = async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find((i) => i.item.toString() === itemId);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ item: itemId, quantity: Number(quantity) });
    }

    await cart.save();
    cart = await cart.populate("items.item");
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update quantity of an item in cart
// @route  PUT /api/cart/:itemId
// @access Private
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const line = cart.items.find((i) => i.item.toString() === req.params.itemId);
    if (!line) return res.status(404).json({ message: "Item not in cart" });

    line.quantity = Math.max(1, Number(quantity));
    await cart.save();
    const populated = await cart.populate("items.item");
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Remove an item from cart
// @route  DELETE /api/cart/:itemId
// @access Private
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.item.toString() !== req.params.itemId);
    await cart.save();
    const populated = await cart.populate("items.item");
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Clear cart
// @route  DELETE /api/cart
// @access Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
