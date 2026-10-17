"use client";

import * as React from "react";
import { Sparkles, Sliders, Heart, ChevronDown } from "lucide-react";

export function AccordionFloatingCards() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:mx-0">
      {/* Background Soft Glow Aura */}
      <div
        className="absolute -top-12 -right-8 w-72 h-72 rounded-full bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] opacity-70 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Sparkle Burst near top right */}
      <div className="absolute -top-3.5 right-6 pointer-events-none text-[#5145FF]" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="19" y1="5" x2="16" y2="8" />
          <line x1="22" y1="12" x2="18" y2="12" />
        </svg>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {/* Card 1: Powerful & Flexible (Elevated / Expanded Feel) */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_12px_30px_-6px_rgba(81,69,255,0.09),0_4px_10px_rgba(0,0,0,0.03)] flex items-center justify-between transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5145FF] to-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(81,69,255,0.25)]">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#111827]">Powerful &amp; Flexible</div>
              <div className="text-xs text-[#6B7280]">A next-generation accordion component.</div>
            </div>
          </div>
          <ChevronDown size={18} className="text-[#9CA3AF]" />
        </div>

        {/* Card 2: Customizable Design */}
        <div className="bg-white/95 border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.04)] flex items-center justify-between transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
              <Sliders size={18} />
            </div>
            <div className="font-bold text-sm text-[#111827]">Customizable Design</div>
          </div>
          <ChevronDown size={18} className="text-[#9CA3AF]" />
        </div>

        {/* Card 3: Built for Developers */}
        <div className="bg-white/90 border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_6px_16px_-4px_rgba(0,0,0,0.03)] flex items-center justify-between transition-transform duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
              <Heart size={18} />
            </div>
            <div className="font-bold text-sm text-[#111827]">Built for Developers</div>
          </div>
          <ChevronDown size={18} className="text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
}
