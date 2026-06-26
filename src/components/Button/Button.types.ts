import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { IconType } from "react-icons";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: ReactNode;
  className?: string;
  icon?: IconType;
}
