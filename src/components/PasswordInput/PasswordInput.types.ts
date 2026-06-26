import type { InputHTMLAttributes, ReactNode } from "react";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  forgotHref?: string;
  forgotLabel?: string;
  icon?: ReactNode;
  label?: ReactNode;
  showRemember?: boolean;
  showStrength?: boolean;
  showToggle?: boolean;
  toggleIcon?: ReactNode;
}
