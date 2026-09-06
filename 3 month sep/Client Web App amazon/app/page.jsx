// ============================================================
// HOME PAGE (ITEM LIST)
// Fetches all items from the backend and shows them in an
// Amazon-style product grid. Supports search + category from URL.
// ============================================================

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";

// useSearchParams must live inside a Suspense boundary
export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-5"><Spinner animation="border" /></div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        const { data } = await api.get("/items", { params });
        setItems(data);
      } catch (err) {
        console.error("Failed to load items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [search, category]);

  return (
    <>
      {/* Hero banner (only on default home) */}
      {!search && !category && <div className="hero-banner" />}

      <Container fluid className="px-3" style={{ position: "relative", paddingBottom: 40 }}>
        <div className="section-card mt-3">
          <h5 className="mb-3">
            {search
              ? `Results for "${search}"`
              : category
              ? category
              : "Today's Deals & Popular Picks"}
          </h5>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted py-4">No items found.</p>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              {items.map((item) => (
                <Col key={item._id}>
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </>
  );
}
