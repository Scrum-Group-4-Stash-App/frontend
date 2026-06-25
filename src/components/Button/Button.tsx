import React from "react";
import "./Button.css";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button className={`app-button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
