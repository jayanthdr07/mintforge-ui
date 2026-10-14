"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Sparkles, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";

const frameworks = [
  { icon: "⚛", name: "React", description: "Web components" },
  { icon: "N", name: "Next.js", description: "SSR / SSG" },
  { icon: "◈", name: "React Native", description: "Mobile UI" },
  { icon: "TS", name: "TypeScript", description: "Type safe" },
  { icon: "≋", name: "Tailwind CSS", description: "Utility first" },
];

const features = [
  {
    number: "01",
    icon: "◈",
    title: "Reusable Components",
    description:
      "Build interfaces faster with accessible, customizable building blocks designed for everyday product development.",
    items: ["Buttons, inputs and forms", "Navigation, modals and overlays", "Tables, tabs, badges and feedback"],
    href: "#components",
    link: "Explore components",
  },
  {
    number: "02",
    icon: "▦",
    title: "Ready-Made Blocks",
    description:
      "Compose complete product workflows using thoughtfully designed layout sections and real-world UI patterns.",
    items: ["Authentication layouts", "Dashboards & settings panels", "SaaS sections & marketing blocks"],
    href: "#blocks",
    link: "Explore blocks",
  },
  {
    number: "03",
    icon: "▣",
    title: "Web & Mobile Ready",
    description:
      "Maintain a unified visual language across React web applications and React Native / Expo mobile experiences.",
    items: ["React 19 & Next.js 16 support", "React Native & Expo direction", "Design tokens & TypeScript first"],
    href: "#react-native",
    link: "Explore platforms",
  },
];

