import React from "react";

export interface MenuOverlayProps {
  logo?: React.ReactNode;

  children: React.ReactNode;

  footer?: React.ReactNode;

  width?: string;

  className?: string;
}