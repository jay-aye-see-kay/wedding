// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { rsvpSchema } from "@/lib/forms";
import { toFormikValidate } from "zod-formik-adapter";
import { appendRow } from "@/lib/google-sheets";

/** secret answer to prevent spam submissions */
const SECRET_CODE = "white";
const SECRET_CODE_ALT = "ivory";

/** alternate secret code for playing with the form in production without sending data to the real sheet */
const TESTING_CODE = "test";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any }>
) {
  const formErrors = await toFormikValidate(rsvpSchema)(req.body);
  if (formErrors) {
    return res.status(400).json({ data: { formErrors } });
  }
  const body = rsvpSchema.parse(req.body);
  if (
    body.secret !== SECRET_CODE &&
    body.secret !== SECRET_CODE_ALT &&
    body.secret !== TESTING_CODE
  ) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res.status(400).json({
      data: {
        formErrors: {
          secret: "That's not quite right, are you sure you're human?",
        },
      },
    });
  }

  const dbEnvironment =
    body.secret === TESTING_CODE ? "development" : process.env.NODE_ENV;

  const row = [new Date().toLocaleString("en-au")];
  if (body.coming === "yes") {
    row.push(body.names, body.email, body.dietaries, body.notes);
  } else {
    row.push(body.names, "", "", body.notes);
  }
  console.log("DEBUGPRINT[1]: rsvp.ts:36: row=", row);

  await appendRow(row, dbEnvironment);
  return res.status(200).json({ data: {} });
}
