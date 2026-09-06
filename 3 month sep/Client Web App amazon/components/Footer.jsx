// ============================================================
// FOOTER
// Amazon-style footer: "back to top" bar + dark info section.
// ============================================================

"use client";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top" onClick={() => window.scrollTo(0, 0)}>
        Back to top
      </div>
      <div className="footer-main text-center">
        <div className="amazon-logo mb-3">
          amazon<span>.clone</span>
        </div>
        <p className="mb-1">
          Get to Know Us · Connect with Us · Make Money with Us · Let Us Help You
        </p>
        <p className="mb-0" style={{ fontSize: "0.75rem", color: "#999" }}>
          © {new Date().getFullYear()} Amazon Clone. Built for learning with
          Next.js + React Bootstrap.
        </p>
      </div>
    </footer>
  );
}
