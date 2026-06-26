import React from "react";
import "./Button.css";
import type { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  icon: Icon,
  ...props
}) => {
  return (
    <button className={`app-button ${className}`} {...props}>
      {Icon && <Icon className="app-button__icon" />}
      {children}
    </button>
  );
};

export default Button;
