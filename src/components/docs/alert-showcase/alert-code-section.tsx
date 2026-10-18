"use client";

import * as React from "react";
import { Copy, Check, FileCode, Terminal, Code2, Layers } from "lucide-react";
import { AlertCodeHighlighter } from "./alert-code-highlighter";
import { AlertPlaygroundConfig } from "./alert-playground";
import { AlertVariantNavType } from "./alert-variant-nav";

export type CodeViewMode = "snippet" | "full";

export function getVariantDisplayCode(
  variant: AlertVariantNavType,
  config: AlertPlaygroundConfig
): string {
  if (variant === "playground") {
    const { status, design, size, hasAction, isDismissible, title, description } = config;
    const sizeAttr = size !== "md" ? `\n  size="${size}"` : "";
    const dismissAttr = isDismissible ? `\n  onClose={() => handleDismiss()}` : "";

    let actionJsx = "";
    if (hasAction) {
      const buttonStyle =
        design === "solid"
          ? 'className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"'
          : 'className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] transition-colors"';

      actionJsx = `\n  action={\n    <button\n      type="button"\n      ${buttonStyle}\n    >\n      Resolve Now\n    </button>\n  }`;
    }

    return `<Alert
  status="${status}"
  design="${design}"${sizeAttr}${dismissAttr}
  title="${title}"
  description="${description}"${actionJsx}
/>`;
  }

  switch (variant) {
    case "morph":
      return `<div className="space-y-3.5">
  {/* Signature Morph Brand Alert */}
  <Alert
    status="brand"
    design="morph"
    title="Design System v0.1.2 Released"
    description="New token synchronizers, zero-drift contract verification, and accessible primitives."
    action={
      <button
        type="button"
        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#5145FF] hover:bg-[#EEF2FF] transition-colors"
      >
        View Changelog
      </button>
    }
    onClose={() => handleDismiss()}
  />

  {/* Signature Morph Success Alert */}
  <Alert
    status="success"
    design="morph"
    title="Contract Synchronized"
    description="FastAPI schema matched frontend contract with zero discrepancies detected."
    onClose={() => handleDismiss()}
  />
</div>`;

    case "rail":
      return `<div className="space-y-3.5">
  {/* Accent Rail Info Alert */}
  <Alert
    status="info"
    design="rail"
    title="Scheduled Database Maintenance"
    description="Automated zero-downtime maintenance scheduled for Sunday at 02:00 UTC."
    action={
      <button
        type="button"
        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#F8F9FC] border border-[#E5E7EB] text-[#111827] hover:bg-white transition-colors"
      >
        Details
      </button>
    }
  />

  {/* Accent Rail Warning Alert with Dismiss */}
  <Alert
    status="warning"
    design="rail"
    title="Storage Approaching Threshold"
    description="Current cluster storage utilization is at 88%. Auto-expansion enabled."
    onClose={() => handleDismiss()}
  />
</div>`;

    case "floating":
      return `<div className="space-y-3.5">
  {/* Floating Glass Brand Banner */}
  <Alert
    status="brand"
    design="floating"
    title="Real-Time Sync Activated"
    description="Live multi-tenant WebSocket channel listening for schema mutations."
    onClose={() => handleDismiss()}
  />

  {/* Floating Glass Destructive Alert */}
  <Alert
    status="destructive"
    design="floating"
    title="Connection Interrupted"
    description="Lost connection to edge telemetry replica. Retrying in 4 seconds..."
    action={
      <button
        type="button"
        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
      >
        Reconnect
      </button>
    }
  />
</div>`;

    case "solid":
    default:
      return `<div className="space-y-3.5">
  {/* High Urgency Solid Alert */}
  <Alert
    status="destructive"
    design="solid"
    title="Critical Security Warning"
    description="Legacy API token exposed in commit history. Rotate key immediately."
    action={
      <button
        type="button"
        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white text-red-600 hover:bg-white/90 transition-colors"
      >
        Revoke Key
      </button>
    }
    onClose={() => handleDismiss()}
  />

  {/* Low Profile Subtle Neutral Alert */}
  <Alert
    status="neutral"
    design="subtle"
    title="ProTip: Global Command Palette"
    description="Press ⌘K anywhere in the web app to open quick search and navigation."
    onClose={() => handleDismiss()}
  />
</div>`;
  }
}

