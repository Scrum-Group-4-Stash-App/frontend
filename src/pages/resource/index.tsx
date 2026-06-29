import closeBlueIcon from "@/assets/blue-close-circle.svg";
import filterIcon from "@/assets/filterIcon.svg";
import linkIcon from "@/assets/linkIcon.svg";
import saveIcon from "@/assets/saveIcon.svg";
import searchIcon from "@/assets/search-normal.png";
import Button from "@/components/Button";
import api, { getApiErrorMessage } from "@/services/api";
import { useEffect, useState } from "react";
import "./index.css";

interface Resource {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
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
  data: Resource[];
}

type SortOrder = "newest" | "oldest";

const ResourcesPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [appliedTags, setAppliedTags] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOrder>("newest");
  const [appliedSort, setAppliedSort] = useState<SortOrder>("newest");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/resources/tags");
        const cleanedTags = res.data.data.map((tag: string) =>
          tag.replace(/,\s*$/, "").trim(),
        );
        setTags(cleanedTags);
      } catch (err) {
        console.error(getApiErrorMessage(err));
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput]);

  // Fetch resources whenever the applied filters or the debounced search query changes
  useEffect(() => {
    const fetchResources = async () => {
      setLoadingResources(true);
      try {
        const res = await api.get<ResourcesResponse>("/resources", {
          params: {
            ...(appliedTags.length > 0 && {
              tags: appliedTags
                .map((t) => t.replace(/,\s*$/, "").trim())
                .join(","),
            }),
            ...(searchQuery && { q: searchQuery }),
            sort: appliedSort,
            page: 1,
            limit: 20,
          },
        });
        setResources(res.data.data);
      } catch (err) {
        console.error(getApiErrorMessage(err));
      } finally {
        setLoadingResources(false);
      }
    };
    fetchResources();
  }, [appliedTags, appliedSort, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const applyFilters = () => {
    setAppliedTags(selectedTags);
    setAppliedSort(selectedSort);
  };

  const removeAppliedTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
    setAppliedTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value as SortOrder);
  };

  const clearAll = () => {
    setSelectedTags([]);
    setAppliedTags([]);
  };

  const clearSidebarTags = () => {
    setSelectedTags([]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <div className="page">
      <div className="searchBar">
        <div className="inputWrapper">
          <div className="absolute left-3 top-2">
            <img src={searchIcon} alt="searchIcon" />
          </div>

          <input
            className="resourceInput pl-12! py-5!"
            type="text"
            placeholder="Search resources..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <h3 className="searchResultheading">Search Results</h3>
      <div className="searchResultSection">
        <img src={filterIcon} alt="filterIcon" />
        {appliedTags.map((tag) => (
          <div className="singleSearch" key={tag}>
            <p>{tag}</p>
            <img
              src={closeBlueIcon}
              alt="remove"
              onClick={() => removeAppliedTag(tag)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
        {appliedTags.length > 0 && (
          <p
            className="claerAll"
            onClick={clearAll}
            style={{ cursor: "pointer" }}
          >
            Clear all
          </p>
        )}
      </div>
      <div className="resourceBody mb-20!">
        {/* Tags sidebar */}
        <div className="TagBody mb-8!">
          <p className="tagHeading">Tags</p>
          <div className="TagSection">
            <div className="individualTag">
              <input
                type="checkbox"
                checked={selectedTags.length === 0}
                onChange={clearSidebarTags}
              />
              <p>All types</p>
            </div>
            {tags.map((tag, index) => (
              <div className="individualTag" key={index}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                <p>{tag}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-center font-semibold">Date added</p>
            <select
              name="sort"
              id="sort"
              className="w-full text-sm! px-2!  text-gray-900! p-3!"
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <Button
            type="button"
            className="w-full text-sm! mt-3"
            onClick={applyFilters}
          >
            Apply Filter
          </Button>
        </div>
        {/* Resources list */}
        <div className="linkBody overflow-y-auto! pb-4! mb-16!">
          {loadingResources ? (
            <p style={{ padding: "1rem", color: "#888" }}>Loading...</p>
          ) : resources.length === 0 ? (
            <p style={{ padding: "1rem", color: "#888" }}>
              No resources found.
            </p>
          ) : (
            resources.map((resource) => (
              <div className="linkColumn" key={resource._id}>
                <a
                  className="linkSection"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkIcon} alt="linkIcon" />
                  <div className="links">
                    <h4>{resource.title}</h4>
                    <p>{getHostname(resource.url)}</p>
                  </div>
                </a>
                <div className="linkDate">
                  <p>{formatDate(resource.createdAt)}</p>
                  <img src={saveIcon} alt="saveIcon" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default ResourcesPage;
