// ============================================================
// DASHBOARD HOME
// Shows summary stats (items, orders, users) pulled from the
// admin APIs. Landing page after login.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaBoxOpen, FaClipboardList, FaUsers, FaRupeeSign } from "react-icons/fa";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    items: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [items, orders, users] = await Promise.all([
          api.get("/admin/items"),
          api.get("/admin/orders"),
          api.get("/admin/users"),
        ]);
        const revenue = orders.data.reduce(
          (s, o) => s + (o.totalPrice || 0),
          0
        );
        setStats({
          items: items.data.length,
          orders: orders.data.length,
          users: users.data.length,
          revenue,
        });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const cards = [
    { label: "Total Items", value: stats.items, icon: <FaBoxOpen /> },
    { label: "Total Orders", value: stats.orders, icon: <FaClipboardList /> },
    { label: "Total Users", value: stats.users, icon: <FaUsers /> },
    {
      label: "Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: <FaRupeeSign />,
    },
  ];

  return (
    <DashboardLayout>
      <h3 className="mb-3">Dashboard</h3>
      <Row className="g-3">
        {cards.map((c) => (
          <Col key={c.label} sm={6} lg={3}>
            <div className="stat-card d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted">{c.label}</div>
                <div className="stat-value">{c.value}</div>
              </div>
              <div style={{ fontSize: "1.8rem", color: "#febd69" }}>{c.icon}</div>
            </div>
          </Col>
        ))}
      </Row>
    </DashboardLayout>
  );
}
