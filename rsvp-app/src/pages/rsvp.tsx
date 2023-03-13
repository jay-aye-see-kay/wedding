import { PageWrapper } from '@/components/page-wrapper';
import { RsvpSchema, rsvpSchema } from '@/lib/forms';
import { useFormik } from "formik";
import Link from 'next/link';
import { toFormikValidate } from 'zod-formik-adapter';

const pageTitle = "RSVP to Nora & Jack's Wedding"

const initialValues: RsvpSchema = { names: "", dietaries: "", notes: "", secret: "" };

export default function Rsvp() {
  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(rsvpSchema),
    onSubmit: async (values, { resetForm, setErrors }) => {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(values)
      })
      const responseBody = await response.json().catch(console.error)
      if (response.ok) {
        // TODO loading and success messages
        resetForm()
      } else if (
        response.status === 400 &&
        "data" in responseBody &&
        "formErrors" in responseBody.data
      ) {
        setErrors(responseBody.data.formErrors)
      } else {
        alert("There was an issue with RSVP please email us")
      }
    },
  });

  return (
    <PageWrapper pageTitle={pageTitle}>
      <div className="relative mt-8 m-auto max-w-xl px-2 py-4 rounded-lg bg-white">
        <form onSubmit={formik.handleSubmit}>

          <div className="">
            <Input
              label="Names"
              name="names"
              placeholder="names of attending"
              formik={formik}
            />
            <Input
              label="Dietary requirements (optional)"
              name="dietaries"
              formik={formik}
            />
            <Input
              label="Any other notes (optional)"
              name="notes"
              type="textarea"
              formik={formik}
              className="min-h-[100px] max-h-[200px]"
            />
            <Input
              label="Secret code"
              placeholder="enter the secret code from your invite"
              name="secret"
              formik={formik}
            />
          </div>

          <div className="my-4 mx-1 flex justify-end space-x-4">
            {!formik.isSubmitting ? (
              <>
                <Link href="/" className="btn btn-outline">Cancel</Link>
                <button className="btn" type="submit">Submit RSVP</button>
              </>
            ) : (
              <>
                <button className="btn loading" disabled>Loading</button>
              </>
            )}
          </div>
        </form>

      </div>
    </PageWrapper>
  )
}

type InputProps = {
  type?: React.HTMLInputTypeAttribute
  label: string
  name: string
  className?: string
  placeholder?: string
  formik: ReturnType<typeof useFormik<any>>
}
function Input(props: InputProps) {
  const touched = props.formik.touched[props.name]
  const errorStr = props.formik.errors[props.name] as string

  const inputProps = {
    className: `${props.className ?? ""} input textarea w-full`,
    type: props.type ?? "text",
    name: props.name,
    onChange: props.formik.handleChange,
    onBlur: props.formik.handleBlur,
    value: props.formik.values[props.name],
    placeholder: props.placeholder,
    disabled: props.formik.isSubmitting,
  }
  if (errorStr && touched) {
    inputProps.className += " input-error"
  }

  return (
    <div className="form-control">
      <label className="label flex flex-col items-start">
        <span className="label-text text-base">{props.label}</span>
        {props.type === "textarea"
          ? <textarea {...inputProps} />
          : <input {...inputProps} />}
        <span className="label-text text-error">{touched && errorStr}&nbsp;</span>
      </label>
    </div>
  )
}
