"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accessibility,
  Palette,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export function BubbleHero() {
  return (
    <div className="space-y-4 mb-9">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium"
      >
        <Link
          href="/docs"
          className="hover:text-[#111827] transition-colors"
        >
          Components
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#64748B]">Data Display</span>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#111827] font-semibold">Bubble</span>
      </nav>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
        Bubble
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
        Displays conversational content in a message bubble. Supports variants,
        alignment, grouping, reactions, action buttons, and collapsible content.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <div className="mf-feature-pill">
          <Accessibility size={15} className="text-[#5145FF]" />
          <span>Accessible by Default</span>
        </div>
        <div className="mf-feature-pill">
          <Palette size={15} className="text-[#5145FF]" />
          <span>7 Visual Variants</span>
        </div>
        <div className="mf-feature-pill">
          <MessageSquare size={15} className="text-[#5145FF]" />
          <span>Reactions &amp; Grouping</span>
        </div>
        <div className="mf-feature-pill">
          <Sparkles size={15} className="text-[#5145FF]" />
          <span>AI-Native Reasoning</span>
        </div>
      </div>
    </div>
  );
}
