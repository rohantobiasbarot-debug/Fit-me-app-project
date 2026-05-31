"use client";

import { Wand2, Shirt, Clock, User } from "lucide-react";

const TABS = [
  { id: "tryon",    icon: Wand2,  label: "Try On"   },
  { id: "wardrobe", icon: Shirt,  label: "Wardrobe" },
  { id: "history",  icon: Clock,  label: "History"  },
  { id: "profile",  icon: User,   label: "Profile"  },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface TabBarProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <nav
      className="flex gap-1 p-1 rounded-2xl mb-6"
      style={{ background: "rgba(26,31,46,0.7)", border: "1px solid rgba(249,115,22,0.15)" }}
      aria-label="Dashboard tabs"
    >
      {TABS.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === (id as TabId);
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex-1 justify-center ${
              isActive
                ? "text-white"
                : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
            }`}
            style={
              isActive
                ? { background: "#F97316", boxShadow: "0 0 20px rgba(249,115,22,0.35)" }
                : {}
            }
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
