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

const ResourcesPage = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/resources/tags");
        setTags(res.data.data);
      } catch (err) {
        console.error(getApiErrorMessage(err));
      }
    };

    fetchTags();
  }, []);

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
        <div className="singleSearch">
          <p>Link</p>
          <img src={closeBlueIcon} alt="closeBlueIcon" />
        </div>
        <div className="singleSearch">
          <p>pdf</p>
          <img src={closeBlueIcon} alt="closeBlueIcon" />
        </div>
        <p className="claerAll">Clear all</p>
      </div>
      <div className="resourceBody">
        <div className="TagBody">
          <p className="tagHeading">Tags</p>
          <div className="TagSection">
            <div className="individualTag">
              <input type="checkbox" />
              <p>All type</p>
            </div>
            <div className="individualTag">
              <input type="checkbox" />
              <p>Links</p>
            </div>
          </div>
          <div className="tagExtension">
            <img
              src={tagExtension}
              alt="tag Extension"
              className="tagExtension"
            />
          </div>
        </div>
        <div className="linkBody">
          <div className="linkColumn">
            <div className="linkSection">
              <img src={linkIcon} alt="linkIcon" />
              <div className="links">
                <h4>Understanding Figma Design 2026</h4>
                <p>Stash.com</p>
              </div>
            </div>
            <div className="linkDate">
              <p>Today, 09:00 AM</p>
              <img src={saveIcon} alt="saveIcon" />
            </div>
          </div>
          <div className="linkColumn">
            <div className="linkSection">
              <img src={linkIcon} alt="linkIcon" />
              <div className="links">
                <h4>Learn to design Landing page</h4>
                <p>Stash.com</p>
              </div>
            </div>
            <div className="linkDate">
              <p>Today, 09:00 AM</p>
              <img src={saveIcon} alt="saveIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourcesPage;
