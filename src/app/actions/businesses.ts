"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const businessIdSchema = z.string().uuid(
  "A valid business ID is required."
);

export type BusinessActionResult = {
  success: boolean;
  message: string;
};

export async function saveBusinessAction(
  businessId: string
): Promise<BusinessActionResult> {
  const validation = businessIdSchema.safeParse(businessId);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid business selection.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Please sign in before saving a business.",
    };
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("id", validation.data)
    .eq("status", "published")
    .maybeSingle();

  if (businessError || !business) {
    return {
      success: false,
      message: "This business is unavailable or has not been published.",
    };
  }

  const { error: saveError } = await supabase
    .from("saved_businesses")
    .upsert(
      {
        user_id: user.id,
        business_id: validation.data,
      },
      {
        onConflict: "user_id,business_id",
        ignoreDuplicates: true,
      }
    );

  if (saveError) {
    return {
      success: false,
      message: "Unable to save this business. Please try again.",
    };
  }

  revalidatePath("/workspace");
  revalidatePath("/workspace/saved");
  revalidatePath("/businesses");

  return {
    success: true,
    message: "Business saved successfully.",
  };
}

export async function removeSavedBusinessAction(
  businessId: string
): Promise<BusinessActionResult> {
  const validation = businessIdSchema.safeParse(businessId);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid business selection.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Please sign in to manage saved businesses.",
    };
  }

  const { error } = await supabase
    .from("saved_businesses")
    .delete()
    .eq("user_id", user.id)
    .eq("business_id", validation.data);

  if (error) {
    return {
      success: false,
      message: "Unable to remove this saved business.",
    };
  }

  revalidatePath("/workspace");
  revalidatePath("/workspace/saved");
  revalidatePath("/businesses");

  return {
    success: true,
    message: "Business removed from your saved collection.",
  };
}