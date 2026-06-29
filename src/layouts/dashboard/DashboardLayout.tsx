import type { ReactNode } from "react";
import { useState } from "react";
import DashboardNavbar from "@/layouts/dashboard/DashboardNavbar";
import DashboardSidebar from "@/layouts/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setCollapsed((previous) => !previous);
      return;
    }

    setMobileSidebarOpen((previous) => !previous);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-(--dash-bg)">
      <div className="hidden md:block">
        <DashboardSidebar collapsed={collapsed} />
      </div>

      <div
        className={[
          "fixed inset-0 z-40 md:hidden",
          mobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileSidebarOpen}
      >
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobileSidebar}
          className={[
            "absolute inset-0 bg-black/45 transition-opacity",
            mobileSidebarOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-y-0 left-0 transition-transform duration-200",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <DashboardSidebar collapsed={false} onNavigate={closeMobileSidebar} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <DashboardNavbar onToggleSidebar={handleToggleSidebar} />
        <main className="h-[calc(100vh-73px)] overflow-y-auto bg-(--dash-surface)">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
