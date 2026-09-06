// ============================================================
// SUPER ADMIN LOGIN PAGE (root "/")
// Logs the super admin in via /api/admin/login and redirects
// to the dashboard. Amazon-style sign-in card.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Alert } from "react-bootstrap";
import api from "@/lib/api";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLoginPage() {
  const { admin, login } = useAdmin();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, go to dashboard
  useEffect(() => {
    if (admin) router.push("/dashboard");
  }, [admin]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", form);
      login(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="text-center admin-logo mb-1" style={{ color: "#131921" }}>
          amazon<span style={{ color: "#febd69" }}>.clone</span>
        </div>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.85rem" }}>
          Super Admin Panel
        </p>

        <h4>Sign in</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@amazon.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn-amazon-yellow w-100 rounded-pill"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Form>

        <p className="text-muted mt-3 mb-0" style={{ fontSize: "0.75rem" }}>
          Default (from seed): admin@amazon.com / Admin@123
        </p>
      </div>
    </div>
  );
}
