// ============================================================
// ADMIN NAVBAR
// Top bar for the admin panel: logo, "Admin" badge, admin name
// and a sign-out button.
// ============================================================

"use client";

import { Container, Button } from "react-bootstrap";
import { useAdmin } from "@/context/AdminContext";

export default function AdminNavbar() {
  const { admin, logout } = useAdmin();

  return (
    <div className="admin-navbar py-2">
      <Container fluid className="d-flex align-items-center">
        <span className="admin-logo me-2">
          amazon<span>.clone</span>
        </span>
        <span className="admin-badge">SELLER / ADMIN</span>

        <div className="ms-auto d-flex align-items-center gap-3">
          <span style={{ fontSize: "0.85rem" }}>
            {admin?.name || "Super Admin"}
          </span>
          <Button size="sm" variant="outline-light" onClick={logout}>
            Sign out
          </Button>
        </div>
      </Container>
    </div>
  );
}
