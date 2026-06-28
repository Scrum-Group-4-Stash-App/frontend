import {
  TbLayoutDashboard,
  TbFolders,
  TbFolder,
  TbStar,
  TbClock,
  TbShare3,
  TbTrash,
  TbTag,
  TbUser,
} from "react-icons/tb";

export const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: TbLayoutDashboard,
    badge: 3,
    
  },
  {
    id: "resources",
    label: "All Resources",
    icon: TbFolders,
    badge: 3,
  },
  {
    id: "collections",
    label: "Collections",
    icon: TbFolder,
    badge: 3,
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: TbStar,
    badge: 3,
  },
  {
    id: "recents",
    label: "Recents",
    icon: TbClock,
    badge: 3,
  },
  {
    id: "shared",
    label: "Shared with me",
    icon: TbShare3,
    badge: 3,
  },
  {
    id: "trash",
    label: "Trash",
    icon: TbTrash,
    badge: 3,
  },
  {
    id: "tags",
    label: "Tags",
    icon: TbTag,
    endIcon: true,
  },
  {
    id: "profile",
    label: "Profile",
    icon: TbUser,
  },
];