"use client";

import * as React from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { BubbleCodeHighlighter } from "./bubble-code-highlighter";
import { BubblePlaygroundState } from "./bubble-playground";

export type BubbleCodeTab =
  | "playground"
  | "variants"
  | "flow"
  | "reactions"
  | "collapsible"
  | "thinking";

export type CodeViewMode = "snippet" | "full";

export function getBubbleDisplayCode(
  tab: BubbleCodeTab,
  mode: CodeViewMode,
  playgroundState?: BubblePlaygroundState
): string {
  if (mode === "full") {
    return `"use client";

import * as React from "react";

export type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive";

export type BubbleAlign = "start" | "end";

// Exported Mintforge UI Bubble Primitives
export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  BubbleActions,
  BubbleCollapsible,
  BubbleThinking,
} from "@/components/ui/bubble";`;
  }

  // mode === "snippet"
  switch (tab) {
    case "playground": {
      if (!playgroundState) {
        return `<Bubble variant="default" align="end">
  <BubbleContent>
    Can you check if our frontend interview submission payload matches our FastAPI backend?
  </BubbleContent>
</Bubble>`;
      }
      const {
        variant,
        align,
        content,
        reactionType,
        actionButton,
        isCollapsible,
      } = playgroundState;

      const lines = [
        `import { Bubble, BubbleContent, BubbleReactions, BubbleActions, BubbleCollapsible } from "@/components/ui/bubble";`,
        "",
        `<div className="flex items-start gap-2.5">`,
        `  <Bubble variant="${variant}" align="${align}">`,
        `    <BubbleContent>`,
      ];

      if (isCollapsible) {
        lines.push(`      <BubbleCollapsible defaultExpanded={false}>`);
        lines.push(`        ${content}`);
        lines.push(`      </BubbleCollapsible>`);
      } else {
        lines.push(`      ${content}`);
      }

      lines.push(`    </BubbleContent>`);

      if (reactionType !== "none") {
        lines.push(
          `    <BubbleReactions side="bottom" align="${align === "end" ? "end" : "start"}">`
        );
        if (reactionType === "thumbs-heart") {
          lines.push(`      <span>👍 2</span><span>❤️ 1</span>`);
        } else if (reactionType === "fire-rocket") {
          lines.push(`      <span>🔥 3</span><span>🚀 2</span>`);
        } else if (reactionType === "party-trophy") {
          lines.push(`      <span>🎉 5</span><span>🏆 1</span>`);
        }
        lines.push(`    </BubbleReactions>`);
      }

      if (actionButton !== "none") {
        lines.push(`    <BubbleActions align="${align}">`);
        lines.push(`      <button className="text-xs text-slate-500 hover:text-slate-900">Copy</button>`);
        lines.push(`      <button className="text-xs text-slate-500 hover:text-slate-900">Retry</button>`);
        if (actionButton === "full") {
          lines.push(`      <button className="text-xs text-slate-500 hover:text-slate-900">Share</button>`);
        }
        lines.push(`    </BubbleActions>`);
      }

      lines.push(`  </Bubble>`);
      lines.push(`</div>`);
      return lines.join("\n");
    }

    case "variants":
      return `// 1. Primary Solid (User Outgoing)
<Bubble variant="default" align="end">
  <BubbleContent>Can you run API contract checks against our staging PR?</BubbleContent>
</Bubble>

// 2. Secondary Card (Assistant Incoming)
<Bubble variant="secondary" align="start">
  <BubbleContent>All 5 schema fields matched FastAPI with 0 drift.</BubbleContent>
</Bubble>

// 3. Soft Lavender Tint
<Bubble variant="tinted" align="start">
  <BubbleContent>Automated test pipeline completed in 1.4s.</BubbleContent>
</Bubble>

// 4. Muted Neutral
<Bubble variant="muted" align="start">
  <BubbleContent>PR #142 is approved and ready to merge.</BubbleContent>
</Bubble>

// 5. Minimalist Outline
<Bubble variant="outline" align="start">
  <BubbleContent>View live deployment on preview server.</BubbleContent>
</Bubble>

// 6. Destructive / Warning
<Bubble variant="destructive" align="start">
  <BubbleContent>Build check failed: Environment variable missing.</BubbleContent>
</Bubble>`;

    case "flow":
      return `// Outgoing user message with avatar & metadata
<Bubble
  variant="default"
  align="end"
  name="You"
  timestamp="10:24 AM"
  avatar={<UserAvatar />}
>
  Check our FastAPI feedback payload schema.
</Bubble>

// Incoming assistant message with avatar & metadata
<Bubble
  variant="secondary"
  align="start"
  name="Mintforge AI"
  timestamp="10:24 AM"
  avatar={<BotAvatar />}
>
  Verified against SubmitTeamFeedbackRequest. All 5 keys pass.
</Bubble>

// Grouped consecutive follow-up messages
<BubbleGroup align="start">
  <Bubble variant="secondary" align="start">
    <BubbleContent>Generated contract diff report.</BubbleContent>
  </Bubble>
  <Bubble variant="secondary" align="start">
    <BubbleContent>Synchronized automatically with GitHub PR #41.</BubbleContent>
  </Bubble>
</BubbleGroup>`;

    case "reactions":
      return `// Floating reaction capsule anchored to bubble edge
<div className="relative w-fit">
  <Bubble variant="muted" align="start">
    <BubbleContent>
      The frontend test suite completed with 100% test coverage!
    </BubbleContent>
  </Bubble>

  <BubbleReactions side="bottom" align="end">
    <button>👍 3</button>
    <button>❤️ 2</button>
    <button>🚀 4</button>
  </BubbleReactions>
</div>

// Bubble with action buttons
<Bubble variant="secondary" align="start">
  <BubbleContent>All changes deployed to staging.</BubbleContent>
</Bubble>
<BubbleActions align="start">
  <button>Copy</button>
  <button>Retry</button>
  <button>Share</button>
</BubbleActions>`;

    case "collapsible":
      return `// Truncated long content with interactive disclosure
<Bubble variant="secondary" align="start">
  <BubbleContent>
    <BubbleCollapsible defaultExpanded={false}>
      Antigravity agent checked 14 component test suites, resolved all
      TypeScript lint definitions, and built the production bundle in 5.8s
      with zero warnings across 37 routes.
    </BubbleCollapsible>
  </BubbleContent>
</Bubble>`;

    case "thinking":
      return `// Signature AI chain-of-thought drawer
<BubbleThinking duration="1.2s" defaultOpen={true} title="Thinking Process">
  ✓ Analyzed input JSON against OpenAPI 3.1 specification
  ✓ Validated 5/5 payload keys with FastAPI models
  ✓ Verified zero contract drift between client and server
</BubbleThinking>

<Bubble variant="secondary" align="start">
  <BubbleContent>
    Backend integration contract confirmed. You are ready to deploy to production.
  </BubbleContent>
</Bubble>`;
  }
}