export function getVariantFullCopyCode(
  variant: AlertVariantNavType,
  config: AlertPlaygroundConfig
): string {
  const componentName =
    variant === "playground"
      ? "CustomAlertDemo"
      : `${variant.charAt(0).toUpperCase() + variant.slice(1)}AlertDemo`;

  const jsxSnippet = getVariantDisplayCode(variant, config)
    .split("\n")
    .map((line) => "    " + line)
    .join("\n");

  return `"use client";

import * as React from "react";
import { Alert } from "@/components/ui/alert";

export function ${componentName}() {
  const handleDismiss = () => {
    console.log("Alert dismissed");
  };

  return (
${jsxSnippet}
  );
}`;
}

export interface AlertBigCodeSectionProps {
  config: AlertPlaygroundConfig;
  activeVariant?: AlertVariantNavType;
  onVariantChange?: (variant: AlertVariantNavType) => void;
}

export function AlertBigCodeSection({
  config,
  activeVariant: externalActiveVariant,
  onVariantChange,
}: AlertBigCodeSectionProps) {
  const [internalVariant, setInternalVariant] =
    React.useState<AlertVariantNavType>("morph");
  const [viewMode, setViewMode] = React.useState<CodeViewMode>("snippet");
  const [copied, setCopied] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const selectedVariant = externalActiveVariant || internalVariant;

  const displayCode = React.useMemo(() => {
    if (viewMode === "full") {
      return getVariantFullCopyCode(selectedVariant, config);
    }
    return getVariantDisplayCode(selectedVariant, config);
  }, [selectedVariant, config, viewMode]);

  const fullCopyCode = React.useMemo(
    () => getVariantFullCopyCode(selectedVariant, config),
    [selectedVariant, config]
  );

  const handleCopyCode = async () => {
    const textToCopy = viewMode === "full" ? fullCopyCode : displayCode;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", textToCopy);
    }
  };

  const handleCopyCli = async () => {
    const cliCmd = "npx mintforge add alert";
    try {
      await navigator.clipboard.writeText(cliCmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      window.prompt("Copy CLI command:", cliCmd);
    }
  };

  const handleTabClick = (variant: AlertVariantNavType) => {
    setInternalVariant(variant);
    onVariantChange?.(variant);
  };

  const variantTabs: { id: AlertVariantNavType; label: string }[] = [
    { id: "morph", label: "Morph" },
    { id: "rail", label: "Accent Rail" },
    { id: "floating", label: "Floating Glass" },
    { id: "solid", label: "Solid" },
    { id: "playground", label: "Playground Active" },
  ];

  const fileName =
    selectedVariant === "playground"
      ? `alert-${config.design}-${config.status}.tsx`
      : `alert-${selectedVariant}-demo.tsx`;

  return (
    <div className="w-full bg-[#0B0F19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/90 bg-slate-900/70">
        {/* Left: Tab / File Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5145FF]/20 text-[#5145FF] border border-[#5145FF]/30 flex items-center justify-center shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                {fileName}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5145FF]/20 text-[#818CF8] border border-[#5145FF]/30">
                {viewMode === "full" ? "Full Component" : "JSX Snippet"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive code dynamically synchronized with visual selection &amp; playground.
            </p>
          </div>
        </div>

        {/* Center: Variant Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {variantTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                selectedVariant === tab.id
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: View Mode Toggle & Copy Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("snippet")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                viewMode === "snippet"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Show JSX Snippet only"
            >
              <Code2 size={12} />
              <span>Snippet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("full")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                viewMode === "full"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Show full React component with imports"
            >
              <Layers size={12} />
              <span>Full Component</span>
            </button>
          </div>

          {/* CLI Copy */}
          <button
            type="button"
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>{copiedCli ? "CLI Copied!" : "npx mintforge add alert"}</span>
          </button>

          {/* Code Copy */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5145FF] hover:bg-[#4338CA] shadow-sm transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-300" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-6 overflow-x-auto max-h-[480px] overflow-y-auto">
        <AlertCodeHighlighter code={displayCode} />
      </div>

      {/* Footer Info Pill */}
      <div className="px-6 py-2.5 bg-slate-900/40 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>
          Includes all status palettes: brand, info, success, warning, destructive, neutral
        </span>
        <span className="text-slate-500 font-mono text-[11px]">
          Variant: {selectedVariant} · Design: {config.design} · Status: {config.status} · Scale: {config.size}
        </span>
      </div>
    </div>
  );
}
