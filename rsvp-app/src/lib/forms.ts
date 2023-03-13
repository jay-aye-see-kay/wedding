import z from 'zod'

/** this is a schema for forms, so all values string and empty string means undefined */
export const rsvpSchema = z.object({
  names: z.string().trim().min(1, "Name(s) are required"),
  dietaries: z.string(),
  notes: z.string(),
  secret: z.string().trim().toLowerCase().min(1, "This secret code is required, check the bottom of your invite"),
});

export type RsvpSchema = z.infer<typeof rsvpSchema>
