import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { IconType } from "react-icons";

export interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: ReactNode;
  className?: string;
  icon?: IconType;
}
