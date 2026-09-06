// ============================================================
// API CLIENT (axios) - Admin Panel
// Talks to the backend and attaches the admin JWT token
// (stored in localStorage) to every request.
// ============================================================

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("amazonAdmin");
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
