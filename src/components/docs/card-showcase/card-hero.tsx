"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accessibility,
  Sliders,
  ChevronRight,
  Sparkles,
  Layers,
  LayoutTemplate,
} from "lucide-react";

export function CardHero() {
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
        <span className="text-[#64748B]">Layout</span>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#111827] font-semibold">Card</span>
      </nav>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
        Card
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
        A flexible, composable container for grouping related content, media, actions,
        and key metrics with clean spacing, balanced typography, and subtle borders.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <div className="mf-feature-pill">
          <Layers size={15} className="text-[#5145FF]" />
          <span>Composable Architecture</span>
        </div>
        <div className="mf-feature-pill">
          <Sliders size={15} className="text-[#5145FF]" />
          <span>Default &amp; Compact Sizes</span>
        </div>
        <div className="mf-feature-pill">
          <Sparkles size={15} className="text-[#5145FF]" />
          <span>Header Action Slot</span>
        </div>
        <div className="mf-feature-pill">
          <Accessibility size={15} className="text-[#5145FF]" />
          <span>Semantic HTML &amp; WAI-ARIA</span>
        </div>
        <div className="mf-feature-pill">
          <LayoutTemplate size={15} className="text-[#5145FF]" />
          <span>Zero Extra Dependencies</span>
        </div>
      </div>
    </div>
  );
}
