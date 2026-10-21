"use client";

import * as React from "react";
import "@/styles/card-showcase.css";

import { CardHero } from "@/components/docs/card-showcase/card-hero";
import {
  CardPlayground,
  CardPlaygroundState,
  defaultCardPlaygroundState,
} from "@/components/docs/card-showcase/card-playground";
import {
  BasicCardExample,
  CardWithHeaderActionExample,
  CompactCardExample,
  CardWithFooterActionsExample,
  CardWithMediaExample,
  StatisticsCardExample,
  CardWithFormExample,
  InteractiveCardExample,
  CardWithBadgesAndStatusExample,
  CardContentSpacingExample,
} from "@/components/docs/card-showcase/card-examples";
import { CardCodeSection } from "@/components/docs/card-showcase/card-code-section";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { BookOpen } from "lucide-react";
import { PropItem } from "@/types/docs";

export default function CardDocPage() {
  const [playgroundState, setPlaygroundState] =
    React.useState<CardPlaygroundState>(defaultCardPlaygroundState);

  const cardProps: PropItem[] = [
    {
      name: "size",
      type: '"default" | "sm"',
      defaultValue: '"default"',
      description:
        "Controls internal container padding and typography scale. 'sm' reduces padding to 16px (p-4).",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes for custom width, background, or outer borders.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Card composition slots (CardHeader, CardContent, CardFooter, or custom media).",
    },
  ];

  const cardHeaderProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description:
        "Header container. Employs auto-rows grid to seamlessly align CardTitle, CardDescription, and CardAction.",
    },
  ];

  const cardActionProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description:
        "Top-right action slot positioned in the header without colliding with headings on mobile or desktop.",
    },
  ];

  const cardContentProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Main content body container with p-6 pt-0 spacing.",
    },
  ];

  const cardFooterProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Bottom action bar or metadata container with flex alignment.",
    },
  ];

  return (
    <div className="mf-card-doc-scope">
      {/* 1. Hero Section */}
      <CardHero />

      {/* 2. Interactive Playground */}
      <CardPlayground
        state={playgroundState}
        onChange={setPlaygroundState}
      />

      {/* 3. Practical Composition Examples (10 Required Sections) */}
      <div className="space-y-6 mb-14">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Practical Composition Examples
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Real-world layouts demonstrating header actions, density options, media banners, metrics, forms, and clickable cards.
          </p>
        </div>

        {/* 2-Column Responsive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BasicCardExample />
          <CardWithHeaderActionExample />
          <CompactCardExample />
          <CardWithFooterActionsExample />
          <CardWithMediaExample />
          <StatisticsCardExample />
          <CardWithFormExample />
          <InteractiveCardExample />
          <CardWithBadgesAndStatusExample />
          <CardContentSpacingExample />
        </div>
      </div>

      {/* 4. Code & CLI Integration Section */}
      <CardCodeSection playgroundState={playgroundState} />

      {/* 5. Component API & Props Specification */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
          <BookOpen size={18} className="text-[#5145FF]" />
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Component API &amp; Props
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827]">Card (Root Container)</h3>
          <ComponentPropsTable props={cardProps} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827]">CardHeader</h3>
          <ComponentPropsTable props={cardHeaderProps} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827]">CardAction</h3>
          <ComponentPropsTable props={cardActionProps} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827]">CardContent</h3>
          <ComponentPropsTable props={cardContentProps} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827]">CardFooter</h3>
          <ComponentPropsTable props={cardFooterProps} />
        </div>
      </div>

      {/* 6. Documentation Pagination */}
      <ComponentPagination currentHref="/docs/components/card" />
    </div>
  );
}
