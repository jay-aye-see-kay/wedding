import { Input } from "@/components/form-input";
import { PageWrapper } from "@/components/page-wrapper";
import { rsvpNoSchema, RsvpSchema, rsvpSchema } from "@/lib/forms";
import { FormikConfig, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toFormikValidate } from "zod-formik-adapter";

const pageTitle = "RSVP to Nora & Jack's Wedding";

const secretQuestion =
  "To prove you're human, what colour is a traditional wedding dress?";

const initialYesValues: RsvpSchema = {
  coming: "yes",
  names: "",
  email: "",
  dietaries: "",
  notes: "",
  secret: "",
};

const initialNoValues: RsvpSchema = {
  coming: "no",
  names: "",
  notes: "",
  secret: "",
};

function makeOnSubmit(
  router: any,
  coming: boolean
): FormikConfig<RsvpSchema>["onSubmit"] {
  return async function (values, { setErrors }) {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const responseBody = await response.json().catch(console.error);
    if (response.ok) {
      router.push(coming ? "/rsvp/success" : "/rsvp/no-success");
    } else if (
      response.status === 400 &&
      "data" in responseBody &&
      "formErrors" in responseBody.data
    ) {
      setErrors(responseBody.data.formErrors);
    } else {
      alert("There was an issue with RSVP please email us");
    }
  };
}

export default function Rsvp() {
  const [answer, setAnswer] = useState<boolean>();
  const answerYes = () => setAnswer(true);
  const answerNo = () => setAnswer(false);

  return (
    <PageWrapper pageTitle={pageTitle}>
      <div className="relative mt-8 m-auto max-w-xl px-2 py-4 rounded-lg bg-white">
        {answer === undefined ? (
          <div className="my-4 text-center">
            <p className="mb-8">
              {"Will you be attending our wedding celebrations?"}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn" onClick={answerYes}>
                Yes
              </button>
              <button className="btn" onClick={answerNo}>
                No
              </button>
            </div>
          </div>
        ) : answer ? (
          <YesForm />
        ) : (
          <NoForm />
        )}
      </div>
    </PageWrapper>
  );
}

function YesForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialYesValues,
    validate: toFormikValidate(rsvpSchema),
    onSubmit: makeOnSubmit(router, true),
  });
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center text-center space-x-4 space-y-4 mt-4 mb-8">
        <p className="text-xl">
          {"Great! We are so excited to celebrate with you."}
        </p>
      </div>

      <div className="">
        <input hidden name="coming" value="yes" onChange={() => {}} />

        <Input
          label="Full names of everyone attending"
          name="names"
          type="textarea"
          className="min-h-[100px] max-h-[200px]"
          formik={formik}
        />
        <Input
          label="Best contact email"
          name="email"
          type="email"
          formik={formik}
        />
        <Input
          label="Any dietary requirements that we need to know about, and to whom do they apply? (optional)"
          name="dietaries"
          formik={formik}
        />
        <Input
          label="Anything else you would like to let us know (optional)"
          name="notes"
          type="textarea"
          formik={formik}
          className="min-h-[100px] max-h-[200px]"
        />
        <Input label={secretQuestion} name="secret" formik={formik} />
      </div>

      <div className="px-2">
        <div className="divider text-xl mx-4 mb-8">~</div>
        <p>
          We have limited space at the venue so please no plus ones or children
          without talking to us first. Thanks for your understanding.
        </p>
        <div className="divider text-xl mx-4 my-8">~</div>
        <p>
          The gift of your company is all we ask for on our wedding day,
          especially for those traveling a long distance to be with us. Should
          you wish to gift us something a contribution to our honeymoon fund it
          would be appreciated.
        </p>
        <div className="divider text-xl mx-4 my-8">~</div>
      </div>

      <div className="my-4 mx-1 flex justify-end space-x-4">
        {!formik.isSubmitting ? (
          <>
            <Link href="/" className="btn btn-outline">
              Cancel
            </Link>
            <button className="btn" type="submit">
              Submit RSVP
            </button>
          </>
        ) : (
          <button className="btn loading" disabled>
            Loading
          </button>
        )}
      </div>
    </form>
  );
}

function NoForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialNoValues,
    validate: toFormikValidate(rsvpNoSchema as any),
    onSubmit: makeOnSubmit(router, false),
  });
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <div className="text-center mt-4 mb-8">
        <p className="text-xl">
          We are sorry to hear that and you will be missed at the celebrations
        </p>
      </div>

      <div className="">
        <input hidden name="coming" value="no" onChange={() => {}} />

        <Input label="Names on the invite" name="names" formik={formik} />
        <Input
          label="Would you like to leave a note? (optional)"
          name="notes"
          type="textarea"
          formik={formik}
          className="min-h-[100px] max-h-[200px]"
        />
        <Input label={secretQuestion} name="secret" formik={formik} />
      </div>

      <div className="my-4 mx-1 flex justify-end space-x-4">
        {!formik.isSubmitting ? (
          <>
            <Link href="/" className="btn btn-outline">
              Cancel
            </Link>
            <button className="btn" type="submit">
              Submit RSVP
            </button>
          </>
        ) : (
          <>
            <button className="btn loading" disabled>
              Loading
            </button>
          </>
        )}
      </div>
    </form>
  );
}
