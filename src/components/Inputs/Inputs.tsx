import React from "react";
import "./Inputs.css";
import type { InputProps } from "./Inputs.types";

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  icon: Icon,
  ...props
}) => {
  const inputId =
    id ||
    (typeof label === "string"
      ? label.replace(/\s+/g, "-").toLowerCase()
      : undefined);

  return (
    <div className={`app-input ${className}`}>
      {label && (
        <label htmlFor={inputId} className="app-input__label">
          {label}
        </label>
      )}

      <div className="app-input__wrapper">
        {Icon && <Icon className="app-input__icon" />}

        <input id={inputId} className="app-input__field" {...props} />
      </div>

      {error && <span className="app-input__error">{error}</span>}
    </div>
  );
};

export default Input;
