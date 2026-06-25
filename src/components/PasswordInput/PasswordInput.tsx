import React, { useMemo, useState } from "react";
import "./PasswordInput.css";
import type { PasswordInputProps } from "./PasswordInput.types";

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  className = "",
  id,
  showToggle = true,
  showStrength = false,
  forgotHref,
  forgotLabel,
  showRemember = false,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const inputId =
    id ||
    (typeof label === "string"
      ? label.replace(/\s+/g, "-").toLowerCase()
      : undefined);

  const value = String((props as any).value || "");

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
        </label>
      )}

      <div className="app-password-input__row">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className="app-password-input__field"
          {...props}
        />

        {showToggle && (
          <button
            type="button"
            className="app-password-input__toggle"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.81-2.89 3.69-4.75-1.73-4.35-6-7.54-11-7.54-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 11.5c1.73 4.35 6 7.54 11 7.54 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zm7.5 7.5l2.76 2.76c.05-.21.08-.42.08-.64 0-1.66-1.34-3-3-3-.22 0-.43.03-.64.08z"
                  fill="currentColor"
                />
              </svg>
            )}
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

      {forgotHref && (
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
          <a className="app-password-input__forgot" href={forgotHref}>
            {forgotLabel || "Forgot password?"}
          </a>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
