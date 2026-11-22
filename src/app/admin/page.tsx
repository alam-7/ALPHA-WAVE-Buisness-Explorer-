
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/session";

type StatCardProps = {
  title: string;
  value: number | string;
  description: string;
};

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function AdminLink({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
    >
      <div>
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
          {title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <span className="text-xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
        →
      </span>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const supabase = await createClient();

  const [
    businessesResult,
    publishedResult,
    categoriesResult,
    sourcesResult,
    claimsResult,
    feedbackResult,
  ] = await Promise.all([
    supabase.from("businesses").select("*", { count: "exact", head: true }),
    supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("research_sources")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("research_claims")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("research_feedback")
      .select("*", { count: "exact", head: true }),
  ]);

  const results = [
    businessesResult,
    publishedResult,
    categoriesResult,
    sourcesResult,
    claimsResult,
    feedbackResult,
  ];

  const hasError = results.some((result) => result.error);

  const count = (value: number | null) => value ?? 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              ALPHA WAVE · CONTROL CENTRE
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage business profiles, research quality and platform content.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            View website →
          </Link>
        </div>

        {hasError && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
          >
            Some dashboard statistics could not be loaded. Check the database
            permissions and table configuration.
          </div>
        )}

        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Platform overview
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total business profiles"
              value={count(businessesResult.count)}
              description="All records in the businesses table"
            />
            <StatCard
              title="Published businesses"
              value={count(publishedResult.count)}
              description="Profiles currently marked as published"
            />
            <StatCard
              title="Business categories"
              value={count(categoriesResult.count)}
              description="Available category records"
            />
            <StatCard
              title="Research sources"
              value={count(sourcesResult.count)}
              description="Sources recorded in the database"
            />
            <StatCard
              title="Research claims"
              value={count(claimsResult.count)}
              description="Research statements recorded"
            />
            <StatCard
              title="Feedback submissions"
              value={count(feedbackResult.count)}
              description="Feedback records received"
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Management
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <AdminLink
              title="Business profiles"
              description="Review and manage business opportunity records."
              href="/admin/businesses"
            />
            <AdminLink
              title="Research management"
              description="Manage research sources, claims and verification."
              href="/admin/research"
            />
            <AdminLink
              title="Feedback management"
              description="Review user feedback and correction requests."
              href="/admin/feedback"
            />
            <AdminLink
              title="Categories"
              description="Review the business category structure."
              href="/categories"
            />
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-bold text-slate-900">
            Research quality reminder
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Do not publish unverified investment figures, supplier quotations,
            financial projections or regulatory claims as confirmed facts.
            Record sources, dates and evidence before publishing research.
          </p>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-5 text-sm text-slate-500">
          ALPHA WAVE Business Explorer · Administration
        </footer>
      </div>
    </main>
  );
}
