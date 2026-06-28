import Dropdown from "../Dropdown";
import { useState } from "react";
import MenuItem from "../MenuItems";
import { navigationItems } from "./NavData";

import {
  TbUser,
  TbSettings,
  TbHelpSquareRounded,
  TbLock,
  TbPalette,
  TbShield,
  TbChevronDown,
  TbChevronRight,
} from "react-icons/tb";

const tagItems = [
  { id: "frontend", label: "Frontend" },
  { id: "product design", label: "Product Design" },
  { id: "thread", label: "Thread" },
  { id: "programming", label: "Programming" },
  { id: "research", label: "Research" },
  { id: "career", label: "Career" },
  { id: "creativity", label: "Creativity" },
  { id: "startup", label: "Startup" },
  { id: "tools", label: "Tools" },
  { id: "school", label: "School" },
  { id: "books", label: "Books" },
  { id: "dev", label: "Dev" },
];

const profileItems = [
  {
    id: "personal",
    label: "Personal Information",
    icon: <TbUser size={20} />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <TbSettings size={20} />,
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <TbHelpSquareRounded size={20} />,
  },
  {
    id: "password",
    label: "Password & Security",
    icon: <TbLock size={20} />,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <TbPalette size={20} />,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: <TbShield size={20} />,
  },
];
export default function NavMenu() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const [showTags, setShowTags] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="navigation-menu">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.id}>
            <MenuItem
              icon={<Icon size={20} />}
              label={item.label}
              badge={item.badge}
              active={activeItem === item.id}
              onClick={() => {
                setActiveItem(item.id);

                if (item.id === "tags") {
                  setShowTags((prev) => !prev);
                  setShowProfile(false);
                }

                if (item.id === "profile") {
                  setShowProfile((prev) => !prev);
                  setShowTags(false);
                }
              }}
              endIcon={
                item.id === "tags" ? (
                  showTags ? (
                    <TbChevronDown size={18} />
                  ) : (
                    <TbChevronRight size={18} />
                  )
                ) : item.id === "profile" ? (
                  showProfile ? (
                    <TbChevronDown size={18} />
                  ) : (
                    <TbChevronRight size={18} />
                  )
                ) : undefined
              }
            />

            {item.id === "tags" && showTags && <Dropdown items={tagItems} />}

            {item.id === "profile" && showProfile && (
              <Dropdown items={profileItems} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
