import "./MenuItems.css";

import type { MenuItemProps } from "./MenuItems.types";

export default function MenuItem({
  icon,
  label,
  badge,
  active = false,
  endIcon,
  onClick,
}: MenuItemProps) {
  return (
    <button
      className={`menu-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      
      <div className="menu-item__left">
        <span className="menu-item__icon">
          {icon}
        </span>

        <span className="menu-item__label">
          {label}
        </span>
      </div>

      <div className="menu-item__right">
        {badge && (
          <span className="menu-item__badge">
            {badge}
          </span>
        )}

        {endIcon}
      </div>
    </button>
  );
}