import type { InputHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PasswordInputProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label?: ReactNode;
  className?: string;
  id?: string;
  /** Show a toggle button to reveal/hide the password */
  showToggle?: boolean;
  /** Show a simple password strength meter */
  showStrength?: boolean;
  /** URL for the "Forgot password" link (renders when provided) */
  forgotHref?: string;
  /** Text for the "Forgot password" link */
  forgotLabel?: string;
  /** Show a "Remember me" checkbox */
  showRemember?: boolean;
}
