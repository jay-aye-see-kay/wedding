import { useFormik } from "formik";

type Props = {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  underNote?: string;
  formik: ReturnType<typeof useFormik<any>>;
};

export function Input(props: Props) {
  const touched = props.formik.touched[props.name];
  const errorStr = props.formik.errors[props.name] as string;

  const inputProps = {
    className: `${props.className ?? ""} input textarea w-full`,
    type: props.type ?? "text",
    name: props.name,
    onChange: props.formik.handleChange,
    onBlur: props.formik.handleBlur,
    value: props.formik.values[props.name] ?? "",
    placeholder: props.placeholder,
    disabled: props.formik.isSubmitting,
  };
  if (errorStr && touched) {
    inputProps.className += " input-error";
  }

  return (
    <div className="form-control">
      <label className="label flex flex-col items-start">
        <span className="label-text text-base">{props.label}</span>
        {props.type === "textarea" ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        {!props.underNote ? null : (
          <p className="text-gray-700 italic">{props.underNote}</p>
        )}
        <span className="label-text text-error">
          {touched && errorStr}&nbsp;
        </span>
      </label>
    </div>
  );
}
