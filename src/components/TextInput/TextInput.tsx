import type { InputHTMLAttributes, ReactNode } from "react";
import "./TextInput.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label: string;
  rightIcon?: ReactNode;
}

function TextInput({
  className = "",
  icon,
  id,
  label,
  rightIcon,
  required,
  ...props
}: TextInputProps) {
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

  return (
    <label className={`app-text-input ${className}`} htmlFor={inputId}>
      <span className="app-text-input__label">
        {label}
        {required && <strong>*</strong>}
      </span>
      <span className="app-text-input__shell">
        {icon && <span className="app-text-input__icon">{icon}</span>}
        <input id={inputId} required={required} {...props} />
        {rightIcon && <span className="app-text-input__icon">{rightIcon}</span>}
      </span>
    </label>
  );
}

export default TextInput;
