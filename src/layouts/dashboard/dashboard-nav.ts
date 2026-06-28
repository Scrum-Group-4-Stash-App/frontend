import { AppRoutes } from "@/constants/routes";
import {
  Clock,
  Files,
  FolderOpen,
  LayoutDashboard,
  Star,
  Trash2,
  Users,
} from "lucide-react";

export const dashboardNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: AppRoutes.dashboard.index },
  { icon: Files, label: "All resources", to: AppRoutes.dashboard.allResources },
  {
    icon: FolderOpen,
    label: "Collections",
    to: AppRoutes.dashboard.collections,
  },
  { icon: Star, label: "Favorites", to: AppRoutes.dashboard.favorites },
  { icon: Clock, label: "Recents", to: AppRoutes.dashboard.recents },
  { icon: Users, label: "Shared with me", to: AppRoutes.dashboard.shared },
  { icon: Trash2, label: "Trash", to: AppRoutes.dashboard.trash },
];
