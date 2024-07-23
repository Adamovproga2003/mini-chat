import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Input, InputProps } from "../Input/Input";
import styles from "./FormInput.module.scss";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  error?: FieldError;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  error,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div aria-live="polite" className={styles.formInput}>
      <Input name={name} {...props} {...(register && register(name, rules))} />
      {error && <span>{error.message}</span>}
    </div>
  );
};
