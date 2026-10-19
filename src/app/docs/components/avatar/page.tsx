"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import "@/styles/alert-dialog-showcase.css";
import "@/styles/attachment-showcase.css";
import "@/styles/avatar-showcase.css";

import { AvatarHero } from "@/components/docs/avatar-showcase/avatar-hero";
import {
  BasicSizesCard,
  StatusBadgesCard,
  AvatarGroupsCard,
  AvatarClipsCard,
} from "@/components/docs/avatar-showcase/avatar-cards";
import {
  AvatarPlayground,
  PlaygroundState,
} from "@/components/docs/avatar-showcase/avatar-playground";
import { AvatarBigCodeSection } from "@/components/docs/avatar-showcase/avatar-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen, ShieldCheck } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function AvatarDocPage() {
  const [playgroundState, setPlaygroundState] = React.useState<PlaygroundState>({
    size: "lg",
    shape: "circle",
    status: "online",
    badge: "none",
    fallbackActive: false,
  });

  const avatarProps: PropItem[] = [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
      defaultValue: '"md"',
      description: "Controls avatar dimensions, fallback typography scale, and indicator badge offsets.",
    },
    {
      name: "shape",
      type: '"circle" | "rounded" | "square" | "squircle"',
      defaultValue: '"circle"',
      description: "Mask shape applied to container, image, and fallback initials.",
    },
    {
      name: "ringColor",
      type: "string",
      defaultValue: "undefined",
      description: "Tailwind ring color class applied for team group borders or highlights.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Custom CSS classes applied to root container.",
    },
  ];

  const avatarImageProps: PropItem[] = [
    {
      name: "src",
      type: "string",
      defaultValue: "undefined",
      description: "Image source URL. Automatically hides on error or broken URL.",
    },
    {
      name: "alt",
      type: "string",
      defaultValue: '"Avatar"',
      description: "Accessible text description for assistive technologies.",
    },
    {
      name: "fallbackSrc",
      type: "string",
      defaultValue: "undefined",
      description: "Secondary image URL to load if primary src fails.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Custom CSS classes applied to the image element.",
    },
  ];

  const avatarFallbackProps: PropItem[] = [
    {
      name: "initials",
      type: "string",
      defaultValue: "undefined",
      description: "User initials (up to 2 characters) rendered in soft lavender surface.",
    },
    {
      name: "delayMs",
      type: "number",
      defaultValue: "0",
      description: "Delay in milliseconds before rendering fallback to prevent image flash.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Custom fallback icon or element when initials are not provided.",
    },
  ];

  const avatarBadgeProps: PropItem[] = [
    {
      name: "status",
      type: '"online" | "away" | "busy" | "offline"',
      defaultValue: '"online"',
      description: "Color dot indicating presence state (emerald, amber, red, or slate).",
    },
    {
      name: "position",
      type: '"bottom-right" | "top-right" | "bottom-left" | "top-left"',
      defaultValue: '"bottom-right"',
      description: "Anchor position along avatar perimeter.",
    },
    {
      name: "variant",
      type: '"dot" | "icon" | "count"',
      defaultValue: '"dot"',
      description: "Badge display mode: presence dot, custom icon, or numeric count.",
    },
    {
      name: "count",
      type: "number | string",
      defaultValue: "undefined",
      description: "Unread count rendered in high-contrast red pill.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Custom icon element (e.g. checkmark or alert indicator).",
    },
  ];

  const avatarGroupProps: PropItem[] = [
    {
      name: "max",
      type: "number",
      defaultValue: "undefined",
      description: "Maximum avatars displayed before truncating with +N counter.",
    },
    {
      name: "spacing",
      type: '"tight" | "normal" | "relaxed"',
      defaultValue: '"tight"',
      description: "Negative overlap margin between adjacent member avatars.",
    },
    {
      name: "size",
      type: "AvatarSize",
      defaultValue: '"md"',
      description: "Size applied to the overflow counter circle.",
    },
    {
      name: "ringClass",
      type: "string",
      defaultValue: '"ring-2 ring-white"',
      description: "Ring outline used to visually separate overlapping avatars.",
    },
  ];

  return (
    <div className="mf-avatar-doc-scope">
      {/* 1. Hero Section */}
      <AvatarHero />

      {/* 2. Visual Showcase Grid (2x2 Cards + Interactive Playground) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 2x2 Showcase Cards */}
        <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicSizesCard />
          <StatusBadgesCard />
          <AvatarGroupsCard />
          <AvatarClipsCard />
        </div>

        {/* Right Column: Interactive Playground */}
        <div className="lg:col-span-5 xl:col-span-4">
          <AvatarPlayground
            state={playgroundState}
            onChange={setPlaygroundState}
          />
        </div>
      </div>

      {/* 3. Dedicated Code Preview & Implementation Section (Separated from Playground) */}
      <AvatarBigCodeSection playgroundState={playgroundState} />

      {/* 4. API Reference & Props Specifications */}
      <section className="mt-14 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <BookOpen size={22} className="text-[#5145FF]" />
            <span>API Reference</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Complete props documentation and default values for all Avatar compound primitives.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;Avatar /&gt;</span>
            </h3>
            <ComponentPropsTable props={avatarProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;AvatarImage /&gt;</span>
            </h3>
            <ComponentPropsTable props={avatarImageProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;AvatarFallback /&gt;</span>
            </h3>
            <ComponentPropsTable props={avatarFallbackProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;AvatarBadge /&gt;</span>
            </h3>
            <ComponentPropsTable props={avatarBadgeProps} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
              <span>&lt;AvatarGroup /&gt;</span>
            </h3>
            <ComponentPropsTable props={avatarGroupProps} />
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
            Compliant with W3C WAI-ARIA authoring practices for visual identity representations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Semantic Image Role
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              The root container declares <code>role=&quot;img&quot;</code> and requires descriptive alt text to ensure screen readers convey user identity accurately.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Presence Announcements
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              All status badges include dedicated <code>aria-label</code> tags (e.g. <code>Status: Online</code>) so presence changes are broadcast to assistive tech.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Zero-Flash Failover
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Image load errors fail over immediately to initials fallback without layout shift, broken image placeholders, or visual jumping.
            </p>
          </div>
        </div>
      </section>

      {/* Pagination Footer */}
      <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
        <ComponentPagination currentHref="/docs/components/avatar" />
      </div>
    </div>
  );
}
