// ============================================================
// PRODUCT CARD
// Shows a single item in the grid (image, title, rating, price)
// with an "Add to Cart" button - Amazon style.
// ============================================================

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

// Render 5 stars based on a rating number
function Stars({ value = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<FaStar key={i} className="rating-star" />);
    else if (value >= i - 0.5)
      stars.push(<FaStarHalfAlt key={i} className="rating-star" />);
    else stars.push(<FaRegStar key={i} className="rating-star" />);
  }
  return <span>{stars}</span>;
}

export default function ProductCard({ item }) {
  const { user, refreshCart } = useApp();
  const router = useRouter();

  const handleAdd = async () => {
    if (!user) return router.push("/login");
    await api.post("/cart", { itemId: item._id, quantity: 1 });
    await refreshCart();
  };

  const discount =
    item.mrp && item.mrp > item.price
      ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
      : 0;

  return (
    <Card className="product-card p-2">
      <Link href={`/item/${item._id}`}>
        <Card.Img variant="top" src={item.image} className="product-img" />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link href={`/item/${item._id}`}>
          <Card.Title className="product-title">{item.title}</Card.Title>
        </Link>

        <div className="mb-1">
          <Stars value={item.rating} />
          <span className="ms-1" style={{ color: "#007185", fontSize: "0.85rem" }}>
            {item.numReviews?.toLocaleString?.() || 0}
          </span>
        </div>

        <div className="mb-2">
          <span className="price">
            <span className="price-symbol">₹</span>
            {item.price?.toLocaleString("en-IN")}
          </span>
          {discount > 0 && (
            <>
              {" "}
              <span className="mrp text-decoration-line-through">
                ₹{item.mrp?.toLocaleString("en-IN")}
              </span>{" "}
              <span style={{ color: "#565959", fontSize: "0.85rem" }}>
                ({discount}% off)
              </span>
            </>
          )}
        </div>

        <Button className="btn-amazon mt-auto rounded-pill" onClick={handleAdd}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
