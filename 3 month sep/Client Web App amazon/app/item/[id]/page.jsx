// ============================================================
// ITEM DETAIL PAGE
// Shows a single product with image, price, description and a
// buy box (Add to Cart / Buy Now) - Amazon product page style.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, refreshCart } = useApp();

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then(({ data }) => setItem(data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!user) return router.push("/login");
    await api.post("/cart", { itemId: item._id, quantity: Number(qty) });
    await refreshCart();
    router.push("/cart");
  };

  const buyNow = async () => {
    if (!user) return router.push("/login");
    await api.post("/cart", { itemId: item._id, quantity: Number(qty) });
    await refreshCart();
    router.push("/checkout");
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  if (!item)
    return <Container className="py-5">Item not found.</Container>;

  return (
    <Container className="section-card my-3">
      <Row>
        {/* Image */}
        <Col md={5} className="text-center">
          <img
            src={item.image}
            alt={item.title}
            style={{ maxHeight: 400, objectFit: "contain", width: "100%" }}
          />
        </Col>

        {/* Details */}
        <Col md={4}>
          <h4>{item.title}</h4>
          <div className="mb-2" style={{ color: "#007185" }}>
            {item.brand && <span>Brand: {item.brand}</span>}
          </div>
          <div className="mb-2">
            <span className="rating-star">
              {item.rating} <FaStar />
            </span>{" "}
            <span style={{ color: "#007185" }}>
              {item.numReviews?.toLocaleString?.()} ratings
            </span>
          </div>
          <hr />
          <div className="mb-2">
            <span className="price" style={{ fontSize: "1.6rem" }}>
              <span className="price-symbol">₹</span>
              {item.price?.toLocaleString("en-IN")}
            </span>
            {item.mrp > item.price && (
              <span className="mrp text-decoration-line-through ms-2">
                ₹{item.mrp?.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="text-muted">{item.description}</p>
          <p className="mb-0" style={{ color: "#007185" }}>
            Category: {item.category}
          </p>
        </Col>

        {/* Buy box */}
        <Col md={3}>
          <div className="border rounded p-3">
            <div className="price mb-2">
              <span className="price-symbol">₹</span>
              {item.price?.toLocaleString("en-IN")}
            </div>
            <p className="mb-1" style={{ color: "#007600" }}>
              {item.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            <Form.Group className="mb-2 d-flex align-items-center gap-2">
              <Form.Label className="mb-0">Qty:</Form.Label>
              <Form.Select
                size="sm"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{ width: 70 }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              className="btn-amazon-yellow w-100 rounded-pill mb-2"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <Button
              className="btn-amazon w-100 rounded-pill"
              onClick={buyNow}
            >
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
