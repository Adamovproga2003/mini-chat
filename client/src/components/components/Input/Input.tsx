import {
  DetailedHTMLProps,
  FC,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, type = "text", className = "", placeholder, ...props },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    );
  }
);