interface BubbleBigCodeSectionProps {
  playgroundState: BubblePlaygroundState;
}

export function BubbleBigCodeSection({
  playgroundState,
}: BubbleBigCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<BubbleCodeTab>("playground");
  const [viewMode, setViewMode] = React.useState<CodeViewMode>("snippet");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const displayCode = getBubbleDisplayCode(activeTab, viewMode, playgroundState);

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
      await navigator.clipboard.writeText("npx mintforge add bubble");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      // ignore
    }
  };

  const tabs: { id: BubbleCodeTab; label: string }[] = [
    { id: "playground", label: "Playground Live JSX" },
    { id: "variants", label: "Visual Variants" },
    { id: "flow", label: "Conversation Flow" },
    { id: "reactions", label: "Reactions & Actions" },
    { id: "collapsible", label: "Collapsible" },
    { id: "thinking", label: "AI Reasoning" },
  ];

  return (
    <section className="mt-14 space-y-4">
      {/* Title & CLI Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Code2 size={22} className="text-[#5145FF]" />
            <span>Code Preview &amp; Implementation</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Production-grade copyable React code for the Mintforge UI Bubble component.
          </p>
        </div>

        {/* CLI command pill */}
        <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5 shadow-sm">
          <Terminal size={14} className="text-[#38BDF8]" />
          <code className="text-xs font-mono text-[#F8FAFC]">
            npx mintforge add bubble
          </code>
          <button
            type="button"
            onClick={handleCopyCli}
            className="text-[#94A3B8] hover:text-white transition-colors ml-1 cursor-pointer"
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

      {/* Terminal Card */}
      <div className="mf-dark-terminal">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1E293B] px-4 py-3 bg-[#0B0F19]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-3">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-[#94A3B8]">
              bubble.tsx &mdash; React 19 / TypeScript / Tailwind
            </span>
          </div>

          {/* Full Code vs JSX Toggle + Copy */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="inline-flex rounded-lg bg-[#1E293B] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("snippet")}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  viewMode === "snippet"
                    ? "bg-[#5145FF] text-white"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Snippet JSX
              </button>
              <button
                type="button"
                onClick={() => setViewMode("full")}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  viewMode === "full"
                    ? "bg-[#5145FF] text-white"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Full Component
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-medium text-white transition cursor-pointer border border-[#334155]"
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

        {/* Tab Strip */}
        {viewMode === "snippet" && (
          <div className="flex overflow-x-auto border-b border-[#1E293B] bg-[#0A0E17] px-2 py-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium whitespace-nowrap transition cursor-pointer border-b-2 -mb-[1px] ${
                  activeTab === tab.id
                    ? "border-[#5145FF] text-white bg-[#1E293B]/40"
                    : "border-transparent text-[#94A3B8] hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Code View Area */}
        <div className="p-4 overflow-x-auto">
          <BubbleCodeHighlighter code={displayCode} />
        </div>
      </div>
    </section>
  );
}
