"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";

const navigation = [
  { label: "Components", href: "/docs/components", badge: null },
  { label: "Blocks", href: "/#blocks", badge: null },
  { label: "Templates", href: "/#templates", badge: null },
  { label: "React Native", href: "/#react-native", badge: "Preview" },
  { label: "Docs", href: "/docs", badge: null },
];

const searchableItems = [
  { title: "Button", category: "Components", href: "/docs/components/button", desc: "Interactive button with primary, outline, and ghost variants" },
  { title: "Input & Form", category: "Components", href: "/docs/components/input", desc: "Accessible text inputs, labels, and validation states" },
  { title: "Card", category: "Components", href: "/docs/components/card", desc: "Elevated content container with header and action slots" },
  { title: "Modal / Dialog", category: "Components", href: "/docs/components/dialog", desc: "Overlay dialog for user confirmations and workflows" },
  { title: "Tabs", category: "Components", href: "/docs/components/tabs", desc: "Tabbed navigation for switching between views" },
  { title: "Badge & Pill", category: "Components", href: "/docs/components/badge", desc: "Status pills and numerical counters" },
  { title: "Authentication Layout", category: "Blocks", href: "/#blocks", desc: "Ready-to-use login, register, and 2FA layouts" },
  { title: "Admin Dashboard", category: "Blocks", href: "/#blocks", desc: "Sidebar, metrics cards, and activity feeds" },
  { title: "React Native Mobile", category: "Platforms", href: "/#react-native", desc: "Native iOS & Android cross-platform primitives" },
  { title: "Installation & CLI", category: "Documentation", href: "/docs#installation", desc: "Quick start guide, source copy, and package setup" },
  { title: "Agent Skills", category: "Documentation", href: "/docs/skills", desc: "AI assistant skills for Claude Code, Cursor, Windsurf, Copilot, and Antigravity" },
  { title: "Design Tokens", category: "Styling", href: "/docs#tokens", desc: "Color palettes, typography, spacing, and radius variables" },
];

export function SiteLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`mf-brand${footer ? " mf-brand-footer" : ""}`}
      aria-label="Mintforge UI Home"
    >
      <div className="mf-logo-box">
        <Image
          src="/logo.png"
          alt="Mintforge UI"
          width={32}
          height={32}
          priority
          className="mf-logo-img"
        />
        <span className="mf-logo-glow" aria-hidden="true" />
      </div>

      <div className="mf-brand-text">
        <span className="mf-brand-title">Mintforge</span>
        <span className="mf-brand-badge">UI</span>
      </div>

      {!footer && (
        <span className="mf-version-chip">
          <span className="mf-status-dot-pulse" aria-hidden="true" />
          v0.1
        </span>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Global keyboard shortcut for search dialog (Cmd+K / Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => {
          if (prev) {
            setSearchQuery("");
            return false;
          }
          return true;
        });
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const filteredItems = searchQuery.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableItems;

  return (
    <>
      <header className="mf-header">
        <div className="mf-header-container">
          {/* Brand Logo */}
          <SiteLogo />

          {/* Desktop Navigation */}
          <nav className="mf-nav-menu" aria-label="Main Navigation">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="mf-nav-link">
                <span>{item.label}</span>
                {item.badge && <span className="mf-nav-micro-badge">{item.badge}</span>}
              </Link>
            ))}
          </nav>

          {/* Actions on the Right */}
          <div className="mf-header-actions">
            {/* Quick Search Bar / Command Palette Trigger */}
            <button
              type="button"
              className="mf-search-btn"
              onClick={openSearch}
              aria-label="Search components and documentation"
              title="Search components (Press ⌘K or /)"
            >
              <Search size={14} className="mf-search-icon" />
              <span className="mf-search-text">Search components...</span>
              <span className="mf-search-kbd">
                <kbd>⌘</kbd>
                <kbd>K</kbd>
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="mf-theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${mounted && theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${mounted && theme === "dark" ? "light" : "dark"} mode`}
              suppressHydrationWarning
            >
              {mounted && theme === "dark" ? (
                <Sun size={17} className="mf-theme-sun" />
              ) : (
                <Moon size={17} className="mf-theme-moon" />
              )}
            </button>

            {/* GitHub Button */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-gh-btn"
              aria-label="View Mintforge UI on GitHub"
            >
              <FaGithub size={15} />
              <span className="mf-gh-text">GitHub</span>
              <ArrowUpRight size={13} className="mf-gh-arrow" />
            </a>

            {/* Get Started CTA Button */}
            <Link href="/docs/components" className="mf-cta-button">
              <Sparkles size={13} />
              <span>Explore UI</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mf-mobile-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="mf-mobile-dropdown">
            <div className="mf-mobile-search-row">
              <button
                type="button"
                className="mf-mobile-search-btn"
                onClick={() => {
                  setMenuOpen(false);
                  openSearch();
                }}
              >
                <Search size={15} />
                <span>Search library (⌘K)</span>
              </button>
            </div>

            <nav className="mf-mobile-nav-links" aria-label="Mobile Navigation">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mf-mobile-nav-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mf-mobile-item-title">
                    {item.label}
                    {item.badge && <span className="mf-nav-micro-badge">{item.badge}</span>}
                  </span>
                  <ChevronRight size={15} className="mf-mobile-chevron" />
                </Link>
              ))}
            </nav>

            <div className="mf-mobile-footer-actions">
              <button
                type="button"
                className="mf-mobile-action-btn"
                onClick={toggleTheme}
                suppressHydrationWarning
              >
                {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>{mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mf-mobile-action-btn mf-mobile-gh"
              >
                <FaGithub size={16} />
                <span>Star on GitHub</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Command Palette Search Modal */}
      {searchOpen && (
        <div className="mf-search-backdrop" onClick={closeSearch}>
          <div
            className="mf-search-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Component search dialog"
          >
            <div className="mf-search-header">
              <Search size={18} className="mf-dialog-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search components, blocks, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mf-dialog-input"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="mf-dialog-close-btn"
                aria-label="Close search dialog"
              >
                <kbd>ESC</kbd>
              </button>
            </div>

            <div className="mf-search-body">
              {filteredItems.length === 0 ? (
                <div className="mf-search-empty">
                  <p>No components found matching &ldquo;{searchQuery}&rdquo;</p>
                  <span>Try searching for Button, Input, Modal, or React Native</span>
                </div>
              ) : (
                <div className="mf-search-list">
                  <div className="mf-search-count">
                    {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} found
                  </div>
                  {filteredItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={closeSearch}
                      className="mf-search-result-item"
                    >
                      <div className="mf-result-left">
                        <div className="mf-result-badge">{item.category}</div>
                        <div>
                          <div className="mf-result-title">{item.title}</div>
                          <div className="mf-result-desc">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={15} className="mf-result-arrow" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mf-search-footer">
              <div className="mf-search-tips">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> to navigate
                </span>
                <span>
                  <kbd>↵</kbd> to select
                </span>
                <span>
                  <kbd>ESC</kbd> to close
                </span>
              </div>
              <div className="mf-search-brand">Mintforge UI</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteHeader;