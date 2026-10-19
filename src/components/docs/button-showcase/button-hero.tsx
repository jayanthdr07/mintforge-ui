"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accessibility,
  Palette,
  Sliders,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";

export function ButtonHero() {
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
        <span className="text-[#64748B]">General</span>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#111827] font-semibold">Button</span>
      </nav>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
        Button
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
        Displays an interactive button or component with multiple visual variants,
        responsive sizing scales, built-in loading spinners, icon slots, and slot composition.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <div className="mf-feature-pill">
          <Palette size={15} className="text-[#5145FF]" />
          <span>6 Core Variants</span>
        </div>
        <div className="mf-feature-pill">
          <Sliders size={15} className="text-[#5145FF]" />
          <span>4 Sizing Scales</span>
        </div>
        <div className="mf-feature-pill">
          <Layers size={15} className="text-[#5145FF]" />
          <span>asChild Slot Pattern</span>
        </div>
        <div className="mf-feature-pill">
          <Accessibility size={15} className="text-[#5145FF]" />
          <span>WAI-ARIA &amp; Keyboard Accessible</span>
        </div>
        <div className="mf-feature-pill">
          <Sparkles size={15} className="text-[#5145FF]" />
          <span>Zero Extra Dependencies</span>
        </div>
      </div>
    </div>
  );
}
