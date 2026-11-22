
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

type BusinessRecord = {
  id: string;
  name: string;
  slug: string;
  status: string;
  created_at: string;
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-slate-100 text-slate-700",
    archived: "bg-amber-100 text-amber-800",
    needs_review: "bg-orange-100 text-orange-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default async function AdminBusinessesPage() {
  await requireAdmin();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, slug, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const businesses = (data ?? []) as BusinessRecord[];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            ← Back to Admin Dashboard
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-700">
            ALPHA WAVE · CONTENT MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Business Profiles
          </h1>

          <p className="mt-2 text-slate-600">
            Review business records and monitor their publication status.
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Records loaded</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {businesses.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Published</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {businesses.filter((item) => item.status === "published").length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Not published</p>
            <p className="mt-2 text-2xl font-bold text-amber-700">
              {businesses.filter((item) => item.status !== "published").length}
            </p>
          </div>
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
          >
            Could not load business records. Check the businesses table,
            selected columns and administrator permissions.
          </div>
        ) : businesses.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No business profiles yet
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              The database currently has no business records to manage. The
              initial business concepts still need to be added and researched.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Business</th>
                    <th className="px-5 py-4 font-semibold">Slug</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {businesses.map((business) => (
                    <tr key={business.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {business.name}
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {business.slug}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={business.status} />
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {new Date(business.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {business.status === "published" ? (
                          <Link
                            href={`/businesses/${business.slug}`}
                            className="font-semibold text-blue-700 hover:underline"
                          >
                            View profile →
                          </Link>
                        ) : (
                          <span className="text-slate-400">
                            Not published
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
              Showing up to 100 most recently created records.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
