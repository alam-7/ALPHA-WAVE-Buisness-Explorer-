"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

const initialState = {
  error: "",
  success: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

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

        <section className="auth-card">
          <div className="auth-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h1>Sign in to your account</h1>
            <p>
              Access your saved business ideas, research and workspace.
            </p>
          </div>

          <form action={formAction} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {state.error && (
              <div className="auth-message auth-error" role="alert">
                {state.error}
              </div>
            )}

            {state.success && (
              <div className="auth-message auth-success" role="status">
                {state.success}
              </div>
            )}

            <button
              type="submit"
              className="button button-primary auth-submit"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link href="/signup">Create an account</Link>
            </p>
          </div>
        </section>

        <p className="auth-legal">
          By continuing, you agree to use ALPHA WAVE Business Explorer
          responsibly.
        </p>
      </div>
    </main>
  );
}