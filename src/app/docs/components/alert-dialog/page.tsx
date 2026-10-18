"use client";

import * as React from "react";
import "@/styles/alert-dialog-showcase.css";
import { AlertDialogHero } from "@/components/docs/alert-dialog-showcase/alert-dialog-hero";
import {
  AlertDialogVariantNav,
  AlertDialogNavType,
} from "@/components/docs/alert-dialog-showcase/alert-dialog-variant-nav";
import {
  AlertDialogPlayground,
  AlertDialogPlaygroundConfig,
  DEFAULT_ALERT_DIALOG_CONFIG,
} from "@/components/docs/alert-dialog-showcase/alert-dialog-playground";
import { AlertDialogBigCodeSection } from "@/components/docs/alert-dialog-showcase/alert-dialog-code-section";
import {
  AlertDialogConfirm,
  AlertDialogDestructive,
  AlertDialogForm,
  AlertDialogSuccess,
  AlertDialogDetail,
} from "@/components/ui/alert-dialog";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import {
  Sparkles,
  HelpCircle,
  Trash2,
  FolderPlus,
  CheckCircle2,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";

export default function AlertDialogDocPage() {
  const [activeVariant, setActiveVariant] = React.useState<AlertDialogNavType>("confirm");
  const [playgroundConfig, setPlaygroundConfig] =
    React.useState<AlertDialogPlaygroundConfig>(DEFAULT_ALERT_DIALOG_CONFIG);

  const handleSelectVariant = (variant: AlertDialogNavType) => {
    setActiveVariant(variant);
    if (variant !== "playground") {
      setPlaygroundConfig((prev) => ({
        ...prev,
        design: variant as "confirm" | "destructive" | "form" | "success" | "detail",
      }));
    }

    const cardIdMap: Record<string, string> = {
      confirm: "dialog-confirm-card",
      destructive: "dialog-destructive-card",
      form: "dialog-form-card",
      success: "dialog-success-card",
      detail: "dialog-detail-card",
      playground: "dialog-playground-section",
    };

    const targetId = cardIdMap[variant];
    if (targetId) {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleScrollToDocs = () => {
    const el = document.getElementById("documentation-details");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // Props definitions
  const rootProps = [
    {
      name: "open",
      type: "boolean",
      defaultValue: "undefined",
      description: "Controlled open state of the dialog. Use alongside onOpenChange.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial open state for uncontrolled usage.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "undefined",
      description: "Callback invoked whenever the open state of the dialog changes.",
    },
    {
      name: "closeOnEscape",
      type: "boolean",
      defaultValue: "true",
      description: "Whether pressing the Escape key dismisses the dialog.",
    },
    {
      name: "closeOnOverlayClick",
      type: "boolean",
      defaultValue: "true",
      description: "Whether clicking the backdrop overlay dismisses the dialog.",
    },
  ];

  const contentProps = [
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Controls the max-width scale of the dialog ('sm' max-w-sm, 'md' max-w-md, 'lg' max-w-xl).",
    },
    {
      name: "appearance",
      type: '"standard" | "tinted" | "bordered"',
      defaultValue: '"standard"',
      description: "Visual surface style: 'standard' (elevated white), 'tinted' (soft lavender wash), or 'bordered' (crisp 2px frame).",
    },
    {
      name: "showCloseButton",
      type: "boolean",
      defaultValue: "true",
      description: "Renders an accessible top-right close (×) button inside the modal.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional Tailwind CSS classes applied directly to the dialog modal container.",
    },
  ];

  const modularProps = [
    {
      name: "AlertDialogConfirm",
      type: "React.FC<AlertDialogConfirmProps>",
      defaultValue: "—",
      description: "Pre-configured confirmation dialog with centered double-ring question icon and primary action.",
    },
    {
      name: "AlertDialogDestructive",
      type: "React.FC<AlertDialogDestructiveProps>",
      defaultValue: "—",
      description: "High-impact warning dialog featuring Mintforge's signature scooped top notch and red action.",
    },
    {
      name: "AlertDialogForm",
      type: "React.FC<AlertDialogFormProps>",
      defaultValue: "—",
      description: "Structured modal form supporting input fields, description, visibility toggles, and validation.",
    },
    {
      name: "AlertDialogSuccess",
      type: "React.FC<AlertDialogSuccessProps>",
      defaultValue: "—",
      description: "Completion dialog with centered vibrant emerald checkmark badge and navigation trigger.",
    },
    {
      name: "AlertDialogDetail",
      type: "React.FC<AlertDialogDetailProps>",
      defaultValue: "—",
      description: "Configuration review dialog featuring company size slider, keywords tags input, and social links.",
    },
  ];

  const compoundProps = [
    {
      name: "AlertDialogTrigger",
      type: "React.FC<AlertDialogTriggerProps>",
      defaultValue: "—",
      description: "Element that toggles the dialog open. Supports asChild to pass click handlers to custom buttons.",
    },
    {
      name: "AlertDialogHeader",
      type: "React.FC<React.HTMLAttributes<HTMLDivElement>>",
      defaultValue: "—",
      description: "Container for title and description elements with structured spacing.",
    },
    {
      name: "AlertDialogTitle",
      type: "React.FC<React.HTMLAttributes<HTMLHeadingElement>>",
      defaultValue: "—",
      description: "Accessible dialog title linked automatically via aria-labelledby.",
    },
    {
      name: "AlertDialogDescription",
      type: "React.FC<React.HTMLAttributes<HTMLParagraphElement>>",
      defaultValue: "—",
      description: "Accessible dialog description linked automatically via aria-describedby.",
    },
    {
      name: "AlertDialogFooter",
      type: "React.FC<React.HTMLAttributes<HTMLDivElement>>",
      defaultValue: "—",
      description: "Bottom action bar housing Cancel, Action, and auxiliary controls.",
    },
    {
      name: "AlertDialogAction",
      type: "React.FC<AlertDialogActionProps>",
      defaultValue: "—",
      description: "Primary confirmation button with 'default', 'destructive', or 'success' variants.",
    },
    {
      name: "AlertDialogCancel",
      type: "React.FC<AlertDialogCancelProps>",
      defaultValue: "—",
      description: "Accessible secondary dismiss button that closes the modal without submitting.",
    },
    {
      name: "AlertDialogClose",
      type: "React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>",
      defaultValue: "—",
      description: "Accessible dismiss button suitable for placing anywhere in the modal hierarchy.",
    },
  ];

  return (
    <div className="mf-alert-dialog-doc-scope w-full">
      {/* 1. Hero Section */}
      <div className="mb-6">
        <AlertDialogHero />
      </div>

      {/* 2. Variant Navigation Pill Bar */}
      <div className="mb-8">
        <AlertDialogVariantNav
          activeVariant={activeVariant}
          onSelectVariant={handleSelectVariant}
          onScrollToDocs={handleScrollToDocs}
        />
      </div>

      {/* 3. Main 2x2 Showcase + Playground Row */}
      <div className="flex flex-col xl:flex-row gap-7 items-start mb-16">
        {/* Left: 5 Live Dialog Demonstrations in Card Grid */}
        <div className="flex-1 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Card 1: Confirm Dialog */}
            <div
              id="dialog-confirm-card"
              onClick={() => handleSelectVariant("confirm")}
              className={`mf-dialog-showcase-card cursor-pointer ${
                activeVariant === "confirm" ? "active" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
                    <HelpCircle size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Confirm Dialog</h3>
                    <p className="text-xs text-[#64748B]">Important reversible confirmation</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#5145FF] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full border border-[#E0E7FF] whitespace-nowrap">
                  Signature Style
                </span>
              </div>

              <AlertDialogConfirm isStaticPreview />
            </div>

            {/* Card 2: Destructive Dialog with Scooped Notch */}
            <div
              id="dialog-destructive-card"
              onClick={() => handleSelectVariant("destructive")}
              className={`mf-dialog-showcase-card cursor-pointer overflow-visible ${
                activeVariant === "destructive" ? "active" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center">
                    <Trash2 size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Destructive Dialog</h3>
                    <p className="text-xs text-[#64748B]">Signature scooped top notch</p>
                  </div>
                </div>
              </div>

              <AlertDialogDestructive isStaticPreview />
            </div>

            {/* Card 3: Form Dialog */}
            <div
              id="dialog-form-card"
              onClick={() => handleSelectVariant("form")}
              className={`mf-dialog-showcase-card cursor-pointer ${
                activeVariant === "form" ? "active" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center">
                    <FolderPlus size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Form Dialog</h3>
                    <p className="text-xs text-[#64748B]">Structured modal input fields</p>
                  </div>
                </div>
              </div>

              <AlertDialogForm isStaticPreview />
            </div>

            {/* Card 4: Success Dialog */}
            <div
              id="dialog-success-card"
              onClick={() => handleSelectVariant("success")}
              className={`mf-dialog-showcase-card cursor-pointer ${
                activeVariant === "success" ? "active" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center">
                    <CheckCircle2 size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Success Dialog</h3>
                    <p className="text-xs text-[#64748B]">Completion &amp; verified state</p>
                  </div>
                </div>
              </div>

              <AlertDialogSuccess isStaticPreview />
            </div>
          </div>

          {/* Card 5: Detail & Configuration Dialog (Full Width on Left) */}
          <div
            id="dialog-detail-card"
            onClick={() => handleSelectVariant("detail")}
            className={`mf-dialog-showcase-card cursor-pointer ${
              activeVariant === "detail" ? "active" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
                  <SlidersHorizontal size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">Detail &amp; Configuration Dialog</h3>
                  <p className="text-xs text-[#64748B]">Multi-element slider, keywords tags, and social profiles</p>
                </div>
              </div>
            </div>

            <AlertDialogDetail isStaticPreview />
          </div>
        </div>

        {/* Right: Interactive Playground Sidebar */}
        <div id="dialog-playground-section" className="w-full xl:w-[410px] 2xl:w-[430px] shrink-0 sticky top-24">
          <AlertDialogPlayground
            config={playgroundConfig}
            onChange={setPlaygroundConfig}
          />
        </div>
      </div>

      {/* 4. Full-Width Big Code Previewer Section */}
      <div id="dialog-code-export-section" className="w-full mb-16 scroll-mt-24">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Component Code &amp; Export</h2>
            <p className="text-xs text-[#64748B]">
              Showing complete, copyable code configured for the{" "}
              <strong className="font-semibold text-[#5145FF] capitalize">{activeVariant}</strong> alert dialog.
            </p>
          </div>
        </div>

        <AlertDialogBigCodeSection
          config={playgroundConfig}
          activeVariant={activeVariant}
          onVariantChange={(v) => handleSelectVariant(v)}
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
          <p className="text-xs text-[#64748B]">Install via your preferred package manager:</p>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: `pnpm dlx mintforge@latest add alert-dialog`,
              npm: `npx mintforge@latest add alert-dialog`,
              yarn: `yarn dlx mintforge@latest add alert-dialog`,
              bun: `bunx --bun mintforge@latest add alert-dialog`,
            }}
          />
          <p className="text-xs text-[#64748B] mt-4">Basic Import:</p>
          <ComponentCode
            code={`import {\n  AlertDialog,\n  AlertDialogTrigger,\n  AlertDialogContent,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogConfirm,\n  AlertDialogDestructive,\n  AlertDialogForm,\n  AlertDialogSuccess,\n  AlertDialogDetail,\n} from "@/components/ui/alert-dialog";`}
            language="tsx"
          />
        </div>

        {/* Usage Example */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Usage Example</h3>
          <p className="text-xs text-[#64748B]">Drop this snippet directly into any React or Next.js page:</p>
          <ComponentCode
            code={`import {\n  AlertDialog,\n  AlertDialogTrigger,\n  AlertDialogContent,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogAction,\n  AlertDialogCancel,\n} from "@/components/ui/alert-dialog";\nimport { Button } from "@/components/ui/button";\n\nexport default function Example() {\n  return (\n    <AlertDialog>\n      <AlertDialogTrigger asChild>\n        <Button variant="destructive">Delete Workspace</Button>\n      </AlertDialogTrigger>\n      <AlertDialogContent size="md">\n        <AlertDialogHeader>\n          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n          <AlertDialogDescription>\n            This action cannot be undone. All verified contracts and telemetry logs will be permanently removed.\n          </AlertDialogDescription>\n        </AlertDialogHeader>\n        <AlertDialogFooter>\n          <AlertDialogCancel>Cancel</AlertDialogCancel>\n          <AlertDialogAction variant="destructive">Delete Workspace</AlertDialogAction>\n        </AlertDialogFooter>\n      </AlertDialogContent>\n    </AlertDialog>\n  );\n}`}
            language="tsx"
          />
        </div>

        {/* Props Reference */}
        <div className="space-y-6 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Props Reference</h3>

          {/* Root Props */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#4B5563]">AlertDialog (Root Component)</h4>
            <ComponentPropsTable props={rootProps} />
          </div>

          {/* Content Props */}
          <div className="space-y-2 mt-6">
            <h4 className="text-xs font-bold text-[#4B5563]">AlertDialogContent</h4>
            <ComponentPropsTable props={contentProps} />
          </div>

          {/* Modular Presets */}
          <div className="space-y-2 mt-6">
            <h4 className="text-xs font-bold text-[#4B5563]">Modular Preset Variants</h4>
            <p className="text-xs text-[#64748B] mb-2">
              Ready-to-use dialog variants exported directly from{" "}
              <code className="text-[#5145FF] font-mono">@/components/ui/alert-dialog</code>:
            </p>
            <ComponentPropsTable props={modularProps} />
          </div>

          {/* Compound Subcomponents */}
          <div className="space-y-2 mt-6">
            <h4 className="text-xs font-bold text-[#4B5563]">Compound Subcomponents</h4>
            <p className="text-xs text-[#64748B] mb-2">
              Primitives for building custom modal compositions:
            </p>
            <ComponentPropsTable props={compoundProps} />
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-bold text-[#111827]">Accessibility (WAI-ARIA Pattern)</h3>
          <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white space-y-3 text-xs leading-relaxed text-[#4B5563] shadow-xs">
            <p>
              The Alert Dialog component strictly implements the{" "}
              <strong className="text-[#111827]">W3C WAI-ARIA Alert and Message Dialog Pattern</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <strong className="text-[#111827]">Modal Semantics:</strong> Dialogs render with{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  role=&quot;alertdialog&quot;
                </code>{" "}
                and{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  aria-modal=&quot;true&quot;
                </code>
                , informing screen readers of modal isolation.
              </li>
              <li>
                <strong className="text-[#111827]">Label Association:</strong> The title and description are dynamically connected to the modal container via{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  aria-labelledby
                </code>{" "}
                and{" "}
                <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">
                  aria-describedby
                </code>
                .
              </li>
              <li>
                <strong className="text-[#111827]">Focus Trapping:</strong> Keyboard focus automatically moves to the first interactive element on open and is trapped within the dialog using circular Tab cycling.
              </li>
              <li>
                <strong className="text-[#111827]">Focus Restoration:</strong> Closing the dialog automatically returns keyboard focus to the original trigger button.
              </li>
              <li>
                <strong className="text-[#111827]">Keyboard Dismissal:</strong> Supports dismissing via{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] font-mono text-[11px]">
                  Escape
                </kbd>
                , and prevents background interaction by locking body scrolling.
              </li>
            </ul>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <ComponentPagination currentHref="/docs/components/alert-dialog" />
        </div>
      </section>
    </div>
  );
}
