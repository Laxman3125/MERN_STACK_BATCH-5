// ============================================================
// APP CONTEXT
// Global state for the logged-in user and the cart count.
// Wraps the whole app so any page can read/update auth + cart.
// ============================================================

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load saved user on first render
  useEffect(() => {
    const stored = localStorage.getItem("amazonUser");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // Refresh cart count whenever the user changes
  useEffect(() => {
    if (user) refreshCart();
    else setCartCount(0);
  }, [user]);

  const login = (userData) => {
    localStorage.setItem("amazonUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("amazonUser");
    setUser(null);
    setCartCount(0);
  };

  const refreshCart = async () => {
    try {
      const { data } = await api.get("/cart");
      const count = (data.items || []).reduce((s, i) => s + i.quantity, 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, cartCount, refreshCart, loading }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
