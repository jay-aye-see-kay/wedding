// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as google from '@googleapis/sheets'
import z from 'zod'

const spreadsheetId = "1QJCNxD9dDkBoDmK0hccRRrfyaUWrpj0OIUQUESxlzrM"
const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
]

const bodySchema = z.object({
  names: z.string(),
  dietary: z.string(),
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any }>
) {
  const body = bodySchema.safeParse(req.body)
  if (!body.success) {
    throw new Error("incorrect params " + body.error.toString())
  }

  const auth = new google.auth.GoogleAuth({ keyFilename: "./key.json", scopes });
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
        [body.data.names, body.data.dietary]
      ]
    }
  })
  return res.status(200).json({ data })
}
