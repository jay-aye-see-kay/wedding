// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as google from '@googleapis/sheets'

type Data = {
  name: string
  data?: null | any[][]
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const auth = new google.auth.GoogleAuth({
    keyFilename: "./key.json",
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
  const authClient = await auth.getClient();

  const s = google.sheets({
    version: 'v4',
    auth: authClient
  })

  const x = await s.spreadsheets.values.get({
    spreadsheetId: "1QJCNxD9dDkBoDmK0hccRRrfyaUWrpj0OIUQUESxlzrM",
    range: 'rsvp!A:B'
  })

  res.status(200).json({ name: 'x', data: x.data.values })
}
