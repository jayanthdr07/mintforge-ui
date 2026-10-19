"use client";

import * as React from "react";
import { Copy, Check, FileCode, Terminal } from "lucide-react";
import { AlertDialogCodeHighlighter } from "./alert-dialog-code-highlighter";
import { AlertDialogPlaygroundConfig } from "./alert-dialog-playground";
import { AlertDialogNavType } from "./alert-dialog-variant-nav";

export type CodeViewMode = "snippet" | "full";

export function getVariantDisplayCode(
  variant: AlertDialogNavType,
  config: AlertDialogPlaygroundConfig
): string {
  if (variant === "playground") {
    const { design, size, appearance, showCloseButton, closeOnEscape, closeOnOverlayClick } = config;
    const sizeAttr = size !== "md" ? `\n  size="${size}"` : "";
    const appearanceAttr = appearance !== "standard" ? `\n  appearance="${appearance}"` : "";
    const closeBtnAttr = !showCloseButton ? `\n  showCloseButton={false}` : "";
    const escapeAttr = !closeOnEscape ? `\n  closeOnEscape={false}` : "";
    const overlayAttr = !closeOnOverlayClick ? `\n  closeOnOverlayClick={false}` : "";

    return `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="default">Open ${design.toUpperCase()} Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent${sizeAttr}${appearanceAttr}${closeBtnAttr}${escapeAttr}${overlayAttr}>
    <AlertDialogHeader>
      <AlertDialogTitle>Action Confirmation</AlertDialogTitle>
      <AlertDialogDescription>
        Review and confirm your action before proceeding.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;
  }

  switch (variant) {
    case "confirm":
      return `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function ConfirmDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="md" appearance="standard">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#F2F0FF] border-4 border-white shadow-[0_0_0_1px_#E0E7FF] flex items-center justify-center text-[#5145FF] mb-4">
            <HelpCircle size={28} className="stroke-[2.2]" />
          </div>

          <AlertDialogHeader className="items-center text-center space-y-2 mb-2">
            <AlertDialogTitle className="text-xl font-bold text-[#111827]">
              Save your changes?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#64748B] max-w-xs leading-relaxed">
              Your updates are ready. Would you like to save them before leaving this page?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="w-full flex items-center justify-center gap-3 pt-4 border-t border-[#EEF2F6] mt-5">
            <AlertDialogCancel className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="flex-1 py-2.5 rounded-xl bg-[#5145FF] text-white hover:bg-[#4338CA]">
              Save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

    case "destructive":
      return `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DestructiveDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="md" className="overflow-visible pt-8">
        <div className="relative pt-6 flex flex-col items-center text-center">
          {/* Iconic Scooped Notch Header */}
          <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="relative w-24 h-12 flex items-center justify-center">
              <svg className="w-24 h-12 text-white" viewBox="0 0 96 48" fill="currentColor">
                <path d="M 0,0 C 24,0 26,44 48,44 C 70,44 72,0 96,0 Z" />
              </svg>
              <div className="absolute top-1 w-12 h-12 rounded-full flex items-center justify-center text-[#DC2626]">
                <Trash2 size={24} className="stroke-[2.2]" />
              </div>
            </div>
          </div>

          <AlertDialogHeader className="items-center text-center space-y-2 mb-2 mt-2">
            <AlertDialogTitle className="font-bold text-xl text-[#111827]">
              You are about to delete a product
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#64748B] max-w-xs leading-relaxed">
              This will delete your product from catalog. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="w-full flex items-center justify-end gap-3 pt-4 border-t border-[#EEF2F6] mt-5">
            <AlertDialogCancel className="px-5 py-2.5 rounded-xl border border-transparent text-[#64748B]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction variant="destructive" className="px-6 py-2.5 rounded-xl bg-[#DC2626] text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

    case "form":
      return `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus, Lock, Globe } from "lucide-react";

export function FormDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">Create Workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="md">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#EEF2F6]">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0FF] border border-[#E0E7FF] flex items-center justify-center text-[#5145FF]">
              <FolderPlus size={20} />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-bold text-[#111827]">
                Create New Workspace
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-[#64748B]">
                Configure and launch a collaborative project environment.
              </AlertDialogDescription>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">
                Workspace Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                placeholder="Demo Workspace"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5E7EB] focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/20 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">Description</label>
              <textarea
                rows={3}
                placeholder="This workspace is used for demo purpose."
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5E7EB] focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/20 outline-none resize-none"
              />
            </div>

            <AlertDialogFooter className="pt-3 border-t border-[#EEF2F6] mt-5">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5145FF] text-white hover:bg-[#4338CA] font-semibold text-sm"
              >
                Create Workspace
              </button>
            </AlertDialogFooter>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

    case "success":
      return `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export function SuccessDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">View Completion</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="md">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-white shadow-[0_0_0_1px_#D1FAE5] flex items-center justify-center mb-5">
            <div className="w-11 h-11 rounded-full bg-[#15803D] flex items-center justify-center text-white">
              <Check size={22} className="stroke-[3]" />
            </div>
          </div>

          <AlertDialogHeader className="items-center text-center space-y-2 mb-2">
            <AlertDialogTitle className="font-bold text-2xl text-[#111827]">
              Workspace created!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#64748B] max-w-xs leading-relaxed">
              Your new workspace is ready. You can now invite teammates or continue setting things up.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="w-full space-y-2 mt-4 pt-2">
            <AlertDialogAction
              variant="success"
              className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <span>Open workspace</span>
              <ArrowRight size={14} />
            </AlertDialogAction>
            <AlertDialogCancel className="w-full border-0 bg-transparent text-[#64748B]">
              Maybe later
            </AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

    case "detail":
      return `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";

export function DetailDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit Organization Details</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="md">
        <div className="flex flex-col text-left">
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="font-bold text-lg text-[#111827]">
              Add more details
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-[#64748B]">
              Add some more information about your company.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            {/* Slider */}
            <div className="space-y-1.5 p-3 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#111827]">Company size</span>
                <span className="font-mono font-semibold text-[#5145FF]">1,200 - 5,000</span>
              </div>
              <input type="range" className="w-full accent-[#5145FF]" />
            </div>

            {/* Keywords */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">Keywords</label>
              <div className="p-2 rounded-xl border border-[#E5E7EB] flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-[#F8F9FC] border text-xs">Design</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F8F9FC] border text-xs">Web Builder</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F8F9FC] border text-xs">Backend Engineer</span>
              </div>
            </div>

            <AlertDialogFooter className="pt-3 border-t border-[#EEF2F6]">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[#5145FF] text-white">Save changes</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;
  }
}

export function AlertDialogBigCodeSection({
  config,
  activeVariant,
  onVariantChange,
}: {
  config: AlertDialogPlaygroundConfig;
  activeVariant: AlertDialogNavType;
  onVariantChange?: (v: AlertDialogNavType) => void;
}) {
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const viewMode: CodeViewMode = "full";

  const selectedVariant = activeVariant;
  const displayCode = getVariantDisplayCode(selectedVariant, config);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      window.prompt("Copy code:", displayCode);
    }
  };

  const handleCopyCli = async () => {
    const cliCmd = "npx mintforge add alert-dialog";
    try {
      await navigator.clipboard.writeText(cliCmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      window.prompt("Copy CLI command:", cliCmd);
    }
  };

  const variantTabs: { id: AlertDialogNavType; label: string }[] = [
    { id: "confirm", label: "Confirm" },
    { id: "destructive", label: "Destructive" },
    { id: "form", label: "Form" },
    { id: "success", label: "Success" },
    { id: "detail", label: "Detail" },
    { id: "playground", label: "Playground Active" },
  ];

  return (
    <div className="w-full bg-[#0B0F19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/90 bg-slate-900/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5145FF]/20 text-[#5145FF] border border-[#5145FF]/30 flex items-center justify-center shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                alert-dialog-{selectedVariant}.tsx
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5145FF]/20 text-[#818CF8] border border-[#5145FF]/30">
                {viewMode === "full" ? "Full Component" : "JSX Snippet"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive code dynamically synchronized with selected dialog design.
            </p>
          </div>
        </div>

        {/* Center: Variant Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {variantTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onVariantChange?.(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                selectedVariant === tab.id
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>{copiedCli ? "CLI Copied!" : "npx mintforge add alert-dialog"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5145FF] hover:bg-[#4338CA] shadow-sm transition-all cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check size={14} className="text-emerald-300" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-6 overflow-x-auto max-h-[460px] overflow-y-auto">
        <AlertDialogCodeHighlighter code={displayCode} />
      </div>

      {/* Footer Bar */}
      <div className="px-6 py-2.5 bg-slate-900/40 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Includes full accessibility primitives: focus trapping, Escape listener, WAI-ARIA alertdialog semantics</span>
        <span className="text-slate-500 font-mono text-[11px]">Variant: {selectedVariant}</span>
      </div>
    </div>
  );
}
