"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Sparkles, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagicRings from "@/components/ui/magic-rings";
import {
  ReactIcon,
  NextjsIcon,
  ReactNativeIcon,
  TypeScriptIcon,
  TailwindIcon,
} from "@/components/ui/framework-icons";
import { useTheme } from "@/components/layout/theme-provider";
import CodePreviewShowcase from "@/components/ui/code-preview-showcase";
import WhatWeAreBuilding from "@/components/ui/what-we-are-building";
import QuickInstallSection from "@/components/ui/quick-install-section";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";
const installCommand = "npm install mintforge-ui";

const frameworks = [
  {
    name: "React",
    role: "Component Primitives",
    description: "Accessible, headless hooks and building blocks.",
    badge: "v19.0",
    icon: <ReactIcon size={26} />,
    accentBorder: "rgba(97, 218, 251, 0.35)",
    accentBg: "rgba(97, 218, 251, 0.08)",
  },
  {
    name: "Next.js",
    role: "Server & App Router",
    description: "Zero hydration mismatch and optimized server render.",
    badge: "v16.0",
    icon: <NextjsIcon size={26} />,
    accentBorder: "rgba(160, 160, 160, 0.35)",
    accentBg: "rgba(160, 160, 160, 0.08)",
  },
  {
    name: "React Native",
    role: "Universal Mobile",
    description: "Cross-platform mobile primitives and Expo setup.",
    badge: "Expo 52",
    icon: <ReactNativeIcon size={26} />,
    accentBorder: "rgba(97, 218, 251, 0.35)",
    accentBg: "rgba(97, 218, 251, 0.08)",
  },
  {
    name: "TypeScript",
    role: "Type-Safe Contracts",
    description: "End-to-end type definitions and IDE autocomplete.",
    badge: "v5.6+",
    icon: <TypeScriptIcon size={26} />,
    accentBorder: "rgba(49, 120, 198, 0.35)",
    accentBg: "rgba(49, 120, 198, 0.08)",
  },
  {
    name: "Tailwind CSS",
    role: "Token Design System",
    description: "Semantic utilities, smooth transitions, and dark mode.",
    badge: "v4.0",
    icon: <TailwindIcon size={26} />,
    accentBorder: "rgba(56, 189, 248, 0.35)",
    accentBg: "rgba(56, 189, 248, 0.08)",
  },
];

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy installation command:", installCommand);
    }
  };

  return (
    <div className="mf-site">
      {/* Centered Hero Section with React Bits MagicRings Background */}
      <section className="mf-hero-centered">
        {/* MagicRings WebGL Ambient Canvas */}
        <div className="mf-hero-rings-wrap" aria-hidden="true">
          <MagicRings
            color={isDark ? "#10b981" : "#059669"}
            colorTwo={isDark ? "#6366f1" : "#4f46e5"}
            motion="pulse"
            ringCount={6}
            speed={0.9}
            lineThickness={2.2}
            glow={1.2}
            hoverScale={1.15}
            clickBurst={true}
            theme={isDark ? "dark" : "light"}
          />
        </div>

        <div className="mf-container mf-hero-centered-content">
          {/* Eyebrow Badge Pill */}
          <div className="mf-hero-badge-pill mf-fade-up">
            <span className="mf-status-dot" />
            <span>Next-Gen Open Source UI</span>
            <span className="mf-badge-divider" />
            <span className="mf-badge-tag">v0.1.0 Ready</span>
          </div>

          {/* Large Animated Headline */}
          <h1 className="mf-hero-title-large mf-fade-up">
            Build consistently. <br />
            <span className="mf-hero-gradient-headline">Customize freely.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="mf-hero-subtitle-large mf-fade-up">
            Mintforge UI provides accessible primitives, modular layout blocks, and themeable
            design tokens for <strong>React</strong>, <strong>Next.js</strong>, and{" "}
            <strong>React Native</strong>. Crafted by NEXYOUTH for speed, clarity, and scale.
          </p>

          {/* CTA Buttons & Interactive Command Pill */}
          <div className="mf-hero-cta-group mf-fade-up">
            <Link href="#components" className="mf-hero-primary-cta">
              <Sparkles size={16} />
              <span>Explore Components</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-hero-secondary-cta"
            >
              <FaGithub size={17} />
              <span>Star on GitHub</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              onClick={copyInstallCommand}
              className="mf-hero-cmd-pill"
              title="Click to copy install command"
            >
              <span className="mf-cmd-prompt">$</span>
              <span>npm install mintforge-ui</span>
              {copied ? (
                <Check size={14} style={{ color: "var(--site-accent)" }} />
              ) : (
                <Copy size={14} style={{ color: "var(--site-muted)" }} />
              )}
            </button>
          </div>

          {/* Value Highlights */}
          <div className="mf-hero-highlights mf-fade-up">
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> 100% Free &amp; Open Source
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> Next.js 16 &amp; React 19 Ready
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> Accessible (WCAG AAA)
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> Tailwind CSS Tokens
            </span>
          </div>

          {/* 5 Frameworks Showcase with Official Icons */}
          <div className="mf-frameworks-section mf-fade-up">
            <div className="mf-frameworks-header">
              <span className="mf-frameworks-title">Universal Multi-Platform Support</span>
            </div>

            <div className="mf-frameworks-grid">
              {frameworks.map((fw) => (
                <div
                  key={fw.name}
                  className="mf-framework-card"
                  style={
                    {
                      "--framework-border": fw.accentBorder,
                      "--framework-bg": fw.accentBg,
                    } as React.CSSProperties
                  }
                >
                  <div className="mf-framework-top">
                    <div className="mf-framework-icon-container">{fw.icon}</div>
                    <span className="mf-framework-badge">{fw.badge}</span>
                  </div>

                  <strong className="mf-framework-name">{fw.name}</strong>
                  <span className="mf-framework-role">{fw.role}</span>
                  <p className="mf-framework-desc">{fw.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code IDE & Prebuilt UI Showcase */}
      <CodePreviewShowcase />

      {/* What We Are Building: Interactive Category Showcase */}
      <WhatWeAreBuilding />

      {/* Quick Install Section: Interactive Multi-mode Setup */}
      <QuickInstallSection />
    </div>
  );
}
