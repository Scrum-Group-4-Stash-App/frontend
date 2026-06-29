import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router";
import { AppRoutes } from "@/constants/routes";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  [AppRoutes.dashboard.index]: {
    title: "Welcome to your dashboard",
    subtitle: "Here's what's in your library today.",
  },
  [AppRoutes.dashboard.collections]: {
    title: "Collections",
    subtitle: "Organize your links into collections.",
  },
  [AppRoutes.dashboard.allResources]: {
    title: "All Resources",
    subtitle: "Browse all your saved resources.",
  },
  [AppRoutes.dashboard.favorites]: {
    title: "Favorites",
    subtitle: "Your favourite resources.",
  },
  [AppRoutes.dashboard.recents]: {
    title: "Recents",
    subtitle: "Your recently viewed resources.",
  },
  [AppRoutes.dashboard.shared]: {
    title: "Shared with me",
    subtitle: "Resources others have shared with you.",
  },
  [AppRoutes.dashboard.trash]: {
    title: "Trash",
    subtitle: "Your deleted resources.",
  },
};

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const { pathname } = useLocation();
  const page = pageTitles[pathname] ?? {
    title: "Welcome to your dashboard",
    subtitle: "Here's what's in your library today.",
  };

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
          {page.title}
        </h2>
        <p className="text-sm text-(--dash-muted)">{page.subtitle}</p>
      </div>

      <button className="relative grid h-10 w-10 place-items-center rounded-full border border-(--dash-border) bg-white text-(--dash-muted) hover:text-(--dash-foreground)">
        <Bell size={15} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-400" />
      </button>
    </header>
  );
}

export default DashboardNavbar;
