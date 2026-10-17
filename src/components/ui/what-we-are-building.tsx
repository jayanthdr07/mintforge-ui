"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  LayoutGrid,
  Smartphone,
  Palette,
  Check,
  Copy,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sliders,
  Send,
  Bell,
  Code2,
  ArrowRight,
} from "lucide-react";

type CategoryId = "components" | "blocks" | "native" | "tokens" | "seam";

interface CategoryMeta {
  id: CategoryId;
  label: string;
  badge: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "components",
    label: "UI Primitives",
    badge: "42+ Components",
    icon: <Layers size={16} />,
    subtitle: "Accessible, Headless & Styled",
    description: "Atomic building blocks engineered for keyboard navigation, WCAG AAA compliance, and zero runtime layout shifts.",
  },
  {
    id: "blocks",
    label: "Ready-Made Blocks",
    badge: "18+ Layouts",
    icon: <LayoutGrid size={16} />,
    subtitle: "Full Product Workflows",
    description: "Production-tested layout patterns from analytics KPI dashboards and auth flows to checkout sheets and pricing tiers.",
  },
  {
    id: "native",
    label: "React Native",
    badge: "Expo 52 & Universal",
    icon: <Smartphone size={16} />,
    subtitle: "Native Gestures & Haptics",
    description: "Unified cross-platform primitives sharing the same token system across iOS, Android, and Web.",
  },
  {
    id: "tokens",
    label: "Design Tokens",
    badge: "48+ Tokens",
    icon: <Palette size={16} />,
    subtitle: "Multi-Brand Semantic Scales",
    description: "Strictly typed semantic colors, elevation shadows, dynamic corner radii, and fluid typography tokens.",
  },
  {
    id: "seam",
    label: "Seam Verification",
    badge: "FastAPI + Next",
    icon: <ShieldCheck size={16} />,
    subtitle: "Zero-Codegen API Contracts",
    description: "Static AST linter that finds mismatches between Next.js/Expo forms and FastAPI Pydantic models before runtime.",
  },
];

