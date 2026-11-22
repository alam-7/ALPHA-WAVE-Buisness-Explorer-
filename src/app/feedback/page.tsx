"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquareText,
  Send,
  ShieldCheck,
  Info,
} from "lucide-react";

const feedbackTypes = [
  "Incorrect information",
  "Outdated information",
  "Missing research source",
  "Incorrect investment estimate",
  "Supplier information issue",
  "Compliance or regulatory issue",
  "Other feedback",
];

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState(
    feedbackTypes[0]
  );
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // This version validates the form locally.
    // Database submission will be connected after schema verification.
    if (message.trim().length < 15) return;

    setSubmitted(true);
  }

  function resetForm() {
    setFeedbackType(feedbackTypes[0]);
    setBusinessName("");
    setMessage("");
    setEmail("");
    setSubmitted(false);
  }

  return (
    <main className="page-container workspace-page">
      <div className="workspace-back">
        <Link href="/">
          <ArrowLeft size={17} />
          Back to homepage
        </Link>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">RESEARCH QUALITY</span>
          <h1>Research Feedback Centre</h1>
          <p>
            Help improve the accuracy, transparency and usefulness
            of ALPHA WAVE business research.
          </p>
        </div>

        <div className="workspace-user-icon">
          <MessageSquareText size={36} />
        </div>
      </section>

      <section className="research-intro">
        <div className="research-intro-icon">
          <ShieldCheck size={25} />
        </div>

        <div>
          <h2>Your feedback matters</h2>
          <p>
            Report research errors, outdated figures, missing
            references or information that needs further verification.
            Include enough detail to help a reviewer investigate
            the issue.
          </p>
        </div>
      </section>

      <section className="calculator-panel feedback-panel">
        {submitted ? (
          <div className="feedback-success">
            <div className="research-intro-icon">
              <ShieldCheck size={28} />
            </div>

            <h2>Feedback form validated</h2>

            <p>
              Your information passed the local form checks.
              It has not yet been submitted to the ALPHA WAVE
              database because the database integration is
              pending schema verification.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={resetForm}
            >
              Submit another feedback report
            </button>
          </div>
        ) : (
          <>
            <div className="calculator-panel-heading">
              <MessageSquareText size={22} />
              <div>
                <h2>Submit research feedback</h2>
                <p>
                  Describe the issue clearly and provide relevant details.
                </p>
              </div>
            </div>

            <form
              className="auth-form feedback-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="feedbackType">
                  Feedback category
                </label>

                <select
                  id="feedbackType"
                  value={feedbackType}
                  onChange={(event) =>
                    setFeedbackType(event.target.value)
                  }
                >
                  {feedbackTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="businessName">
                  Business name or report reference
                </label>

                <input
                  id="businessName"
                  value={businessName}
                  onChange={(event) =>
                    setBusinessName(event.target.value)
                  }
                  placeholder="Enter the business or report name"
                  maxLength={150}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Describe the issue
                </label>

                <textarea
                  id="message"
                  rows={7}
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Explain what needs correction or further investigation..."
                  minLength={15}
                  maxLength={3000}
                  required
                />

                <small className="form-hint">
                  {message.length}/3000 characters. Minimum 15 characters.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Contact email (optional)
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  maxLength={254}
                />

                <small className="form-hint">
                  Do not include passwords or sensitive personal information.
                </small>
              </div>

              <button
                type="submit"
                className="button button-primary auth-submit"
                disabled={message.trim().length < 15}
              >
                <Send size={17} />
                Validate feedback
              </button>
            </form>
          </>
        )}
      </section>

      <section className="workspace-note">
        <h2>What happens next?</h2>

        <ul>
          <li>Feedback should be reviewed by an authorised researcher.</li>
          <li>Relevant claims should be checked against supporting evidence.</li>
          <li>Corrections should include a review date and source.</li>
          <li>Unverified information should remain clearly labelled.</li>
        </ul>
      </section>

      <div className="calculator-disclaimer">
        <Info size={18} />
        <p>
          This page currently provides local form validation only.
          It does not transmit or permanently store feedback.
          Supabase submission, review status and administrator
          notifications must be integrated and tested separately.
        </p>
      </div>
    </main>
  );
}