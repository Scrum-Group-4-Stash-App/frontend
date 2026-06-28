import React from "react";

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;

  badge?: number | string;

  active?: boolean;

  endIcon?: React.ReactNode;

  onClick?: () => void;
}