import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Business,
  BusinessFilters,
  BusinessSortOption,
  PaginatedResult
} from "@/types/business";

const BUSINESS_FIELDS = `
  id,
  category_id,
  name,
  slug,
  short_description,
  executive_summary,
  business_model,
  target_customers,
  industry,
  country,
  location_notes,
  investment_min,
  investment_max,
  investment_currency,
  investment_basis,
  investment_status,
  research_status,
  research_summary,
  research_reviewed_at,
  research_next_review_at,
  keywords,
  featured,
  display_order,
  created_at,
  updated_at
`;

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

function normalizePage(value: number): number {
  return Number.isFinite(value)
    ? Math.max(1, Math.floor(value))
    : 1;
}

function normalizePageSize(value: number): number {
  return Number.isFinite(value)
    ? Math.min(MAX_PAGE_SIZE, Math.max(1, Math.floor(value)))
    : DEFAULT_PAGE_SIZE;
}

export async function getBusinesses(options?: {
  filters?: Partial<BusinessFilters>;
  sort?: BusinessSortOption;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Business>> {
  const supabase = await createSupabaseServerClient();

  const filters = options?.filters ?? {};
  const page = normalizePage(options?.page ?? 1);
  const pageSize = normalizePageSize(
    options?.pageSize ?? DEFAULT_PAGE_SIZE
  );

  let query = supabase
    .from("businesses")
    .select(BUSINESS_FIELDS, { count: "exact" })
    .eq("research_status", "published");

  if (filters.search?.trim()) {
    const searchTerm = filters.search.trim().slice(0, 100);

    query = query.ilike("name", `%${searchTerm}%`);
  }

  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (filters.featuredOnly) {
    query = query.eq("featured", true);
  }

  if (
    typeof filters.investmentMin === "number" &&
    Number.isFinite(filters.investmentMin)
  ) {
    query = query.gte("investment_max", filters.investmentMin);
  }

  if (
    typeof filters.investmentMax === "number" &&
    Number.isFinite(filters.investmentMax)
  ) {
    query = query.lte("investment_min", filters.investmentMax);
  }

  switch (options?.sort ?? "name_asc") {
    case "name_desc":
      query = query.order("name", { ascending: false });
      break;

    case "newest":
      query = query.order("created_at", { ascending: false });
      break;

    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;

    case "investment_low":
      query = query.order("investment_min", {
        ascending: true,
        nullsFirst: false
      });
      break;

    case "investment_high":
      query = query.order("investment_max", {
        ascending: false,
        nullsFirst: false
      });
      break;

    default:
      query = query.order("name", { ascending: true });
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Business directory query failed:", error.message);

    throw new Error("Unable to load business opportunities.");
  }

  const total = count ?? 0;

  return {
    data: (data ?? []) as unknown as Business[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}

export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug || normalizedSlug.length > 150) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("businesses")
    .select(BUSINESS_FIELDS)
    .eq("slug", normalizedSlug)
    .eq("research_status", "published")
    .maybeSingle();

  if (error) {
    console.error("Business lookup failed:", error.message);

    throw new Error("Unable to load this business profile.");
  }

  return data as unknown as Business | null;
}

export async function getFeaturedBusinesses(
  limit = 6
): Promise<Business[]> {
  const safeLimit = Math.min(
    12,
    Math.max(1, Math.floor(limit))
  );

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("businesses")
    .select(BUSINESS_FIELDS)
    .eq("research_status", "published")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(safeLimit);

  if (error) {
    console.error("Featured business query failed:", error.message);

    throw new Error("Unable to load featured businesses.");
  }

  return (data ?? []) as unknown as Business[];
}