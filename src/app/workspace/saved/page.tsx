import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Building2,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { removeSavedBusinessAction } from "@/app/actions/businesses";

export const metadata = {
  title: "Saved Businesses | ALPHA WAVE Business Explorer",
  description: "View and manage your saved business opportunities.",
};

type SavedBusiness = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  investment_min: number | null;
  investment_max: number | null;
  investment_currency: string | null;
};

async function removeSavedBusinessFormAction(formData: FormData) {
  "use server";

  const businessId = formData.get("businessId");

  if (typeof businessId !== "string") {
    return;
  }

  await removeSavedBusinessAction(businessId);
}

function formatInvestment(business: SavedBusiness) {
  const minimum = business.investment_min;
  const maximum = business.investment_max;

  if (minimum == null && maximum == null) {
    return "Investment not yet specified";
  }

  const currency = business.investment_currency || "INR";

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);

  if (minimum != null && maximum != null) {
    return `${currency} ${formatAmount(minimum)} – ${formatAmount(maximum)}`;
  }

  if (minimum != null) {
    return `From ${currency} ${formatAmount(minimum)}`;
  }

  return `Up to ${currency} ${formatAmount(maximum!)}`;
}

export default async function SavedBusinessesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("saved_businesses")
    .select(`
      business:businesses (
        id,
        name,
        slug,
        short_description,
        investment_min,
        investment_max,
        investment_currency
      )
    `)
    .eq("user_id", user.id);

  const businesses: SavedBusiness[] = (data ?? [])
    .map((item) => {
      const business = item.business as unknown as
        | SavedBusiness
        | SavedBusiness[]
        | null;

      return Array.isArray(business) ? business[0] : business;
    })
    .filter((business): business is SavedBusiness => business !== null);

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
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>Saved businesses</h1>
          <p>
            Keep track of opportunities you want to research further.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Bookmark size={34} />
        </div>
      </section>

      {error ? (
        <section className="workspace-empty">
          <h2>Unable to load saved businesses</h2>
          <p>
            Something went wrong while retrieving your collection.
            Please try again later.
          </p>
        </section>
      ) : businesses.length === 0 ? (
        <section className="workspace-empty">
          <div className="workspace-empty-icon">
            <Bookmark size={32} />
          </div>

          <h2>Your collection is empty</h2>

          <p>
            Explore the business directory and save opportunities
            you would like to investigate.
          </p>

          <Link href="/businesses" className="button button-primary">
            Explore businesses
            <ArrowRight size={17} />
          </Link>
        </section>
      ) : (
        <section className="saved-business-grid">
          {businesses.map((business) => (
            <article className="saved-business-card" key={business.id}>
              <div className="saved-business-icon">
                <Building2 size={23} />
              </div>

              <div className="saved-business-content">
                <h2>{business.name}</h2>

                <p>{business.short_description}</p>

                <div className="saved-business-investment">
                  <span>Indicative investment</span>
                  <strong>{formatInvestment(business)}</strong>
                </div>

                <div className="saved-business-actions">
                  <Link
                    href={`/businesses/${business.slug}`}
                    className="button button-primary"
                  >
                    View research
                    <ArrowRight size={16} />
                  </Link>

                  <form action={removeSavedBusinessFormAction}>
                    <input
                      type="hidden"
                      name="businessId"
                      value={business.id}
                    />

                    <button
                      type="submit"
                      className="button button-secondary"
                      aria-label={`Remove ${business.name} from saved businesses`}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}