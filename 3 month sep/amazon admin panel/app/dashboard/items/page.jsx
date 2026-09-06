// ============================================================
// ALL ITEMS LIST (ADMIN)
// Lists every item with thumbnail, price, stock and actions to
// edit or delete. Uses GET/DELETE /api/admin/items.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

export default function AllItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/items");
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/admin/items/${id}`);
    await load();
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">All Items</h3>
        <Link href="/dashboard/items/create">
          <Button className="btn-amazon-yellow rounded-pill">
            <FaPlus className="me-1" /> Create Item
          </Button>
        </Link>
      </div>

      <div className="panel">
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted mb-0">No items yet. Create your first item.</p>
        ) : (
          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.image} alt={item.title} className="thumb" />
                  </td>
                  <td style={{ maxWidth: 280 }}>{item.title}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price?.toLocaleString("en-IN")}</td>
                  <td>{item.stock}</td>
                  <td className="text-end">
                    <Link href={`/dashboard/items/${item._id}/edit`}>
                      <Button size="sm" variant="outline-secondary" className="me-2">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => remove(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
