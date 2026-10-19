"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import "@/styles/alert-dialog-showcase.css";
import "@/styles/attachment-showcase.css";
import "@/styles/avatar-showcase.css";
import "@/styles/badge-showcase.css";
import "@/styles/bubble-showcase.css";

import { BubbleHero } from "@/components/docs/bubble-showcase/bubble-hero";
import {
  BubbleBasicVariationsCard,
  BubbleConversationFlowCard,
  BubbleReactionsActionsCard,
  BubbleThinkingCard,
} from "@/components/docs/bubble-showcase/bubble-cards";
import {
  BubblePlayground,
  BubblePlaygroundState,
} from "@/components/docs/bubble-showcase/bubble-playground";
import { BubbleBigCodeSection } from "@/components/docs/bubble-showcase/bubble-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function BubbleDocPage() {
  const [playgroundState, setPlaygroundState] = React.useState<BubblePlaygroundState>({
    variant: "default",
    align: "end",
    content: "Can you analyze our interview submission payload against the FastAPI backend?",
    reactionType: "none",
    actionButton: "none",
    isCollapsible: false,
  });

  const bubbleProps: PropItem[] = [
    {
      name: "variant",
      type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"',
      defaultValue: '"default"',
      description: "Visual surface style determining background color, border, and text contrast.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Horizontal alignment. 'start' for incoming messages, 'end' for outgoing user prompts.",
    },
    {
      name: "name",
      type: "string",
      defaultValue: "undefined",
      description: "Sender label displayed in conversational bubble header.",
    },
    {
      name: "timestamp",
      type: "string",
      defaultValue: "undefined",
      description: "Timestamp string (e.g. '10:24 AM') rendered alongside sender name.",
    },
    {
      name: "avatar",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Avatar element rendered alongside the message bubble.",
    },
    {
      name: "role",
      type: '"user" | "assistant" | "system"',
      defaultValue: "undefined",
      description: "Optional conversational persona that automatically deduces alignment and avatar wrapper.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Custom CSS classes applied to root container.",
    },
  ];

  const bubbleContentProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes applied to the rounded message surface.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Message body text, interactive links, action buttons, or collapsible blocks.",
    },
  ];

  const bubbleGroupProps: PropItem[] = [
    {
      name: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Alignment applied to the grouped stack of consecutive messages.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Multiple Bubble components grouped with tight vertical gap.",
    },
  ];

  const bubbleReactionsProps: PropItem[] = [
    {
      name: "side",
      type: '"top" | "bottom"',
      defaultValue: '"bottom"',
      description: "Vertical anchor edge relative to the message bubble.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Horizontal anchor alignment along the bubble edge.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Emoji elements or reaction buttons rendered inside the floating pill.",
    },
  ];

  const bubbleActionsProps: PropItem[] = [
    {
      name: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Horizontal alignment matching the parent bubble.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Interactive button controls (Copy, Retry, Share).",
    },
  ];

  const bubbleCollapsibleProps: PropItem[] = [
    {
      name: "defaultExpanded",
      type: "boolean",
      defaultValue: "false",
      description: "Initial expanded state of the multi-line message content.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Long content that can be collapsed with 'Show more / Show less' toggle.",
    },
  ];

  const bubbleThinkingProps: PropItem[] = [
    {
      name: "title",
      type: "string",
      defaultValue: '"Thinking Process"',
      description: "Header label for the collapsible chain-of-thought drawer.",
    },
    {
      name: "duration",
      type: "string",
      defaultValue: "undefined",
      description: "Execution timer badge (e.g. '1.2s') displayed alongside title.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Whether reasoning steps are expanded by default.",
    },
  ];

  return (
    <div className="mf-bubble-doc-scope">
      {/* 1. Hero Section */}
      <BubbleHero />

      {/* 2. Visual Showcase Grid (3 Columns Matching Badge / Avatar System) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Column 1 (Left): Basic Variations & Surfaces */}
        <div className="lg:col-span-4">
          <BubbleBasicVariationsCard />
        </div>

        {/* Column 2 (Middle): Stacked Flow, Reactions & Reasoning */}
        <div className="lg:col-span-4 space-y-6">
          <BubbleConversationFlowCard />
          <BubbleReactionsActionsCard />
          <BubbleThinkingCard />
        </div>

        {/* Column 3 (Right): Interactive Playground */}
        <div className="lg:col-span-4">
          <BubblePlayground
            state={playgroundState}
            onChange={setPlaygroundState}
          />
        </div>
      </div>

      {/* 3. Dedicated Code Preview & Implementation Section (Separated from Playground) */}
      <BubbleBigCodeSection playgroundState={playgroundState} />

      {/* 4. API Reference & Props Specifications */}
      <section className="mt-14 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <BookOpen size={22} className="text-[#5145FF]" />
            <span>API Reference</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Complete props documentation and default values for all Bubble compound primitives.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;Bubble /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleContent /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleContentProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleGroup /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleGroupProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleReactions /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleReactionsProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleActions /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleActionsProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleCollapsible /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleCollapsibleProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BubbleThinking /&gt;</span>
            </h3>
            <ComponentPropsTable props={bubbleThinkingProps} />
          </div>
        </div>
      </section>

      {/* 5. Accessibility & Design System Principles */}
      <section className="mt-14 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <ShieldCheck size={22} className="text-[#15803D]" />
            <span>Accessibility &amp; Standards</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Compliant with W3C WAI-ARIA conversational patterns and assistive technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Labeling Reactions
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Reaction capsules use <code>role=&quot;img&quot;</code> with descriptive labels so screen readers announce summary text instead of raw unformatted emoji glyphs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Visible Focus States
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              All links and interactive action buttons inside bubbles feature explicit <code>focus-visible:ring-2</code> indicators to support keyboard navigation cleanly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Accessible Disclosures
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Collapsible content and thinking drawers declare <code>aria-expanded</code> states, notifying screen readers when content is revealed or hidden.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
        <ComponentPagination currentHref="/docs/components/bubble" />
      </div>
    </div>
  );
}
