"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav
        className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between max-w-6xl mx-auto"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 cursor-pointer" aria-label="Fit-me home">
          <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center glow-orange">
            <Zap className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true" />
          </div>
          <span
            className="text-xl font-bold gradient-text"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            FIT-ME
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#download"
            className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold transition-all duration-200 glow-green cursor-pointer"
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="w-5 h-5 text-[#F8FAFC]" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5 text-[#F8FAFC]" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass-strong rounded-2xl mt-2 px-6 py-4 max-w-6xl mx-auto flex flex-col gap-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 font-medium cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="mt-2 px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold text-center transition-colors duration-200 cursor-pointer"
          >
            Get Started Free
          </a>
        </div>
      )}
    </header>
  );
}
