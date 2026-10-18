"use client";

import * as React from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { BubbleCodeHighlighter } from "./bubble-code-highlighter";
import { BubblePlaygroundState } from "./bubble-playground";

export type BubbleCodeTab =
  | "playground"
  | "variants"
  | "alignment"
  | "groups"
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

// Mintforge UI Bubble Primitive
export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
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

      const lines = [`<Bubble variant="${variant}" align="${align}">`];
      lines.push(`  <BubbleContent>`);

      if (isCollapsible) {
        lines.push(`    <BubbleCollapsible defaultExpanded={false}>`);
        lines.push(`      ${content}`);
        lines.push(`    </BubbleCollapsible>`);
      } else {
        lines.push(`    ${content}`);
      }

      if (actionButton === "proceed") {
        lines.push(`    <div className="mt-2 pt-2 border-t border-white/20">`);
        lines.push(`      <button className="px-3 py-1 rounded-xl bg-white text-[#5145FF] text-xs font-semibold">`);
        lines.push(`        Yes, proceed`);
        lines.push(`      </button>`);
        lines.push(`    </div>`);
      } else if (actionButton === "contact") {
        lines.push(`    <div className="mt-2 pt-2 border-t border-slate-200">`);
        lines.push(`      <button className="px-3 py-1 rounded-xl bg-[#5145FF] text-white text-xs font-semibold">`);
        lines.push(`        Talk to a human`);
        lines.push(`      </button>`);
        lines.push(`    </div>`);
      }

      lines.push(`  </BubbleContent>`);

      if (reactionType === "thumbs") {
        lines.push(`  <BubbleReactions side="bottom" align="${align === "end" ? "end" : "start"}">`);
        lines.push(`    <span>👍</span><span>😮</span><span className="font-mono text-xs">+2</span>`);
        lines.push(`  </BubbleReactions>`);
      } else if (reactionType === "party") {
        lines.push(`  <BubbleReactions side="top" align="${align === "end" ? "start" : "end"}">`);
        lines.push(`    <span>🎉</span><span>👏</span>`);
        lines.push(`  </BubbleReactions>`);
      } else if (reactionType === "heart") {
        lines.push(`  <BubbleReactions side="bottom" align="end">`);
        lines.push(`    <span>❤️</span><span>🔥</span>`);
        lines.push(`  </BubbleReactions>`);
      }

      lines.push(`</Bubble>`);
      return lines.join("\n");
    }

    case "variants":
      return `// 1. Default (Primary emphasis)
<Bubble variant="default" align="start">
  <BubbleContent>Vibrant primary surface for user prompts.</BubbleContent>
</Bubble>

// 2. Secondary (White elevated card)
<Bubble variant="secondary" align="start">
  <BubbleContent>Clean surface with subtle border for replies.</BubbleContent>
</Bubble>

// 3. Muted (Subtle neutral)
<Bubble variant="muted" align="start">
  <BubbleContent>Soft gray surface for background chatter.</BubbleContent>
</Bubble>

// 4. Tinted (Soft Lavender)
<Bubble variant="tinted" align="start">
  <BubbleContent>Signature lavender wash for notifications.</BubbleContent>
</Bubble>

// 5. Destructive (Soft red)
<Bubble variant="destructive" align="start">
  <BubbleContent>Soft crimson wash for warnings or errors.</BubbleContent>
</Bubble>`;

    case "alignment":
      return `// Outgoing message (User)
<Bubble variant="default" align="end">
  <BubbleContent>
    Can you check if our frontend interview submission payload matches our FastAPI backend?
  </BubbleContent>
</Bubble>

// Incoming message (Assistant)
<Bubble variant="secondary" align="start">
  <BubbleContent>
    All 5 fields match the expected casing and types with zero drift!
  </BubbleContent>
</Bubble>`;

    case "groups":
      return `// Group of consecutive messages
<BubbleGroup align="end">
  <Bubble variant="default" align="end">
    <BubbleContent>Hey, did the nightly build finish?</BubbleContent>
  </Bubble>
  <Bubble variant="default" align="end">
    <BubbleContent>Checking the staging server logs now.</BubbleContent>
  </Bubble>
</BubbleGroup>

<BubbleGroup align="start">
  <Bubble variant="secondary" align="start">
    <BubbleContent>Yes! All 142 integration tests passed.</BubbleContent>
  </Bubble>
  <Bubble variant="secondary" align="start">
    <BubbleContent>Artifacts uploaded and ready for deployment.</BubbleContent>
  </Bubble>
</BubbleGroup>`;

    case "reactions":
      return `// Reactions anchored to bubble edge with accessible label
<Bubble variant="muted" align="start">
  <BubbleContent>
    I don't need tests, I know my code works!
  </BubbleContent>
  <BubbleReactions side="bottom" align="end">
    <span>👍</span>
    <span>😮</span>
    <span className="font-mono text-xs">+2</span>
  </BubbleReactions>
</Bubble>

<Bubble variant="default" align="end">
  <BubbleContent>
    Tests passed on the first try. All 142 of them!
  </BubbleContent>
  <BubbleReactions side="top" align="start">
    <span>🎉</span>
    <span>👏</span>
  </BubbleReactions>
</Bubble>`;

    case "collapsible":
      return `// Long content with collapsible show more / show less toggle
<Bubble variant="muted" align="start">
  <BubbleContent>
    <BubbleCollapsible defaultExpanded={false}>
      The accessibility audit identified 3 focus states that were visually too subtle in dark mode.
      Specifically, the dialog backdrop, tab lists, and drawer action groups lacked high-contrast outline rings.
      All 45 automated Axe core accessibility tests now report 100% compliance with zero violations!
    </BubbleCollapsible>
  </BubbleContent>
</Bubble>`;

    case "thinking":
      return `// Reasoning chain-of-thought drawer for AI models
<Bubble role="assistant" seamVerified seamEndpoint="POST /v1/interviews/feedback">
  <BubbleThinking duration="1.2s" title="Contract Parity Analysis" defaultOpen={true}>
    Scanning AST:
    - Frontend field "scores" -> Backend "scores" (List[int]) -> MATCH
    - Frontend field "detailed_feedback" -> Backend "detailed_feedback" (str) -> MATCH
    - Zero camelCase drift detected. HTTP 200 guaranteed.
  </BubbleThinking>
  Your frontend form submission is fully verified and compliant with the FastAPI schema.
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
    { id: "alignment", label: "Alignment" },
    { id: "groups", label: "Grouped Bubbles" },
    { id: "reactions", label: "Reactions" },
    { id: "collapsible", label: "Collapsible" },
    { id: "thinking", label: "AI Reasoning" },
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
            Production-grade copyable React code for the Mintforge UI Bubble component.
          </p>
        </div>

        {/* CLI pill */}
        <div className="inline-flex items-center gap-2 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5 shadow-sm">
          <Terminal size={14} className="text-[#38BDF8]" />
          <code className="text-xs font-mono text-[#F8FAFC]">
            npx mintforge add bubble
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
          <BubbleCodeHighlighter code={displayCode} />
        </div>
      </div>
    </section>
  );
}
