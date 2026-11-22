
import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "ALPHA WAVE Business Explorer",
  description:
    "Explore business opportunities, industries and research across 10 categories.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
            CREATE • COMPETE • CONNECT • EVOLVE
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Discover Your Next
            <span className="block text-blue-300">
              Business Opportunity.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Explore business ideas, understand industries, evaluate
            opportunities and learn what it takes to build a business.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#categories"
              className="rounded-lg bg-white px-6 py-3 font-bold text-blue-950 transition hover:bg-blue-50"
            >
              Explore Categories →
            </a>

            <Link
              href="/businesses"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Explore industries
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Explore All Categories
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Choose an industry to explore its business opportunities and
              research.
            </p>
          </div>

          <Link
            href="/categories"
            className="font-semibold text-blue-700 hover:text-blue-900"
          >
            View all categories →
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h3 className="font-bold text-slate-900">
              Categories are currently unavailable
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Please check the database connection and active category records.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {category.icon || "▦"}
                </span>

                <h3 className="mt-5 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
                  {category.name}
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
                  {category.description || "Explore business opportunities in this industry."}
                </p>

                <span className="mt-5 text-sm font-bold text-blue-700">
                  Explore category →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Your business research journey
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              From idea to informed planning
            </h2>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Explore",
                description:
                  "Browse industries and discover different business opportunities.",
              },
              {
                number: "02",
                title: "Research",
                description:
                  "Study customers, competitors, costs, operations and risks.",
              },
              {
                number: "03",
                title: "Plan",
                description:
                  "Use financial calculators and practical planning resources.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <span className="text-sm font-extrabold text-blue-700">
                  {step.number}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        <p className="font-bold tracking-wider text-white">ALPHA WAVE</p>
        <p className="mt-2">CREATE • COMPETE • CONNECT • EVOLVE</p>
        <p className="mt-4">
          Business Explorer · Research, learn and plan responsibly.
        </p>
      </footer>
    </main>
  );
}
