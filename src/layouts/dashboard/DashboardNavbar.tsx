import { Bell, Menu } from "lucide-react";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  return (
    <header className="flex items-center gap-4 border-b border-(--dash-border) bg-(--dash-surface) px-5! py-3! lg:px-6!">
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="grid h-9 w-9 place-items-center rounded-lg text-(--dash-foreground) hover:bg-(--dash-surface-muted)"
      >
        <Menu size={19} />
      </button>

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-xl font-semibold text-(--dash-foreground)">
          Welcome to your dashboard
        </h2>
        <p className="text-sm text-(--dash-muted)">
          Here&apos;s what&apos;s in your library today.
        </p>
      </div>

      <button className="relative grid h-10 w-10 place-items-center rounded-full border border-(--dash-border) bg-white text-(--dash-muted) hover:text-(--dash-foreground)">
        <Bell size={15} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-400" />
      </button>
    </header>
  );
}

export default DashboardNavbar;
