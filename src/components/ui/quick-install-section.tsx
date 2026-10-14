"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Code2,
  FileCode,
  Laptop,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw,
  BookOpen,
} from "lucide-react";

type InstallMode = "cli" | "manual" | "expo";
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
type StepId = "step-1" | "step-2" | "step-3";

interface ModeInfo {
  id: InstallMode;
  label: string;
  badge: string;
  icon: React.ReactNode;
  tagline: string;
}

const MODES: ModeInfo[] = [
  {
    id: "cli",
    label: "CLI Init",
    badge: "Recommended",
    icon: <Zap size={15} />,
    tagline: "Interactive wizard with automatic Tailwind v4 & TypeScript configuration",
  },
  {
    id: "manual",
    label: "Manual Install",
    badge: "Core NPM",
    icon: <Laptop size={15} />,
    tagline: "Add the headless primitives & design tokens directly into your package.json",
  },
  {
    id: "expo",
    label: "Expo / Native",
    badge: "Expo 52",
    icon: <Smartphone size={15} />,
    tagline: "Universal cross-platform components for iOS, Android, and Web with Reanimated",
  },
];

const COMMANDS: Record<InstallMode, Record<PackageManager, string>> = {
  cli: {
    npm: "npx mintforge-ui@latest init",
    pnpm: "pnpm dlx mintforge-ui@latest init",
    yarn: "yarn dlx mintforge-ui@latest init",
    bun: "bunx --bun mintforge-ui@latest init",
  },
  manual: {
    npm: "npm install mintforge-ui lucide-react",
    pnpm: "pnpm add mintforge-ui lucide-react",
    yarn: "yarn add mintforge-ui lucide-react",
    bun: "bun add mintforge-ui lucide-react",
  },
  expo: {
    npm: "npx expo install @mintforge/native react-native-reanimated react-native-gesture-handler",
    pnpm: "pnpm dlx expo install @mintforge/native react-native-reanimated react-native-gesture-handler",
    yarn: "yarn dlx expo install @mintforge/native react-native-reanimated react-native-gesture-handler",
    bun: "bunx expo install @mintforge/native react-native-reanimated react-native-gesture-handler",
  },
};

const STEP_DATA: Record<
  StepId,
  {
    stepNumber: string;
    title: string;
    filename: string;
    description: string;
  }
> = {
  "step-1": {
    stepNumber: "01",
    title: "Install Dependencies",
    filename: "terminal — bash",
    description: "Run the CLI initializer or add the core UI packages to your project.",
  },
  "step-2": {
    stepNumber: "02",
    title: "Import Design Tokens",
    filename: "src/app/globals.css",
    description: "Include Mintforge CSS tokens and customize brand theme variables.",
  },
  "step-3": {
    stepNumber: "03",
    title: "Start Building",
    filename: "src/app/page.tsx",
    description: "Import accessible components, buttons, and layouts directly.",
  },
};

