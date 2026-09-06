// ============================================================
// SIDEBAR
// Left navigation for the admin panel with links to each
// management page. Highlights the active route.
// ============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaThLarge,
  FaBoxOpen,
  FaPlusCircle,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <FaThLarge /> },
  { href: "/dashboard/items", label: "All Items", icon: <FaBoxOpen /> },
  { href: "/dashboard/items/create", label: "Create Item", icon: <FaPlusCircle /> },
  { href: "/dashboard/orders", label: "Orders", icon: <FaClipboardList /> },
  { href: "/dashboard/users", label: "Users & Items", icon: <FaUsers /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={pathname === l.href ? "active" : ""}
        >
          <span className="me-2">{l.icon}</span>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
