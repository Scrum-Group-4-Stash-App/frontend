import "./MenuOverlay.css";

import type { MenuOverlayProps } from "./MenuOverlay.types";

export default function MenuOverlay({
  logo,
  children,
  footer,
  width = "320px",
  className = "",
}: MenuOverlayProps) {
  return (
    <aside
      className={`menu-overlay ${className}`}
      style={{ width }}
    >
      <div className="menu-overlay__header">
        {logo}
      </div>

      <div className="menu-overlay__body">
        {children}
      </div>

      {footer && (
        <div className="menu-overlay__footer">
          {footer}
        </div>
      )}
    </aside>
  );
}