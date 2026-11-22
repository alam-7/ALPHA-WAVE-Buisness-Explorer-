import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category } from "@/types/business";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, icon, display_order, is_active, created_at"
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error.message);
    throw new Error("Unable to load business categories.");
  }

  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, description, icon, display_order, is_active, created_at"
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch category:", error.message);
    throw new Error("Unable to load this category.");
  }

  return data as Category | null;
}