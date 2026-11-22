import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/lib/data/categories";
import { getBusinesses } from "@/lib/data/businesses";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found"
    };
  }

  return {
    title: category.name,
    description:
      category.description ??
      `Explore business opportunities in ${category.name}.`
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params
}: CategoryPageProps) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const result = await getBusinesses({
    filters: {
      categoryId: category.id
    },
    sort: "name_asc",
    page: 1,
    pageSize: 50
  });

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
            All businesses
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          {" / "}
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          {" / "}
          <span className="font-semibold text-slate-800">
            {category.name}
          </span>
        </nav>

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 md:p-12">
          <span className="category-icon">
            {category.icon ?? "◈"}
          </span>

          <p className="eyebrow mt-7">
            BUSINESS CATEGORY
          </p>

          <h1>{category.name}</h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            {category.description ??
              `Explore business models, opportunities and industry research in ${category.name}.`}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-700">
              {result.total} published opportunities
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              India market
            </span>
          </div>
        </div>

        <div className="mt-12">
          <div className="page-heading">
            <div>
              <p className="eyebrow">
                EXPLORE OPPORTUNITIES
              </p>

              <h2>Businesses in this category</h2>

              <p className="page-description">
                Published business profiles available for research.
              </p>
            </div>
          </div>

          {result.data.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {result.data.map((business) => (
                <article
                  key={business.id}
                  className="card flex flex-col"
                >
                  <span className="status status-verified">
                    Published profile
                  </span>

                  <h3 className="mt-4">
                    {business.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                    {business.short_description ??
                      "Detailed business information is available in its research profile."}
                  </p>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={`/businesses/${business.slug}`}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800"
                    >
                      View business research →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="empty-state-title">
                Research profiles are being prepared
              </h3>

              <p className="empty-state-description">
                No published business profiles are currently
                available in this category. New opportunities
                will appear here after their research is reviewed.
              </p>

              <Link
                href="/categories"
                className="btn btn-secondary mt-4"
              >
                Browse other categories
              </Link>
            </div>
          )}
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