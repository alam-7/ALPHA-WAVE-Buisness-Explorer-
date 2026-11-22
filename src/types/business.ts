export type ResearchStatus =
  | "draft"
  | "in_review"
  | "published"
  | "needs_update"
  | "archived";

export type VerificationStatus =
  | "officially_verified"
  | "published_estimate"
  | "research_estimate"
  | "illustrative_assumption"
  | "not_verified";

export type SourceVerificationStatus =
  | "verified"
  | "needs_review"
  | "not_verified";

export type ResearchSourceType =
  | "government"
  | "official_company"
  | "industry_report"
  | "academic"
  | "news"
  | "supplier"
  | "other";

export type ResearchClaimType =
  | "market"
  | "financial"
  | "regulatory"
  | "operational"
  | "competitor"
  | "general";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Business {
  id: string;
  category_id: string;

  name: string;
  slug: string;

  short_description: string | null;
  executive_summary: string | null;

  business_model: string | null;
  target_customers: string | null;
  industry: string | null;

  country: string;
  location_notes: string | null;

  investment_min: number | null;
  investment_max: number | null;
  investment_currency: string;

  investment_basis: string | null;
  investment_status: VerificationStatus;

  research_status: ResearchStatus;
  research_summary: string | null;

  research_reviewed_at: string | null;
  research_next_review_at: string | null;

  keywords: string[];

  featured: boolean;
  display_order: number;

  created_at: string;
  updated_at: string;
}

export interface BusinessWithCategory extends Business {
  category: Category;
}

export interface BusinessSection {
  id: string;
  business_id: string;

  section_key: string;
  title: string;
  content: string | null;

  display_order: number;
  verification_status: VerificationStatus;
  last_reviewed_at: string | null;

  created_at: string;
  updated_at: string;
}

export interface ResearchSource {
  id: string;
  business_id: string | null;

  title: string;
  publisher: string | null;
  source_url: string;

  source_type: ResearchSourceType;

  published_at: string | null;
  accessed_at: string;

  verification_status: SourceVerificationStatus;
  notes: string | null;

  created_at: string;
}

export interface ResearchClaim {
  id: string;
  business_id: string;

  section_id: string | null;
  source_id: string | null;

  claim_text: string;
  claim_type: ResearchClaimType;

  evidence_status: VerificationStatus;

  checked_at: string | null;
  notes: string | null;

  created_at: string;
}

export interface BusinessResearch {
  business: Business;
  category: Category;
  sections: BusinessSection[];
  sources: ResearchSource[];
  claims: ResearchClaim[];
}

export interface BusinessFilters {
  search: string;
  categoryId: string | null;
  researchStatus: ResearchStatus | null;
  investmentMin: number | null;
  investmentMax: number | null;
  featuredOnly: boolean;
}

export type BusinessSortOption =
  | "name_asc"
  | "name_desc"
  | "newest"
  | "oldest"
  | "investment_low"
  | "investment_high";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}