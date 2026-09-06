// ============================================================
// CART PAGE
// Shows the logged-in user's cart, lets them change quantity or
// remove items, shows the subtotal, and proceeds to checkout.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function CartPage() {
  const { user, refreshCart } = useApp();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    loadCart();
  }, [user]);

  const changeQty = async (itemId, quantity) => {
    await api.put(`/cart/${itemId}`, { quantity });
    await loadCart();
    await refreshCart();
  };

  const removeItem = async (itemId) => {
    await api.delete(`/cart/${itemId}`);
    await loadCart();
    await refreshCart();
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  const lines = cart?.items || [];
  const subtotal = lines.reduce(
    (sum, l) => sum + (l.item?.price || 0) * l.quantity,
    0
  );
  const totalQty = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <Container fluid className="px-3 py-3">
      <Row className="g-3">
        {/* Cart items */}
        <Col md={9}>
          <div className="section-card">
            <h3 className="border-bottom pb-2">Shopping Cart</h3>
            {lines.length === 0 ? (
              <div className="py-4">
                <p>Your Amazon Cart is empty.</p>
                <Link href="/">
                  <Button className="btn-amazon-yellow rounded-pill">
                    Shop today's deals
                  </Button>
                </Link>
              </div>
            ) : (
              lines.map((line) => (
                <div
                  key={line.item?._id}
                  className="d-flex gap-3 py-3 border-bottom"
                >
                  <img
                    src={line.item?.image}
                    alt={line.item?.title}
                    style={{ width: 120, height: 120, objectFit: "contain" }}
                  />
                  <div className="flex-grow-1">
                    <Link href={`/item/${line.item?._id}`}>
                      <h6>{line.item?.title}</h6>
                    </Link>
                    <p className="mb-1" style={{ color: "#007600" }}>
                      In stock
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <Form.Select
                        size="sm"
                        value={line.quantity}
                        onChange={(e) =>
                          changeQty(line.item._id, Number(e.target.value))
                        }
                        style={{ width: 80 }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </Form.Select>
                      <Button
                        variant="link"
                        size="sm"
                        style={{ color: "#007185" }}
                        onClick={() => removeItem(line.item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="price">
                    ₹{(line.item?.price || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              ))
            )}
            {lines.length > 0 && (
              <div className="text-end pt-3">
                Subtotal ({totalQty} items):{" "}
                <span className="price">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>
        </Col>

        {/* Checkout summary */}
        <Col md={3}>
          <div className="section-card">
            <div className="mb-2">
              Subtotal ({totalQty} items):{" "}
              <span className="price">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <Button
              className="btn-amazon-yellow w-100 rounded-pill"
              disabled={lines.length === 0}
              onClick={() => router.push("/checkout")}
            >
              Proceed to Buy
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
