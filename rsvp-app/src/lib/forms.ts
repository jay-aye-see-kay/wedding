import z from "zod";

/** this is a schema for forms, so all values string and empty string means undefined */
export const rsvpYesSchema = z.object({
  coming: z.literal("yes"),
  names: z.string().trim().min(1, "Name(s) are required"),
  email: z.string().trim().min(1, "A email is required"),
  dietaries: z.string(),
  notes: z.string(),
  secret: z.string().trim().toLowerCase().min(1, "This answer is required"),
});
export const rsvpNoSchema = z.object({
  coming: z.literal("no"),
  names: z.string().trim().min(1, "Name(s) are required"),
  notes: z.string(),
  secret: z.string().trim().toLowerCase().min(1, "This answer is required"),
});
export const rsvpSchema = z.union([rsvpYesSchema, rsvpNoSchema]);

export type RsvpYesSchema = z.infer<typeof rsvpYesSchema>;
export type RsvpNoSchema = z.infer<typeof rsvpNoSchema>;
export type RsvpSchema = z.infer<typeof rsvpSchema>;
