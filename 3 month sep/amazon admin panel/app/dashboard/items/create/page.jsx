// ============================================================
// CREATE ITEM PAGE (ADMIN)
// Uses the shared ItemForm and POST /api/admin/items to add a
// new product, then redirects to the items list.
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "react-bootstrap";
import DashboardLayout from "@/components/DashboardLayout";
import ItemForm from "@/components/ItemForm";
import api from "@/lib/api";

export default function CreateItemPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data) => {
    setError("");
    setSubmitting(true);
    try {
      await api.post("/admin/items", data);
      router.push("/dashboard/items");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <h3 className="mb-3">Create Item</h3>
      <div className="panel">
        {error && <Alert variant="danger">{error}</Alert>}
        <ItemForm onSubmit={handleCreate} submitting={submitting} />
      </div>
    </DashboardLayout>
  );
}
