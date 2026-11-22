import { createSupabaseServerClient } from "@/lib/supabase/server";

import type {
  BusinessSection,
  ResearchSource,
  ResearchClaim,
  BusinessResearch
} from "@/types/business";

import { getBusinessBySlug } from "@/lib/data/businesses";

export async function getBusinessResearch(
  slug: string
): Promise<BusinessResearch | null> {
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  const [
    sectionsResult,
    sourcesResult,
    claimsResult,
    categoryResult
  ] = await Promise.all([
    supabase
      .from("business_sections")
      .select("*")
      .eq("business_id", business.id)
      .order("display_order", { ascending: true }),

    supabase
      .from("research_sources")
      .select("*")
      .eq("business_id", business.id)
      .order("accessed_at", { ascending: false }),

    supabase
      .from("research_claims")
      .select("*")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("categories")
      .select("*")
      .eq("id", business.category_id)
      .maybeSingle()
  ]);

  if (sectionsResult.error) {
    console.error(
      "Research sections error:",
      sectionsResult.error.message
    );
    throw new Error("Unable to load research sections.");
  }

  if (sourcesResult.error) {
    console.error(
      "Research sources error:",
      sourcesResult.error.message
    );
    throw new Error("Unable to load research sources.");
  }

  if (claimsResult.error) {
    console.error(
      "Research claims error:",
      claimsResult.error.message
    );
    throw new Error("Unable to load research evidence.");
  }

  if (categoryResult.error) {
    console.error(
      "Category lookup error:",
      categoryResult.error.message
    );
    throw new Error("Unable to load the business category.");
  }

  if (!categoryResult.data) {
    throw new Error("The business category could not be found.");
  }

  return {
    business,
    category: categoryResult.data,
    sections: (sectionsResult.data ?? []) as BusinessSection[],
    sources: (sourcesResult.data ?? []) as ResearchSource[],
    claims: (claimsResult.data ?? []) as ResearchClaim[]
  };
}