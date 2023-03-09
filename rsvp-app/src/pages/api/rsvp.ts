// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as google from '@googleapis/sheets'
import { rsvpSchema } from '@/lib/forms';
import { toFormikValidate } from 'zod-formik-adapter';

const spreadsheetId = "1QJCNxD9dDkBoDmK0hccRRrfyaUWrpj0OIUQUESxlzrM"
const SECRET_CODE = "skippy"

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "wedding-rsvp@jack-206207.iam.gserviceaccount.com",
    private_key: process.env.GSHEETS_PRIVATE_KEY,
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

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

  const authClient = await auth.getClient();
  const { spreadsheets: gs } = google.sheets({ version: 'v4', auth: authClient })

  const columnA = await gs.values.get({ spreadsheetId, range: 'rsvp!A:A' })
  const nextRow = (columnA.data.values ?? []).length + 1

  const { data } = await gs.values.append({
    spreadsheetId,
    range: `rsvp!${nextRow}:${nextRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [new Date().toLocaleString("en-au"), body.names, body.dietary, body.notes]
      ]
    }
  })
  return res.status(200).json({ data })
}
