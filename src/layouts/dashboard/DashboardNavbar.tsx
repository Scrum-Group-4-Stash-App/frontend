import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { Bell, Menu, Search } from "lucide-react";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const { session } = useAuthSession();
  const name = session?.user.name?.split(" ")[0] || "Emmanuel";

  return (
    <header className="flex flex-col gap-5 bg-(--dash-surface) px-5! py-6! md:flex-row md:items-center md:gap-8 lg:px-10! lg:py-12!">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-(--dash-foreground) hover:bg-(--dash-surface-muted)"
        >
          <Menu size={24} strokeWidth={1.7} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-2xl font-semibold tracking-normal text-black lg:text-[28px]">
            Good morning, {name}
          </h2>
          <p className="mt-1 text-base text-black">
            Here&apos;s what&apos;s in your Library today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 md:w-[48%]">
        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#9f9f9f] bg-white px-4!">
          <Search size={19} className="shrink-0 text-[#8e8e8e]" />
          <input
            type="search"
            placeholder="Search resources"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-black outline-none placeholder:text-[#b7b7b7]"
          />
        </label>

        <button className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black hover:bg-(--dash-surface-muted)">
          <Bell size={21} strokeWidth={1.8} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

export default DashboardNavbar;
