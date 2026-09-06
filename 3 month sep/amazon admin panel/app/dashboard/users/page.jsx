// ============================================================
// USERS & THEIR ITEMS (ADMIN)
// Left: list of all customers (GET /api/admin/users).
// Right: when a user is selected, shows the items they have
// ordered (GET /api/admin/users/:id/items).
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Table, Spinner, Badge } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    api
      .get("/admin/users")
      .then(({ data }) => setUsers(data))
      .finally(() => setLoadingUsers(false));
  }, []);

  const selectUser = async (user) => {
    setSelected(user);
    setLoadingItems(true);
    try {
      const { data } = await api.get(`/admin/users/${user._id}/items`);
      setItems(data);
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <DashboardLayout>
      <h3 className="mb-3">Users &amp; Their Items</h3>
      <Row className="g-3">
        {/* User list */}
        <Col md={4}>
          <div className="panel">
            <h6 className="text-muted">Customers ({users.length})</h6>
            {loadingUsers ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <ListGroup variant="flush">
                {users.map((u) => (
                  <ListGroup.Item
                    key={u._id}
                    action
                    active={selected?._id === u._id}
                    onClick={() => selectUser(u)}
                  >
                    <div className="fw-bold">{u.name}</div>
                    <small className="text-muted">{u.email}</small>
                  </ListGroup.Item>
                ))}
                {users.length === 0 && (
                  <p className="text-muted mb-0">No users yet.</p>
                )}
              </ListGroup>
            )}
          </div>
        </Col>

        {/* Selected user's ordered items */}
        <Col md={8}>
          <div className="panel">
            {!selected ? (
              <p className="text-muted mb-0">
                Select a customer to see the items they ordered.
              </p>
            ) : (
              <>
                <h6>
                  Items ordered by <strong>{selected.name}</strong>
                </h6>
                {loadingItems ? (
                  <Spinner animation="border" size="sm" />
                ) : items.length === 0 ? (
                  <p className="text-muted mb-0">
                    This user has not ordered anything yet.
                  </p>
                ) : (
                  <Table hover responsive className="align-middle">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((it, idx) => (
                        <tr key={idx}>
                          <td>
                            <img src={it.image} alt={it.title} className="thumb" />
                          </td>
                          <td>{it.title}</td>
                          <td>{it.quantity}</td>
                          <td>₹{it.price?.toLocaleString("en-IN")}</td>
                          <td>
                            <Badge bg="success">{it.orderStatus}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
