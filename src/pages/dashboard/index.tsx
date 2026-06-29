import api, { getApiErrorMessage } from "@/services/api";
import {
  BarChart3,
  Bookmark,
  Folder,
  Folders,
  Layers3,
  Link2,
  MoreHorizontal,
  Plane,
  Tags,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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

interface DashboardResource {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ResourcesResponse {
  success: boolean;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: DashboardResource[];
}

interface TagsResponse {
  success: boolean;
  data: string[];
}

interface CountResponse {
  success: boolean;
  data: number | { count?: number; total?: number };
}

const tagColors = [
  "bg-[#6267ff]",
  "bg-[#11cbd4]",
  "bg-[#dc858c]",
  "bg-[#b54fe5]",
  "bg-red-500",
  "bg-[#15a35b]",
];

function normalizeTag(tag: string) {
  return tag.replace(/,\s*$/, "").trim();
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getPrimaryTag(tags: string[]) {
  return tags.map(normalizeTag).find(Boolean) ?? "Untagged";
}

function buildTagCounts(resources: DashboardResource[]) {
  const counts = new Map<string, number>();

  resources.forEach((resource) => {
    resource.tags.forEach((tag) => {
      const cleanTag = normalizeTag(tag);

      if (!cleanTag) {
        return;
      }

      counts.set(cleanTag, (counts.get(cleanTag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value);
}

const Dashboard = () => {
  const [saveBoardOpen, setSaveBoardOpen] = useState(false);
  const [resources, setResources] = useState<DashboardResource[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [resourceCount, setResourceCount] = useState(0);
  const [meta, setMeta] = useState<ResourcesResponse["meta"]>({
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    let mounted = true;

    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [resourcesRes, tagsRes, countRes] = await Promise.all([
          api.get<ResourcesResponse>("/resources", {
            params: {
              page: 1,
              limit: 50,
            },
          }),
          api.get<TagsResponse>("/resources/tags"),
          api.get<CountResponse>("/resources/count"),
        ]);

        if (!mounted) {
          return;
        }

        setResources(resourcesRes.data.data ?? []);
        setTags(
          (tagsRes.data.data ?? [])
            .map((tag) => normalizeTag(tag))
            .filter(Boolean),
        );
        setResourceCount(() => {
          const payload = countRes.data.data;

          if (typeof payload === "number") {
            return payload;
          }

          return payload?.count ?? payload?.total ?? 0;
        });
        setMeta(
          resourcesRes.data.meta ?? {
            total: 0,
            page: 0,
            limit: 0,
            totalPages: 0,
          },
        );
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(getApiErrorMessage(err));
        setResources([]);
        setMeta({
          total: 0,
          page: 0,
          limit: 0,
          totalPages: 0,
        });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedResources = [...resources].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
  const topTags = buildTagCounts(resources);
  const uniqueTagCount = resources.reduce((set, resource) => {
    resource.tags.forEach((tag) => {
      const cleanTag = normalizeTag(tag);

      if (cleanTag) {
        set.add(cleanTag);
      }
    });

    return set;
  }, new Set<string>()).size;
  const tagEndpointCount = tags.length;
  const favouriteResources = resources.filter((resource) =>
    resource.tags.some((tag) =>
      normalizeTag(tag).toLowerCase().includes("fav"),
    ),
  ).length;
  const breakdown = topTags.slice(0, 5).map((item, index) => {
    const topCount = topTags[0]?.value ?? 1;
    const width = Math.max(8, Math.round((item.value / topCount) * 100));

    return {
      label: item.label,
      value: item.value,
      width: `${width}%`,
      color: tagColors[index % tagColors.length],
    };
  });
  const libraries = topTags.slice(0, 6).map((item, index) => ({
    name: item.label,
    count: `${item.value} Item${item.value === 1 ? "" : "s"}`,
    color: [
      "text-sky-500",
      "text-teal-500",
      "text-[#dc858c]",
      "text-[#6267ff]",
      "text-yellow-400",
      "text-emerald-500",
    ][index % 6],
  }));
  const stats = [
    {
      label: "Total Resources Saved",
      value: loading ? "Loading..." : String(resourceCount || meta.total),
      icon: Layers3,
      iconClass: "bg-cyan-100 text-cyan-700",
    },
    {
      label: "Leading Resource Type",
      value: loading ? "Loading..." : (topTags[0]?.label ?? "No tags"),
      icon: Link2,
      iconClass: "bg-indigo-100 text-blue-600",
    },
    {
      label: "Favourite Resources",
      value: loading ? "Loading..." : String(favouriteResources),
      icon: Bookmark,
      iconClass: "bg-[#665900] text-yellow-300",
    },
    {
      label: "Tags on Resources",
      value: loading
        ? "Loading..."
        : String(tagEndpointCount || uniqueTagCount),
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

  return (
    <>
      <div className="mx-auto w-full max-w-[1240px] px-5! pb-20! md:px-8! lg:px-10!">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
            {loading && sortedResources.length === 0 ? (
              <p className="py-6 text-sm text-[#444]">Loading resources...</p>
            ) : sortedResources.length === 0 ? (
              <p className="py-6 text-sm text-[#444]">
                No resources saved yet.
              </p>
            ) : (
              sortedResources.slice(0, 4).map((resource, index) => {
                const primaryTag = getPrimaryTag(resource.tags);

                return (
                  <article
                    key={resource._id}
                    className={[
                      "flex items-center gap-4 py-6!",
                      index === 0 ? "" : "border-t border-[#d8d8d8]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-8 w-7 shrink-0 place-items-center rounded-[3px] text-[10px] font-bold",
                        "bg-[#6267ff] text-white",
                      ].join(" ")}
                    >
                      {primaryTag.slice(0, 3).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-base font-semibold text-black">
                        {resource.title}
                      </h4>
                      <p className="mt-1 truncate text-xs text-black">
                        {primaryTag} - {getHostname(resource.url)}
                      </p>
                    </div>
                    <time className="hidden text-sm text-[#444] sm:block">
                      {formatDate(resource.createdAt)}
                    </time>
                    <button
                      type="button"
                      aria-label={`More options for ${resource.title}`}
                      className="grid h-8 w-8 place-items-center rounded-full text-[#444] hover:bg-(--dash-surface-muted)"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </article>
                );
              })
            )}
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

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-lg bg-[#6561ff] px-5! py-3! text-white shadow-lg">
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {saveBoardOpen && (
        <SaveBoardModal
          onClose={() => setSaveBoardOpen(false)}
          onSuccess={() => {
            setSaveBoardOpen(false);
            showToast("Resource saved to Stash!");
          }}
        />
      )}
    </>
  );
};

interface SaveBoardModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function SaveBoardModal({ onClose, onSuccess }: SaveBoardModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form fields
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/resources", {
        url,
        title,
        description,
        tags: tags
          .split(" ")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      onSuccess();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/65 px-4! py-6!"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-board-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[570px] rounded-2xl bg-[#f0f0ff] px-9! py-7! text-[#151515] shadow-[0_24px_70px_rgba(0,0,0,0.28)] max-h-[95dvh] overflow-y-auto"
      >
        <div className="mb-4 flex items-start justify-between gap-5">
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
            value={url}
            onChange={setUrl}
          />
          <SaveBoardField
            label="Title"
            required
            placeholder="Name your resource"
            value={title}
            onChange={setTitle}
          />
          <SaveBoardField
            label="Description"
            placeholder="Rate resource importance for you"
            value={description}
            onChange={setDescription}
          />

          <SaveBoardField
            label="Tags"
            labelSuffix="(only spacing)"
            placeholder="Design Thread, Creativity"
            value={tags}
            onChange={setTags}
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-md border border-[#6b63ff] bg-transparent text-sm font-semibold text-[#6b63ff] hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-md bg-[#6561ff] text-sm font-semibold text-white hover:bg-[#5550f1]"
          >
            {loading ? "Saving..." : "Save to Stash"}
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
  value: string;
  onChange: (v: string) => void;
}

function SaveBoardField({
  label,
  labelSuffix,
  placeholder,
  required = false,
  value,
  onChange,
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default Dashboard;
