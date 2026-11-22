
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";

export default async function AdminFeedbackPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to Admin Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            ALPHA WAVE · QUALITY CONTROL
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Feedback Management
          </h1>

          <p className="mt-2 text-slate-600">
            Review user suggestions, reported errors and research corrections.
          </p>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Feedback records</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
            <p className="mt-1 text-xs text-slate-500">
              Database integration pending
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Awaiting review</p>
            <p className="mt-2 text-2xl font-bold text-amber-700">—</p>
            <p className="mt-1 text-xs text-slate-500">
              Status field not yet verified
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Resolved</p>
            <p className="mt-2 text-2xl font-bold text-green-700">—</p>
            <p className="mt-1 text-xs text-slate-500">
              Moderation workflow pending
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Feedback database connection pending
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900">
            The research_feedback table exists in the database, but its exact
            columns and status values have not yet been confirmed. This page
            intentionally does not make assumptions about that structure.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Planned moderation workflow
          </h2>

          <div className="mt-5 space-y-4">
            {[
              {
                number: "01",
                title: "Receive feedback",
                description:
                  "Collect user suggestions, corrections and reports.",
              },
              {
                number: "02",
                title: "Review evidence",
                description:
                  "Check the relevant business profile and supporting sources.",
              },
              {
                number: "03",
                title: "Record a decision",
                description:
                  "Track whether the report is accepted, rejected or needs more information.",
              },
              {
                number: "04",
                title: "Update research",
                description:
                  "Correct the affected content and retain an appropriate research history.",
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Link
            href="/feedback"
            className="inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            View public feedback page →
          </Link>
        </div>
      </div>
    </main>
  );
}
