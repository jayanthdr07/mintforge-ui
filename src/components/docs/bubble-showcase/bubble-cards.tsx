"use client";

import * as React from "react";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  BubbleCollapsible,
  BubbleThinking,
} from "@/components/ui/bubble";
import { ExternalLink, Play, LifeBuoy, Check, Bot } from "lucide-react";

export function BubbleVariantsCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Visual Variants
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Seven clearly distinguishable visual surface variants with balanced contrast and refined geometry.
      </p>

      <div className="flex flex-col gap-3">
        <Bubble variant="default" align="start">
          <BubbleContent>
            <strong>Default:</strong> Vibrant primary surface for user prompts or high-emphasis messages.
          </BubbleContent>
        </Bubble>

        <Bubble variant="secondary" align="start">
          <BubbleContent>
            <strong>Secondary:</strong> Clean white elevated card with subtle border for assistant responses.
          </BubbleContent>
        </Bubble>

        <Bubble variant="muted" align="start">
          <BubbleContent>
            <strong>Muted:</strong> Subtle neutral gray surface for background chatter and contextual replies.
          </BubbleContent>
        </Bubble>

        <Bubble variant="tinted" align="start">
          <BubbleContent>
            <strong>Tinted:</strong> Signature lavender wash with indigo accents for system notifications.
          </BubbleContent>
        </Bubble>

        <Bubble variant="outline" align="start">
          <BubbleContent>
            <strong>Outline:</strong> Transparent background with crisp border for minimal layouts.
          </BubbleContent>
        </Bubble>

        <Bubble variant="ghost" align="start">
          <BubbleContent>
            <strong>Ghost:</strong> Borderless lightweight bubble with subtle hover surface.
          </BubbleContent>
        </Bubble>

        <Bubble variant="destructive" align="start">
          <BubbleContent>
            <strong>Destructive:</strong> Soft crimson wash for warnings, failed actions, or critical alerts.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  );
}

export function BubbleAlignmentCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Alignment &amp; Conversation Flow
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Configurable alignment through <code>align=&quot;start&quot;</code> (incoming) and <code>align=&quot;end&quot;</code> (outgoing).
      </p>

      <div className="flex flex-col gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
        {/* Outgoing User */}
        <Bubble variant="default" align="end">
          <BubbleContent>
            Can you check if our frontend interview submission payload matches our FastAPI backend?
          </BubbleContent>
        </Bubble>

        {/* Incoming Assistant */}
        <Bubble variant="secondary" align="start">
          <BubbleContent>
            I analyzed your form against the FastAPI <code>SubmitTeamFeedbackRequest</code> model. All 5 fields match with zero schema drift!
          </BubbleContent>
        </Bubble>

        {/* Outgoing User */}
        <Bubble variant="default" align="end">
          <BubbleContent>
            Great, push the contract report to the PR.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  );
}

export function BubbleGroupedCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Grouped Bubbles
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Consecutive messages grouped with <code>&lt;BubbleGroup&gt;</code> apply tighter vertical spacing.
      </p>

      <div className="space-y-4 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
        {/* Outgoing Group */}
        <BubbleGroup align="end">
          <Bubble variant="default" align="end">
            <BubbleContent>Hey, did the nightly build finish?</BubbleContent>
          </Bubble>
          <Bubble variant="default" align="end">
            <BubbleContent>Checking the staging server logs now.</BubbleContent>
          </Bubble>
        </BubbleGroup>

        {/* Incoming Group */}
        <BubbleGroup align="start">
          <Bubble variant="secondary" align="start">
            <BubbleContent>Yes! All 142 integration tests passed on the first run.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary" align="start">
            <BubbleContent>Artifacts uploaded to the CDN and ready for deployment.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </div>
  );
}

