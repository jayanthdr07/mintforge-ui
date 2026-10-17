"use client";

import * as React from "react";
import { Zap, Layers, UserCheck, Code2, Sparkles } from "lucide-react";

export function AccordionHero() {
  return (
    <section className="relative pt-4 pb-6 text-left">
      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/3 w-[520px] h-[300px] bg-gradient-to-br from-[#EEF2FF] to-transparent rounded-full opacity-60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#5145FF] border border-[#E0E7FF] mb-4 shadow-xs">
          <Sparkles size={13} className="text-[#5145FF]" />
          <span>Interactive Component</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.12] mb-3.5">
          Accordion <span className="text-[#5145FF]">Component</span>
        </h1>

        <p className="text-[15.5px] sm:text-base text-[#4B5563] leading-relaxed mb-6 max-w-2xl">
          Organize content into clean, accessible disclosure panels with smooth CSS grid animations,
          multiple visual aesthetics, and zero runtime bloat.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
            <Zap size={13} className="text-amber-500 fill-amber-500" />
            <span>Smooth Animations</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
            <Layers size={13} className="text-[#5145FF]" />
            <span>Multiple Variants</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
            <UserCheck size={13} className="text-[#5145FF]" />
            <span>Fully Accessible</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
            <Code2 size={13} className="text-[#5145FF]" />
            <span>Developer Friendly</span>
          </span>
        </div>
      </div>
    </section>
  );
}
