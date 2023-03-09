import { PageWrapper } from '@/components/page-wrapper'
import { rsvpSchema } from '@/lib/forms';
import { useFormik } from "formik";
import { toFormikValidate } from 'zod-formik-adapter';

const pageTitle = "RSVP to Nora & Jack's Wedding"

/** convert blank strings to undefined to make form data more semantic */
const blankToUndefined = (values: Record<string, string>) => {
  const newValues: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(values)) {
    newValues[key] = value.length === 0 ? undefined : value
  }
  return newValues
}


export default function Rsvp() {
  const formik = useFormik({
    initialValues: { names: "", dietaries: "", notes: "", secret: "" },
    validate: toFormikValidate(rsvpSchema),
    onSubmit: async (values, { resetForm, setErrors }) => {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(blankToUndefined(values))
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
      <form className="mt-8 m-auto max-w-xl" onSubmit={formik.handleSubmit}>

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
        <div className="my-4 mx-1 flex justify-end">
          <button className="btn" type="submit">Submit RSVP</button>
        </div>
      </form>
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
