import { z } from "zod";

const nullableText = (maxLength: number) =>
  z.string().trim().max(maxLength).nullable().optional();

const nullableAmount = z
  .number()
  .finite()
  .nonnegative()
  .nullable()
  .optional();

const nullableDate = z
  .string()
  .datetime()
  .nullable()
  .optional();

export const businessSchema = z
  .object({
    category_id: z.string().uuid("Select a valid category."),

    name: z
      .string()
      .trim()
      .min(2, "Business name must contain at least 2 characters.")
      .max(150, "Business name is too long."),

    slug: z
      .string()
      .trim()
      .min(2, "Slug is required.")
      .max(180)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers and hyphens only."
      ),

    short_description: z
      .string()
      .trim()
      .min(10, "Add a more descriptive summary.")
      .max(300),

    executive_summary: nullableText(10000),
    business_model: nullableText(5000),
    target_customers: nullableText(3000),
    industry: nullableText(150),
    country: z.string().trim().min(2).max(100).default("India"),
    location_notes: nullableText(5000),

    investment_min: nullableAmount,
    investment_max: nullableAmount,

    investment_currency: z
      .string()
      .trim()
      .length(3)
      .default("INR"),

    investment_basis: nullableText(1000),
    investment_status: nullableText(50),

    research_status: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .default("draft"),

    research_summary: nullableText(10000),

    research_reviewed_at: nullableDate,
    research_next_review_at: nullableDate,

    keywords: z
      .array(z.string().trim().min(1).max(60))
      .max(30)
      .default([]),

    featured: z.boolean().default(false),

    display_order: z
      .number()
      .int()
      .nonnegative()
      .default(0),
  })
  .refine(
    (data) =>
      data.investment_min == null ||
      data.investment_max == null ||
      data.investment_min <= data.investment_max,
    {
      message:
        "Minimum investment cannot exceed maximum investment.",
      path: ["investment_max"],
    }
  );

export const businessUpdateSchema = businessSchema.partial();

export type BusinessInput = z.infer<typeof businessSchema>;

export type BusinessUpdateInput = z.infer<
  typeof businessUpdateSchema
>;

export function validateBusiness(input: unknown) {
  return businessSchema.safeParse(input);
}

export function validateBusinessUpdate(input: unknown) {
  return businessUpdateSchema.safeParse(input);
}