"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import { AccordionHero } from "@/components/docs/accordion-showcase/accordion-hero";
import {
  AccordionVariantNav,
  VariantNavType,
} from "@/components/docs/accordion-showcase/accordion-variant-nav";
import {
  AccordionPlayground,
  PlaygroundConfig,
  DEFAULT_CONFIG,
} from "@/components/docs/accordion-showcase/accordion-playground";
import { AccordionBigCodeSection } from "@/components/docs/accordion-showcase/accordion-code-section";
import { AccordionMorph } from "@/components/ui/accordion/accordion-morph";
import { AccordionMinimal } from "@/components/ui/accordion/accordion-minimal";
import { AccordionOutlined } from "@/components/ui/accordion/accordion-outlined";
import { AccordionNested } from "@/components/ui/accordion/accordion-nested";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import {
  Sparkles,
  LayoutGrid,
  CheckSquare,
  GitFork,
  BookOpen,
} from "lucide-react";

export default function AccordionDocPage() {
  const [activeVariant, setActiveVariant] = React.useState<VariantNavType>("morph");
  const [playgroundConfig, setPlaygroundConfig] = React.useState<PlaygroundConfig>(DEFAULT_CONFIG);

  const handleSelectVariant = (variant: VariantNavType) => {
    setActiveVariant(variant);
    if (variant === "playground") {
      const el = document.getElementById("accordion-playground-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      setPlaygroundConfig((prev) => ({ ...prev, variant }));
      const el = document.getElementById(`accordion-${variant}-card`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handlePlaygroundConfigChange = (newConfig: PlaygroundConfig) => {
    setPlaygroundConfig(newConfig);
    if (newConfig.variant !== activeVariant) {
      setActiveVariant(newConfig.variant);
    }
  };

  const handleScrollToDocs = () => {
    const el = document.getElementById("documentation-details");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const accordionProps = [
    {
      name: "type",
      type: '"single" | "multiple"',
      defaultValue: '"single"',
      description: "Determines whether one or multiple panels can be expanded simultaneously.",
    },
    {
      name: "variant",
      type: '"morph" | "minimal" | "outlined" | "nested" | "bordered" | "cards"',
      defaultValue: '"morph"',
      description: "Visual design style. 'morph' renders Mintforge's signature blue-purple card style.",
    },
    {
      name: "animation",
      type: '"smooth" | "spring" | "none"',
      defaultValue: '"smooth"',
      description: "Animation timing curve. 'spring' uses a snappy cubic-bezier transition.",
    },
    {
      name: "indicator",
      type: '"chevron" | "plus" | "morph" | "none"',
      defaultValue: '"chevron"',
      description: "Trailing icon transition style. 'morph' dynamically transitions from plus to minus.",
    },
    {
      name: "collapsible",
      type: "boolean",
      defaultValue: "true",
      description: "In single mode, allows collapsing an already-open item by clicking it again.",
    },
    {
      name: "defaultValue",
      type: "string | string[]",
      defaultValue: "undefined",
      description: "Initial expanded item(s) in uncontrolled mode.",
    },
    {
      name: "value",
      type: "string | string[]",
      defaultValue: "undefined",
      description: "Controlled expanded item(s). Use with onValueChange.",
    },
    {
      name: "onValueChange",
      type: "(value: string | string[]) => void",
      defaultValue: "undefined",
      description: "Callback invoked whenever the expanded state changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables interaction across all child accordion items.",
    },
  ];

  const triggerProps = [
    {
      name: "icon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Leading accessory slot rendered inside an accented container on open.",
    },
    {
      name: "subtitle",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Secondary descriptive text displayed directly beneath the trigger heading.",
    },
    {
      name: "badge",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Status badge or counter pill displayed alongside the title.",
    },
    {
      name: "hideIndicator",
      type: "boolean",
      defaultValue: "false",
      description: "Optionally suppresses the trailing chevron or plus/minus indicator.",
    },
  ];

  return (
    <div className="mf-accordion-doc-scope w-full">
      {/* 1. Hero Section matching visual reference */}
      <div className="mb-6">
        <AccordionHero />
      </div>

      {/* 2. Variant Navigation Pill Bar */}
      <div className="mb-8">
        <AccordionVariantNav
          activeVariant={activeVariant}
          onSelectVariant={handleSelectVariant}
          onScrollToDocs={handleScrollToDocs}
        />
      </div>

      {/* 3. Main 2x2 Showcase + Playground Row */}
      <div className="flex flex-col xl:flex-row gap-7 items-start mb-16">
        {/* Left: 4 Live Accordion Demonstrations in 2x2 Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* 1. Morph Accordion */}
          <div
            id="accordion-morph-card"
            className={`mf-acc-card ${activeVariant === "morph" ? "ring-2 ring-[#5145FF]/30" : ""}`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Morph Accordion</h3>
                  <p className="mf-acc-card-subtitle">Smooth, elegant, and interactive.</p>
                </div>
              </div>
              <span className="mf-acc-signature-badge">Signature Style</span>
            </div>

            <div className="mt-1">
              <AccordionMorph defaultValue="item-1" />
            </div>
          </div>

          {/* 2. Minimal Accordion */}
          <div
            id="accordion-minimal-card"
            className={`mf-acc-card ${activeVariant === "minimal" ? "ring-2 ring-[#5145FF]/30" : ""}`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Minimal Accordion</h3>
                  <p className="mf-acc-card-subtitle">Clean. Simple. Timeless.</p>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <AccordionMinimal defaultValue="item-1" />
            </div>
          </div>

          {/* 3. Outlined Accordion */}
          <div
            id="accordion-outlined-card"
            className={`mf-acc-card ${activeVariant === "outlined" ? "ring-2 ring-[#5145FF]/30" : ""}`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Outlined Accordion</h3>
                  <p className="mf-acc-card-subtitle">Structured. Bold. Elegant.</p>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <AccordionOutlined defaultValue="item-1" />
            </div>
          </div>

          {/* 4. Nested Accordion */}
          <div
            id="accordion-nested-card"
            className={`mf-acc-card ${activeVariant === "nested" ? "ring-2 ring-[#5145FF]/30" : ""}`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <GitFork size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Nested Accordion</h3>
                  <p className="mf-acc-card-subtitle">Go deeper. Organize better.</p>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <AccordionNested defaultValue="parent-doc" />
            </div>
          </div>
        </div>

        {/* Right: Interactive Playground Sidebar */}
        <div id="accordion-playground-section" className="w-full xl:w-[410px] 2xl:w-[430px] shrink-0 sticky top-24">
          <AccordionPlayground
            config={playgroundConfig}
            onChange={handlePlaygroundConfigChange}
          />
        </div>
      </div>

      {/* 4. Full-Width Big Code Previewer Section (Down below!) */}
      <div id="accordion-code-export-section" className="w-full mb-16 scroll-mt-24">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Component Code &amp; Export</h2>
            <p className="text-xs text-[#6B7280]">
              Showing complete, working code for the <strong className="font-semibold text-[#5145FF] capitalize">{playgroundConfig.variant}</strong> variant with all compound primitives.
            </p>
          </div>
        </div>

        <AccordionBigCodeSection
          config={playgroundConfig}
          onVariantChange={(v) => handleSelectVariant(v as VariantNavType)}
        />
      </div>

      {/* 5. Documentation Details Section */}
      <section id="documentation-details" className="pt-6 border-t border-[#E5E7EB] scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <BookOpen size={16} />
          </div>
          <h2 className="text-xl font-bold text-[#111827]">Documentation &amp; API Reference</h2>
        </div>

        {/* Installation */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Installation</h3>
          <p className="text-xs text-[#6B7280]">Install via your preferred package manager:</p>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: `pnpm dlx mintforge@latest add accordion`,
              npm: `npx mintforge@latest add accordion`,
              yarn: `yarn dlx mintforge@latest add accordion`,
              bun: `bunx mintforge@latest add accordion`,
            }}
          />
          <p className="text-xs text-[#6B7280] mt-4">Basic Import:</p>
          <ComponentCode
            code={`import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n} from "@/components/ui/accordion";`}
            language="tsx"
          />
        </div>

        {/* Usage Example */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Usage Example</h3>
          <p className="text-xs text-[#6B7280]">Drop this snippet directly into any React or Next.js page:</p>
          <ComponentCode
            code={`import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n} from "@/components/ui/accordion";\n\nexport default function Example() {\n  return (\n    <Accordion type="single" variant="morph" defaultValue="item-1" collapsible>\n      <AccordionItem value="item-1">\n        <AccordionTrigger>What makes Mintforge UI different?</AccordionTrigger>\n        <AccordionContent>\n          Mintforge UI offers a modern, consistent, and developer-first design system with powerful customization, smooth interactions, and a growing ecosystem of components.\n        </AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-2">\n        <AccordionTrigger>Can I customize the appearance?</AccordionTrigger>\n        <AccordionContent>\n          Yes! Every component is built with semantic Tailwind tokens, customizable CSS variables, and zero runtime overhead.\n        </AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  );\n}`}
            language="tsx"
          />
        </div>

        {/* Props Reference */}
        <div className="space-y-6 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Props Reference</h3>
          <div>
            <h4 className="text-xs font-bold text-[#4B5563] mb-1">Accordion (Root)</h4>
            <ComponentPropsTable props={accordionProps} />
          </div>
          <div className="mt-6">
            <h4 className="text-xs font-bold text-[#4B5563] mb-1">AccordionTrigger</h4>
            <ComponentPropsTable props={triggerProps} />
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Accessibility (WAI-ARIA)</h3>
          <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white space-y-3 text-xs leading-relaxed text-[#4B5563] shadow-xs">
            <p>
              The Accordion component strictly adheres to the{" "}
              <strong className="text-[#111827]">W3C WAI-ARIA Accordion Pattern</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong className="text-[#111827]">Semantic Trigger:</strong> Triggers render as native{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  &lt;button type=&quot;button&quot;&gt;
                </code>{" "}
                elements with accessible focus indicators.
              </li>
              <li>
                <strong className="text-[#111827]">ARIA State Association:</strong> Dynamically applies{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  aria-expanded=&quot;true | false&quot;
                </code>{" "}
                and connects triggers to content regions via{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  aria-controls
                </code>
                .
              </li>
              <li>
                <strong className="text-[#111827]">Keyboard Navigation:</strong> Fully operable with{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] font-mono text-[11px]">
                  Tab
                </kbd>
                , and expands/collapses via{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] font-mono text-[11px]">
                  Enter
                </kbd>{" "}
                or{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] font-mono text-[11px]">
                  Space
                </kbd>
                .
              </li>
              <li>
                <strong className="text-[#111827]">Reduced Motion:</strong> Automatically honors user OS
                preference for reduced motion via{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  motion-reduce:transition-none
                </code>
                .
              </li>
            </ul>
          </div>
        </div>

        <ComponentPagination currentHref="/docs/components/accordion" />
      </section>
    </div>
  );
}
