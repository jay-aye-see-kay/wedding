// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { rsvpSchema } from '@/lib/forms';
import { toFormikValidate } from 'zod-formik-adapter';
import { appendRow } from '@/lib/google-sheets';

const SECRET_CODE = "skippy"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any }>
) {
  const formErrors = await toFormikValidate(rsvpSchema)(req.body)
  if (formErrors) {
    return res.status(400).json({ data: { formErrors } })
  }
  const body = rsvpSchema.parse(req.body)
  if (body.secret !== SECRET_CODE) {
    return res.status(400).json({ data: { formErrors: { secret: "This secret code is incorrect, check the bottom of your invite" } } })
  }

  await appendRow([new Date().toLocaleString("en-au"), body.names, body.dietaries, body.notes])
  return res.status(200).json({ data: {} })
}
