"use client";

import * as React from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { BadgeCodeHighlighter } from "./badge-code-highlighter";
import { BadgePlaygroundState } from "./badge-playground";

export type BadgeCodeTab =
  | "playground"
  | "variations"
  | "signature"
  | "status"
  | "counts";

export type CodeViewMode = "snippet" | "full";

export function getBadgeDisplayCode(
  tab: BadgeCodeTab,
  mode: CodeViewMode,
  playgroundState?: BadgePlaygroundState
): string {
  if (mode === "full") {
    return `"use client";

import * as React from "react";

export type BadgeAppearance = "solid" | "soft" | "outline" | "ghost";
export type BadgeVariant =
  | "default"
  | "brand"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "destructive"
  | "neutral"
  | "lavender";
export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill" | "square";

// Mintforge UI Badge Primitive
export { Badge, BadgeDot, BadgeCount } from "@/components/ui/badge";`;
  }

  // mode === "snippet"
  switch (tab) {
    case "playground": {
      if (!playgroundState) {
        return `<Badge appearance="soft" variant="success" leadingIcon={<BadgeDot status="active" ping />}>
  Active
</Badge>`;
      }
      const {
        appearance,
        variant,
        size,
        shape,
        label,
        hasLeadingIcon,
        leadingIconType,
        hasTrailingIcon,
        trailingIconType,
      } = playgroundState;

      const propsArr = [`appearance="${appearance}"`, `variant="${variant}"`];
      if (size !== "md") propsArr.push(`size="${size}"`);
      if (shape !== "pill") propsArr.push(`shape="${shape}"`);

      if (hasLeadingIcon) {
        if (leadingIconType === "dot") {
          propsArr.push(`leadingIcon={<BadgeDot status="active" ping />}`);
        } else if (leadingIconType === "check") {
          propsArr.push(`leadingIcon={<Check size={12} />}`);
        } else if (leadingIconType === "sparkle") {
          propsArr.push(`leadingIcon={<Sparkles size={12} />}`);
        }
      }

      if (hasTrailingIcon) {
        if (trailingIconType === "star") {
          propsArr.push(`trailingIcon={<Star size={12} />}`);
        } else if (trailingIconType === "count") {
          propsArr.push(`trailingIcon={<BadgeCount count="3" />}`);
        }
      }

      return `<Badge ${propsArr.join(" ")}>
  ${label || "Badge"}
</Badge>`;
    }

    case "variations":
      return `// 1. Solid Appearance
<Badge appearance="solid" variant="primary">Solid</Badge>
<Badge appearance="solid" variant="success">Green</Badge>
<Badge appearance="solid" variant="warning">Orange</Badge>
<Badge appearance="solid" variant="destructive">Red</Badge>

// 2. Soft Pastel Appearance
<Badge appearance="soft" variant="primary">Soft Blue</Badge>
<Badge appearance="soft" variant="success">Soft Green</Badge>
<Badge appearance="soft" variant="warning">Soft Orange</Badge>
<Badge appearance="soft" variant="destructive">Soft Red</Badge>
<Badge appearance="soft" variant="brand">Soft Lavender</Badge>

// 3. Outline Appearance
<Badge appearance="outline" variant="primary">Outline</Badge>
<Badge appearance="outline" variant="success">Green</Badge>
<Badge appearance="outline" variant="warning">Orange</Badge>
<Badge appearance="outline" variant="destructive">Red</Badge>

// 4. Ghost / Minimal
<Badge appearance="ghost" variant="brand">Primary</Badge>
<Badge appearance="ghost" variant="success">Success</Badge>
<Badge appearance="ghost" variant="destructive">Destructive</Badge>`;

    case "signature":
      return `// 1. NEW Sparkle Badge
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#5145FF] bg-gradient-to-r from-[#EEF2FF] to-[#FAF5FF] border border-[#E0DAFF]">
  <Sparkles size={12} />
  <span>NEW</span>
  <Sparkles size={12} />
</div>

// 2. BETA Pill
<Badge appearance="soft" variant="primary" className="font-bold tracking-wider">
  BETA
</Badge>

// 3. PRO Badge with Gold Star
<div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0F172A] border border-[#334155]">
  <span>PRO</span>
  <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
</div>

// 4. VERIFIED Badge
<Badge appearance="soft" variant="success" leadingIcon={<CheckCircle2 size={12} />}>
  VERIFIED
</Badge>

// 5. FEATURED Badge
<Badge appearance="soft" variant="warning" leadingIcon={<Trophy size={12} />}>
  FEATURED
</Badge>

// 6. EXPERIMENTAL Badge
<Badge appearance="soft" variant="lavender" leadingIcon={<FlaskConical size={12} />}>
  EXPERIMENTAL
</Badge>`;

    case "status":
      return `// Status Pills with Indicators
<Badge appearance="soft" variant="success" leadingIcon={<BadgeDot status="active" ping />}>
  Active
</Badge>

<Badge appearance="soft" variant="destructive" leadingIcon={<BadgeDot status="failed" />}>
  Failed
</Badge>

<Badge appearance="soft" variant="warning" leadingIcon={<BadgeDot status="pending" />}>
  Pending
</Badge>

<Badge appearance="soft" variant="neutral" leadingIcon={<BadgeDot status="offline" />}>
  Archived
</Badge>

// Bare Status Markers
<div className="inline-flex items-center gap-2 text-xs font-medium text-[#475569]">
  <BadgeDot status="online" ping />
  <span>Online tiny status</span>
</div>

<div className="inline-flex items-center gap-2 text-xs font-medium text-[#16A34A]">
  <Check size={13} strokeWidth={2.5} />
  <span>Success status</span>
</div>`;

    case "counts":
      return `// 1. Numeric Pill Badges
<span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full text-xs font-bold font-mono text-white bg-[#3B82F6]">
  +3
</span>

<span className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded-full text-xs font-bold font-mono text-white bg-[#3B82F6]">
  99+
</span>

// 2. Embedded Count Pills
<Badge appearance="outline" variant="neutral">
  <span className="font-mono text-[#2563EB] font-bold mr-1">+3</span>
  <span>Options</span>
</Badge>

<Badge appearance="soft" variant="primary">
  <span>Text Soft</span>
  <BadgeCount count="9" className="ml-1.5 bg-[#3B82F6] text-white" />
</Badge>`;
  }
}

