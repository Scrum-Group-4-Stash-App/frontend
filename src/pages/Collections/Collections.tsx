import { useState } from "react";
import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionToolbar from "../../components/collection/CollectionToolbar";
import CollectionGrid from "../../components/collection/CollectionGrid";
import Pagination from "../../components/collection/Pagination";
import PageLayout from "../../components/layout/PageLayout";
import BlueFolder from "@/assets/Blue folder.svg";
import PinkFolder from "@/assets/Pink folder.svg";
import PurpleFolder from "@/assets/Purple folder.svg";
import YellowFolder from "@/assets/Yellow folder.svg";
import GreenFolder from "@/assets/Green folder.svg";
import GreyFolder from "@/assets/Grey folder.svg";

interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  color: string;
  folderImage: string;
  createdAt: string;
}

function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const [collections] = useState<Collection[]>([
    {
      id: "1",
      title: "Design Inspiration",
      description: "Website and resources for UI/UX inspiration.",
      itemCount: 12,
      color: "#2196F3",
      folderImage: BlueFolder,
      createdAt: "2026-06-20T09:30:00Z",
    },
    {
      id: "2",
      title: "UX Research",
      description: "Articles, reports, and studies on user experience.",
      itemCount: 8,
      color: "#10B981",
      folderImage: PinkFolder,
      createdAt: "2026-06-17T14:45:00Z",
    },
    {
      id: "3",
      title: "Development Resources",
      description: "Documentation, tutorials, and development tools.",
      itemCount: 15,
      color: "#F59E0B",
      folderImage: PurpleFolder,
      createdAt: "2026-09-10T15:45:00Z",
    },
    {
      id: "4",
      title: "All Resources",
      description: "AI tools, research papers, and learning materials",
      itemCount: 16,
      color: "#EF4444",
      folderImage: GreyFolder,
      createdAt: "2026-09-15T10:30:00Z",
    },
    {
      id: "5",
      title: "Content & Articles",
      description: "Useful articles, blogs, and reading list",
      itemCount: 17,
      color: "#8B5CF6",
      folderImage: GreenFolder,
      createdAt: "2026-01-17T14:45:00Z",
    },
    {
      id: "6",
      title: "Development Resources",
      description: "Tools and apps to stay productive and organized",
      itemCount: 18,
      color: "#F59E0B",
      folderImage: BlueFolder,
      createdAt: "2025-06-17T14:45:00Z",
    },
    {
      id: "7",
      title: "Study Material",
      description: "Website and resources for UI/UX inspiration.",
      itemCount: 25,
      color: "#F59E0B",
      folderImage: BlueFolder,
      createdAt: "2026-09-12T14:45:00Z",
    },
    {
      id: "8",
      title: "Watch Later",
      description: "Movies, YouTube videos, documentaries, and shows.",
      itemCount: 18,
      color: "#F59E0B",
      folderImage: PinkFolder,
      createdAt: "2026-02-17T14:45:00Z",
    },
    {
      id: "9",
      title: "Podcast",
      description: "Interesting podcast episodes and series.",
      itemCount: 32,
      color: "#F59E0B",
      folderImage: PurpleFolder,
      createdAt: "2026-09-17T14:45:00Z",
    },
    {
      id: "10",
      title: "Wishlist",
      description: "Products you're considering buying.",
      itemCount: 17,
      color: "#F59E0B",
      folderImage: GreyFolder,
      createdAt: "2026-02-17T17:45:00Z",
    },
    {
      id: "11",
      title: "Home Projects",
      description: "DIY ideas, renovations, and home inspiration.",
      itemCount: 21,
      color: "#F59E0B",
      folderImage: YellowFolder,
      createdAt: "2026-02-17T14:45:00Z",
    },
    {
      id: "12",
      title: "Finance & Investing",
      description: "Personal finance, investing, and budgeting resources.",
      itemCount: 23,
      color: "#F59E0B",
      folderImage: GreenFolder,
      createdAt: "2026-12-12T14:45:00Z",
    },
  ]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // 1. Filter
  const filteredCollections = collections.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. Sort
  const sortedCollections = [...filteredCollections];
  switch (sortBy) {
    case "recent":
      sortedCollections.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "oldest":
      sortedCollections.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;
    case "az":
      sortedCollections.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sortedCollections.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  // 3. Paginate
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedCollections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCollections = sortedCollections.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <PageLayout>
      <CollectionHeader />
      <CollectionToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <CollectionGrid collections={paginatedCollections} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
}

export default CollectionsPage;
