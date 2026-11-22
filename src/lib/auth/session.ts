import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Authentication lookup failed:", error.message);
    return null;
  }

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("is_admin");

  if (error) {
    console.error("Admin permission check failed:", error.message);
    return false;
  }

  return data === true;
}

export async function requireAdmin() {
  const user = await requireUser();

  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    redirect("/unauthorized");
  }

  return user;
}