import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export const metadata = {
  title: "Access Restricted | ALPHA WAVE Business Explorer",
  description: "You do not have permission to access this area.",
};

export default function UnauthorizedPage() {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <Link href="/" className="auth-brand">
          <span className="auth-brand-mark">AW</span>
          <span>
            <strong>ALPHA WAVE</strong>
            <small>BUSINESS EXPLORER</small>
          </span>
        </Link>

        <section className="auth-card unauthorized-card">
          <div className="unauthorized-icon">
            <ShieldAlert size={38} strokeWidth={1.7} />
          </div>

          <span className="eyebrow">ACCESS RESTRICTED</span>

          <h1>Permission required</h1>

          <p>
            You do not currently have permission to view this page.
            If you believe this is a mistake, contact the platform
            administrator.
          </p>

          <div className="unauthorized-actions">
            <Link href="/" className="button button-primary">
              <Home size={17} />
              Go to homepage
            </Link>

            <Link href="/login" className="button button-secondary">
              <ArrowLeft size={17} />
              Sign in
            </Link>
          </div>
        </section>

        <p className="auth-legal">
          ALPHA WAVE — CREATE • COMPETE • CONNECT • EVOLVE
        </p>
      </div>
    </main>
  );
}