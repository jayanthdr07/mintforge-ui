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
import "@/styles/button-group-showcase.css";

import { ButtonGroupHero } from "@/components/docs/button-group-showcase/button-group-hero";
import {
  BasicButtonGroupCard,
  OrientationCard,
  VariantCombinationsCard,
  IconButtonGroupCard,
  SeparatorsAndNestedCard,
  SplitButtonCard,
  ControlsCompositionCard,
} from "@/components/docs/button-group-showcase/button-group-cards";
import {
  ButtonGroupPlayground,
  ButtonGroupPlaygroundState,
  defaultButtonGroupPlaygroundState,
} from "@/components/docs/button-group-showcase/button-group-playground";
import { ButtonGroupCodeSection } from "@/components/docs/button-group-showcase/button-group-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function ButtonGroupDocPage() {
  const [playgroundState, setPlaygroundState] =
    React.useState<ButtonGroupPlaygroundState>(
      defaultButtonGroupPlaygroundState
    );

  const buttonGroupProps: PropItem[] = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description:
        "Controls alignment axis. Collapses borders seamlessly across rows (-space-x-px) or vertical columns (-space-y-px).",
    },
    {
      name: "attached",
      type: "boolean",
      defaultValue: "true",
      description:
        "When true, connects buttons with collapsed borders and isolated outer corner radii. When false, spaces buttons apart.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon" | "md"',
      defaultValue: '"default"',
      description:
        "Default sizing context passed down to child buttons, separators, and inline labels.",
    },
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
      defaultValue: '"outline"',
      description:
        "Visual variant context passed down to child buttons.",
    },
    {
      name: "role",
      type: '"group" | "toolbar"',
      defaultValue: '"group"',
      description:
        "WAI-ARIA semantic landmark. Defaults to 'group' for action clusters or 'toolbar' for complex editor suites.",
    },
    {
      name: "aria-label",
      type: "string",
      defaultValue: "undefined",
      description:
        "Accessible name describing the purpose of the button cluster for screen readers.",
    },
  ];

  const separatorProps: PropItem[] = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: "inherited",
      description:
        "Axis of the separator line. Defaults to the parent ButtonGroup orientation.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes for custom spacing or color tokens.",
    },
  ];

  const textProps: PropItem[] = [
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon" | "md"',
      defaultValue: "inherited",
      description:
        "Typography and height scale matching adjacent grouped buttons.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Static label copy or counter text (e.g. 'Page 1 of 5').",
    },
  ];

  return (
    <div className="mf-button-group-doc-scope">
      {/* 1. Hero Section */}
      <ButtonGroupHero />

      {/* 2. Visual Showcase Grid (3 Columns: lg:col-span-4 each) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1 (Left): Basic Groups, Orientation & Input Composition */}
        <div className="lg:col-span-4 space-y-6">
          <BasicButtonGroupCard />
          <OrientationCard />
          <ControlsCompositionCard />
        </div>

        {/* Column 2 (Middle): Icon Buttons, Variants, Separators & Split Button */}
        <div className="lg:col-span-4 space-y-6">
          <IconButtonGroupCard />
          <VariantCombinationsCard />
          <SplitButtonCard />
          <SeparatorsAndNestedCard />
        </div>

        {/* Column 3 (Right): Interactive Playground with Live Code & Modern Toggles */}
        <div className="lg:col-span-4">
          <ButtonGroupPlayground
            state={playgroundState}
            onChange={setPlaygroundState}
          />
        </div>
      </div>

      {/* 3. Dedicated Code Preview & Implementation Section */}
      <div className="mt-10">
        <ButtonGroupCodeSection playgroundState={playgroundState} />
      </div>

      {/* 4. API Reference & Props Specifications */}
      <section className="mt-14 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <BookOpen size={22} className="text-[#5145FF]" />
            <span>API Reference</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Complete props documentation and default values for ButtonGroup primitives.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;ButtonGroup /&gt;</span>
            </h3>
            <ComponentPropsTable props={buttonGroupProps} />
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;ButtonGroupSeparator /&gt;</span>
            </h3>
            <ComponentPropsTable props={separatorProps} />
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;ButtonGroupText /&gt;</span>
            </h3>
            <ComponentPropsTable props={textProps} />
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
              Semantic Landmarks &amp; Roles
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Provides <code>role=&quot;group&quot;</code> or <code>role=&quot;toolbar&quot;</code> with explicit <code>aria-label</code> tags so screen readers announce functional action clusters.
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
              Interactive buttons elevate to <code>z-20</code> on focus-visible so outline rings remain completely unobstructed by adjacent sibling buttons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Toggle &amp; Selection States
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Segmented filters and text formatting icon buttons declare <code>aria-pressed=&quot;true|false&quot;</code> to communicate active mode to assistive devices.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Pagination Footer */}
      <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
        <ComponentPagination currentHref="/docs/components/button-group" />
      </div>
    </div>
  );
}
