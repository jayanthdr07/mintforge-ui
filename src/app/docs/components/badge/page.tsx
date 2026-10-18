"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import "@/styles/alert-dialog-showcase.css";
import "@/styles/attachment-showcase.css";
import "@/styles/avatar-showcase.css";
import "@/styles/badge-showcase.css";

import { BadgeHero } from "@/components/docs/badge-showcase/badge-hero";
import {
  BasicVariationsCard,
  SignatureBadgeCard,
  StatusDotBadgeCard,
  CountShapeBadgeCard,
} from "@/components/docs/badge-showcase/badge-cards";
import {
  BadgePlayground,
  BadgePlaygroundState,
} from "@/components/docs/badge-showcase/badge-playground";
import { BadgeBigCodeSection } from "@/components/docs/badge-showcase/badge-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function BadgeDocPage() {
  const [playgroundState, setPlaygroundState] = React.useState<BadgePlaygroundState>({
    appearance: "soft",
    variant: "success",
    size: "md",
    shape: "pill",
    label: "Active",
    hasLeadingIcon: true,
    leadingIconType: "dot",
    hasTrailingIcon: false,
    trailingIconType: "star",
  });

  const badgeProps: PropItem[] = [
    {
      name: "appearance",
      type: '"solid" | "soft" | "outline" | "ghost"',
      defaultValue: '"soft"',
      description: "Visual container treatment (solid fill, pastel soft wash, outline border, or ghost).",
    },
    {
      name: "variant",
      type: '"default" | "brand" | "primary" | "info" | "success" | "warning" | "destructive" | "neutral" | "lavender"',
      defaultValue: '"default"',
      description: "Semantic color intent determining background, border, and text hue.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Internal padding and typography scale.",
    },
    {
      name: "shape",
      type: '"pill" | "rounded" | "square"',
      defaultValue: '"pill"',
      description: "Corner radius profile (full pill, rounded-lg, or square).",
    },
    {
      name: "leadingIcon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Element rendered before badge text (e.g. <BadgeDot /> or icon).",
    },
    {
      name: "trailingIcon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Element rendered after badge text (e.g. <BadgeCount /> or icon).",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes applied to root container.",
    },
  ];

  const badgeDotProps: PropItem[] = [
    {
      name: "status",
      type: '"online" | "active" | "offline" | "failed" | "pending" | "review"',
      defaultValue: '"active"',
      description: "Color dot state (emerald green, slate gray, crimson red, or amber).",
    },
    {
      name: "ping",
      type: "boolean",
      defaultValue: "false",
      description: "Renders an animated pulse ring around the indicator dot.",
    },
  ];

  const badgeCountProps: PropItem[] = [
    {
      name: "count",
      type: "number | string",
      defaultValue: "required",
      description: "Numeric or alphanumeric count value displayed in circular micro-chip.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Custom CSS classes for background or typography overrides.",
    },
  ];

  return (
    <div className="mf-badge-doc-scope">
      {/* 1. Hero Section */}
      <BadgeHero />

      {/* 2. Visual Showcase Grid (3 Columns Matching Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Column 1 (Left): Basic & Variations */}
        <div className="lg:col-span-4">
          <BasicVariationsCard />
        </div>

        {/* Column 2 (Middle): Stacked Signature, Status & Dot, Count & Shape */}
        <div className="lg:col-span-4 space-y-6">
          <SignatureBadgeCard />
          <StatusDotBadgeCard />
          <CountShapeBadgeCard />
        </div>

        {/* Column 3 (Right): Interactive Playground */}
        <div className="lg:col-span-4">
          <BadgePlayground
            state={playgroundState}
            onChange={setPlaygroundState}
          />
        </div>
      </div>

      {/* 3. Dedicated Code Preview & Implementation Section (Separated from Playground) */}
      <BadgeBigCodeSection playgroundState={playgroundState} />

      {/* 4. API Reference & Props Specifications */}
      <section className="mt-14 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <BookOpen size={22} className="text-[#5145FF]" />
            <span>API Reference</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Complete props documentation and default values for all Badge primitives and subcomponents.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;Badge /&gt;</span>
            </h3>
            <ComponentPropsTable props={badgeProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BadgeDot /&gt;</span>
            </h3>
            <ComponentPropsTable props={badgeDotProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;BadgeCount /&gt;</span>
            </h3>
            <ComponentPropsTable props={badgeCountProps} />
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
            Built to follow WCAG 2.1 AA contrast requirements and screen-reader status semantics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Semantic Status Role
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every badge declares <code>role=&quot;status&quot;</code>, ensuring assistive technology identifies dynamic status updates without interrupting navigation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              High Contrast Ratios
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              All variant palettes (Solid, Soft, Outline) exceed the 4.5:1 minimum contrast requirement between label typography and background surfaces.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Accessible Counts
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Count indicators render with distinct tabular monospace digits to prevent layout jumping and support screen readers cleanly.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
        <ComponentPagination currentHref="/docs/components/badge" />
      </div>
    </div>
  );
}
