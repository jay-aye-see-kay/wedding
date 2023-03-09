import z from 'zod'

export const rsvpSchema = z.object({
  names: z.string().min(1, "Name(s) are required"),
  dietary: z.string().optional(),
  notes: z.string().optional(),
  secret: z.string().min(1, "This secret code is required, check the bottom of your invite"),
});
