import type { Metadata } from "next";
import Link from "next/link";

import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Business Categories",
  description:
    "Explore 10 business sectors and discover business opportunities across India."
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="brand">
            <span className="brand-mark">A</span>
            <span>
              <span className="brand-name block">ALPHA WAVE</span>
              <span className="brand-tagline">
                CREATE • COMPETE • CONNECT • EVOLVE
              </span>
            </span>
          </Link>

          <Link href="/businesses" className="btn btn-primary">
            Explore businesses
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600"
          >
            ← Back to home
          </Link>

          <p className="eyebrow mt-8">
            INDUSTRY DIRECTORY
          </p>

          <h1 className="mt-2">
            Explore business categories
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Explore business sectors, understand different
            industries and discover opportunities through
            structured research.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
              {categories.length} active categories
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              Initial market: India
            </span>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="empty-state">
            <h2 className="empty-state-title">
              No categories available
            </h2>

            <p className="empty-state-description">
              No active categories were returned by the database.
              Please check the Supabase connection.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-xl text-blue-700">
                    {category.icon ?? "◈"}
                  </span>

                  <span className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-6 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                  {category.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                  {category.description ??
                    "Explore business models and opportunities in this sector."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">
                    Explore category
                  </span>

                  <span className="text-lg text-blue-600 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-xl font-bold text-slate-900">
            Research before you invest
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Every business opportunity should be evaluated
            through market demand, investment requirements,
            operational feasibility, regulations and risks.
            Research estimates are not guaranteed business outcomes.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <span className="text-sm font-extrabold tracking-wider">
            ALPHA WAVE
          </span>

          <span className="text-xs text-slate-500">
            CREATE • COMPETE • CONNECT • EVOLVE
          </span>
        </div>
      </footer>
    </main>
  );
}