export default function QuickInstallSection() {
  const [activeMode, setActiveMode] = useState<InstallMode>("cli");
  const [pkgManager, setPkgManager] = useState<PackageManager>("npm");
  const [activeStep, setActiveStep] = useState<StepId>("step-1");
  const [copied, setCopied] = useState(false);
  const [preflightStatus, setPreflightStatus] = useState<"idle" | "running" | "success">("idle");

  const currentCommand = COMMANDS[activeMode][pkgManager];

  const handleCopyCommand = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy install command:", text);
    }
  };

  const runPreflightCheck = () => {
    setPreflightStatus("running");
    setTimeout(() => {
      setPreflightStatus("success");
    }, 1200);
  };

  const getCodeContent = () => {
    if (activeStep === "step-1") {
      return `# Step 1: Install Mintforge UI (${activeMode.toUpperCase()})\n# Package Manager: ${pkgManager}\n\n${currentCommand}\n\n# ✔ Resolving packages...\n# ✔ Fetching accessible primitives\n# ✔ Success! Setup completed in 1.4s`;
    }

    if (activeStep === "step-2") {
      return `/* src/app/globals.css */\n@import "tailwindcss";\n@import "mintforge-ui/styles.css";\n\n:root {\n  --mf-brand: #10b981;\n  --mf-brand-hover: #34d399;\n  --mf-radius: 12px;\n  --mf-surface: #0f1915;\n}\n\n.dark {\n  --mf-background: #080f0c;\n  --mf-border: #1e352a;\n}`;
    }

    return `// src/app/page.tsx\nimport { Button, Card, Sparkline, Badge } from "mintforge-ui";\n\nexport default function Dashboard() {\n  return (\n    <Card variant="glass" glow className="p-6">\n      <Badge variant="mint">Production Ready</Badge>\n      <h2 className="text-xl font-bold mt-2">Welcome to Mintforge</h2>\n      <p className="text-sm text-muted">Build consistent web & mobile apps.</p>\n      <div className="mt-4 flex gap-3">\n        <Button variant="primary" glow>\n          Launch Project\n        </Button>\n        <Button variant="secondary">\n          Read Docs\n        </Button>\n      </div>\n    </Card>\n  );\n}`;
  };

  return (
    <section id="installation" className="mf-qi-section">
      <div className="mf-container">
        {/* Section Header */}
        <div className="mf-qi-header">
          <div className="mf-showcase-kicker">
            <Sparkles size={13} />
            <span>QUICK START &amp; SETUP</span>
          </div>
          <h2 className="mf-qi-title">
            Ship your first interface <br />
            <span className="mf-hero-gradient-headline">in under 2 minutes.</span>
          </h2>
          <p className="mf-qi-desc">
            Choose your preferred workflow: interactive CLI generator, standalone NPM packages, or
            universal Expo native modules.
          </p>
        </div>

        {/* Mode Selector Tabs (CLI vs Manual vs Expo) */}
        <div className="mf-qi-modes-row">
          {MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveMode(mode.id);
                  setActiveStep("step-1");
                }}
                className={`mf-qi-mode-btn ${isActive ? "active" : ""}`}
              >
                <div className="mf-qi-mode-icon-wrap">{mode.icon}</div>
                <div className="mf-qi-mode-text">
                  <div className="mf-qi-mode-top">
                    <span className="mf-qi-mode-label">{mode.label}</span>
                    <span className="mf-qi-mode-badge">{mode.badge}</span>
                  </div>
                  <span className="mf-qi-mode-tagline">{mode.tagline}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Installation Playground Container */}
        <div className="mf-qi-stage-card">
          {/* Left Column: Interactive 3-Step Setup Stepper */}
          <div className="mf-qi-stepper-col">
            <div className="mf-qi-stepper-head">
              <span className="mf-qi-stepper-caption">INSTALLATION WORKFLOW</span>
              <h3 className="mf-qi-stepper-title">3 Simple Steps to Production</h3>
            </div>

            <div className="mf-qi-steps-list">
              {(["step-1", "step-2", "step-3"] as const).map((stepKey) => {
                const step = STEP_DATA[stepKey];
                const isActive = activeStep === stepKey;
                return (
                  <div
                    key={stepKey}
                    onClick={() => setActiveStep(stepKey)}
                    className={`mf-qi-step-card ${isActive ? "active" : ""}`}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="mf-qi-step-num">{step.stepNumber}</div>
                    <div className="mf-qi-step-details">
                      <div className="mf-qi-step-card-header">
                        <strong className="mf-qi-step-name">{step.title}</strong>
                        {isActive && (
                          <span className="mf-qi-active-pill">
                            <Code2 size={11} /> Viewing
                          </span>
                        )}
                      </div>
                      <p className="mf-qi-step-desc">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preflight Environment Check Simulator */}
            <div className="mf-qi-preflight-card">
              <div className="mf-qi-preflight-top">
                <div className="mf-qi-preflight-title">
                  <ShieldCheck size={16} style={{ color: "var(--site-accent)" }} />
                  <strong>Environment Compatibility</strong>
                </div>
                {preflightStatus === "idle" && (
                  <button
                    type="button"
                    onClick={runPreflightCheck}
                    className="mf-qi-preflight-btn"
                  >
                    <Play size={11} /> Run Check
                  </button>
                )}
                {preflightStatus === "running" && (
                  <span className="mf-qi-preflight-status">
                    <span className="mf-spinner-inline" /> Verifying...
                  </span>
                )}
                {preflightStatus === "success" && (
                  <button
                    type="button"
                    onClick={runPreflightCheck}
                    className="mf-qi-preflight-btn"
                    title="Run check again"
                  >
                    <RotateCcw size={11} /> Re-check
                  </button>
                )}
              </div>

              {preflightStatus === "success" ? (
                <div className="mf-qi-preflight-results">
                  <div className="mf-qi-check-line">
                    <CheckCircle2 size={13} style={{ color: "#10b981" }} />
                    <span>Next.js 16 (App Router) &amp; React 19.3 verified</span>
                  </div>
                  <div className="mf-qi-check-line">
                    <CheckCircle2 size={13} style={{ color: "#10b981" }} />
                    <span>Tailwind CSS v4 &amp; PostCSS configured</span>
                  </div>
                  <div className="mf-qi-check-line">
                    <CheckCircle2 size={13} style={{ color: "#10b981" }} />
                    <span>TypeScript strict mode: 0 type errors detected</span>
                  </div>
                </div>
              ) : (
                <p className="mf-qi-preflight-hint">
                  Supports Node.js 18.17+, React 19, Next.js 16, Expo 52, and Tailwind v4.
                </p>
              )}
            </div>

            {/* Docs link CTA */}
            <div className="mf-qi-docs-cta">
              <Link href="#docs" className="mf-text-link">
                <BookOpen size={14} />
                <span>Explore the full Setup &amp; Configuration Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Window & Code Viewer */}
          <div className="mf-qi-terminal-col">
            <div className="mf-qi-terminal-window">
              {/* Terminal Window Header Bar */}
              <div className="mf-qi-terminal-header">
                {/* Traffic Lights */}
                <div className="mf-qi-traffic-lights" aria-hidden="true">
                  <span className="mf-light mf-light-red" />
                  <span className="mf-light mf-light-yellow" />
                  <span className="mf-light mf-light-green" />
                </div>

                {/* File / Terminal Tab Name */}
                <div className="mf-qi-active-filename">
                  <FileCode size={13} />
                  <span>{STEP_DATA[activeStep].filename}</span>
                </div>

                {/* Action Controls */}
                <div className="mf-qi-header-actions">
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(getCodeContent())}
                    className="mf-qi-copy-snippet-btn"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <span className="mf-copied-label">
                        <Check size={12} /> Copied!
                      </span>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Package Manager Switcher (Only visible on Step 1) */}
              {activeStep === "step-1" && (
                <div className="mf-qi-pkg-bar">
                  <span className="mf-qi-pkg-label">Package Manager:</span>
                  <div className="mf-qi-pkg-pills">
                    {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPkgManager(pm)}
                        className={`mf-qi-pkg-btn ${pkgManager === pm ? "active" : ""}`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Pre Block */}
              <div className="mf-qi-terminal-body">
                <pre className="mf-qi-code-pre">
                  <code>{getCodeContent()}</code>
                </pre>
              </div>

              {/* Terminal Footer Bar */}
              <div className="mf-qi-terminal-footer">
                <div className="mf-qi-footer-status">
                  <span className="mf-qi-status-dot-green" />
                  <span>Ready to paste • Zero peer warnings</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCommand(currentCommand)}
                  className="mf-qi-quick-copy-pill"
                >
                  <Terminal size={12} />
                  <code>{currentCommand.slice(0, 32)}...</code>
                  <Copy size={11} />
                </button>
              </div>
            </div>

            {/* Quick Benefits Highlights Row */}
            <div className="mf-qi-highlights-grid">
              <div className="mf-qi-highlight-box">
                <span className="mf-qi-highlight-num">&lt; 3.2 kB</span>
                <span className="mf-qi-highlight-lbl">Average Component Bundle</span>
              </div>
              <div className="mf-qi-highlight-box">
                <span className="mf-qi-highlight-num">100% Tree-shaken</span>
                <span className="mf-qi-highlight-lbl">Import only what you need</span>
              </div>
              <div className="mf-qi-highlight-box">
                <span className="mf-qi-highlight-num">WCAG AAA</span>
                <span className="mf-qi-highlight-lbl">Keyboard accessible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
