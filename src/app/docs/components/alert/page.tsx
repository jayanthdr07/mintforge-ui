"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import { AlertHero } from "@/components/docs/alert-showcase/alert-hero";
import {
  AlertVariantNav,
  AlertVariantNavType,
} from "@/components/docs/alert-showcase/alert-variant-nav";
import {
  AlertPlayground,
  AlertPlaygroundConfig,
  DEFAULT_ALERT_CONFIG,
} from "@/components/docs/alert-showcase/alert-playground";
import { AlertBigCodeSection } from "@/components/docs/alert-showcase/alert-code-section";
import { AlertDesign } from "@/components/ui/alert";
import { AlertMorph } from "@/components/ui/alert/alert-morph";
import { AlertRail } from "@/components/ui/alert/alert-rail";
import { AlertFloating } from "@/components/ui/alert/alert-floating";
import { AlertSolid } from "@/components/ui/alert/alert-solid";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import {
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Code2,
  ArrowRight,
} from "lucide-react";

export default function AlertDocPage() {
  const [activeVariant, setActiveVariant] =
    React.useState<AlertVariantNavType>("morph");
  const [playgroundConfig, setPlaygroundConfig] =
    React.useState<AlertPlaygroundConfig>(DEFAULT_ALERT_CONFIG);

  const handleSelectVariant = (variant: AlertVariantNavType) => {
    setActiveVariant(variant);
    if (variant === "playground") {
      const el = document.getElementById("alert-playground-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      setPlaygroundConfig((prev) => ({
        ...prev,
        design: variant as AlertDesign,
      }));
      const el = document.getElementById(`alert-${variant}-card`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCardClick = (variant: AlertVariantNavType) => {
    setActiveVariant(variant);
    if (variant !== "playground") {
      setPlaygroundConfig((prev) => ({
        ...prev,
        design: variant as AlertDesign,
      }));
    }
  };

  const handleInspectCode = (variant: AlertVariantNavType, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVariant(variant);
    if (variant !== "playground") {
      setPlaygroundConfig((prev) => ({
        ...prev,
        design: variant as AlertDesign,
      }));
    }
    const el = document.getElementById("alert-code-export-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlaygroundConfigChange = (newConfig: AlertPlaygroundConfig) => {
    setPlaygroundConfig(newConfig);
    setActiveVariant("playground");
  };

  const handleScrollToDocs = () => {
    const el = document.getElementById("documentation-details");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const alertProps = [
    {
      name: "status",
      type: '"brand" | "info" | "success" | "warning" | "destructive" | "neutral"',
      defaultValue: '"brand"',
      description: "Semantic color palette and default icon theme for the alert banner.",
    },
    {
      name: "variant",
      type: 'AlertStatus',
      defaultValue: '"brand"',
      description: "Backwards-compatible alias for the status prop.",
    },
    {
      name: "design",
      type: '"morph" | "rail" | "floating" | "solid" | "subtle" | "outline" | "card"',
      defaultValue: '"morph"',
      description: "Visual structural treatment. Supports 'morph' (signature ambient glow), 'rail' (4px accent demarcation), 'floating' (frosted glass), or 'solid' (high-contrast flood).",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Controls internal padding, icon scale, and font sizes across the banner.",
    },
    {
      name: "title",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Primary alert title heading displayed at the top.",
    },
    {
      name: "description",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Informative body copy rendered underneath the title heading.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      defaultValue: "auto",
      description: "Custom leading icon node. Defaults to status-specific semantic Lucide icons.",
    },
    {
      name: "action",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Right-aligned accessory slot for interactive action buttons or recovery links.",
    },
    {
      name: "onClose",
      type: "() => void",
      defaultValue: "undefined",
      description: "Callback invoked upon dismissal. When provided, renders an accessible close button.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes to apply to the alert root container.",
    },
  ];

  const modularProps = [
    {
      name: "AlertMorph",
      type: "React.FC<AlertMorphProps>",
      defaultValue: "—",
      description: "Pre-configured signature Morph alert featuring soft ambient glow and elevated white card styling.",
    },
    {
      name: "AlertRail",
      type: "React.FC<AlertRailProps>",
      defaultValue: "—",
      description: "Enterprise layout featuring a high-contrast 4px left-edge demarcation rail.",
    },
    {
      name: "AlertFloating",
      type: "React.FC<AlertFloatingProps>",
      defaultValue: "—",
      description: "Floating frosted glass banner with ambient backdrop blur and elevated drop shadow.",
    },
    {
      name: "AlertSolid",
      type: "React.FC<AlertSolidProps>",
      defaultValue: "—",
      description: "High-visibility solid flood alert designed for critical warnings and urgent state changes.",
    },
  ];

  const compoundProps = [
    {
      name: "AlertTitle",
      type: "React.FC<React.HTMLAttributes<HTMLHeadingElement>>",
      defaultValue: "—",
      description: "Accessible heading element for compound layout composition.",
    },
    {
      name: "AlertDescription",
      type: "React.FC<React.HTMLAttributes<HTMLParagraphElement>>",
      defaultValue: "—",
      description: "Descriptive body text container with secondary muted typography tokens.",
    },
    {
      name: "AlertAction",
      type: "React.FC<React.HTMLAttributes<HTMLDivElement>>",
      defaultValue: "—",
      description: "Dedicated flex slot for buttons, links, or inline action badges.",
    },
  ];

  return (
    <div className="mf-alert-doc-scope w-full">
      {/* 1. Hero Section */}
      <div className="mb-6">
        <AlertHero />
      </div>

      {/* 2. Variant Navigation Pill Bar */}
      <div className="mb-8">
        <AlertVariantNav
          activeVariant={activeVariant}
          onSelectVariant={handleSelectVariant}
          onScrollToDocs={handleScrollToDocs}
        />
      </div>

      {/* 3. Main 2x2 Showcase + Playground Row */}
      <div className="flex flex-col xl:flex-row gap-7 items-start mb-16">
        {/* Left: 4 Live Alert Demonstrations in 2x2 Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card 1: Morph Alert (Signature) */}
          <div
            id="alert-morph-card"
            onClick={() => handleCardClick("morph")}
            className={`mf-acc-card mf-alert-card-selectable ${
              activeVariant === "morph" ? "mf-alert-card-active" : ""
            }`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Morph Alert</h3>
                  <p className="mf-acc-card-subtitle">
                    Signature soft glow &amp; elevated card style.
                  </p>
                </div>
              </div>
              <span className="mf-acc-signature-badge whitespace-nowrap shrink-0">
                Signature Style
              </span>
            </div>

            <div className="mt-2">
              <AlertMorph />
            </div>
          </div>

          {/* Card 2: Accent Rail Alert */}
          <div
            id="alert-rail-card"
            onClick={() => handleCardClick("rail")}
            className={`mf-acc-card mf-alert-card-selectable ${
              activeVariant === "rail" ? "mf-alert-card-active" : ""
            }`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Accent Rail Alert</h3>
                  <p className="mf-acc-card-subtitle">
                    Enterprise 4px left-bar demarcation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <AlertRail />
            </div>
          </div>

          {/* Card 3: Floating Glass Alert */}
          <div
            id="alert-floating-card"
            onClick={() => handleCardClick("floating")}
            className={`mf-acc-card mf-alert-card-selectable ${
              activeVariant === "floating" ? "mf-alert-card-active" : ""
            }`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Floating Glass Alert</h3>
                  <p className="mf-acc-card-subtitle">
                    Backdrop blur &amp; floating elevation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <AlertFloating />
            </div>
          </div>

          {/* Card 4: Solid & Subtle Alert */}
          <div
            id="alert-solid-card"
            onClick={() => handleCardClick("solid")}
            className={`mf-acc-card mf-alert-card-selectable ${
              activeVariant === "solid" ? "mf-alert-card-active" : ""
            }`}
          >
            <div className="mf-acc-card-header">
              <div className="mf-acc-card-header-left">
                <div className="mf-acc-card-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="mf-acc-card-title">Solid &amp; Subtle Alerts</h3>
                  <p className="mf-acc-card-subtitle">
                    High urgency solid vs low-profile subtle.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <AlertSolid />
            </div>
          </div>
        </div>

        {/* Right: Interactive Playground Sidebar */}
        <div
          id="alert-playground-section"
          className="w-full xl:w-[410px] 2xl:w-[430px] shrink-0 sticky top-24"
        >
          <AlertPlayground
            config={playgroundConfig}
            onChange={handlePlaygroundConfigChange}
          />
        </div>
      </div>

      {/* 4. Full-Width Big Code Previewer Section */}
      <div id="alert-code-export-section" className="w-full mb-16 scroll-mt-24">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">
              Component Code &amp; Export
            </h2>
            <p className="text-xs text-[#6B7280]">
              Showing complete, copyable code configured for the{" "}
              <strong className="font-semibold text-[#5145FF] capitalize">
                {activeVariant === "playground"
                  ? `${playgroundConfig.status} (${playgroundConfig.design})`
                  : `${activeVariant} variant`}
              </strong>{" "}
              alert.
            </p>
          </div>
        </div>

        <AlertBigCodeSection
          config={playgroundConfig}
          activeVariant={activeVariant}
          onVariantChange={(v) => handleSelectVariant(v)}
        />
      </div>

      {/* 5. Documentation Details Section */}
      <section
        id="documentation-details"
        className="pt-6 border-t border-[#E5E7EB] scroll-mt-24"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <BookOpen size={16} />
          </div>
          <h2 className="text-xl font-bold text-[#111827]">
            Documentation &amp; API Reference
          </h2>
        </div>

        {/* Installation */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Installation</h3>
          <p className="text-xs text-[#6B7280]">
            Install via your preferred package manager:
          </p>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: `pnpm dlx mintforge@latest add alert`,
              npm: `npx mintforge@latest add alert`,
              yarn: `yarn dlx mintforge@latest add alert`,
              bun: `bunx --bun mintforge@latest add alert`,
            }}
          />
          <p className="text-xs text-[#6B7280] mt-4">Basic Import:</p>
          <ComponentCode
            code={`import {\n  Alert,\n  AlertTitle,\n  AlertDescription,\n  AlertAction,\n  AlertMorph,\n  AlertRail,\n  AlertFloating,\n  AlertSolid,\n} from "@/components/ui/alert";`}
            language="tsx"
          />
        </div>

        {/* Usage Example */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Usage Example</h3>
          <p className="text-xs text-[#6B7280]">
            Drop this snippet directly into any React or Next.js page:
          </p>
          <ComponentCode
            code={`import { Alert } from "@/components/ui/alert";\n\nexport default function Example() {\n  return (\n    <Alert\n      status="brand"\n      design="morph"\n      title="Mintforge Ecosystem Updated"\n      description="Zero-drift contract synchronizer has completed verification for all frontend bindings."\n      action={\n        <button\n          type="button"\n          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#5145FF] hover:bg-[#EEF2FF] transition-colors cursor-pointer whitespace-nowrap"\n        >\n          View Changelog\n        </button>\n      }\n      onClose={() => console.log("Alert dismissed")}\n    />\n  );\n}`}
            language="tsx"
          />
        </div>

        {/* Alert Props */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Alert Props</h3>
          <ComponentPropsTable props={alertProps} />
        </div>

        {/* Modular Preset Variants */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Modular Preset Variants</h3>
          <p className="text-xs text-[#6B7280]">
            Ready-to-use variants exported directly from{" "}
            <code className="text-[#5145FF] font-mono">@/components/ui/alert</code>:
          </p>
          <ComponentPropsTable props={modularProps} />
        </div>

        {/* Compound Subcomponents */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Compound Subcomponents</h3>
          <p className="text-xs text-[#6B7280]">
            For custom banner layouts or rich inline content, use the compound subcomponents:
          </p>
          <ComponentPropsTable props={compoundProps} />
        </div>

        {/* Accessibility */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">
            Accessibility &amp; WAI-ARIA
          </h3>
          <div className="p-4 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#4B5563] space-y-2">
            <p>
              • <strong>Dynamic ARIA Roles</strong>: Destructive alerts automatically apply{" "}
              <code className="text-[#5145FF] font-mono">role=&quot;alert&quot;</code> and{" "}
              <code className="text-[#5145FF] font-mono">aria-live=&quot;assertive&quot;</code>{" "}
              to notify assistive tech immediately. Non-destructive alerts apply{" "}
              <code className="text-[#5145FF] font-mono">role=&quot;status&quot;</code> and{" "}
              <code className="text-[#5145FF] font-mono">aria-live=&quot;polite&quot;</code>.
            </p>
            <p>
              • <strong>Keyboard Navigation</strong>: When{" "}
              <code className="text-[#5145FF] font-mono">onClose</code> is specified, the dismiss button receives accessible focus rings and can be triggered using{" "}
              <kbd className="px-1.5 py-0.5 border rounded bg-gray-50 text-[10px]">Enter</kbd>{" "}
              or <kbd className="px-1.5 py-0.5 border rounded bg-gray-50 text-[10px]">Space</kbd>.
            </p>
            <p>
              • <strong>High Contrast Support</strong>: All status palettes provide WCAG 2.1 AA compliant contrast ratios against both dark and light surfaces.
            </p>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <ComponentPagination currentHref="/docs/components/alert" />
        </div>
      </section>
    </div>
  );
}
