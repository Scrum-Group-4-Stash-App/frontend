// import React from "react";
import CollectionCard from "./CollectionCard";
import "./CollectionGrid.css";

interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  color: string;
  folderImage: string;
  createdAt: string;
}

interface CollectionGridProps {
  collections: Collection[];
}

function CollectionGrid({ collections }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className="collection-grid-empty">
        <p>No collections found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export default CollectionGrid;
