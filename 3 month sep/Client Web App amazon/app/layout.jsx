// ============================================================
// ROOT LAYOUT
// Loads Bootstrap CSS, wraps app in AppProvider, and shows
// the Amazon-style Navbar + Footer on every page.
// ============================================================

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Amazon Clone - Shop Online",
  description: "Customer storefront built with Next.js + React Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main style={{ minHeight: "80vh" }}>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
