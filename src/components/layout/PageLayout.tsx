import React from "react";
import type { ReactNode } from "react";
import "./PageLayout.css";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

function PageLayout({ children, className = "" }: PageLayoutProps) {
  return <main className={`page-layout ${className}`.trim()}>{children}</main>;
}

export default PageLayout;
