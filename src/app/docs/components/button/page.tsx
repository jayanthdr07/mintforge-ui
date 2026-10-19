"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import "@/styles/alert-dialog-showcase.css";
import "@/styles/attachment-showcase.css";
import "@/styles/avatar-showcase.css";
import "@/styles/badge-showcase.css";
import "@/styles/bubble-showcase.css";
import "@/styles/button-showcase.css";

import { ButtonHero } from "@/components/docs/button-showcase/button-hero";
import {
  VariantComparisonCard,
  SizeComparisonCard,
  IconButtonsCard,
  InteractiveStatesCard,
  ButtonPatternsCard,
} from "@/components/docs/button-showcase/button-cards";
import {
  ButtonPlayground,
  ButtonPlaygroundState,
  defaultButtonPlaygroundState,
} from "@/components/docs/button-showcase/button-playground";
import { ButtonBigCodeSection } from "@/components/docs/button-showcase/button-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function ButtonDocPage() {
  const [playgroundState, setPlaygroundState] =
    React.useState<ButtonPlaygroundState>(defaultButtonPlaygroundState);

  const buttonProps: PropItem[] = [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
      defaultValue: '"default"',
      description:
        "Visual style intent determining color, border, and elevation.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon" | "md"',
      defaultValue: '"default"',
      description:
        "Controls height, padding, and typography scale ('md' supported as alias for 'default').",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description:
        "Renders visual styles onto a custom child element (e.g. Next.js <Link>) without nesting buttons.",
    },
    {
      name: "isLoading",
      type: "boolean",
      defaultValue: "false",
      description:
        "Replaces leading icon with an animated spinner, disables pointer events, and sets aria-busy='true'.",
    },
    {
      name: "leftIcon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description:
        "Optional icon element rendered immediately before the button label.",
    },
    {
      name: "rightIcon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description:
        "Optional icon element rendered immediately after the button label.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Disables button interactions and reduces visual opacity to 50%.",
    },
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      defaultValue: '"button"',
      description:
        "Native HTML button type. Defaults to 'button' to prevent accidental form submissions.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional Tailwind CSS classes merged into the button element.",
    },
  ];

  return (
    <div className="mf-button-doc-scope">
      {/* 1. Hero Section */}
      <ButtonHero />

      {/* 2. Visual Showcase Grid (3 Columns: lg:col-span-4 each) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1 (Left): Variants & Sizes */}
        <div className="lg:col-span-4 space-y-6">
          <VariantComparisonCard />
          <SizeComparisonCard />
        </div>

        {/* Column 2 (Middle): Icon Buttons, Interactive States, Patterns */}
        <div className="lg:col-span-4 space-y-6">
          <IconButtonsCard />
          <InteractiveStatesCard />
          <ButtonPatternsCard />
        </div>

        {/* Column 3 (Right): Interactive Playground with Live Code & Modern Toggles */}
        <div className="lg:col-span-4">
          <ButtonPlayground
            state={playgroundState}
            onChange={setPlaygroundState}
          />
        </div>
      </div>

      {/* 3. Dedicated Code Preview & Implementation Section */}
      <ButtonBigCodeSection playgroundState={playgroundState} />

      {/* 4. API Reference & Props Specifications */}
      <section className="mt-14 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <BookOpen size={22} className="text-[#5145FF]" />
            <span>API Reference</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Complete props documentation and default values for the &lt;Button /&gt; component.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;Button /&gt;</span>
            </h3>
            <ComponentPropsTable props={buttonProps} />
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
            Engineered in adherence with WAI-ARIA authoring practices and WCAG 2.1 AA specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Semantic Form Safety
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Buttons default explicitly to <code>type=&quot;button&quot;</code> to prevent accidental submissions when used in forms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Visible High-Contrast Focus
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Meets WCAG 2.4.7 with an offset 2px <code>#5145FF</code> ring triggered strictly on keyboard navigation (Tab).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-xs font-bold text-[#111827]">
              Keyboard Operability &amp; ARIA
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Standard <code>Enter</code> and <code>Space</code> keys trigger click. Loading states declare <code>aria-busy</code> and icon buttons declare <code>aria-label</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
        <ComponentPagination currentHref="/docs/components/button" />
      </div>
    </div>
  );
}
