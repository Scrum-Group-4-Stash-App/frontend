// import React from "react";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import "./CollectionHeader.css";

function CollectionHeader() {
  return (
    <header className="collection-header">
      <div className="collection-header__content">
        <h1 className="collection-header__title">Collections</h1>
        <p className="collection-header__description">
          Organize your links into collections
        </p>
      </div>
      <Button className="collection-header__button" icon={Plus}>
        New Collection
      </Button>
    </header>
  );
}

export default CollectionHeader;
