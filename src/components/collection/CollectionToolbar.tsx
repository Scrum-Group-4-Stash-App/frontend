import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import "./CollectionToolbar.css";

interface CollectionToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

function CollectionToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: CollectionToolbarProps) {
  return (
    <div className="collection-toolbar">
      <div className="collection-toolbar__search">
        <Search size={18} className="collection-toolbar__search-icon" />
        <input
          type="text"
          className="collection-toolbar__input"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="collection-toolbar__filters">
        <select
          className="collection-toolbar__select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="recent">Sort by: Recent</option>
          <option value="oldest">Sort by: Oldest</option>
          <option value="az">Sort by: Name (A-Z)</option>
          <option value="za">Sort by: Name (Z-A)</option>
        </select>
      </div>
      <button className="collection-toolbar__filter">
        <SlidersHorizontal size={20} />
      </button>
    </div>
  );
}

export default CollectionToolbar;