interface BadgeBigCodeSectionProps {
  playgroundState: BadgePlaygroundState;
}

export function BadgeBigCodeSection({
  playgroundState,
}: BadgeBigCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<BadgeCodeTab>("playground");
  const [viewMode, setViewMode] = React.useState<CodeViewMode>("snippet");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const displayCode = getBadgeDisplayCode(activeTab, viewMode, playgroundState);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx mintforge add badge");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      // ignore
    }
  };

  const tabs: { id: BadgeCodeTab; label: string }[] = [
    { id: "playground", label: "Playground Live JSX" },
    { id: "variations", label: "Basic & Variations" },
    { id: "signature", label: "Signature Badges" },
    { id: "status", label: "Status & Dot Badges" },
    { id: "counts", label: "Count & Shape Badges" },
  ];

  return (
    <section className="mt-12 space-y-4">
      {/* Title & CLI Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Code2 size={22} className="text-[#5145FF]" />
            <span>Code Preview &amp; Implementation</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Production-ready copyable React code for the Mintforge UI Badge component.
          </p>
        </div>

        {/* CLI pill */}
        <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5 shadow-sm">
          <Terminal size={14} className="text-[#38BDF8]" />
          <code className="text-xs font-mono text-[#F8FAFC]">
            npx mintforge add badge
          </code>
          <button
            type="button"
            onClick={handleCopyCli}
            className="text-[#94A3B8] hover:text-white transition-colors ml-1"
            title="Copy CLI command"
            aria-label="Copy CLI command"
          >
            {copiedCli ? (
              <Check size={14} className="text-[#10B981]" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Dark Terminal Window */}
      <div className="mf-dark-terminal">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-[#1E293B] gap-3">
          {/* Mac window dots + Tab pills */}
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>

            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#5145FF] text-white shadow-sm"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Switch + Copy Code */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mode switch */}
            <div className="inline-flex items-center bg-[#1E293B] rounded-lg p-0.5 border border-[#334155]">
              <button
                type="button"
                onClick={() => setViewMode("snippet")}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  viewMode === "snippet"
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                JSX Snippet
              </button>
              <button
                type="button"
                onClick={() => setViewMode("full")}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  viewMode === "full"
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Full Component
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#5145FF] hover:bg-[#4338CA] rounded-lg shadow-sm transition-all"
            >
              {copiedCode ? (
                <>
                  <Check size={13} className="text-[#10B981]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-4 sm:p-6 bg-[#0B0F19] overflow-x-auto">
          <BadgeCodeHighlighter code={displayCode} />
        </div>
      </div>
    </section>
  );
}
