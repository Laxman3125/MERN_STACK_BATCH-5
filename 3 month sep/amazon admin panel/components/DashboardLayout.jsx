// ============================================================
// DASHBOARD LAYOUT
// Shared shell for all protected admin pages. Redirects to the
// login page if no admin is logged in, otherwise shows the
// navbar + sidebar + page content.
// ============================================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, Spinner } from "react-bootstrap";
import { useAdmin } from "@/context/AdminContext";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const { admin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) router.push("/");
  }, [loading, admin]);

  if (loading || !admin) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <Row className="g-0">
        <Col xs={12} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={12} md={9} lg={10} className="p-3">
          {children}
        </Col>
      </Row>
    </>
  );
}
