"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Download,
  ArrowRight,
  Plus,
  Search,
  Settings,
  Copy,
  Trash2,
  Check,
  Share2,
  Heart,
  Save,
} from "lucide-react";

/**
 * 1. Variant Comparison Card
 */
export function VariantComparisonCard() {
  const variants = [
    {
      name: "Default",
      sub: "High-priority primary call to action",
      variant: "default" as const,
      label: "Primary Action",
    },
    {
      name: "Secondary",
      sub: "Alternative or supporting actions",
      variant: "secondary" as const,
      label: "Secondary",
    },
    {
      name: "Outline",
      sub: "Bordered, lower emphasis action",
      variant: "outline" as const,
      label: "Outline",
    },
    {
      name: "Ghost",
      sub: "Minimal background for menus & toolbars",
      variant: "ghost" as const,
      label: "Ghost",
    },
    {
      name: "Destructive",
      sub: "Dangerous or irreversible action",
      variant: "destructive" as const,
      label: "Delete",
    },
    {
      name: "Link",
      sub: "Inline text button with underline",
      variant: "link" as const,
      label: "Learn more",
    },
  ];

  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#111827]">
          Variants Comparison
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF]">
          6 Core Styles
        </span>
      </div>
      <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
        Consistent contrast and visual hierarchy for clear interactive workflows.
      </p>

      <div className="space-y-2.5">
        {variants.map((v) => (
          <div
            key={v.name}
            className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors"
          >
            <div className="min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#111827] block truncate">
                {v.name}
              </span>
              <span className="text-[11px] text-[#64748B] block truncate">
                {v.sub}
              </span>
            </div>
            <Button
              variant={v.variant}
              size="sm"
              className="shrink-0"
            >
              {v.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 2. Size Comparison Card
 */
export function SizeComparisonCard() {
  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#111827]">
          Sizing Scales
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
          4 Scales
        </span>
      </div>
      <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
        Refined heights, padding, and icon sizing for responsive density.
      </p>

      <div className="space-y-2.5">
        {/* Small */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-[#111827]">Small</span>
            <span className="text-[10px] font-mono text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-slate-200">
              h-8 (32px)
            </span>
          </div>
          <Button size="sm" variant="default" leftIcon={<Sparkles size={12} />}>
            Small
          </Button>
        </div>

        {/* Default */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-[#111827]">Default</span>
            <span className="text-[10px] font-mono text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-slate-200">
              h-9 (36px)
            </span>
          </div>
          <Button size="default" variant="default" leftIcon={<Sparkles size={14} />}>
            Default
          </Button>
        </div>

        {/* Large */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-[#111827]">Large</span>
            <span className="text-[10px] font-mono text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-slate-200">
              h-10 (40px)
            </span>
          </div>
          <Button size="lg" variant="default" leftIcon={<Sparkles size={16} />}>
            Large
          </Button>
        </div>

        {/* Icon */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-[#111827]">Icon</span>
            <span className="text-[10px] font-mono text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-slate-200">
              36 × 36 px
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" aria-label="Settings configuration">
              <Settings size={15} />
            </Button>
            <Button size="icon" variant="default" aria-label="Download assets">
              <Download size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Icon Buttons & Accessible Tooltip Card
 */
export function IconButtonsCard() {
  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#111827]">
          Icon Buttons &amp; Tooltips
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF]">
          Accessories
        </span>
      </div>
      <p className="text-xs text-[#64748B] mb-3 leading-relaxed">
        Optical icon alignment with labels and accessible micro-tooltips.
      </p>

      {/* Leading & Trailing */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button size="sm" variant="default" leftIcon={<Download size={13} />}>
          Download
        </Button>
        <Button size="sm" variant="outline" rightIcon={<ArrowRight size={13} />}>
          Proceed
        </Button>
        <Button size="sm" variant="secondary" leftIcon={<Plus size={13} />}>
          Create
        </Button>
      </div>

      {/* Standalone Icon Buttons */}
      <div>
        <span className="text-[11px] font-semibold text-[#64748B] block mb-2">
          Standalone Icon Actions (Hover for Tooltips)
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="mf-tooltip-container">
            <Button size="icon" variant="outline" aria-label="Settings">
              <Settings size={15} />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Settings</div>
          </div>

          <div className="mf-tooltip-container">
            <Button size="icon" variant="outline" aria-label="Copy">
              <Copy size={15} />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Copy code</div>
          </div>

          <div className="mf-tooltip-container">
            <Button size="icon" variant="secondary" aria-label="Search">
              <Search size={15} />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Search files</div>
          </div>

          <div className="mf-tooltip-container">
            <Button size="icon" variant="ghost" aria-label="Favorite">
              <Heart size={15} className="text-rose-500" />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Favorite</div>
          </div>

          <div className="mf-tooltip-container">
            <Button size="icon" variant="outline" aria-label="Share">
              <Share2 size={15} />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Share link</div>
          </div>

          <div className="mf-tooltip-container">
            <Button size="icon" variant="destructive" aria-label="Delete">
              <Trash2 size={15} />
            </Button>
            <div className="mf-tooltip-bubble" role="tooltip">Delete permanently</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 4. Interactive States & Async Feedback Demo Card
 */
export function InteractiveStatesCard() {
  const [demoState, setDemoState] = React.useState<"idle" | "loading" | "success">("idle");

  const handleTriggerAction = () => {
    if (demoState !== "idle") return;
    setDemoState("loading");
    setTimeout(() => {
      setDemoState("success");
      setTimeout(() => {
        setDemoState("idle");
      }, 1800);
    }, 1000);
  };

  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#111827]">
          Interactive States &amp; Feedback
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
          Working States
        </span>
      </div>
      <p className="text-xs text-[#64748B] mb-3 leading-relaxed">
        Immediate visual and screen-reader safe feedback across interactions.
      </p>

      {/* State Badges Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Default</span>
          <Button size="sm" variant="default">Normal</Button>
        </div>

        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Focus Ring</span>
          <Button size="sm" variant="default" className="ring-2 ring-[#5145FF] ring-offset-2">
            Focused
          </Button>
        </div>

        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Disabled</span>
          <Button size="sm" variant="default" disabled>
            Disabled
          </Button>
        </div>

        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Loading</span>
          <Button size="sm" variant="default" isLoading>
            Saving
          </Button>
        </div>

        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Active Ghost</span>
          <Button size="sm" variant="ghost" className="bg-slate-200/80">
            Selected
          </Button>
        </div>

        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase">Blocked</span>
          <Button size="sm" variant="destructive" disabled>
            Blocked
          </Button>
        </div>
      </div>

      {/* Live Interactive Action Flow Demo */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-[#111827]">
            Live Async Action Feedback
          </span>
          <span className="text-[10px] font-mono text-[#64748B]">Click test</span>
        </div>
        <p className="text-[11px] text-[#64748B] mb-2.5 leading-relaxed">
          Click button to trigger async loading spinner followed by temporary success state.
        </p>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant={demoState === "success" ? "outline" : "default"}
            isLoading={demoState === "loading"}
            onClick={handleTriggerAction}
            className={
              demoState === "success"
                ? "!border-emerald-500 !text-emerald-600 bg-emerald-50/60"
                : ""
            }
            leftIcon={
              demoState === "success" ? (
                <Check size={14} className="text-emerald-600" />
              ) : undefined
            }
          >
            {demoState === "idle" && "Deploy Release"}
            {demoState === "loading" && "Publishing..."}
            {demoState === "success" && "Deployed!"}
          </Button>

          {demoState !== "idle" && (
            <span className="text-[11px] text-[#64748B] italic">
              {demoState === "loading" ? "Publishing package..." : "Success confirmed"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Button Combinations & Reusable Patterns Card
 */
export function ButtonPatternsCard() {
  return (
    <div className="mf-showcase-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#111827]">
          Patterns &amp; Combinations
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
          Recipes
        </span>
      </div>
      <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
        Common battle-tested pairings for forms, modals, and toolbars.
      </p>

      <div className="space-y-3">
        {/* Pattern 1: Save & Cancel */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#111827]">
            Form Save &amp; Cancel
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="ghost">Cancel</Button>
            <Button size="sm" variant="default" leftIcon={<Save size={13} />}>
              Save
            </Button>
          </div>
        </div>

        {/* Pattern 2: Confirm & Delete */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#111827]">
            Destructive Modal Pair
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="outline">Dismiss</Button>
            <Button size="sm" variant="destructive" leftIcon={<Trash2 size={13} />}>
              Delete
            </Button>
          </div>
        </div>

        {/* Pattern 3: Stepper / Continue with Arrow */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#111827]">
            Wizard Stepper
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="ghost">Back</Button>
            <Button size="sm" variant="default" rightIcon={<ArrowRight size={13} />}>
              Continue
            </Button>
          </div>
        </div>

        {/* Pattern 4: Segmented Icon Toolbar Group */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#111827]">
            Compact Toolbar
          </span>
          <div className="inline-flex rounded-lg border border-[#E5E7EB] bg-white p-1 shadow-2xs gap-1 shrink-0">
            <Button size="sm" variant="ghost" className="!h-6 !px-2 text-[11px]">
              Preview
            </Button>
            <Button size="sm" variant="secondary" className="!h-6 !px-2 text-[11px] font-semibold">
              Code
            </Button>
            <div className="w-px h-4 bg-slate-200 self-center" />
            <Button size="icon" variant="ghost" className="!h-6 !w-6" aria-label="Copy code">
              <Copy size={12} />
            </Button>
            <Button size="icon" variant="ghost" className="!h-6 !w-6" aria-label="Share">
              <Share2 size={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
