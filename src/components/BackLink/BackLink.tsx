import React from "react";
import "./BackLink.css";
import type { BackLinkProps } from "./BackLink.types";

const BackLink = (props: BackLinkProps) => {
  const {
    label = "Back",
    className = "",
    href,
    onClick,
    ...rest
  } = props as any;

  const content = (
    <>
      <svg
        className="app-back-link__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="app-back-link__label">{label}</span>
    </>
  );

  const ariaLabel = typeof label === "string" ? `Back to ${label}` : "Back";

  if (href) {
    return (
      <a
        className={`app-back-link ${className}`}
        href={href}
        aria-label={ariaLabel}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`app-back-link ${className}`}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default BackLink;
