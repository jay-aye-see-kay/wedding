import { PageWrapper } from '@/components/page-wrapper'
import { Formik, Field, Form, useFormik } from "formik";

const pageTitle = "RSVP to Nora & Jack's Wedding"
const SECRET_CODE = "skippy"

export default function Rsvp() {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (event.target.secret.value !== "skippy") {
      alert("secret code not correct, check your invite")
      return
    }
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        names: event.target.names.value,
        dietary: event.target.dietary.value,
      }),
    })
    console.log(await response.json())
  }

  const formik = useFormik({
    initialValues: { names: "", dietaries: "", notes: "", secret: "" },
    validate: values => {
      const errors: Record<string, string> = {}
      if (values.secret !== SECRET_CODE) {
        errors.secret = "Secret code not correct, please double check your invite"
      }
      if (values.names === "") {
        errors.names = "names required"
      }
      return errors
    },
    onSubmit: async (values, { resetForm }) => {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          names: values.names,
          dietary: values.dietaries,
          notes: values.notes,
        })
      })
      if (response.ok) {
        resetForm()
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
          />
          <Input
            label="Secret code"
            placeholder="enter the secret code from your invite"
            name="secret"
            formik={formik}
          />

        </div>
        <div className="my-4 mx-1 flex justify-end">
          <button className="btn btn-primary" type="submit">Submit RSVP</button>
        </div>
      </form>
    </PageWrapper>
  )
}

type InputProps = {
  type?: React.HTMLInputTypeAttribute
  label: string
  name: string
  placeholder?: string
  formik: ReturnType<typeof useFormik<any>>
}
function Input(props: InputProps) {
  const errorStr = props.formik.errors[props.name] as string
  const extraClasses = []
  if (props.type === "textarea") extraClasses.push("min-h-[5rem]")
  if (errorStr) extraClasses.push("input-error")

  return (
    <div className="form-control">
      <label className="label flex flex-col items-start">
        <span className="label-text text-base">{props.label}</span>
        <input
          className={["input textarea w-full", ...extraClasses].join(" ")}
          type={props.type ?? "text"}
          name={props.name}
          onChange={props.formik.handleChange}
          value={props.formik.values[props.name]}
          placeholder={props.placeholder}
        />
        <span className="label-text text-error">{errorStr || " "}</span>
      </label>
    </div>
  )
}
