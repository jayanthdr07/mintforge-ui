"use client";

import * as React from "react";
import { Copy, Check, FileCode, Terminal } from "lucide-react";
import { AccordionCodeHighlighter } from "./accordion-code-highlighter";
import { PlaygroundConfig } from "./accordion-playground";

export function getVariantDisplayCode(config: PlaygroundConfig): string {
  const { variant, animation, behavior, defaultOpen } = config;
  const defaultValAttr = defaultOpen
    ? behavior === "multiple"
      ? ` defaultValue={["item-1"]}`
      : ` defaultValue="item-1"`
    : "";

  switch (variant) {
    case "minimal":
      return `<Accordion type="${behavior}" variant="minimal" indicator="chevron" animation="${animation}"${defaultValAttr} collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger icon={<Zap size={18} className="text-[#111827]" />}>
      Fast Performance
    </AccordionTrigger>
    <AccordionContent>
      Optimized for maximum speed with zero runtime bloat, minimal bundle footprint, and instantaneous server rendering.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger icon={<Box size={18} className="text-[#111827]" />}>
      Highly Customizable
    </AccordionTrigger>
    <AccordionContent>
      Easily adapt colors, typography, corner radii, and animation presets to your exact brand aesthetic.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger icon={<Heart size={18} className="text-[#111827]" />}>
      Built for Developers
    </AccordionTrigger>
    <AccordionContent>
      First-class TypeScript contracts, complete keyboard accessibility, and intuitive composable ergonomics.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

    case "outlined":
      return `<Accordion type="${behavior}" variant="outlined" indicator="chevron" animation="${animation}"${defaultValAttr} collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger icon={<BarChart3 size={18} className="text-[#111827]" />}>
      Powerful Component Library
    </AccordionTrigger>
    <AccordionContent>
      A comprehensive suite of accessible primitives and utilities designed to accelerate modern React and Next.js development.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger icon={<Layers size={18} className="text-[#111827]" />}>
      Ready-to-Use UI Blocks
    </AccordionTrigger>
    <AccordionContent>
      Pre-built production layouts, KPI dashboards, SaaS pricing sheets, and authentication flows ready to drop into your app.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger icon={<Code2 size={18} className="text-[#111827]" />}>
      Developer-First Design
    </AccordionTrigger>
    <AccordionContent>
      Own 100% of your source code with zero package lock-in, strict TypeScript typing, and comprehensive documentation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

    case "nested":
      const nestedDefault = defaultOpen ? ` defaultValue="parent-doc"` : "";
      return `<Accordion type="${behavior}" variant="nested" indicator="chevron" animation="${animation}"${nestedDefault} collapsible>
  <AccordionItem value="parent-doc" className="border border-[#E5E7EB] rounded-2xl bg-[#FAFAFD] overflow-hidden">
    <AccordionTrigger icon={<Folder size={18} className="text-[#5145FF]" />}>
      Documentation
    </AccordionTrigger>
    <AccordionContent>
      <div className="relative pl-7 pr-3.5 pb-4 pt-1.5">
        <Accordion type="single" defaultValue="sub-install" className="space-y-2.5 mt-1" collapsible>
          <AccordionItem value="sub-install" className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden ml-3">
            <AccordionTrigger
              icon={
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
                  <FileText size={14} />
                </div>
              }
              subtitle="Get started with Mintforge UI in just a few steps."
            >
              Installation Guide
            </AccordionTrigger>
            <AccordionContent>
              Run npx mintforge add accordion to scaffold design tokens, utils, and dependencies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sub-api" className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden ml-3">
            <AccordionTrigger
              icon={
                <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center">
                  <Code size={14} />
                </div>
              }
            >
              API Reference
            </AccordionTrigger>
            <AccordionContent>
              Full TypeScript interfaces, compound components props, and accessibility specifications.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="parent-comp" className="border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden">
    <AccordionTrigger icon={<Box size={18} className="text-[#111827]" />}>
      Components
    </AccordionTrigger>
    <AccordionContent>
      Explore over 40+ atomic components engineered for web and mobile consistency.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

    case "morph":
    default:
      return `<Accordion type="${behavior}" variant="morph" indicator="morph" animation="${animation}"${defaultValAttr} collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger
      icon={
        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
          <Sparkles size={18} />
        </div>
      }
    >
      What makes Mintforge UI different?
    </AccordionTrigger>
    <AccordionContent>
      Mintforge UI offers a modern, consistent, and developer-first design system with powerful customization, smooth interactions, and a growing ecosystem of components.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger
      icon={
        <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center shrink-0">
          <Zap size={18} />
        </div>
      }
    >
      Can I customize the appearance?
    </AccordionTrigger>
    <AccordionContent>
      Yes! Every component is built with semantic Tailwind tokens, customizable CSS variables, and zero runtime overhead.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger
      icon={
        <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center shrink-0">
          <Heart size={18} />
        </div>
      }
    >
      Will it support React Native?
    </AccordionTrigger>
    <AccordionContent>
      Mintforge UI delivers complete universal parity across React, Next.js 16, and React Native with Expo 52.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
  }
}

