import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bookmark,
  Building2,
  GitCompareArrows,
  Search,
  ArrowRight,
  UserCircle,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "My Workspace | ALPHA WAVE Business Explorer",
  description: "Manage your saved business research and comparisons.",
};

export default async function WorkspacePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const [savedResult, comparisonResult, profileResult] =
    await Promise.all([
      supabase
        .from("saved_businesses")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),

      supabase
        .from("comparisons")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),

      supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

  const savedCount = savedResult.count ?? 0;
  const comparisonCount = comparisonResult.count ?? 0;

  const displayName =
    profileResult.data?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Explorer";

  return (
    <main className="page-container workspace-page">
      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">PERSONAL WORKSPACE</span>
          <h1>Welcome, {displayName}</h1>
          <p>
            Your central space for organising business ideas,
            research and comparisons.
          </p>
        </div>

        <div className="workspace-user-icon">
          <UserCircle size={38} strokeWidth={1.5} />
        </div>
      </section>

      <section className="workspace-stats">
        <article className="workspace-stat-card">
          <div className="workspace-stat-icon">
            <Bookmark size={22} />
          </div>
          <div>
            <span>Saved businesses</span>
            <strong>{savedCount}</strong>
          </div>
        </article>

        <article className="workspace-stat-card">
          <div className="workspace-stat-icon">
            <GitCompareArrows size={22} />
          </div>
          <div>
            <span>Comparisons</span>
            <strong>{comparisonCount}</strong>
          </div>
        </article>

        <article className="workspace-stat-card">
          <div className="workspace-stat-icon">
            <Building2 size={22} />
          </div>
          <div>
            <span>Research platform</span>
            <strong>India</strong>
          </div>
        </article>
      </section>

      <section className="workspace-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUICK ACCESS</span>
            <h2>Continue exploring</h2>
            <p>Jump directly to the tools you need.</p>
          </div>
        </div>

        <div className="workspace-action-grid">
          <Link href="/businesses" className="workspace-action-card">
            <div className="workspace-action-icon">
              <Search size={23} />
            </div>
            <div>
              <h3>Explore businesses</h3>
              <p>Discover business opportunities and research reports.</p>
            </div>
            <ArrowRight size={19} className="workspace-arrow" />
          </Link>

          <Link href="/categories" className="workspace-action-card">
            <div className="workspace-action-icon">
              <Building2 size={23} />
            </div>
            <div>
              <h3>Browse categories</h3>
              <p>Explore opportunities across ten business sectors.</p>
            </div>
            <ArrowRight size={19} className="workspace-arrow" />
          </Link>

          <Link href="/workspace/saved" className="workspace-action-card">
            <div className="workspace-action-icon">
              <Bookmark size={23} />
            </div>
            <div>
              <h3>Saved businesses</h3>
              <p>Return to business opportunities you have saved.</p>
            </div>
            <ArrowRight size={19} className="workspace-arrow" />
          </Link>

          <Link
            href="/workspace/comparisons"
            className="workspace-action-card"
          >
            <div className="workspace-action-icon">
              <GitCompareArrows size={23} />
            </div>
            <div>
              <h3>My comparisons</h3>
              <p>Review and compare selected business opportunities.</p>
            </div>
            <ArrowRight size={19} className="workspace-arrow" />
          </Link>
        </div>
      </section>

      <section className="workspace-note">
        <h2>Research responsibly</h2>
        <p>
          Business research contains estimates and assumptions that
          may change. Verify important costs, regulations, suppliers
          and market conditions independently before making decisions.
        </p>
      </section>
    </main>
  );
}