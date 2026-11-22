import Link from "next/link";

import { getCategories } from "@/lib/data/categories";
import { getFeaturedBusinesses } from "@/lib/data/businesses";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let categories = [];
  let featuredBusinesses = [];
  let databaseError = false;

  try {
    [categories, featuredBusinesses] = await Promise.all([
      getCategories(),
      getFeaturedBusinesses(6)
    ]);
  } catch (error) {
    console.error("Homepage database error:", error);
    databaseError = true;
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="brand">
            <span className="brand-mark">A</span>
            <span>
              <span className="brand-name block">ALPHA WAVE</span>
              <span className="brand-tagline">
                CREATE • COMPETE • CONNECT • EVOLVE
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/businesses" className="hover:text-blue-600">
              Explore Businesses
            </Link>
            <Link href="/categories" className="hover:text-blue-600">
              Categories
            </Link>
            <Link href="/calculators" className="hover:text-blue-600">
              Calculators
            </Link>
          </nav>

          <Link href="/login" className="btn btn-primary">
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">
              ALPHA WAVE BUSINESS EXPLORER
            </p>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Discover opportunities.
              <span className="text-blue-600">
                {" "}Build your future.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Explore business models, understand industries,
              evaluate opportunities and develop informed
              business plans with structured research.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/businesses" className="btn btn-primary">
                Explore businesses →
              </Link>

              <Link href="/categories" className="btn btn-secondary">
                Browse categories
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Research and educational platform. Business outcomes
              and financial estimates are not guaranteed.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-bold tracking-widest text-blue-600">
              EXPLORE • ANALYSE • PLAN
            </p>

            <h2 className="mt-5 text-3xl font-bold text-slate-900">
              Your business research workspace.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Access organised industry information,
              business models, research sources and
              planning tools in one place.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4">
                <p className="text-2xl font-bold text-blue-700">
                  10
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Business categories
                </p>
              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="text-2xl font-bold text-blue-700">
                  India
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Initial market
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Database status */}
      {databaseError && (
        <section className="mx-auto max-w-7xl px-5 pt-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Business data could not be loaded. Check your
            Supabase environment configuration and database connection.
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="page-heading">
          <div>
            <p className="eyebrow">EXPLORE INDUSTRIES</p>
            <h2>Business categories</h2>
            <p className="page-description">
              Discover opportunities across 10 business sectors.
            </p>
          </div>

          <Link
            href="/categories"
            className="text-sm font-bold text-blue-600"
          >
            View all →
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="category-card"
              >
                <span className="category-icon">
                  {category.icon ?? "◈"}
                </span>

                <div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {category.description ?? "Explore this business sector."}
                  </p>
                </div>

                <span className="mt-4 text-xs font-bold text-blue-600">
                  Explore sector →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-state-title">
              Categories are not available yet.
            </p>
            <p className="empty-state-description">
              Check the database connection and try again.
            </p>
          </div>
        )}
      </section>

      {/* Featured businesses */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="page-heading">
            <div>
              <p className="eyebrow">BUSINESS DISCOVERY</p>
              <h2>Featured opportunities</h2>
              <p className="page-description">
                Explore published business profiles supported by research.
              </p>
            </div>

            <Link
              href="/businesses"
              className="text-sm font-bold text-blue-600"
            >
              Explore directory →
            </Link>
          </div>

          {featuredBusinesses.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredBusinesses.map((business) => (
                <article key={business.id} className="card">
                  <span className="status status-verified">
                    Published profile
                  </span>

                  <h3 className="mt-4 text-lg font-bold">
                    {business.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {business.short_description ??
                      "Explore this business opportunity and its research profile."}
                  </p>

                  <Link
                    href={`/businesses/${business.slug}`}
                    className="mt-5 inline-block text-sm font-bold text-blue-600"
                  >
                    View research →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">
                Business profiles are being prepared.
              </p>

              <p className="empty-state-description">
                Published opportunities will appear here once
                verified research profiles have been added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Research disclaimer */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-bold">
            Research transparency
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            ALPHA WAVE distinguishes verified information,
            published estimates, research-based estimates,
            illustrative assumptions and unverified information.
            Always review source dates and conduct independent
            due diligence before making business decisions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 md:flex-row">
          <div>
            <p className="font-extrabold tracking-wider">
              ALPHA WAVE
            </p>
            <p className="mt-1 text-xs text-slate-500">
              CREATE • COMPETE • CONNECT • EVOLVE
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ALPHA WAVE. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}