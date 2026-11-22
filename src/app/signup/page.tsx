"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "@/app/actions/auth";

const initialState = {
  error: "",
  success: "",
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
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
            <span className="eyebrow">JOIN ALPHA WAVE</span>
            <h1>Create your account</h1>
            <p>
              Create an account to save business ideas and organise your
              research.
            </p>
          </div>

          <form action={formAction} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                minLength={2}
                maxLength={80}
                required
              />
            </div>

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
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
              />
              <small className="form-hint">
                Use at least 8 characters.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                autoComplete="new-password"
                minLength={8}
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
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link href="/login">Sign in</Link>
            </p>
          </div>
        </section>

        <p className="auth-legal">
          Keep your account credentials private. Never share your password.
        </p>
      </div>
    </main>
  );
}