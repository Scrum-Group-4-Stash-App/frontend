import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import readingListNotionLogo from "@/assets/reading-list-notion.png";
import {
  BarChart3,
  Bookmark,
  ChevronRight,
  X,
  Folder,
  Folders,
  Layers3,
  Link2,
  MoreHorizontal,
  Plane,
  Tags,
} from "lucide-react";
import { useState } from "react";

const stats = [
  {
    label: "Total Resources Saved",
    value: "200",
    icon: Layers3,
    iconClass: "bg-cyan-100 text-cyan-700",
  },
  {
    label: "Leading Resource Type",
    value: "Link",
    icon: Link2,
    iconClass: "bg-indigo-100 text-blue-600",
  },
  {
    label: "Favourite Resources",
    value: "10",
    icon: Bookmark,
    iconClass: "bg-[#665900] text-yellow-300",
  },
  {
    label: "Tags on Resources",
    value: "20",
    icon: Tags,
    iconClass: "bg-red-50 text-red-600",
  },
  {
    label: "View Search History",
    value: "",
    icon: BarChart3,
    iconClass: "bg-emerald-100 text-emerald-700",
  },
];

const actions = [
  {
    label: "Create Resource",
    action: "create-resource",
    icon: Folders,
    className: "bg-[#dd868d] text-white",
    iconClass: "bg-white/70 text-zinc-800",
  },
  {
    label: "Create Collection",
    action: "create-collection",
    icon: Folder,
    className: "bg-[#151515] text-white",
    iconClass: "bg-purple-100 text-purple-700",
  },
  {
    label: "Import Bookmark",
    action: "import-bookmark",
    icon: Bookmark,
    className: "bg-[#118f8f] text-white",
    iconClass: "bg-yellow-50 text-yellow-700",
  },
  {
    label: "AI Categorization",
    action: "ai-categorization",
    icon: Plane,
    className: "bg-[#7e7cf6] text-white",
    iconClass: "bg-rose-100 text-red-600",
  },
];

const resourceTypes = ["Link", "PDF", "Book", "Video", "Article"];

const collections = [
  "Product Design",
  "Backend Dev",
  "Frontend Dev",
  "Cyber Security",
  "Digital Marketing",
];

const recentResources = [
  {
    title: "UX Design Principles.pdf",
    meta: "PDF - 3.2MB",
    date: "Today, 11:24 AM",
    badge: "PDF",
    badgeClass: "bg-orange-600 text-white",
  },
  {
    title: "Stash Product Requirement Document.doc",
    meta: "DOC - 2.2MB",
    date: "Today, 09:00 AM",
    badge: "DOC",
    badgeClass: "bg-sky-500 text-white",
  },
  {
    title: "Reading List Notion Template",
    meta: "Link - notion.90",
    date: "Jun 20, 2026",
    image: readingListNotionLogo,
    imageAlt: "Notion",
  },
  {
    title: "Color inspiration.png",
    meta: "PNG - 1.2MB",
    date: "Jun 18, 2026",
    badge: "PNG",
    badgeClass: "bg-orange-200 text-white",
  },
];

const breakdown = [
  { label: "Link", value: 100, width: "75%", color: "bg-[#6267ff]" },
  { label: "Articles", value: 23, width: "25%", color: "bg-[#11cbd4]" },
  { label: "PDF", value: 50, width: "50%", color: "bg-[#dc858c]" },
  { label: "Videos", value: 23, width: "25%", color: "bg-[#b54fe5]" },
  { label: "Tools", value: 4, width: "2%", color: "bg-red-500" },
];

const libraries = [
  { name: "Study Material", count: "13 Items", color: "text-sky-500" },
  { name: "Books", count: "10 Items", color: "text-teal-500" },
  { name: "Inspiration", count: "25 Items", color: "text-[#dc858c]" },
  { name: "Work Resources", count: "14 Items", color: "text-[#6267ff]" },
  { name: "Linked", count: "8 Items", color: "text-[#6267ff]" },
  { name: "Economic Paths", count: "2 Items", color: "text-yellow-400" },
];

