"use client";

import * as React from "react";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  BubbleActions,
  BubbleCollapsible,
  BubbleThinking,
} from "@/components/ui/bubble";
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * 1. Basic Variations Card (Column 1)
 * -----------------------------------------------------------------------------------------------*/
export function BubbleBasicVariationsCard() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#111827]">
            Basic &amp; Variations
          </h3>
          <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
            7 Surfaces
          </span>
        </div>

        {/* 1. Primary Solid */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Primary / Solid (User Outgoing)
          </span>
          <div className="w-full">
            <Bubble variant="default" align="end">
              <BubbleContent>
                Can you run API contract checks against our staging PR?
              </BubbleContent>
            </Bubble>
          </div>
        </div>

        {/* 2. Secondary Card */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Secondary / Card (Assistant Incoming)
          </span>
          <div className="w-full">
            <Bubble variant="secondary" align="start">
              <BubbleContent>
                All 5 schema fields matched FastAPI with 0 drift.
              </BubbleContent>
            </Bubble>
          </div>
        </div>

        {/* 3. Soft Lavender Tint */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Soft Lavender Tint
          </span>
          <div className="w-full">
            <Bubble variant="tinted" align="start">
              <BubbleContent>
                Automated test pipeline completed in 1.4s.
              </BubbleContent>
            </Bubble>
          </div>
        </div>

        {/* 4. Muted Slate */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Muted Neutral
          </span>
          <div className="w-full">
            <Bubble variant="muted" align="start">
              <BubbleContent>
                PR #142 is approved and ready to merge.
              </BubbleContent>
            </Bubble>
          </div>
        </div>

        {/* 5. Minimalist Outline */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Minimalist Outline
          </span>
          <div className="w-full">
            <Bubble variant="outline" align="start">
              <BubbleContent>
                View live deployment on preview server.
              </BubbleContent>
            </Bubble>
          </div>
        </div>

        {/* 6. Destructive / Error */}
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Destructive / Warning
          </span>
          <div className="w-full">
            <Bubble variant="destructive" align="start">
              <BubbleContent>
                Build check failed: Environment variable missing.
              </BubbleContent>
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 2. Conversation Flow & Grouping Card (Column 2 Top)
 * -----------------------------------------------------------------------------------------------*/
export function BubbleConversationFlowCard() {
  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#111827]">
          Conversation Flow &amp; Grouping
        </h3>
        <span className="text-[11px] font-mono text-[#15803D] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
          Active Chat
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
        {/* Outgoing Message */}
        <Bubble
          variant="default"
          align="end"
          name="You"
          timestamp="10:24 AM"
          avatar={
            <div className="w-7 h-7 rounded-full bg-[#5145FF] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <User size={13} />
            </div>
          }
        >
          Check our FastAPI feedback payload schema.
        </Bubble>

        {/* Incoming Assistant */}
        <Bubble
          variant="secondary"
          align="start"
          name="Mintforge AI"
          timestamp="10:24 AM"
          avatar={
            <div className="w-7 h-7 rounded-full bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF] flex items-center justify-center font-bold text-xs shadow-xs">
              <Bot size={13} />
            </div>
          }
        >
          Verified against <code>SubmitTeamFeedbackRequest</code>. All 5 keys pass.
        </Bubble>

        {/* Grouped Consecutive Follow-up */}
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-[#64748B] mb-1.5 flex items-center gap-1.5 pl-9">
            <span>Grouped Consecutive Messages</span>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              <Bot size={13} />
            </div>
            <BubbleGroup align="start">
              <Bubble variant="secondary" align="start">
                <BubbleContent>Generated contract diff report.</BubbleContent>
              </Bubble>
              <Bubble variant="secondary" align="start">
                <BubbleContent>Synchronized automatically with GitHub PR #41.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 3. Reactions & Action Controls Card (Column 2 Middle)
 * -----------------------------------------------------------------------------------------------*/
export function BubbleReactionsActionsCard() {
  const [reactionCounts, setReactionCounts] = React.useState({
    thumbs: 3,
    heart: 2,
    rocket: 4,
  });

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#111827]">
          Reactions &amp; Actions
        </h3>
        <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
          Interactive
        </span>
      </div>

      <div className="space-y-4">
        {/* Bubble with Floating Reaction Pills */}
        <div className="relative pt-1 pb-3">
          <span className="text-xs font-semibold text-[#64748B] block mb-1.5">
            Floating Reaction Pill (Clickable)
          </span>
          <div className="relative w-fit">
            <Bubble variant="muted" align="start">
              <BubbleContent>
                The frontend test suite completed with 100% test coverage!
              </BubbleContent>
            </Bubble>

            <BubbleReactions side="bottom" align="end">
              <button
                type="button"
                onClick={() =>
                  setReactionCounts((p) => ({ ...p, thumbs: p.thumbs + 1 }))
                }
                className="hover:scale-110 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer pr-1"
                aria-label="React thumbs up"
              >
                <span>👍</span>
                <span className="font-mono text-[10px] text-[#475569]">{reactionCounts.thumbs}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setReactionCounts((p) => ({ ...p, heart: p.heart + 1 }))
                }
                className="hover:scale-110 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer pr-1"
                aria-label="React heart"
              >
                <span>❤️</span>
                <span className="font-mono text-[10px] text-[#475569]">{reactionCounts.heart}</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setReactionCounts((p) => ({ ...p, rocket: p.rocket + 1 }))
                }
                className="hover:scale-110 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
                aria-label="React rocket"
              >
                <span>🚀</span>
                <span className="font-mono text-[10px] text-[#475569]">{reactionCounts.rocket}</span>
              </button>
            </BubbleReactions>
          </div>
        </div>

        {/* Bubble with Action Bar */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-[#64748B] block mb-1.5">
            Action Controls &amp; Disclosures
          </span>
          <div className="w-fit max-w-full">
            <Bubble variant="secondary" align="start">
              <BubbleContent>
                <BubbleCollapsible defaultExpanded={false}>
                  Antigravity agent checked 14 component test suites, resolved all TypeScript lint definitions, and built the production bundle in 5.8s with zero warnings across 37 routes.
                </BubbleCollapsible>
              </BubbleContent>
            </Bubble>

            <BubbleActions align="start" className="mt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] transition"
              >
                {copied ? <Check size={12} className="text-[#15803D]" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] transition"
              >
                <RotateCw size={12} />
                <span>Retry</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] transition"
              >
                <Share2 size={12} />
                <span>Share</span>
              </button>
            </BubbleActions>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 4. AI Reasoning Drawer Card (Column 2 Bottom)
 * -----------------------------------------------------------------------------------------------*/
export function BubbleThinkingCard() {
  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#111827]">
          AI Reasoning Drawer
        </h3>
        <span className="text-[11px] font-mono text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#FDE68A]">
          Signature Feature
        </span>
      </div>

      <div className="w-full">
        <BubbleThinking duration="1.2s" defaultOpen={true} title="Thinking Process">
{`✓ Analyzed input JSON against OpenAPI 3.1 specification
✓ Validated 5/5 payload keys with FastAPI models
✓ Verified zero contract drift between client and server`}
        </BubbleThinking>

        <Bubble variant="secondary" align="start">
          <BubbleContent>
            Backend integration contract confirmed. You are ready to deploy to production.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  );
}
