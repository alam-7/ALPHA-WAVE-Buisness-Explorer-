
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";

export default async function NewBusinessPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/admin/businesses"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to Business Profiles
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            ALPHA WAVE · CONTENT MANAGEMENT
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Create Business Profile
          </h1>
          <p className="mt-2 text-slate-600">
            Start a new business opportunity research record.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Database integration pending.</strong> This form is a
          structured entry interface only. It does not save records yet.
          Saving must be connected to the exact database schema and validated
          server-side before it is enabled.
        </div>

        <form className="mt-6 space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              Basic information
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Business name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Example: Solar Panel Installation Service"
                  disabled
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  URL slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder="solar-panel-installation"
                  disabled
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Publication status
                </label>
                <select
                  id="status"
                  name="status"
                  disabled
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  defaultValue="draft"
                >
                  <option value="draft">Draft</option>
                  <option value="needs_review">Needs review</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="summary"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Executive summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={5}
                  placeholder="Describe the business opportunity, its customers and its value proposition."
                  disabled
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-slate-200 pt-5">
            <h2 className="text-lg font-bold text-slate-900">
              Research requirements
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A complete profile should include market research, customer
              demand, competitors, location suitability, investment estimates,
              machinery, raw materials, workforce, compliance, operations,
              marketing, financial modelling, risks, government support and
              reliable sources.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white opacity-50"
            >
              Save draft — integration pending
            </button>

            <Link
              href="/admin/businesses"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