export default function WhatWeAreBuilding() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("components");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Components state
  const [btnCount, setBtnCount] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [inputVal, setInputVal] = useState("alex@mintforge.dev");
  const [activePill, setActivePill] = useState("all");

  // Blocks state
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("7d");
  const [inviteSent, setInviteSent] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);

  // Native Mobile state
  const [snapPoint, setSnapPoint] = useState<"30%" | "60%" | "90%">("60%");
  const [hapticTriggered, setHapticTriggered] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);

  // Tokens state
  const [radiusToken, setRadiusToken] = useState<"sm" | "md" | "lg" | "full">("md");

  // Seam Check state
  const [seamScenario, setSeamScenario] = useState<"casing" | "optional" | "route">("casing");
  const [seamScanActive, setSeamScanActive] = useState(false);

  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleLoadingClick = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      setBtnCount((c) => c + 1);
    }, 900);
  };

  const handleHapticPress = () => {
    setHapticTriggered(true);
    setTimeout(() => setHapticTriggered(false), 600);
  };

  const currentMeta = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section id="what-we-are-building" className="mf-wwb-section">
      <div className="mf-container">
        {/* Section Header */}
        <div className="mf-wwb-header">
          <div className="mf-showcase-kicker">
            <Sparkles size={13} />
            <span>WHAT WE&apos;RE BUILDING</span>
          </div>
          <h2 className="mf-wwb-title">
            The Complete Design System <br />
            <span className="mf-hero-gradient-headline">for Next.js &amp; React Native.</span>
          </h2>
          <p className="mf-wwb-desc">
            Explore our architecture across accessible UI primitives, production-ready blocks, cross-platform
            mobile components, and multi-theme design tokens.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mf-wwb-tabs-container">
          <div className="mf-wwb-tabs" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowCode(false);
                  }}
                  className={`mf-wwb-tab-btn ${isActive ? "active" : ""}`}
                >
                  <span className="mf-wwb-tab-icon">{cat.icon}</span>
                  <span className="mf-wwb-tab-label">{cat.label}</span>
                  <span className="mf-wwb-tab-badge">{cat.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Banner */}
        <div className="mf-wwb-category-banner">
          <div className="mf-wwb-banner-left">
            <span className="mf-wwb-banner-subtitle">{currentMeta.subtitle}</span>
            <p className="mf-wwb-banner-desc">{currentMeta.description}</p>
          </div>
          <div className="mf-wwb-banner-right">
            <button
              type="button"
              onClick={() => setShowCode((prev) => !prev)}
              className="mf-wwb-code-toggle-btn"
            >
              <Code2 size={14} />
              <span>{showCode ? "Hide Code" : "Inspect Code"}</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Playground Stage */}
        <div className="mf-wwb-stage-card">
          {/* ==============================================================
              TAB 1: COMPONENTS (UI PRIMITIVES)
              ============================================================== */}
          {activeCategory === "components" && (
            <div className="mf-wwb-grid-components">
              {/* Widget 1: Buttons & Interactive Triggers */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Button Primitives &amp; States</span>
                  <span className="mf-wwb-pill-mini">Interactive</span>
                </div>
                <div className="mf-wwb-btn-row">
                  <button
                    type="button"
                    onClick={() => setBtnCount((c) => c + 1)}
                    className="mf-btn-primary mf-btn-glow"
                  >
                    <Zap size={14} />
                    <span>Primary ({btnCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLoadingClick}
                    disabled={btnLoading}
                    className="mf-btn-secondary"
                  >
                    {btnLoading ? (
                      <span className="mf-spinner-inline" />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    <span>{btnLoading ? "Processing..." : "Async Action"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("<Button variant='glass' />")}
                    className="mf-btn-ghost"
                    title="Click to copy code"
                  >
                    <Copy size={13} />
                    <span>Outline</span>
                  </button>
                </div>
                <p className="mf-wwb-widget-caption">
                  Full keyboard tab indexing, focus rings, high contrast AAA ratios, and built-in micro-animations.
                </p>
              </div>

              {/* Widget 2: Form Controls & Inputs */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Form Controls &amp; Inputs</span>
                  <span className="mf-wwb-pill-mini">Live Input</span>
                </div>
                <div className="mf-wwb-input-group">
                  <label className="mf-wwb-input-label" htmlFor="wwb-demo-email">
                    Developer Workspace Email
                  </label>
                  <div className="mf-wwb-input-wrap">
                    <input
                      id="wwb-demo-email"
                      type="email"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Enter your email..."
                      className="mf-wwb-input"
                    />
                    {inputVal.includes("@") && (
                      <span className="mf-wwb-input-check" title="Valid email format">
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                </div>
                <div className="mf-wwb-toggles-row">
                  <label className="mf-wwb-switch-label">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={switch1}
                      onClick={() => setSwitch1((prev) => !prev)}
                      className={`mf-wwb-switch ${switch1 ? "active" : ""}`}
                    >
                      <span className="mf-wwb-switch-handle" />
                    </button>
                    <span>Auto-Save Tokens</span>
                  </label>

                  <label className="mf-wwb-switch-label">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={switch2}
                      onClick={() => setSwitch2((prev) => !prev)}
                      className={`mf-wwb-switch ${switch2 ? "active" : ""}`}
                    >
                      <span className="mf-wwb-switch-handle" />
                    </button>
                    <span>Strict Type-Check</span>
                  </label>
                </div>
              </div>

              {/* Widget 3: Status Badges & Pills */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Status Pills &amp; Badges</span>
                  <span className="mf-wwb-pill-mini">Pills</span>
                </div>
                <div className="mf-wwb-badges-row">
                  <span className="mf-badge-mint">
                    <span className="mf-badge-dot-live" />
                    Live Production
                  </span>
                  <span className="mf-badge-cyan">v19.3 React Ready</span>
                  <span className="mf-badge-subtle">
                    <ShieldCheck size={12} />
                    WCAG AAA
                  </span>
                  <span className="mf-badge-amber">Expo 52 Native</span>
                </div>
                <div className="mf-wwb-filter-pill-row">
                  {["all", "primitives", "feedback", "overlays"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActivePill(tab)}
                      className={`mf-wwb-filter-pill ${activePill === tab ? "active" : ""}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              TAB 2: BLOCKS (FULL WORKFLOWS)
              ============================================================== */}
          {activeCategory === "blocks" && (
            <div className="mf-wwb-grid-blocks">
              {/* Block 1: Analytics KPI Card */}
              <div className="mf-wwb-widget-card mf-wwb-kpi-block">
                <div className="mf-wwb-widget-head">
                  <div>
                    <span className="mf-wwb-widget-title">SaaS Analytics Metric Card</span>
                    <span className="mf-wwb-widget-sub">Revenue &amp; Token Consumption</span>
                  </div>
                  <div className="mf-wwb-time-toggle">
                    {(["24h", "7d", "30d"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeframe(t)}
                        className={`mf-wwb-time-btn ${timeframe === t ? "active" : ""}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mf-wwb-kpi-metric-row">
                  <div>
                    <span className="mf-wwb-kpi-val">
                      {timeframe === "24h"
                        ? "$8,420.50"
                        : timeframe === "7d"
                        ? "$54,230.00"
                        : "$218,940.00"}
                    </span>
                    <span className="mf-wwb-kpi-change">
                      <TrendingUp size={13} />
                      +18.4% vs last period
                    </span>
                  </div>
                  <span className="mf-badge-mint">Enterprise Active</span>
                </div>

                {/* Interactive Sparkline Bar Chart */}
                <div className="mf-wwb-sparkline-wrap">
                  {[42, 68, 55, 92, 74, 88, 100, 62, 85, 94, 78, 96].map((val, idx) => {
                    const heightPercent = timeframe === "24h" ? Math.min(100, val * 0.75) : timeframe === "30d" ? Math.min(100, val * 1.1) : val;
                    return (
                      <div key={idx} className="mf-wwb-spark-bar-track" title={`Day ${idx + 1}: ${val}%`}>
                        <div
                          className="mf-wwb-spark-bar-fill"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Block 2: Quick Invite & Team Card */}
              <div className="mf-wwb-widget-card mf-wwb-invite-block">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Team Workspace Invite</span>
                  <span className="mf-wwb-pill-mini">Collab Block</span>
                </div>
                <div className="mf-wwb-invite-form">
                  <div className="mf-wwb-avatar-stack">
                    <span className="mf-avatar-ring">EJ</span>
                    <span className="mf-avatar-ring" style={{ background: "#0284c7" }}>RK</span>
                    <span className="mf-avatar-ring" style={{ background: "#7c3aed" }}>SJ</span>
                    <span className="mf-avatar-ring-more">+12</span>
                  </div>
                  <div className="mf-wwb-invite-input-row">
                    <input
                      type="email"
                      placeholder="teammate@company.com"
                      className="mf-wwb-input"
                      defaultValue="engineer@startup.io"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setInviteSent(true);
                        setTimeout(() => setInviteSent(false), 2400);
                      }}
                      className="mf-btn-primary"
                    >
                      {inviteSent ? <Check size={14} /> : <Send size={14} />}
                      <span>{inviteSent ? "Sent!" : "Invite"}</span>
                    </button>
                  </div>
                </div>

                {toastVisible && (
                  <div className="mf-wwb-mini-toast">
                    <div className="mf-toast-icon">
                      <Bell size={13} />
                    </div>
                    <div className="mf-toast-content">
                      <strong>Design tokens updated</strong>
                      <span>Changes deployed to production CDN</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToastVisible(false)}
                      className="mf-toast-close"
                      aria-label="Dismiss toast"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==============================================================
              TAB 3: NATIVE MOBILE (REACT NATIVE / EXPO)
              ============================================================== */}
          {activeCategory === "native" && (
            <div className="mf-wwb-grid-native">
              {/* Native Widget 1: Interactive Bottom Sheet Simulator */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <div>
                    <span className="mf-wwb-widget-title">Gesture BottomSheet Simulator</span>
                    <span className="mf-wwb-widget-sub">@mintforge/native snapPoints</span>
                  </div>
                  <div className="mf-wwb-time-toggle">
                    {(["30%", "60%", "90%"] as const).map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setSnapPoint(pt)}
                        className={`mf-wwb-time-btn ${snapPoint === pt ? "active" : ""}`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mf-wwb-sheet-stage">
                  <div
                    className="mf-wwb-sheet-panel"
                    style={{
                      height: snapPoint === "30%" ? "120px" : snapPoint === "60%" ? "190px" : "250px",
                    }}
                  >
                    <div className="mf-wwb-sheet-handle" />
                    <div className="mf-wwb-sheet-content">
                      <div className="mf-wwb-sheet-header">
                        <span className="mf-badge-mint">Biometric Lock</span>
                        <strong className="mf-wwb-sheet-title">Confirm Authorization</strong>
                      </div>
                      <p className="mf-wwb-sheet-text">
                        Transfer $1,250.00 to Atlas Trading Co. Snap point currently locked at {snapPoint}.
                      </p>
                      <button type="button" className="mf-btn-primary" style={{ width: "100%" }}>
                        Authorize with Face ID
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Native Widget 2: Dynamic Island & Haptic Press Simulator */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Dynamic Island &amp; Haptic Simulator</span>
                  <span className="mf-wwb-pill-mini">Tap Island</span>
                </div>

                <div className="mf-wwb-island-stage">
                  {/* Dynamic Island Capsule */}
                  <div
                    className={`mf-wwb-dynamic-island ${islandExpanded ? "expanded" : ""}`}
                    onClick={() => setIslandExpanded((prev) => !prev)}
                    role="button"
                    tabIndex={0}
                    title="Tap to expand dynamic island"
                  >
                    <div className="mf-island-inner">
                      <span className="mf-island-dot" />
                      <span className="mf-island-text">
                        {islandExpanded ? "Mintforge UI • v19.3 Bundle Deployed" : "Mintforge Native"}
                      </span>
                      <span className="mf-island-wave">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  </div>

                  {/* Haptic Tactile Press Button */}
                  <div className="mf-wwb-haptic-wrap">
                    <button
                      type="button"
                      onClick={handleHapticPress}
                      className={`mf-wwb-haptic-btn ${hapticTriggered ? "active" : ""}`}
                    >
                      <Zap size={16} />
                      <span>{hapticTriggered ? "Haptic Vibrate (Heavy)" : "Test Haptic Press"}</span>
                    </button>
                    {hapticTriggered && <div className="mf-haptic-shockwave" />}
                  </div>
                  <p className="mf-wwb-widget-caption">
                    Zero bridge overhead using React Native New Architecture (Fabric + TurboModules).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              TAB 4: DESIGN TOKENS
              ============================================================== */}
          {activeCategory === "tokens" && (
            <div className="mf-wwb-grid-tokens">
              {/* Tokens Widget 1: Interactive Color Palette */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <div>
                    <span className="mf-wwb-widget-title">Semantic Color Tokens</span>
                    <span className="mf-wwb-widget-sub">Click any swatch to copy value</span>
                  </div>
                  {copiedToken && (
                    <span className="mf-badge-mint">Copied: {copiedToken}</span>
                  )}
                </div>

                <div className="mf-wwb-swatches-grid">
                  {[
                    { token: "--mf-brand", label: "Brand Emerald", hex: "#10b981", textColor: "#000" },
                    { token: "--mf-brand-hover", label: "Mint Hover", hex: "#34d399", textColor: "#000" },
                    { token: "--mf-brand-subtle", label: "Brand Subtle", hex: "#0d281e", textColor: "#6ee7b7" },
                    { token: "--mf-surface", label: "Surface Deep", hex: "#0f1915", textColor: "#fff" },
                    { token: "--mf-border", label: "Border Soft", hex: "#1e352a", textColor: "#fff" },
                    { token: "--mf-accent-cyan", label: "Cyan Accent", hex: "#38bdf8", textColor: "#000" },
                  ].map((color) => (
                    <button
                      key={color.token}
                      type="button"
                      onClick={() => copyToClipboard(color.hex)}
                      className="mf-wwb-swatch-card"
                    >
                      <div
                        className="mf-wwb-swatch-box"
                        style={{ background: color.hex, color: color.textColor }}
                      >
                        <span className="mf-swatch-hex">{color.hex}</span>
                      </div>
                      <div className="mf-wwb-swatch-info">
                        <strong>{color.label}</strong>
                        <code>{color.token}</code>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tokens Widget 2: Dynamic Radius Playground */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <span className="mf-wwb-widget-title">Dynamic Radius Scale</span>
                  <span className="mf-wwb-pill-mini">Live Sandbox</span>
                </div>

                <div className="mf-wwb-radius-sandbox">
                  <div className="mf-wwb-radius-buttons">
                    {(["sm", "md", "lg", "full"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRadiusToken(r)}
                        className={`mf-wwb-radius-btn ${radiusToken === r ? "active" : ""}`}
                      >
                        {r.toUpperCase()} ({r === "sm" ? "8px" : r === "md" ? "12px" : r === "lg" ? "16px" : "9999px"})
                      </button>
                    ))}
                  </div>

                  <div
                    className="mf-wwb-radius-preview-box"
                    style={{
                      borderRadius:
                        radiusToken === "sm"
                          ? "8px"
                          : radiusToken === "md"
                          ? "12px"
                          : radiusToken === "lg"
                          ? "16px"
                          : "9999px",
                    }}
                  >
                    <Sliders size={20} style={{ color: "var(--site-accent)" }} />
                    <strong>var(--mf-radius-{radiusToken})</strong>
                    <span>Shape morphs automatically across all web and mobile components.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              TAB 5: SEAM VERIFICATION
              ============================================================== */}
          {activeCategory === "seam" && (
            <div className="mf-wwb-grid-tokens">
              {/* Seam Widget 1: Live Contract Drift Detector */}
              <div className="mf-wwb-widget-card">
                <div className="mf-wwb-widget-head">
                  <div>
                    <span className="mf-wwb-widget-title">Contract Drift Simulator</span>
                    <span className="mf-wwb-widget-sub">Select a failure scenario to verify</span>
                  </div>
                  <span className="mf-badge-mint">Zero Codegen</span>
                </div>

                <div className="mf-wwb-radius-buttons my-3">
                  {[
                    { id: "casing", label: "Casing Drift" },
                    { id: "optional", label: "Optionality Drift" },
                    { id: "route", label: "Route Drift" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSeamScenario(s.id as "casing" | "optional" | "route");
                        setSeamScanActive(false);
                      }}
                      className={`mf-wwb-radius-btn ${seamScenario === s.id ? "active" : ""}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-lg border border-border bg-[#0d1310] p-4 font-mono text-xs text-left">
                  <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3 text-[11px] text-zinc-400">
                    <span>seamcheck.yaml • active scanner</span>
                    <button
                      type="button"
                      onClick={() => setSeamScanActive(true)}
                      className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold hover:bg-emerald-500/30 transition-colors"
                    >
                      {seamScanActive ? "Scanned ✓" : "Run Scan"}
                    </button>
                  </div>
                  {seamScenario === "casing" && (
                    <div>
                      <div className="text-red-400 font-bold mb-1">
                        ERROR  orders.schema.ts:14  OrderCreate.discount_code
                      </div>
                      <div className="text-zinc-400 pl-4">
                        Frontend sends &quot;discountCode&quot;. Backend expects &quot;discount_code&quot; at app/routes/orders.py:31.
                      </div>
                    </div>
                  )}
                  {seamScenario === "optional" && (
                    <div>
                      <div className="text-amber-400 font-bold mb-1">
                        WARNING  user.schema.ts:8  UserSignup.phoneNumber
                      </div>
                      <div className="text-zinc-400 pl-4">
                        Field marked required in Zod, but optional in FastAPI UserSignup at app/models/user.py:12.
                      </div>
                    </div>
                  )}
                  {seamScenario === "route" && (
                    <div>
                      <div className="text-red-400 font-bold mb-1">
                        ERROR  checkout.tsx:42  POST /api/orders
                      </div>
                      <div className="text-zinc-400 pl-4">
                        Frontend calls /api/orders. No matching FastAPI route found. Did you mean /api/v1/orders/?
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Seam Widget 2: CLI One-Liner */}
              <div className="mf-wwb-widget-card flex flex-col justify-between">
                <div>
                  <div className="mf-wwb-widget-head">
                    <span className="mf-wwb-widget-title">CLI &amp; CI Verification</span>
                    <span className="mf-wwb-pill-mini">npx mintforge check</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Runs in &lt;1 second via Python <code>ast</code> and TypeScript <code>tree-sitter</code>.
                    Drop it into your GitHub Actions workflow to block broken API contracts before they hit production.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border bg-[#0d1310] font-mono text-xs text-emerald-400 my-4 flex items-center justify-between">
                  <code>$ npx mintforge check</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("npx mintforge check")}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    title="Copy command"
                  >
                    <Copy size={13} />
                  </button>
                </div>

                <Link
                  href="/docs/seam-check"
                  className="flex items-center justify-between text-xs font-semibold text-brand hover:underline pt-2 border-t border-border"
                >
                  <span>Explore Seam Check Docs</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}

          {/* Code Inspection Drawer */}
          {showCode && (
            <div className="mf-wwb-code-drawer">
              <div className="mf-wwb-code-drawer-header">
                <span className="mf-wwb-code-drawer-title">
                  <code>{activeCategory}.config.tsx</code>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      activeCategory === "components"
                        ? `import { Button, Input, Switch, Badge } from "@mintforge/ui";\n\nexport function ComponentDemo() {\n  return (\n    <div className="flex gap-4">\n      <Button variant="primary" glow>Deploy</Button>\n      <Switch checked />\n      <Badge variant="mint">Live</Badge>\n    </div>\n  );\n}`
                        : activeCategory === "blocks"
                        ? `import { MetricCard, TeamInviteCard } from "@mintforge/blocks";\n\nexport function DashboardBlock() {\n  return <MetricCard value="$54,230.00" change="+18.4%" timeframe="7d" />;\n}`
                        : activeCategory === "native"
                        ? `import { BottomSheet, HapticPress } from "@mintforge/native";\n\nexport function MobileFlow() {\n  return <BottomSheet snapPoints={["30%", "60%", "90%"]} blur />;\n}`
                        : activeCategory === "tokens"
                        ? `:root {\n  --mf-brand: #10b981;\n  --mf-radius-md: 12px;\n  --mf-surface: #0f1915;\n}`
                        : `# seamcheck.yaml\nversion: 1\nbackend:\n  path: "backend/app"\n  framework: "fastapi"\nfrontend:\n  path: "frontend/src"\n  framework: "nextjs"\nmappings:\n  OrderCreateSchema: "OrderCreate"`
                    )
                  }
                  className="mf-wwb-code-copy-btn"
                >
                  <Copy size={12} />
                  <span>Copy Snippet</span>
                </button>
              </div>
              <pre className="mf-wwb-code-pre">
                <code>
                  {activeCategory === "components" &&
                    `import { Button, Input, Switch, Badge } from "@mintforge/ui";\n\nexport function ComponentDemo() {\n  return (\n    <div className="flex items-center gap-4">\n      <Button variant="primary" glow onClick={handleDeploy}>\n        Deploy App\n      </Button>\n      <Switch checked={autoSave} onCheckedChange={setAutoSave} />\n      <Badge variant="mint">Production Ready</Badge>\n    </div>\n  );\n}`}
                  {activeCategory === "blocks" &&
                    `import { MetricCard, TeamInviteCard } from "@mintforge/blocks";\n\nexport function AnalyticsBlock() {\n  return (\n    <MetricCard\n      title="Revenue & ARR"\n      value="$54,230.00"\n      change="+18.4%"\n      timeframe="7d"\n      chartType="sparkline"\n    />\n  );\n}`}
                  {activeCategory === "native" &&
                    `import { BottomSheet, HapticPress, DynamicIsland } from "@mintforge/native";\n\nexport function NativeCheckout() {\n  return (\n    <BottomSheet snapPoints={["30%", "60%", "90%"]} rounded="2xl" blur>\n      <HapticPress type="heavy" onPress={handleAuthorize}>\n        Slide to Pay $1,250.00\n      </HapticPress>\n    </BottomSheet>\n  );\n}`}
                  {activeCategory === "tokens" &&
                    `/* Mintforge Design Tokens (design-tokens.css) */\n:root {\n  --mf-brand: #10b981;\n  --mf-brand-hover: #34d399;\n  --mf-surface: #0f1915;\n  --mf-border: #1e352a;\n  --mf-radius-md: 12px;\n}\n\n.dark {\n  --mf-background: #080f0c;\n  --mf-surface: #0f1915;\n}`}
                  {activeCategory === "seam" &&
                    `# seamcheck.yaml (Mintforge Seam Check Configuration)\nversion: 1\nbackend:\n  path: "backend/app"\n  framework: "fastapi"\nfrontend:\n  path: "frontend/src"\n  framework: "nextjs"\n\n# Explicit Schema Mappings\nmappings:\n  OrderCreateSchema: "OrderCreate"\n  UserSignupSchema: "UserSignup"`}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
