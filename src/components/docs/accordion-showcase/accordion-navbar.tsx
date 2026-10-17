"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink } from "lucide-react";

export function AccordionNavbar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <header className="mf-acc-navbar">
      <div className="mf-acc-nav-container">
        {/* Left: Brand Logo */}
        <Link href="/" className="mf-acc-brand-logo" aria-label="Mintforge UI Home">
          <div className="mf-acc-logo-mark">
            <span>M</span>
          </div>
          <span>Mintforge UI</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          <Link href="/" className="mf-acc-nav-item">
            Home
          </Link>
          <Link href="/docs/components" className="mf-acc-nav-item active">
            Components
          </Link>
          <Link href="/docs" className="mf-acc-nav-item">
            Docs
          </Link>
          <a
            href="https://github.com/rakshithkumar608/mintforge-ui"
            target="_blank"
            rel="noreferrer"
            className="mf-acc-nav-item flex items-center gap-1.5"
          >
            <span>Community</span>
            <ExternalLink size={13} className="text-[#9CA3AF]" />
          </a>
        </nav>

        {/* Right: Search & Get Started */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex mf-acc-search-pill">
            <Search size={14} className="text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mf-acc-search-input"
              aria-label="Search components"
            />
            <kbd className="mf-acc-search-kbd">⌘ K</kbd>
          </div>

          <Link
            href="/docs/installation"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#5145FF] hover:bg-[#4338CA] shadow-[0_2px_8px_rgba(81,69,255,0.28)] transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
}
