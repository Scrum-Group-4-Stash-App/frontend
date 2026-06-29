import logoIcon from "@/assets/logo-icon.png";
import logoWhite from "@/assets/logo-white.png";
import { AppRoutes } from "@/constants/routes";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { dashboardNavItems } from "@/layouts/dashboard/dashboard-nav";
import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

interface DashboardSidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

function linkClasses(collapsed: boolean, isActive: boolean) {
  return [
    "flex h-10 w-full items-center rounded-xl px-3! text-sm transition-colors",
    isActive
      ? "bg-white/10 text-white"
      : "text-white/75 hover:bg-[var(--dash-sidebar-accent)] hover:text-white",
    collapsed ? "justify-center" : "gap-3",
  ].join(" ");
}

function isRouteActive(pathname: string, to: string) {
  if (to === AppRoutes.dashboard.index) {
    return pathname === to;
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "U";
  }

  return parts.map((part) => part[0]?.toUpperCase() || "").join("");
}

function DashboardSidebar({ collapsed, onNavigate }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const { session } = useAuthSession();
  const { logout, isSubmitting } = useLogout();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const name = session?.user.name || "User";
  const email = session?.user.email || "user@stash.app";
  const initials = getInitials(name);

  return (
    <aside
      className={[
        "flex h-screen shrink-0 flex-col border-r border-white/10 bg-linear-to-b from-[#0d0f3c] to-[#090b2f] text-white transition-all duration-200",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div
        className={
          collapsed ? "shrink-0! px-3! py-5!" : "shrink-0! px-5! py-4!"
        }
      >
        <img
          src={collapsed ? logoIcon : logoWhite}
          alt="STASH"
          className={
            collapsed
              ? "mx-auto h-8 w-8 object-contain"
              : "h-7 w-auto object-contain"
          }
        />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2! pb-4!">
        <ul className="space-y-1!">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.to);

            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={linkClasses(collapsed, active)}
                  title={collapsed ? item.label : undefined}
                  onClick={onNavigate}
                >
                  <Icon size={16} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto shrink-0 p-3!">
        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
            aria-label="Open profile menu"
            onClick={() => setProfileMenuOpen((open) => !open)}
            className={
              collapsed
                ? "flex w-full items-center justify-center rounded-xl p-2 hover:bg-(--dash-sidebar-accent)"
                : "flex w-full items-center gap-2 rounded-xl px-1 py-2 text-left hover:bg-(--dash-sidebar-accent)"
            }
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--dash-primary) text-sm font-semibold text-white">
              {initials}
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1 pr-1">
                  <p className="truncate text-sm font-medium leading-tight">
                    {name}
                  </p>
                  <p className="truncate text-xs leading-tight text-white/65">
                    {email}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={[
                    "text-white/70 transition-transform",
                    profileMenuOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </>
            )}
          </button>

          {profileMenuOpen && (
            <div
              role="menu"
              className={
                collapsed
                  ? "absolute bottom-14 left-0 z-20 w-52 rounded-xl border border-white/10 bg-[#0b0d34] p-1! shadow-lg"
                  : "absolute bottom-14 left-0 right-0 z-20 rounded-xl border border-white/10 bg-[#0b0d34] p-1! shadow-lg"
              }
            >
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-lg px-3! py-2! text-left text-sm! text-white/85 hover:bg-(--dash-sidebar-accent)"
              >
                Profile settings
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm! text-white/85 hover:bg-(--dash-sidebar-accent)"
              >
                Preferences
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Log out"
          title="Log out"
          onClick={logout}
          disabled={isSubmitting}
          className={
            collapsed
              ? "mt-2 grid h-9 w-full place-items-center rounded-xl text-rose-300 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
              : "mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-300 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          <LogOut size={18} />
          {!collapsed && (
            <span className="text-sm">
              {isSubmitting ? "Logging out..." : "Log out"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
