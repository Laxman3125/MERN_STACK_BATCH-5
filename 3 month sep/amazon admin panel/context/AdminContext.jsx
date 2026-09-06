// ============================================================
// ADMIN CONTEXT
// Global state for the logged-in super admin (token + info).
// ============================================================

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("amazonAdmin");
    if (stored) setAdmin(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (adminData) => {
    localStorage.setItem("amazonAdmin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("amazonAdmin");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
