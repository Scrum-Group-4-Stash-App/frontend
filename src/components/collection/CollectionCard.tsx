import React from "react";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import "./CollectionCard.css";
import { timeAgo } from "@/utils/timeAgo";

interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  color?: string;
  createdAt: string;
  folderImage: string;
}

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="collection-card">
      <div className="collection-card__icon"></div>
      <img
        src={collection.folderImage}
        alt={collection.title}
        className="collection-card__folder"
      />
      <div className="collection-card__header">
        <h3 className="collection-card__title">{collection.title}</h3>
        <div className="collection-card__menu">
          <button
            className="collection-card__menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div className="collection-card__dropdown">
              <button className="collection-card__action">
                <Edit size={16} />
                Edit
              </button>
              <button className="collection-card__action collection-card__action--delete">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="collection-card__footer">
        <span className="collection-card__count">
          {collection.itemCount} links
        </span>
        <p className="collection-card__description">{collection.description}</p>
      </div>
      <p className="collection-card__timestamp">
        {timeAgo(collection.createdAt)}
      </p>
    </div>
  );
}

export default CollectionCard;
