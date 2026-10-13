"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Blocks,
  BookOpen,
  Check,
  Code2,
  Menu,
  Moon,
  Search,
  Smartphone,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";

const navigation = [
  { label: "Components", href: "#components" },
  { label: "Blocks", href: "#blocks" },
  { label: "React Native", href: "#react-native" },
  { label: "Docs", href: "#installation" },
  { label: "Community", href: "#community" },
];

export function SiteLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`mf-brand${footer ? " mf-brand-footer" : ""}`}
      aria-label="Mintforge UI home"
    >
      <span className="mf-logo" aria-hidden="true">
        <Image
          src="/logo.png"
          alt="Mintforge UI logo"
          width={38}
          height={38}
          priority
          className="mf-logo-img"
        />
      </span>

      <span className="mf-brand-name">
        Mintforge<span> UI</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mf-header">
      <div className="mf-container mf-nav-inner">
        <SiteLogo />

        <nav className="mf-desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mf-nav-actions">
          <Link
            href="#components"
            className="mf-search-trigger"
            aria-label="Explore components"
          >
            <Search size={14} />
            <span>Explore components</span>
            <kbd>/</kbd>
          </Link>

          <button
            type="button"
            className="mf-icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${mounted && theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${mounted && theme === "dark" ? "light" : "dark"} mode`}
            suppressHydrationWarning
          >
            {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mf-github-button"
          >
            <FaGithub size={15} />
            GitHub
            <ArrowUpRight size={12} />
          </a>

          <button
            type="button"
            className="mf-icon-button mf-mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mf-mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={14} />
            </Link>
          ))}

          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <span className="mf-mobile-github">
              <FaGithub size={15} /> View on GitHub
            </span>
            <ArrowUpRight size={14} />
          </a>

          <button type="button" onClick={toggleTheme} suppressHydrationWarning>
            {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            Switch to {mounted && theme === "dark" ? "light" : "dark"} mode
            <Check size={14} />
          </button>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;

// Reserved icon imports keep the intended navigation icon vocabulary
// available as this navigation grows.
export const NavigationIcons = {
  Blocks,
  BookOpen,
  Code2,
  Smartphone,
};