export function getVariantFullCopyCode(config: PlaygroundConfig): string {
  const { variant } = config;

  let iconImports = "";
  let componentName = "AccordionDemo";

  switch (variant) {
    case "minimal":
      iconImports = 'import { Zap, Box, Heart } from "lucide-react";\n';
      componentName = "MinimalAccordionDemo";
      break;
    case "outlined":
      iconImports = 'import { BarChart3, Layers, Code2 } from "lucide-react";\n';
      componentName = "OutlinedAccordionDemo";
      break;
    case "nested":
      iconImports = 'import { Folder, FileText, Code, Box } from "lucide-react";\n';
      componentName = "NestedAccordionDemo";
      break;
    case "morph":
    default:
      iconImports = 'import { Sparkles, Zap, Heart } from "lucide-react";\n';
      componentName = "MorphAccordionDemo";
      break;
  }

  const jsxSnippet = getVariantDisplayCode(config)
    .split("\n")
    .map((line) => "    " + line)
    .join("\n");

  return `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
${iconImports}
export function ${componentName}() {
  return (
${jsxSnippet}
  );
}`;
}

export function AccordionBigCodeSection({
  config,
  onVariantChange,
}: {
  config: PlaygroundConfig;
  onVariantChange?: (variant: PlaygroundConfig["variant"]) => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const displayCode = React.useMemo(() => getVariantDisplayCode(config), [config]);
  const fullCopyCode = React.useMemo(() => getVariantFullCopyCode(config), [config]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(fullCopyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", fullCopyCode);
    }
  };

  const handleCopyCli = async () => {
    const cliCmd = "npx mintforge add accordion";
    try {
      await navigator.clipboard.writeText(cliCmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      window.prompt("Copy CLI command:", cliCmd);
    }
  };

  return (
    <div className="w-full bg-[#0B0F19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/90 bg-slate-900/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5145FF]/20 text-[#5145FF] border border-[#5145FF]/30 flex items-center justify-center shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                accordion-{config.variant}-demo.tsx
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive code dynamically synchronized with playground settings.
            </p>
          </div>
        </div>

        {/* Variant Tabs in Code Bar */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {(["morph", "minimal", "outlined", "nested"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onVariantChange?.(v)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                config.variant === v
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>{copiedCli ? "CLI Copied!" : "npx mintforge add accordion"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5145FF] hover:bg-[#4338CA] shadow-sm transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-300" />
                <span>Copied Full Code!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Component Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-6 overflow-x-auto max-h-[460px] overflow-y-auto">
        <AccordionCodeHighlighter code={displayCode} />
      </div>

      {/* Footer Info Pill */}
      <div className="px-6 py-2.5 bg-slate-900/40 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Includes full compound components: &lt;Accordion /&gt;, &lt;AccordionItem /&gt;, &lt;AccordionTrigger /&gt;, &lt;AccordionContent /&gt;</span>
        <span className="text-slate-500 font-mono text-[11px]">Variant: {config.variant} · Animation: {config.animation} · Type: {config.behavior}</span>
      </div>
    </div>
  );
}
