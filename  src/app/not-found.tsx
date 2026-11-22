import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Search,
} from "lucide-react";

export default function NotFound() {
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

        <section className="auth-card not-found-card">
          <div className="not-found-visual">
            <Compass size={48} strokeWidth={1.4} />
            <span>404</span>
          </div>

          <span className="eyebrow">PAGE NOT FOUND</span>

          <h1>This page doesn't exist</h1>

          <p>
            The page you're looking for may have been moved,
            removed or may never have existed.
          </p>

          <div className="unauthorized-actions">
            <Link href="/" className="button button-primary">
              <ArrowLeft size={17} />
              Back to homepage
            </Link>

            <Link href="/businesses" className="button button-secondary">
              <Search size={17} />
              Explore businesses
            </Link>
          </div>
        </section>

        <p className="auth-legal">
          CREATE • COMPETE • CONNECT • EVOLVE
        </p>
      </div>
    </main>
  );
}