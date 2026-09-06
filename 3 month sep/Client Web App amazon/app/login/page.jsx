// ============================================================
// LOGIN PAGE
// Amazon-style sign-in card. Logs the user in and stores the
// token via AppContext, then redirects home.
// ============================================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Form, Button, Alert } from "react-bootstrap";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/users/login", form);
      login(data);
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 380 }}>
      <div className="text-center amazon-logo mb-3" style={{ color: "#131921" }}>
        amazon<span style={{ color: "#febd69" }}>.clone</span>
      </div>

      <div className="border rounded p-4 bg-white">
        <h4>Sign in</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
      </div>

      <div className="text-center my-3" style={{ fontSize: "0.85rem" }}>
        New to Amazon.clone?
      </div>
      <Link href="/register">
        <Button variant="light" className="w-100 border">
          Create your Amazon account
        </Button>
      </Link>
    </Container>
  );
}
