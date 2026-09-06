// ============================================================
// NAVBAR
// Amazon-style top bar: logo, search box, account menu, cart.
// Plus the dark sub-navigation strip with categories.
// ============================================================

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, Form, Button, NavDropdown } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { user, logout, cartCount } = useApp();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(search ? `/?search=${encodeURIComponent(search)}` : "/");
  };

  return (
    <header>
      {/* ---- Main top bar ---- */}
      <div className="amazon-navbar py-2">
        <Container fluid className="d-flex align-items-center gap-2 flex-wrap">
          {/* Logo */}
          <Link href="/" className="amazon-logo me-2">
            amazon<span>.clone</span>
          </Link>

          {/* Deliver to */}
          <div className="nav-block d-none d-md-flex align-items-end">
            <FaMapMarkerAlt className="me-1 mb-1" />
            <div>
              <small>Deliver to</small>
              <span className="bold">India</span>
            </div>
          </div>

          {/* Search */}
          <Form className="flex-grow-1 d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search Amazon.clone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-0 rounded-start border-0"
            />
            <Button type="submit" className="search-btn rounded-0 rounded-end">
              <FaSearch />
            </Button>
          </Form>

          {/* Account */}
          <div className="nav-block">
            {user ? (
              <NavDropdown
                title={
                  <span style={{ color: "#fff" }}>
                    <small style={{ display: "block", fontSize: "0.72rem" }}>
                      Hello, {user.name?.split(" ")[0]}
                    </small>
                    <span className="bold">Account & Lists</span>
                  </span>
                }
                id="account-menu"
              >
                <NavDropdown.Item as={Link} href="/orders">
                  Your Orders
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href="/login" style={{ color: "#fff" }}>
                <small>Hello, sign in</small>
                <span className="bold d-block">Account & Lists</span>
              </Link>
            )}
          </div>

          {/* Orders */}
          <Link href="/orders" className="nav-block d-none d-lg-block">
            <small>Returns</small>
            <span className="bold">& Orders</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="nav-block d-flex align-items-center position-relative"
          >
            <FaShoppingCart size={26} />
            <span
              className="position-absolute"
              style={{
                top: "-2px",
                left: "16px",
                color: "var(--amazon-yellow)",
                fontWeight: 700,
              }}
            >
              {cartCount}
            </span>
            <span className="bold ms-1">Cart</span>
          </Link>
        </Container>
      </div>

      {/* ---- Sub navigation ---- */}
      <div className="amazon-subnav py-1">
        <Container fluid className="d-flex gap-3 flex-wrap px-3">
          <span className="nav-block">☰ All</span>
          {["Electronics", "Mobiles", "Books", "Fashion", "Today's Deals"].map(
            (c) => (
              <Link
                key={c}
                href={`/?category=${encodeURIComponent(c)}`}
                style={{ color: "#fff" }}
              >
                {c}
              </Link>
            )
          )}
        </Container>
      </div>
    </header>
  );
}