const componentTabs = ["Buttons", "Inputs", "Badges", "Cards"];
const installCommand = "npm install mintforge-ui";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Buttons");
  const [buttonVariant, setButtonVariant] = useState("Primary");
  const [copied, setCopied] = useState(false);

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
      {/* Hero Section */}
      <section className="mf-hero">
        <div className="mf-container">
          <div className="mf-hero-grid">
            <div className="mf-hero-copy mf-fade-up">
              <div className="mf-eyebrow">
                <span className="mf-status-dot" />
                Open Source UI Ecosystem
              </div>

              <h1>
                Build modern apps with{" "}
                <span className="mf-gradient-text">beautiful components.</span>
              </h1>

              <p className="mf-hero-description">
                Mintforge UI provides accessible primitives, customizable blocks, and ready-to-use
                templates for React, Next.js, and React Native. Crafted by NEXYOUTH for speed and consistency.
              </p>

              <div className="mf-hero-actions">
                <Link href="#components" className="mf-button mf-button-primary">
                  <Sparkles size={15} />
                  <span>Explore Components</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mf-button mf-button-secondary"
                >
                  <FaGithub size={16} />
                  <span>View on GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

              <div className="mf-trust-row">
                <span>✓ 100% Open Source (MIT)</span>
                <span>✓ Next.js 16 & React 19</span>
                <span>✓ Tailwind CSS v4 Tokens</span>
              </div>
            </div>

            {/* Interactive Preview Mockup Window */}
            <div className="mf-hero-visual mf-fade-up mf-delay-2">
              <div className="mf-visual-glow" aria-hidden="true" />

              <div className="mf-preview-window">
                <div className="mf-preview-topbar">
                  <div className="mf-mini-brand">
                    <span className="mf-mini-logo">M</span>
                    <span>
                      Mintforge <b>UI Sandbox</b>
                    </span>
                  </div>
                  <div className="mf-window-controls" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="mf-preview-body">
                  <div className="mf-preview-sidebar">
                    <span className="mf-sidebar-label">PRIMITIVES</span>
                    {componentTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`mf-sidebar-item ${activeTab === tab ? "mf-sidebar-active" : ""}`}
                        style={{ width: "100%", textAlign: "left", background: activeTab === tab ? undefined : "transparent", border: 0, cursor: "pointer" }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="mf-preview-content">
                    <div className="mf-preview-heading">
                      <div>
                        <span className="mf-breadcrumb">COMPONENTS / {activeTab.toUpperCase()}</span>
                        <h3>Interactive {activeTab}</h3>
                        <p>Explore variants, states, and customizable tokens</p>
                      </div>
                      <Sparkles size={16} className="mf-sparkle" />
                    </div>

                    <div className="mf-preview-tabs">
                      {["Primary", "Outline", "Ghost"].map((variant) => (
                        <button
                          key={variant}
                          type="button"
                          onClick={() => setButtonVariant(variant)}
                          className={buttonVariant === variant ? "active" : ""}
                        >
                          {variant}
                        </button>
                      ))}
                    </div>

                    <div className="mf-demo-grid">
                      <div className="mf-demo-card">
                        <span className="mf-demo-label">DEFAULT STATE</span>
                        <strong>{buttonVariant} Button</strong>
                        <button
                          type="button"
                          className={`mf-demo-button ${
                            buttonVariant === "Primary"
                              ? "mf-demo-primary"
                              : buttonVariant === "Outline"
                              ? "mf-demo-outline"
                              : "mf-demo-ghost"
                          }`}
                        >
                          {buttonVariant} Action
                        </button>
                      </div>

                      <div className="mf-demo-card">
                        <span className="mf-demo-label">LIVE INPUT PREVIEW</span>
                        <span className="mf-demo-input-label">Email Address</span>
                        <input
                          type="email"
                          placeholder="developer@mintforge.dev"
                          readOnly
                        />
                        <span className="mf-demo-helper">Accessible label & token focus ring</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Frameworks Row */}
          <div className="mf-frameworks mf-fade-up">
            {frameworks.map((fw) => (
              <div key={fw.name} className="mf-framework">
                <span className="mf-framework-icon">{fw.icon}</span>
                <div>
                  <strong>{fw.name}</strong>
                  <span>{fw.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="components" className="mf-features-section">
        <div className="mf-container">
          <div className="mf-section-heading">
            <span className="mf-section-kicker">WHAT WE&apos;RE BUILDING</span>
            <h2>Crafted for developer speed &amp; design consistency</h2>
            <p>
              From basic accessible primitives to complete responsive layouts, Mintforge UI is designed to scale with your product.
            </p>
          </div>

          <div className="mf-feature-grid">
            {features.map((feature) => (
              <div key={feature.number} className="mf-feature-card">
                <div className="mf-feature-topline">
                  <div className="mf-feature-icon">{feature.icon}</div>
                  <span className="mf-feature-number">{feature.number}</span>
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <ul>
                  {feature.items.map((item) => (
                    <li key={item}>
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href={feature.href} className="mf-text-link">
                  <span>{feature.link}</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Snippet Section */}
      <section id="installation" className="mf-install-section">
        <div className="mf-container">
          <div className="mf-install-grid">
            <div className="mf-install-copy">
              <span className="mf-section-kicker">QUICK INSTALL</span>
              <h2>Start using Mintforge UI in seconds</h2>
              <p>
                Add the package to your existing React or Next.js app, configure design tokens, and start importing clean primitives.
              </p>
              <Link href="#docs" className="mf-text-link">
                <span>Read the installation guide</span>
                <span>→</span>
              </Link>
            </div>

            <div className="mf-terminal">
              <div className="mf-terminal-top">
                <div className="mf-terminal-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span>BASH — NPM PACKAGE</span>
                <button
                  type="button"
                  onClick={copyInstallCommand}
                  aria-label="Copy install command"
                  title="Copy command"
                >
                  {copied ? (
                    <span style={{ color: "#38e9ae", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Check size={12} /> Copied!
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Copy size={12} /> Copy
                    </span>
                  )}
                </button>
              </div>

              <div className="mf-terminal-body">
                <span className="mf-terminal-prompt">$</span>
                <code>{installCommand}</code>
              </div>

              <p>
                <span>ℹ</span>
                <span>Supports React 19, Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
