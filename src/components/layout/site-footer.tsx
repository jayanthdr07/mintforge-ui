"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";
const NEXYOUTH_URL = "https://nexyouth-web.vercel.app";

const footerLinks = {
  explore: [
    { label: "Components", href: "#components", badge: null },
    { label: "UI Blocks", href: "#blocks", badge: null },
    { label: "Templates", href: "#templates", badge: "New" },
    { label: "React Native", href: "#react-native", badge: "Preview" },
    { label: "Design Tokens", href: "#tokens", badge: null },
  ],
  docs: [
    { label: "Getting Started", href: "#installation" },
    { label: "Installation & CLI", href: "#installation" },
    { label: "Theming & Colors", href: "#theming" },
    { label: "Tailwind Integration", href: "#installation" },
    { label: "Component API", href: "#components" },
  ],
  ecosystem: [
    { label: "NEXYOUTH Platform", href: NEXYOUTH_URL, external: true },
    { label: "GitHub Repository", href: GITHUB_URL, external: true },
    { label: "GitHub Discussions", href: `${GITHUB_URL}/discussions`, external: true },
    { label: "Report an Issue", href: `${GITHUB_URL}/issues`, external: true },
    { label: "Contributing Guide", href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`, external: true },
  ],
  legal: [
    { label: "MIT License", href: `${GITHUB_URL}/blob/main/LICENSE`, external: true },
    { label: "Code of Conduct", href: `${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`, external: true },
    { label: "Security Policy", href: `${GITHUB_URL}/blob/main/SECURITY.md`, external: true },
    { label: "Changelog", href: `${GITHUB_URL}/releases`, external: true },
  ],
};

const supportedTech = ["React 19", "Next.js 16", "React Native", "Tailwind CSS v4", "TypeScript"];

const emptySubscribe = () => () => {};

export default function SiteFooter() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mf-footer">
      {/* Top Banner Card */}
      <div className="mf-container">
        <div className="mf-footer-cta-card">
          <div className="mf-footer-cta-content">
            <div className="mf-footer-cta-badge">
              <Sparkles size={13} />
              <span>Open Source UI Toolkit</span>
            </div>
            <h3 className="mf-footer-cta-title">
              Ready to craft interfaces faster with Mintforge UI?
            </h3>
            <p className="mf-footer-cta-desc">
              Explore reusable building blocks, customizable components, and clean patterns for web & mobile.
            </p>
          </div>
          <div className="mf-footer-cta-actions">
            <Link href="#components" className="mf-cta-button mf-cta-button-lg">
              <Sparkles size={14} />
              <span>Explore Components</span>
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-footer-gh-btn"
            >
              <FaGithub size={16} />
              <span>Star on GitHub</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="mf-footer-grid">
          {/* Brand Column */}
          <div className="mf-footer-brand-col">
            <Link href="/" className="mf-brand mf-brand-footer" aria-label="Mintforge UI">
              <div className="mf-logo-box">
                <Image
                  src="/logo.png"
                  alt="Mintforge UI"
                  width={34}
                  height={34}
                  priority
                  className="mf-logo-img"
                />
                <span className="mf-logo-glow" aria-hidden="true" />
              </div>
              <div className="mf-brand-text">
                <span className="mf-brand-title">Mintforge</span>
                <span className="mf-brand-badge">UI</span>
              </div>
            </Link>

            <p className="mf-footer-brand-desc">
              The developer-first UI ecosystem for React, Next.js, and React Native. Designed for consistency, crafted with accessible primitives.
            </p>

            {/* Status Indicator */}
            <div className="mf-footer-status">
              <span className="mf-status-dot-pulse" aria-hidden="true" />
              <span className="mf-status-text">All systems operational</span>
              <span className="mf-status-tag">v0.1.0-alpha</span>
            </div>

            {/* Supported Technologies Pills */}
            <div className="mf-footer-tech-stack">
              {supportedTech.map((tech) => (
                <span key={tech} className="mf-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links Column 1: Explore */}
          <div className="mf-footer-col">
            <h4 className="mf-footer-col-title">Explore</h4>
            <ul className="mf-footer-links">
              {footerLinks.explore.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="mf-footer-link">
                    <span>{item.label}</span>
                    {item.badge && <span className="mf-nav-micro-badge">{item.badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Documentation */}
          <div className="mf-footer-col">
            <h4 className="mf-footer-col-title">Documentation</h4>
            <ul className="mf-footer-links">
              {footerLinks.docs.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="mf-footer-link">
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Community & NEXYOUTH */}
          <div className="mf-footer-col">
            <h4 className="mf-footer-col-title">Community</h4>
            <ul className="mf-footer-links">
              {footerLinks.ecosystem.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mf-footer-link"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} className="mf-external-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 4: Legal & Policy */}
          <div className="mf-footer-col">
            <h4 className="mf-footer-col-title">Open Source</h4>
            <ul className="mf-footer-links">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mf-footer-link"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} className="mf-external-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mf-footer-bottom">
          <div className="mf-footer-copyright">
            <span>© {year} Mintforge UI. An open-source initiative by </span>
            <a
              href={NEXYOUTH_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-footer-highlight"
            >
              NEXYOUTH
            </a>
            <span> and community contributors.</span>
          </div>

          <div className="mf-footer-bottom-actions">
            <span className="mf-license-tag">MIT License</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="mf-back-to-top"
              aria-label="Back to top"
              title="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
