// ============================================================
// CHECKOUT PAGE (Purchase order)
// Collects shipping address + payment method, shows an order
// summary, and places the order via the backend.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function CheckoutPage() {
  const { user, refreshCart } = useApp();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });
  const [payment, setPayment] = useState("Cash on Delivery");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    api
      .get("/cart")
      .then(({ data }) => setCart(data))
      .finally(() => setLoading(false));
  }, [user]);

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      // items empty -> backend builds the order from the cart
      await api.post("/orders", {
        shippingAddress: address,
        paymentMethod: payment,
      });
      await refreshCart();
      router.push("/orders?placed=1");
    } catch (err) {
      alert(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  const lines = cart?.items || [];
  const total = lines.reduce(
    (s, l) => s + (l.item?.price || 0) * l.quantity,
    0
  );

  return (
    <Container className="py-3">
      <h3 className="mb-3">Checkout</h3>
      <Row className="g-3">
        <Col md={8}>
          <div className="section-card">
            <h5>Shipping address</h5>
            <Form onSubmit={placeOrder}>
              <Row className="g-2">
                <Col md={6}>
                  <Form.Control
                    placeholder="Full name"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({ ...address, fullName: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col md={12}>
                  <Form.Control
                    placeholder="Address"
                    value={address.address}
                    onChange={(e) =>
                      setAddress({ ...address, address: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Postal code"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />
                </Col>
              </Row>

              <h5 className="mt-4">Payment method</h5>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                checked={payment === "Cash on Delivery"}
                onChange={() => setPayment("Cash on Delivery")}
              />
              <Form.Check
                type="radio"
                label="Card / UPI (demo)"
                checked={payment === "Card"}
                onChange={() => setPayment("Card")}
              />

              <Button
                type="submit"
                className="btn-amazon-yellow rounded-pill mt-3"
                disabled={placing || lines.length === 0}
              >
                {placing ? "Placing order..." : "Place your order"}
              </Button>
            </Form>
          </div>
        </Col>

        {/* Order summary */}
        <Col md={4}>
          <div className="section-card">
            <h5>Order Summary</h5>
            {lines.map((l) => (
              <div
                key={l.item?._id}
                className="d-flex justify-content-between small mb-1"
              >
                <span className="text-truncate" style={{ maxWidth: 180 }}>
                  {l.item?.title} × {l.quantity}
                </span>
                <span>
                  ₹{((l.item?.price || 0) * l.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Order total:</span>
              <span className="price">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
