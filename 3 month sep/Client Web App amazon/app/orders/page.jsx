// ============================================================
// ORDERS PAGE (Your Orders)
// Lists all orders placed by the logged-in user with items,
// status, total and date - Amazon "Your Orders" style.
// ============================================================

"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Badge, Spinner, Alert } from "react-bootstrap";
import api from "@/lib/api";
import { useApp } from "@/context/AppContext";

// useSearchParams must live inside a Suspense boundary
export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="text-center py-5"><Spinner animation="border" /></div>}>
      <OrdersContent />
    </Suspense>
  );
}

function OrdersContent() {
  const { user } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get("placed");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    api
      .get("/orders")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="py-3">
      <h3 className="mb-3">Your Orders</h3>

      {justPlaced && (
        <Alert variant="success">
          Order placed successfully! Thank you for shopping with us.
        </Alert>
      )}

      {orders.length === 0 ? (
        <p className="text-muted">You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="section-card mb-3">
            <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-2">
              <div>
                <small className="text-muted d-block">ORDER PLACED</small>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <small className="text-muted d-block">TOTAL</small>
                <span className="price">
                  ₹{order.totalPrice?.toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <small className="text-muted d-block">STATUS</small>
                <Badge bg="success">{order.status}</Badge>
              </div>
              <div>
                <small className="text-muted d-block">ORDER #</small>
                <span style={{ fontSize: "0.8rem" }}>
                  {order._id.slice(-8).toUpperCase()}
                </span>
              </div>
            </div>

            {order.items.map((it, idx) => (
              <div key={idx} className="d-flex gap-3 py-2 align-items-center">
                <img
                  src={it.image}
                  alt={it.title}
                  style={{ width: 70, height: 70, objectFit: "contain" }}
                />
                <div className="flex-grow-1">
                  <div>{it.title}</div>
                  <small className="text-muted">Qty: {it.quantity}</small>
                </div>
                <div className="price">
                  ₹{it.price?.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </Container>
  );
}
