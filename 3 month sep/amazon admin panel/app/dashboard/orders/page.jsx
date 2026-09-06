// ============================================================
// ALL ORDERS (ADMIN)
// Lists every order across all users with customer, items count,
// total, status and date. Uses GET /api/admin/orders.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { Table, Spinner, Badge } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/orders")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <h3 className="mb-3">Orders</h3>
      <div className="panel">
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-muted mb-0">No orders yet.</p>
        ) : (
          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(-8).toUpperCase()}</td>
                  <td>
                    {o.user?.name || "—"}
                    <br />
                    <small className="text-muted">{o.user?.email}</small>
                  </td>
                  <td>{o.items.length}</td>
                  <td>₹{o.totalPrice?.toLocaleString("en-IN")}</td>
                  <td>
                    <Badge bg="success">{o.status}</Badge>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
