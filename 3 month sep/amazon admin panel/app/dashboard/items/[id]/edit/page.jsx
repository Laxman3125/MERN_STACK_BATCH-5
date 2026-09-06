// ============================================================
// EDIT ITEM PAGE (ADMIN)
// Loads an item by id, shows it in the shared ItemForm, and
// saves changes via PUT /api/admin/items/:id.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Spinner } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import ItemForm from "@/components/ItemForm";
import api from "@/lib/api";

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/admin/items/${id}`)
      .then(({ data }) => setItem(data))
      .catch(() => setError("Item not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data) => {
    setError("");
    setSubmitting(true);
    try {
      await api.put(`/admin/items/${id}`, data);
      router.push("/dashboard/items");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <h3 className="mb-3">Edit Item</h3>
      <div className="panel">
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          item && (
            <ItemForm
              initial={item}
              onSubmit={handleUpdate}
              submitting={submitting}
            />
          )
        )}
      </div>
    </DashboardLayout>
  );
}
