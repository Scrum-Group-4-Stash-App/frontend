import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import "./PasswordInput.css";
import type { PasswordInputProps } from "./PasswordInput.types";

const PasswordInput: React.FC<PasswordInputProps> = ({
  className = "",
  forgotHref,
  forgotLabel,
  icon,
  id,
  label,
  required,
  showRemember = false,
  showStrength = false,
  showToggle = true,
  toggleIcon,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const inputId =
    id ||
    (typeof label === "string"
      ? label.replace(/\s+/g, "-").toLowerCase()
      : undefined);

  const value = String(props.value || "");

  const strength = useMemo(() => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return Math.min(Math.max(score, 0), 4);
  }, [value]);

  return (
    <div className={`app-password-input ${className}`}>
      {label && (
        <label className="app-password-input__label" htmlFor={inputId}>
          {label}
          {required && <strong>*</strong>}
        </label>
      )}

      <div className="app-password-input__row">
        {icon && <span className="app-password-input__icon">{icon}</span>}
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className="app-password-input__field"
          required={required}
          {...props}
        />

        {showToggle && (
          <button
            type="button"
            className="app-password-input__toggle"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((current) => !current)}
          >
            {toggleIcon || (visible ? "Hide" : "Show")}
          </button>
        )}
      </div>

      {showStrength && (
        <div className="app-password-input__strength" aria-hidden>
          <div className="strength-bar">
            <div
              className={`strength-fill strength-fill-${strength}`}
              style={{ width: `${(strength / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {(showRemember || forgotHref) && (
        <div className="app-password-input__footer">
          {showRemember && (
            <label className="app-password-input__remember">
              <input
                type="checkbox"
                className="app-password-input__remember-input"
              />
              <span>Remember me</span>
            </label>
          )}
          {forgotHref && (
            <Link className="app-password-input__forgot" to={forgotHref}>
              {forgotLabel || "Forgot password?"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
