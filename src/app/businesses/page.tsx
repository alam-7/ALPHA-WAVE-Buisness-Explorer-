import type { Metadata } from "next";
import Link from "next/link";

import { getBusinesses } from "@/lib/data/businesses";
import { getCategories } from "@/lib/data/categories";

import type { BusinessSortOption } from "@/types/business";

export const metadata: Metadata = {
  title: "Explore Businesses",
  description:
    "Discover and research business opportunities across India."
};

export const dynamic = "force-dynamic";

interface BusinessesPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    min?: string;
    max?: string;
    sort?: string;
    page?: string;
  }>;
}

const SORT_OPTIONS: {
  value: BusinessSortOption;
  label: string;
}[] = [
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "investment_low", label: "Investment: Low to high" },
  { value: "investment_high", label: "Investment: High to low" }
];

function validNumber(value?: string): number | undefined {
  if (!value || value.trim() === "") {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return undefined;
  }

  return number;
}

function validPage(value?: string): number {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function validSort(value?: string): BusinessSortOption {
  const allowed = SORT_OPTIONS.map((option) => option.value);

  if (allowed.includes(value as BusinessSortOption)) {
    return value as BusinessSortOption;
  }

  return "name_asc";
}

function buildPageUrl(
  page: number,
  params: {
    q: string;
    category: string;
    min?: string;
    max?: string;
    sort: BusinessSortOption;
  }
) {
  const search = new URLSearchParams();

  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  if (params.min) search.set("min", params.min);
  if (params.max) search.set("max", params.max);

  search.set("sort", params.sort);
  search.set("page", String(page));

  return `/businesses?${search.toString()}`;
}

export default async function BusinessesPage({
  searchParams
}: BusinessesPageProps) {
  const params = await searchParams;

  const search = (params.q ?? "").trim().slice(0, 100);
  const category = (params.category ?? "").trim();
  const min = validNumber(params.min);
  const max = validNumber(params.max);
  const page = validPage(params.page);
  const sort = validSort(params.sort);

  const [categories, result] = await Promise.all([
    getCategories(),

    getBusinesses({
      filters: {
        search,
        categoryId: category || null,
        investmentMin: min ?? null,
        investmentMax: max ?? null
      },
      sort,
      page,
      pageSize: 12
    })
  ]);

  const selectedCategory = categories.find(
    (item) => item.id === category
  );

  const hasFilters =
    Boolean(search) ||
    Boolean(category) ||
    min !== undefined ||
    max !== undefined;

  const paginationParams = {
    q: search,
    category,
    min: params.min ?? "",
    max: params.max ?? "",
    sort
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">

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

          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link
              href="/categories"
              className="text-slate-600 hover:text-blue-600"
            >
              Categories
            </Link>

            <Link
              href="/login"
              className="btn btn-primary"
            >
              Sign in
            </Link>
          </nav>

        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-5 py-12">

        <div className="mb-9">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600"
          >
            ← Home
          </Link>

          <p className="eyebrow mt-8">
            BUSINESS INTELLIGENCE PLATFORM
          </p>

          <h1>Explore businesses</h1>

          <p className="page-description max-w-2xl">
            Discover business models, explore industries and
            evaluate opportunities through structured research.
          </p>
        </div>

        {/* Search and filters */}
        <form
          action="/businesses"
          method="GET"
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div className="form-group lg:col-span-2">
              <label
                htmlFor="business-search"
                className="form-label"
              >
                Search businesses
              </label>

              <input
                id="business-search"
                name="q"
                type="search"
                defaultValue={search}
                placeholder="Enter a business name..."
                maxLength={100}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="business-category"
                className="form-label"
              >
                Category
              </label>

              <select
                id="business-category"
                name="category"
                defaultValue={category}
                className="form-control"
              >
                <option value="">
                  All categories
                </option>

                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="business-sort"
                className="form-label"
              >
                Sort results
              </label>

              <select
                id="business-sort"
                name="sort"
                defaultValue={sort}
                className="form-control"
              >
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="investment-min"
                className="form-label"
              >
                Minimum investment (₹)
              </label>

              <input
                id="investment-min"
                name="min"
                type="number"
                min="0"
                step="1"
                defaultValue={params.min ?? ""}
                placeholder="Minimum amount"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="investment-max"
                className="form-label"
              >
                Maximum investment (₹)
              </label>

              <input
                id="investment-max"
                name="max"
                type="number"
                min="0"
                step="1"
                defaultValue={params.max ?? ""}
                placeholder="Maximum amount"
                className="form-control"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="btn btn-primary flex-1"
              >
                Apply filters
              </button>

              <Link
                href="/businesses"
                className="btn btn-secondary"
              >
                Clear
              </Link>
            </div>

          </div>
        </form>

        {/* Results heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold">
              {selectedCategory
                ? selectedCategory.name
                : "Business opportunities"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {result.total} published profiles found
            </p>
          </div>

          {hasFilters && (
            <Link
              href="/businesses"
              className="text-sm font-semibold text-blue-600"
            >
              Remove all filters
            </Link>
          )}

        </div>

        {/* Business results */}
        {result.data.length > 0 ? (

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {result.data.map((business) => (

              <article
                key={business.id}
                className="card flex flex-col transition-shadow hover:shadow-md"
              >

                <div className="flex items-center justify-between gap-3">
                  <span className="status status-verified">
                    Published
                  </span>

                  <span className="text-xs text-slate-400">
                    {business.country}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {business.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                  {business.short_description ??
                    "Detailed business information is available in this profile."}
                </p>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">

                  {business.industry && (
                    <p className="text-xs text-slate-500">
                      Industry: {business.industry}
                    </p>
                  )}

                  {business.investment_min !== null &&
                    business.investment_max !== null && (
                      <p className="text-xs font-semibold text-slate-700">
                        Estimated investment:{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: business.investment_currency,
                          maximumFractionDigits: 0
                        }).format(business.investment_min)}
                        {" – "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: business.investment_currency,
                          maximumFractionDigits: 0
                        }).format(business.investment_max)}
                      </p>
                    )}

                  <p className="text-xs text-slate-400">
                    Investment status: {business.investment_status.replaceAll("_", " ")}
                  </p>

                </div>

                <Link
                  href={`/businesses/${business.slug}`}
                  className="mt-5 inline-flex items-center font-bold text-blue-600 hover:text-blue-800"
                >
                  View research profile →
                </Link>

              </article>

            ))}

          </div>

        ) : (

          <div className="empty-state">
            <h3 className="empty-state-title">
              No published businesses found
            </h3>

            <p className="empty-state-description">
              Try changing your search or removing some filters.
              Business profiles will appear here after publication.
            </p>

            <Link
              href="/businesses"
              className="btn btn-secondary mt-4"
            >
              Clear filters
            </Link>
          </div>

        )}

        {/* Pagination */}
        {result.totalPages > 1 && (

          <nav
            aria-label="Business directory pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >

            {page > 1 && (
              <Link
                href={buildPageUrl(
                  page - 1,
                  paginationParams
                )}
                className="btn btn-secondary"
              >
                ← Previous
              </Link>
            )}

            <span className="px-4 text-sm font-semibold text-slate-600">
              Page {page} of {result.totalPages}
            </span>

            {page < result.totalPages && (
              <Link
                href={buildPageUrl(
                  page + 1,
                  paginationParams
                )}
                className="btn btn-secondary"
              >
                Next →
              </Link>
            )}

          </nav>

        )}

        {/* Research transparency */}
        <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6">

          <h3 className="font-bold text-slate-900">
            Research transparency
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Investment figures and other research claims must
            be checked against their evidence sources. Published
            profiles are educational resources, not guarantees
            of business profitability.
          </p>

        </div>

      </section>

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