"use client";

import * as React from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { AvatarCodeHighlighter } from "./avatar-code-highlighter";
import { PlaygroundState } from "./avatar-playground";

export type AvatarCodeTab =
  | "playground"
  | "sizes"
  | "status"
  | "groups"
  | "clips";

export type CodeViewMode = "snippet" | "full";

export function getAvatarDisplayCode(
  tab: AvatarCodeTab,
  mode: CodeViewMode,
  playgroundState?: PlaygroundState
): string {
  if (mode === "full") {
    return `"use client";

import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square" | "squircle";
export type AvatarStatus = "online" | "busy" | "away" | "offline";
export type AvatarBadgePosition = "bottom-right" | "top-right" | "top-left" | "bottom-left";
export type AvatarBadgeVariant = "dot" | "icon" | "count";

// Mintforge UI Avatar Primitive
export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar";`;
  }

  // mode === "snippet"
  switch (tab) {
    case "playground": {
      if (!playgroundState) {
        return `<Avatar size="lg" shape="circle">
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback initials="JD" />
  <AvatarBadge status="online" />
</Avatar>`;
      }
      const { size, shape, status, badge, fallbackActive } = playgroundState;
      const lines = [`<Avatar size="${size}" shape="${shape}">`];

      if (!fallbackActive) {
        const grayscale = status === "offline" ? ` className="grayscale opacity-85"` : "";
        lines.push(`  <AvatarImage src="/user-portrait.jpg" alt="User Profile"${grayscale} />`);
      }
      lines.push(`  <AvatarFallback initials="JD" />`);

      if (status !== "none") {
        lines.push(`  <AvatarBadge status="${status}" />`);
      }

      if (badge === "verified") {
        lines.push(`  {/* Verified Check Badge */}`);
        lines.push(`  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center border-2 border-white shadow-sm z-10">`);
        lines.push(`    <Check size={10} strokeWidth={3} />`);
        lines.push(`  </span>`);
      } else if (badge === "alert") {
        lines.push(`  {/* Alert Badge */}`);
        lines.push(`  <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-[#EA580C] text-white flex items-center justify-center border-2 border-white shadow-sm z-10">`);
        lines.push(`    <AlertCircle size={10} strokeWidth={2.5} />`);
        lines.push(`  </span>`);
      } else if (badge === "count") {
        lines.push(`  <AvatarBadge position="top-right" variant="count" count="+3" />`);
      }

      lines.push(`</Avatar>`);
      return lines.join("\n");
    }

    case "sizes":
      return `// 1. Photo Scale (XS to XL)
<Avatar size="xs">
  <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
  <AvatarFallback initials="XS" />
</Avatar>

<Avatar size="sm">
  <AvatarImage src="/avatars/alex.jpg" alt="Alex" />
  <AvatarFallback initials="SM" />
</Avatar>

<Avatar size="md">
  <AvatarImage src="/avatars/jessica.jpg" alt="Jessica" />
  <AvatarFallback initials="MD" />
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/avatars/marcus.jpg" alt="Marcus" />
  <AvatarFallback initials="LG" />
</Avatar>

<Avatar size="xl">
  <AvatarImage src="/avatars/elena.jpg" alt="Elena" />
  <AvatarFallback initials="XL" />
</Avatar>

// 2. Initials with Squircle Shape
<Avatar size="md" shape="squircle">
  <AvatarFallback initials="AM" />
</Avatar>`;

    case "status":
      return `// Presence Status Badges (Online, Away, Busy, Offline)
<Avatar size="lg">
  <AvatarImage src="/avatars/marcus.jpg" alt="Marcus" />
  <AvatarFallback initials="MC" />
  <AvatarBadge status="online" />
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/avatars/alex.jpg" alt="Alex" />
  <AvatarFallback initials="AX" />
  <AvatarBadge status="away" />
  {/* Verified Badge Checkmark */}
  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center border-2 border-white shadow-sm z-10">
    <Check size={10} strokeWidth={3} />
  </span>
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
  <AvatarFallback initials="SC" />
  <AvatarBadge status="busy" />
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/avatars/jessica.jpg" alt="Jessica" className="grayscale opacity-85" />
  <AvatarFallback initials="JS" />
  <AvatarBadge status="offline" />
</Avatar>

// Count Notification Badge
<Avatar size="lg">
  <AvatarImage src="/avatars/alex.jpg" alt="Alex" />
  <AvatarBadge position="top-right" variant="count" count="+3" />
</Avatar>`;

    case "groups":
      return `// Overlapping Team Avatar Group with Custom Ring Colors
<div className="inline-flex items-center -space-x-3.5">
  <Avatar size="lg" className="ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-white">
    <AvatarImage src="/avatars/marcus.jpg" alt="Marcus" />
    <AvatarFallback initials="MC" />
  </Avatar>

  <Avatar size="lg" className="ring-2 ring-[#10B981] ring-offset-2 ring-offset-white">
    <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
    <AvatarFallback initials="SC" />
  </Avatar>

  <Avatar size="lg" className="ring-2 ring-[#14B8A6] ring-offset-2 ring-offset-white">
    <AvatarImage src="/avatars/jessica.jpg" alt="Jessica" />
    <AvatarFallback initials="JS" />
  </Avatar>

  <Avatar size="lg" className="ring-2 ring-[#EF4444] ring-offset-2 ring-offset-white">
    <AvatarImage src="/avatars/alex.jpg" alt="Alex" />
    <AvatarFallback initials="AX" />
  </Avatar>

  <Avatar size="lg" className="ring-2 ring-[#6366F1] ring-offset-2 ring-offset-white">
    <AvatarImage src="/avatars/david.jpg" alt="David" />
    <AvatarFallback initials="DV" />
  </Avatar>

  {/* Overflow Counter */}
  <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full font-bold font-mono text-[#475569] bg-[#F1F5F9] border-2 border-white ring-2 ring-[#CBD5E1] text-sm select-none z-10">
    +4
  </div>
</div>`;

    case "clips":
      return `// Custom Clips and Initials Shapes
<Avatar size="lg" shape="squircle">
  <AvatarImage src="/avatars/marcus.jpg" alt="Squircle" />
  <AvatarFallback initials="SQ" />
</Avatar>

<Avatar size="lg" shape="rounded">
  <AvatarImage src="/avatars/alex.jpg" alt="Rounded" />
  <AvatarFallback initials="RD" />
</Avatar>

<Avatar size="lg" shape="circle">
  <AvatarImage src="/avatars/sarah.jpg" alt="Circle" />
  <AvatarFallback initials="CR" />
</Avatar>

<Avatar size="lg" shape="circle">
  <AvatarFallback initials="JD" />
</Avatar>`;
  }
}

interface AvatarBigCodeSectionProps {
  playgroundState: PlaygroundState;
}

export function AvatarBigCodeSection({
  playgroundState,
}: AvatarBigCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<AvatarCodeTab>("playground");
  const [viewMode, setViewMode] = React.useState<CodeViewMode>("snippet");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const displayCode = getAvatarDisplayCode(activeTab, viewMode, playgroundState);

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
      await navigator.clipboard.writeText("npx mintforge add avatar");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      // ignore
    }
  };

  const tabs: { id: AvatarCodeTab; label: string }[] = [
    { id: "playground", label: "Playground Live JSX" },
    { id: "sizes", label: "Basic & Sizes" },
    { id: "status", label: "Status & Badges" },
    { id: "groups", label: "Avatar Groups" },
    { id: "clips", label: "Clips & Shapes" },
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
            Production-grade copyable React code for the Mintforge UI Avatar component.
          </p>
        </div>

        {/* CLI pill */}
        <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5 shadow-sm">
          <Terminal size={14} className="text-[#38BDF8]" />
          <code className="text-xs font-mono text-[#F8FAFC]">
            npx mintforge add avatar
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
          <AvatarCodeHighlighter code={displayCode} />
        </div>
      </div>
    </section>
  );
}
