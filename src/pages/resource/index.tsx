import "./index.css";
import notificationProfile from "@/assets/notificationProfile.svg";
import searchIcon from "@/assets/search-normal.png";
import closeIcon from "@/assets/close-circle.svg";
import filterIcon from "@/assets/filterIcon.svg";
import closeBlueIcon from "@/assets/blue-close-circle.svg";
import tagExtension from "@/assets/tagExtension.png";
import linkIcon from "@/assets/linkIcon.svg";
import saveIcon from "@/assets/saveIcon.svg";
import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "@/services/api";

interface Resource {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: string;
}

const ResourcesPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);

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

  // Fetch resources whenever selectedTags changes
  useEffect(() => {
    const fetchResources = async () => {
      setLoadingResources(true);
      try {
        const res = await api.get("/resources", {
          params: {
            ...(selectedTags.length > 0 && {
              tags: selectedTags
                .map((t) => t.replace(/,\s*$/, "").trim())
                .join(","),
            }),
            sort: "newest",
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
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const clearAll = () => setSelectedTags([]);

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
          <div className="searchIcons">
            <img src={searchIcon} alt="searchIcon" />
            <img src={closeIcon} alt="closeIcon" />
          </div>

          <input className="resourceInput" type="text" />
        </div>
        <img src={notificationProfile} alt="notificationProfile" />
      </div>
      <h3 className="searchResultheading">Search Results</h3>
      <div className="searchResultSection">
        <img src={filterIcon} alt="filterIcon" />
        {selectedTags.map((tag) => (
          <div className="singleSearch" key={tag}>
            <p>{tag}</p>
            <img
              src={closeBlueIcon}
              alt="remove"
              onClick={() => removeTag(tag)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
        {selectedTags.length > 0 && (
          <p
            className="claerAll"
            onClick={clearAll}
            style={{ cursor: "pointer" }}
          >
            Clear all
          </p>
        )}
      </div>
      <div className="resourceBody">
        {/* Tags sidebar */}
        <div className="TagBody">
          <p className="tagHeading">Tags</p>
          <div className="TagSection">
            <div className="individualTag">
              <input
                type="checkbox"
                checked={selectedTags.length === 0}
                onChange={clearAll}
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
          <div className="tagExtension">
            <img
              src={tagExtension}
              alt="tag Extension"
              className="tagExtension"
            />
          </div>
        </div>
        {/* Resources list */}
        <div className="linkBody">
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
