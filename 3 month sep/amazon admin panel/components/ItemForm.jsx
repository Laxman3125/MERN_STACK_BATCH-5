// ============================================================
// ITEM FORM
// Reusable form for creating and editing an item. Takes initial
// values + an onSubmit handler so create/edit pages can share it.
// ============================================================

"use client";

import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const categories = ["Electronics", "Mobiles", "Books", "Fashion", "General"];

export default function ItemForm({ initial = {}, onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    price: initial.price || "",
    mrp: initial.mrp || "",
    image: initial.image || "",
    category: initial.category || "Electronics",
    brand: initial.brand || "",
    stock: initial.stock ?? 100,
    rating: initial.rating ?? 4,
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp) || 0,
      stock: Number(form.stock),
      rating: Number(form.rating),
    });
  };

  return (
    <Form onSubmit={submit}>
      <Row className="g-3">
        <Col md={8}>
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control value={form.title} onChange={set("title")} required />
        </Col>
        <Col md={4}>
          <Form.Label className="fw-bold">Brand</Form.Label>
          <Form.Control value={form.brand} onChange={set("brand")} />
        </Col>

        <Col md={12}>
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.description}
            onChange={set("description")}
          />
        </Col>

        <Col md={12}>
          <Form.Label className="fw-bold">Image URL</Form.Label>
          <Form.Control
            value={form.image}
            onChange={set("image")}
            placeholder="https://..."
          />
        </Col>

        <Col md={3}>
          <Form.Label className="fw-bold">Price (₹)</Form.Label>
          <Form.Control
            type="number"
            value={form.price}
            onChange={set("price")}
            required
          />
        </Col>
        <Col md={3}>
          <Form.Label className="fw-bold">MRP (₹)</Form.Label>
          <Form.Control type="number" value={form.mrp} onChange={set("mrp")} />
        </Col>
        <Col md={3}>
          <Form.Label className="fw-bold">Stock</Form.Label>
          <Form.Control
            type="number"
            value={form.stock}
            onChange={set("stock")}
          />
        </Col>
        <Col md={3}>
          <Form.Label className="fw-bold">Category</Form.Label>
          <Form.Select value={form.category} onChange={set("category")}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label className="fw-bold">Rating (0-5)</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={form.rating}
            onChange={set("rating")}
          />
        </Col>
      </Row>

      {/* Live preview */}
      {form.image && (
        <div className="mt-3">
          <div className="text-muted mb-1">Preview:</div>
          <img
            src={form.image}
            alt="preview"
            style={{ height: 90, objectFit: "contain" }}
          />
        </div>
      )}

      <Button
        type="submit"
        className="btn-amazon-yellow rounded-pill mt-3"
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save Item"}
      </Button>
    </Form>
  );
}
