"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Apple,
  Trophy,
  Settings,
  Zap,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Dumbbell, label: "Workouts", active: false },
  { icon: TrendingUp, label: "Progress", active: false },
  { icon: Apple, label: "Nutrition", active: false },
  { icon: Trophy, label: "Challenges", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-strong cursor-pointer"
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-5 h-5 text-[#F8FAFC]" aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5 text-[#F8FAFC]" aria-hidden="true" />
        )}
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 glass-strong z-40 flex flex-col p-5 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Dashboard navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 mt-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center glow-orange">
            <Zap className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true" />
          </div>
          <span
            className="text-xl font-bold gradient-text"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            FIT-ME
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer text-left ${
                  item.active
                    ? "bg-[#F97316]/15 text-[#F97316]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
                }`}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User card */}
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            aria-hidden="true"
          >
            RB
          </div>
          <div className="min-w-0">
            <div className="text-sm text-[#F8FAFC] font-semibold truncate">Rohan B.</div>
            <div className="text-xs text-[#22C55E]">Pro member</div>
          </div>
        </div>
      </aside>
    </>
  );
}