const Dashboard = () => {
  const [saveBoardOpen, setSaveBoardOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1240px] px-5! pb-20! md:px-8! lg:px-10!">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-[#c4c4c4] bg-white px-3! py-4! text-center shadow-[0_3px_8px_rgba(0,0,0,0.12)]"
              >
                <div
                  className={[
                    "mb-5 grid h-11 w-11 place-items-center rounded-xl",
                    item.iconClass,
                  ].join(" ")}
                >
                  <Icon size={23} strokeWidth={2.1} />
                </div>
                {item.value && (
                  <strong className="text-base font-semibold text-black">
                    {item.value}
                  </strong>
                )}
                <span className="mt-1 text-sm text-black">{item.label}</span>
              </article>
            );
          })}
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  if (action.action === "create-resource") {
                    setSaveBoardOpen(true);
                  }
                }}
                className={[
                  "flex h-44 flex-col items-start rounded-lg px-6! py-6! text-left shadow-sm transition-transform hover:-translate-y-0.5",
                  action.className,
                ].join(" ")}
              >
                <span
                  className={[
                    "grid h-11 w-11 place-items-center rounded-xl",
                    action.iconClass,
                  ].join(" ")}
                >
                  <Icon size={24} strokeWidth={2} />
                </span>
                <span className="mt-6 text-2xl font-medium">
                  {action.label}
                </span>
              </button>
            );
          })}
        </section>

        <section className="mt-16">
          <h3 className="mb-6 text-2xl font-semibold text-black">
            Recent Resources
          </h3>

          <div>
            {recentResources.map((resource, index) => (
              <article
                key={resource.title}
                className={[
                  "flex items-center gap-4 py-6!",
                  index === 0 ? "" : "border-t border-[#d8d8d8]",
                ].join(" ")}
              >
                {"image" in resource ? (
                  <img
                    src={resource.image}
                    alt={resource.imageAlt}
                    className="h-8 w-7 shrink-0 rounded-[3px] object-contain"
                  />
                ) : (
                  <span
                    className={[
                      "grid h-8 w-7 shrink-0 place-items-center rounded-[3px] text-[10px] font-bold",
                      resource.badgeClass,
                    ].join(" ")}
                  >
                    {resource.badge}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-base font-semibold text-black">
                    {resource.title}
                  </h4>
                  <p className="mt-1 text-xs text-black">{resource.meta}</p>
                </div>
                <time className="hidden text-sm text-[#444] sm:block">
                  {resource.date}
                </time>
                <button
                  type="button"
                  aria-label={`More options for ${resource.title}`}
                  className="grid h-8 w-8 place-items-center rounded-full text-[#444] hover:bg-(--dash-surface-muted)"
                >
                  <MoreHorizontal size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h3 className="mb-6 text-2xl font-semibold text-black">
            Resources Breakdown
          </h3>
          <div className="space-y-5!">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[72px_1fr_44px] items-center gap-5"
              >
                <span className="text-base font-semibold text-black">
                  {item.label}
                </span>
                <div className="h-4 overflow-hidden rounded-full bg-[#eaf3ff]">
                  <div
                    className={["h-full min-w-4 rounded-full", item.color].join(
                      " ",
                    )}
                    style={{ width: item.width }}
                  />
                </div>
                <strong className="text-right text-base font-semibold text-black">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-18">
          <h3 className="mb-8 text-2xl font-semibold text-black">
            Resource Library View
          </h3>

          <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {libraries.map((library) => (
              <article
                key={library.name}
                className="flex min-h-32 flex-col items-center justify-center border border-[#ececff] bg-white px-3! py-5! text-center"
              >
                <Folder
                  size={48}
                  strokeWidth={0}
                  className={["mb-6 fill-current", library.color].join(" ")}
                />
                <h4 className="text-base font-semibold text-black">
                  {library.name}
                </h4>
                <p className="mt-1 text-xs text-black">{library.count}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {saveBoardOpen && (
        <SaveBoardModal onClose={() => setSaveBoardOpen(false)} />
      )}
    </DashboardLayout>
  );
};

interface SaveBoardModalProps {
  onClose: () => void;
}

function SaveBoardModal({ onClose }: SaveBoardModalProps) {
  const [type, setType] = useState(resourceTypes[0]);
  const [collection, setCollection] = useState(collections[0]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/65 px-4! py-6!"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-board-title"
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="w-full max-w-[570px] rounded-2xl bg-[#f0f0ff] px-9! py-7! text-[#151515] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
      >
        <div className="mb-7 flex items-start justify-between gap-5">
          <div>
            <h2 id="save-board-title" className="text-2xl font-semibold">
              Save on Stash
            </h2>
            <p className="mt-1 text-sm text-[#262626]">
              Paste a URL to add a resources
            </p>
          </div>

          <button
            type="button"
            aria-label="Close save board"
            onClick={onClose}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#8f8f9e] text-[#6a6a75] hover:bg-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-5">
          <SaveBoardField
            label="URL"
            required
            placeholder="https://instance.ixdf.com/link"
          />
          <SaveBoardField
            label="Title"
            required
            placeholder="Name your resource"
          />
          <SaveBoardField
            label="Description"
            placeholder="Rate resource importance for you"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <SaveBoardSelect
              label="Type"
              value={type}
              options={resourceTypes}
              open={typeOpen}
              onToggle={() => {
                setTypeOpen((open) => !open);
                setCollectionOpen(false);
              }}
              onSelect={(nextType) => {
                setType(nextType);
                setTypeOpen(false);
              }}
            />

            <SaveBoardSelect
              label="Collection"
              value={collection}
              options={collections}
              open={collectionOpen}
              onToggle={() => {
                setCollectionOpen((open) => !open);
                setTypeOpen(false);
              }}
              onSelect={(nextCollection) => {
                setCollection(nextCollection);
                setCollectionOpen(false);
              }}
            />
          </div>

          <SaveBoardField
            label="Tags"
            labelSuffix="(only spacing)"
            placeholder="Design Thread, Creativity"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-md border border-[#6b63ff] bg-transparent text-sm font-semibold text-[#6b63ff] hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 rounded-md bg-[#6561ff] text-sm font-semibold text-white hover:bg-[#5550f1]"
          >
            Save to Stash
          </button>
        </div>
      </form>
    </div>
  );
}

interface SaveBoardFieldProps {
  label: string;
  labelSuffix?: string;
  placeholder: string;
  required?: boolean;
}

function SaveBoardField({
  label,
  labelSuffix,
  placeholder,
  required = false,
}: SaveBoardFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-[#33333d]">
        {label}
        {required && <span className="text-red-500">*</span>}
        {labelSuffix && (
          <span className="ml-1 font-medium text-[#6f6f79]">{labelSuffix}</span>
        )}
      </span>
      <input
        className="h-11 rounded-md border border-[#aaaabb] bg-transparent px-3! text-sm text-[#222] outline-none placeholder:text-[#b7b7c2] focus:border-[#6b63ff] focus:ring-2 focus:ring-[#6b63ff]/20"
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

interface SaveBoardSelectProps {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

function SaveBoardSelect({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: SaveBoardSelectProps) {
  return (
    <div className="relative grid gap-2">
      <span className="text-xs font-semibold text-[#33333d]">{label}</span>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex h-11 items-center justify-between rounded-md border border-[#aaaabb] bg-transparent px-3! text-left text-base font-medium text-[#55555f] hover:bg-white/50"
      >
        <span>{value}</span>
        <ChevronRight size={18} className={open ? "rotate-90" : ""} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full border border-[#d7d7df] bg-white px-8! py-3! shadow-lg">
          <ul className="space-y-1!">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onSelect(option)}
                  className="w-full text-left text-xl leading-7 text-[#555] hover:text-[#111]"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
