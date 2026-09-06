// ============================================================
// ADMIN ROOT LAYOUT
// Loads Bootstrap, wraps app in AdminProvider.
// (Navbar + sidebar are rendered inside the dashboard layout
//  so they don't appear on the login page.)
// ============================================================

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "Amazon Clone - Admin Panel",
  description: "Super admin panel built with Next.js + React Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
