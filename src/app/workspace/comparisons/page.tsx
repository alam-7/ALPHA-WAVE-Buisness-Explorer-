import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  GitCompareArrows,
  Search,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "My Comparisons | ALPHA WAVE Business Explorer",
  description: "Compare business opportunities in your workspace.",
};

export default async function ComparisonsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  return (
    <main className="page-container workspace-page">
      <div className="workspace-back">
        <Link href="/workspace">
          <ArrowLeft size={17} />
          Back to workspace
        </Link>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">BUSINESS ANALYSIS</span>
          <h1>My comparisons</h1>
          <p>
            Organise business opportunities you want to evaluate
            side by side.
          </p>
        </div>

        <div className="workspace-user-icon">
          <GitCompareArrows size={36} />
        </div>
      </section>

      <section className="workspace-empty">
        <div className="workspace-empty-icon">
          <GitCompareArrows size={34} />
        </div>

        <h2>Your comparison workspace is ready</h2>

        <p>
          You haven't created a comparison yet. Start by exploring
          business opportunities. Comparison creation and saving
          will be connected in a later integration step.
        </p>

        <Link href="/businesses" className="button button-primary">
          <Search size={17} />
          Explore businesses
          <ArrowRight size={17} />
        </Link>
      </section>

      <section className="workspace-note">
        <h2>What should a good comparison include?</h2>

        <ul>
          <li>Initial investment and working capital</li>
          <li>Customer demand and target market</li>
          <li>Operating requirements and infrastructure</li>
          <li>Competition and location suitability</li>
          <li>Risks, compliance and evidence quality</li>
        </ul>

        <p>
          Estimates should be compared using the same assumptions
          and clearly identified sources.
        </p>
      </section>
    </main>
  );
}