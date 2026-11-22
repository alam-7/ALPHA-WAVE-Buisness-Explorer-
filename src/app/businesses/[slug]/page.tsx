import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBusinessResearch } from "@/lib/data/business-research";

interface BusinessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function VerificationBadge({
  status
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    officially_verified: "bg-green-100 text-green-800",
    published_estimate: "bg-blue-100 text-blue-800",
    research_estimate: "bg-amber-100 text-amber-800",
    illustrative_assumption: "bg-purple-100 text-purple-800",
    not_verified: "bg-slate-100 text-slate-700"
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? styles.not_verified
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

export async function generateMetadata({
  params
}: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const research = await getBusinessResearch(slug);

  if (!research) {
    return {
      title: "Business Not Found"
    };
  }

  return {
    title: research.business.name,
    description:
      research.business.short_description ??
      `Research and business information about ${research.business.name}.`
  };
}

export default async function BusinessDetailPage({
  params
}: BusinessPageProps) {
  const { slug } = await params;

  const research = await getBusinessResearch(slug);

  if (!research) {
    notFound();
  }

  const {
    business,
    category,
    sections,
    sources,
    claims
  } = research;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <Link href="/" className="brand">
            <span className="brand-mark">A</span>

            <span>
              <span className="brand-name block">
                ALPHA WAVE
              </span>

              <span className="brand-tagline">
                CREATE • COMPETE • CONNECT • EVOLVE
              </span>
            </span>
          </Link>

          <Link
            href="/businesses"
            className="btn btn-secondary"
          >
            All businesses
          </Link>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          {" / "}

          <Link
            href="/categories"
            className="hover:text-blue-600"
          >
            Categories
          </Link>

          {" / "}

          <Link
            href={`/categories/${category.slug}`}
            className="hover:text-blue-600"
          >
            {category.name}
          </Link>

          {" / "}

          <span className="font-semibold text-slate-800">
            {business.name}
          </span>
        </nav>

        {/* Business introduction */}
        <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-7 md:p-12">

          <div className="flex flex-wrap items-center gap-3">
            <span className="status status-verified">
              Published research
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
              {category.name}
            </span>
          </div>

          <p className="eyebrow mt-7">
            BUSINESS RESEARCH PROFILE
          </p>

          <h1 className="max-w-4xl">
            {business.name}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {business.short_description ??
              "Explore this business model, its operations and relevant industry research."}
          </p>

          {business.research_summary && (
            <div className="mt-8 max-w-4xl rounded-xl border border-blue-100 bg-white p-5">
              <h2 className="text-sm font-bold">
                Research overview
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {business.research_summary}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            <span className="rounded-lg bg-white px-4 py-3">
              Country: {business.country}
            </span>

            {business.industry && (
              <span className="rounded-lg bg-white px-4 py-3">
                Industry: {business.industry}
              </span>
            )}
          </div>

        </section>

        {/* Key information */}
        <section className="mt-10">

          <h2 className="mb-5">
            Business overview
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <div className="card">
              <p className="stat-label">
                Business model
              </p>

              <p className="mt-3 text-sm font-semibold">
                {business.business_model ?? "Not yet documented"}
              </p>
            </div>

            <div className="card">
              <p className="stat-label">
                Target customers
              </p>

              <p className="mt-3 text-sm font-semibold">
                {business.target_customers ?? "Not yet documented"}
              </p>
            </div>

            <div className="card">
              <p className="stat-label">
                Research status
              </p>

              <p className="mt-3 text-sm font-semibold capitalize">
                {formatStatus(business.research_status)}
              </p>
            </div>

          </div>

        </section>

        {/* Investment information */}
        <section className="mt-10">

          <div className="card">

            <h2 className="text-xl">
              Investment overview
            </h2>

            {business.investment_min !== null &&
            business.investment_max !== null ? (
              <>
                <p className="mt-5 text-2xl font-bold text-blue-700">
                  {formatCurrency(
                    business.investment_min,
                    business.investment_currency
                  )}
                  {" – "}
                  {formatCurrency(
                    business.investment_max,
                    business.investment_currency
                  )}
                </p>

                <div className="mt-4">
                  <VerificationBadge
                    status={business.investment_status}
                  />
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Investment figures have not yet been established
                for this business profile.
              </p>
            )}

            {business.investment_basis && (
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Basis: {business.investment_basis}
              </p>
            )}

            <p className="mt-4 text-xs leading-6 text-slate-500">
              Investment figures are estimates unless supported
              by appropriate evidence. Actual costs depend on
              location, capacity, equipment and operating conditions.
            </p>

          </div>

        </section>

        {/* Executive summary */}
        {business.executive_summary && (
          <section className="report-section mt-10">
            <p className="eyebrow">
              SECTION 01
            </p>

            <h2>Executive summary</h2>

            <p className="whitespace-pre-line leading-8">
              {business.executive_summary}
            </p>
          </section>
        )}

        {/* Research sections */}
        <section className="mt-12">

          <div className="mb-7">
            <p className="eyebrow">
              DETAILED BUSINESS RESEARCH
            </p>

            <h2>Research report</h2>

            <p className="page-description">
              Structured business information and supporting
              evidence.
            </p>
          </div>

          {sections.length > 0 ? (
            <div className="space-y-5">

              {sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.section_key}
                  className="report-section"
                >

                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="eyebrow">
                        SECTION {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2>{section.title}</h2>
                    </div>

                    <VerificationBadge
                      status={section.verification_status}
                    />

                  </div>

                  <p className="whitespace-pre-line leading-8">
                    {section.content ??
                      "Information for this section has not yet been added."}
                  </p>

                  {section.last_reviewed_at && (
                    <p className="mt-5 text-xs text-slate-400">
                      Last reviewed:{" "}
                      {new Date(
                        section.last_reviewed_at
                      ).toLocaleDateString("en-IN")}
                    </p>
                  )}

                </article>
              ))}

            </div>
          ) : (
            <div className="empty-state">
              <h3 className="empty-state-title">
                Detailed research is being prepared
              </h3>

              <p className="empty-state-description">
                Research sections have not yet been added
                to this business profile.
              </p>
            </div>
          )}

        </section>

        {/* Research claims */}
        <section className="mt-12">

          <h2 className="mb-5">
            Evidence and verification
          </h2>

          {claims.length > 0 ? (
            <div className="space-y-3">

              {claims.map((claim) => (
                <article
                  key={claim.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {formatStatus(claim.claim_type)}
                    </span>

                    <VerificationBadge
                      status={claim.evidence_status}
                    />

                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {claim.claim_text}
                  </p>

                  {claim.checked_at && (
                    <p className="mt-3 text-xs text-slate-400">
                      Checked:{" "}
                      {new Date(
                        claim.checked_at
                      ).toLocaleDateString("en-IN")}
                    </p>
                  )}

                  {claim.notes && (
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {claim.notes}
                    </p>
                  )}

                </article>
              ))}

            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">
                No individual research claims recorded
              </p>

              <p className="empty-state-description">
                Evidence records will appear when claims
                and their verification information are added.
              </p>
            </div>
          )}

        </section>

        {/* Sources */}
        <section className="mt-12">

          <h2 className="mb-5">
            Research sources
          </h2>

          {sources.length > 0 ? (
            <div className="space-y-3">

              {sources.map((source) => (
                <article
                  key={source.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <h3 className="text-sm font-bold">
                      {source.title}
                    </h3>

                    <VerificationBadge
                      status={
                        source.verification_status === "verified"
                          ? "officially_verified"
                          : "not_verified"
                      }
                    />

                  </div>

                  {source.publisher && (
                    <p className="mt-2 text-xs text-slate-500">
                      Publisher: {source.publisher}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    Source type: {formatStatus(source.source_type)}
                  </p>

                  <a
                    href={source.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block break-all text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Open original source →
                  </a>

                  {source.accessed_at && (
                    <p className="mt-3 text-xs text-slate-400">
                      Accessed:{" "}
                      {new Date(
                        source.accessed_at
                      ).toLocaleDateString("en-IN")}
                    </p>
                  )}

                </article>
              ))}

            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">
                Sources have not been added yet
              </p>

              <p className="empty-state-description">
                Supporting references will appear here when
                they are added and reviewed.
              </p>
            </div>
          )}

        </section>

        {/* Research review information */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-7">

          <h2 className="text-lg">
            Research review history
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Last reviewed
              </p>

              <p className="mt-2 font-bold text-slate-800">
                {business.research_reviewed_at
                  ? new Date(
                      business.research_reviewed_at
                    ).toLocaleDateString("en-IN")
                  : "Not recorded"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Next scheduled review
              </p>

              <p className="mt-2 font-bold text-slate-800">
                {business.research_next_review_at
                  ? new Date(
                      business.research_next_review_at
                    ).toLocaleDateString("en-IN")
                  : "Not scheduled"}
              </p>
            </div>

          </div>

        </section>

        {/* Disclaimer */}
        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">

          <h3 className="font-bold">
            Important information
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This report is intended for general educational
            and business research purposes. Estimates and
            assumptions should not be treated as guaranteed
            financial outcomes. Verify applicable laws,
            licences, costs and market conditions independently
            before making business decisions.
          </p>

        </section>

        <div className="mt-10">
          <Link
            href="/businesses"
            className="btn btn-secondary"
          >
            ← Back to business directory
          </Link>
        </div>

      </div>

      <footer className="border-t border-slate-200 bg-white px-5 py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">

          <strong className="tracking-wider">
            ALPHA WAVE
          </strong>

          <span className="text-xs text-slate-500">
            CREATE • COMPETE • CONNECT • EVOLVE
          </span>

        </div>
      </footer>

    </main>
  );
}