export function BubbleReactionsCard() {
  const [reacted, setReacted] = React.useState(false);

  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Reactions &amp; Floating Badges
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Floating emoji capsules with <code>role=&quot;img&quot;</code> and descriptive <code>aria-label</code> tags anchored to bubble edges.
      </p>

      <div className="flex flex-col gap-8 py-4 px-2">
        {/* Reaction anchored at bottom right */}
        <Bubble variant="muted" align="start">
          <BubbleContent>
            I don&apos;t need tests, I know my code works on the first compile!
          </BubbleContent>
          <BubbleReactions side="bottom" align="end">
            <span>👍</span>
            <span>😮</span>
            <span className="font-mono text-[10px] text-[#64748B] font-bold">+2</span>
          </BubbleReactions>
        </Bubble>

        {/* Reaction anchored at top left with interactive toggle */}
        <Bubble variant="default" align="end">
          <BubbleContent>
            Tests passed on the first try. All 142 of them. Looking good!
          </BubbleContent>
          <BubbleReactions side="top" align="start">
            <span>🎉</span>
            <span>👏</span>
            <button
              type="button"
              onClick={() => setReacted(!reacted)}
              className="ml-0.5 text-[11px] hover:scale-125 transition-transform cursor-pointer"
              aria-label="Add reaction"
            >
              {reacted ? "❤️" : "➕"}
            </button>
          </BubbleReactions>
        </Bubble>
      </div>
    </div>
  );
}

export function BubbleActionButtonsCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Interactive Buttons &amp; Action Prompts
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Embed action buttons, quick suggestions, and links directly inside bubble content.
      </p>

      <div className="flex flex-col gap-4">
        <Bubble variant="secondary" align="start">
          <BubbleContent>
            <p className="mb-2">Are you sure you want to run the database migration on production?</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E5E7EB]">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5145FF] text-white text-xs font-semibold hover:bg-[#4338CA] transition shadow-xs cursor-pointer"
              >
                <Play size={11} fill="currentColor" />
                <span>Yes, run migration</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-[#475569] text-xs font-medium hover:bg-slate-200 transition cursor-pointer"
              >
                <LifeBuoy size={11} />
                <span>Talk to a human</span>
              </button>
            </div>
          </BubbleContent>
        </Bubble>

        <Bubble variant="tinted" align="start">
          <BubbleContent>
            Review the updated specification in our{" "}
            <a
              href="/docs/components/bubble"
              className="font-semibold underline inline-flex items-center gap-0.5"
            >
              <span>Architecture Documentation</span>
              <ExternalLink size={11} />
            </a>.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  );
}

export function BubbleCollapsibleCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        Collapsible Content
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Long messages can be collapsed by default with an accessible &quot;Show more / Show less&quot; toggle.
      </p>

      <Bubble variant="muted" align="start">
        <BubbleContent>
          <BubbleCollapsible defaultExpanded={false}>
            The accessibility audit identified 3 focus states that were visually too subtle in dark mode.
            Specifically, the dialog backdrop, tab lists, and drawer action groups lacked high-contrast outline rings.
            We adjusted the focus ring tokens from <code>ring-1</code> to <code>ring-2 ring-offset-2</code> across all primitives.
            All 45 automated Axe core accessibility tests now report 100% compliance with zero violations!
          </BubbleCollapsible>
        </BubbleContent>
      </Bubble>
    </div>
  );
}

export function BubbleThinkingCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-2">
        AI Reasoning &amp; Chain-of-Thought
      </h3>
      <p className="text-xs text-[#64748B] mb-5">
        Built-in <code>&lt;BubbleThinking&gt;</code> drawer for reasoning models (DeepSeek R1, OpenAI o-series) with duration badges.
      </p>

      <Bubble role="assistant" seamVerified seamEndpoint="POST /v1/interviews/feedback">
        <BubbleThinking duration="1.2s" title="Contract Parity Analysis" defaultOpen={true}>
{`Scanning AST:
- Frontend field "scores" -> Backend "scores" (List[int]) -> MATCH
- Frontend field "detailed_feedback" -> Backend "detailed_feedback" (str) -> MATCH
- Zero camelCase drift detected. HTTP 200 guaranteed.`}
        </BubbleThinking>
        Your frontend form submission is fully verified and compliant with the FastAPI schema.
      </Bubble>
    </div>
  );
}
