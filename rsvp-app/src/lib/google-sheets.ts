import * as google from '@googleapis/sheets'

const spreadsheetId = "1QJCNxD9dDkBoDmK0hccRRrfyaUWrpj0OIUQUESxlzrM"
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

function sheetName(NODE_ENV: typeof process.env.NODE_ENV) {
  switch (NODE_ENV) {
    case "development":
    case "test":
      return "test_rsvps"
    case "production":
      return "real_rsvps"
    default:
      throw new Error()
  }
}

export async function getFirstColumn(NODE_ENV = process.env.NODE_ENV): Promise<any[] | undefined> {
  const authClient = await auth.getClient();
  const { spreadsheets: gs } = google.sheets({ version: 'v4', auth: authClient })

  const column = await gs.values.get({ spreadsheetId, range: `${sheetName(NODE_ENV)}!A:A` })
  return column.data.values?.map((row) => row[0])
}

export async function appendRow(toAppend: string[], NODE_ENV = process.env.NODE_ENV) {
  const authClient = await auth.getClient();
  const { spreadsheets: gs } = google.sheets({ version: 'v4', auth: authClient })

  const nextRow = ((await getFirstColumn(NODE_ENV)) ?? []).length + 1
  await gs.values.append({
    spreadsheetId,
    range: `${sheetName(NODE_ENV)}!${nextRow}:${nextRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [toAppend]
    }
  })
}
