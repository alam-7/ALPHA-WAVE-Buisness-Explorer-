"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const signupSchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128)
});

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128)
});

export type AuthActionResult = {
  success: boolean;
  message: string;
};

export async function signupAction(
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = signupSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid name, email and password of at least 8 characters."
    };
  }

  const { displayName, email, password } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  });

  if (error) {
    return {
      success: false,
      message: "Registration could not be completed. Please check your details and try again."
    };
  }

  if (!data.session) {
    return {
      success: true,
      message: "Account created. Check your email for the verification link."
    };
  }

  revalidatePath("/", "layout");

  redirect("/workspace");
}

export async function loginAction(
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email and password."
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password
  });

  if (error) {
    return {
      success: false,
      message: "Login failed. Check your email and password."
    };
  }

  revalidatePath("/", "layout");

  redirect("/workspace");
}

export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Unable to sign out. Please try again.");
  }

  revalidatePath("/", "layout");

  redirect("/login");
}