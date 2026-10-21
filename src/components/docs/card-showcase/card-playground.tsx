"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  type CardSize,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CardCodeHighlighter } from "./card-code-highlighter";
import {
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Code2,
  Eye,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export type CardPlaygroundPreset = "basic" | "statistics" | "media" | "form";

export interface CardPlaygroundState {
  size: CardSize;
  preset: CardPlaygroundPreset;
  title: string;
  description: string;
  showHeader: boolean;
  showHeaderAction: boolean;
  showContent: boolean;
  showFooter: boolean;
  showMedia: boolean;
  showBadge: boolean;
  interactive: boolean;
  footerActionType: "double" | "single" | "none";
}

export const defaultCardPlaygroundState: CardPlaygroundState = {
  size: "default",
  preset: "basic",
  title: "Cloud Infrastructure",
  description: "High-throughput cluster configured for automated scaling.",
  showHeader: true,
  showHeaderAction: true,
  showContent: true,
  showFooter: true,
  showMedia: false,
  showBadge: true,
  interactive: true,
  footerActionType: "double",
};

interface CardPlaygroundProps {
  state: CardPlaygroundState;
  onChange: React.Dispatch<React.SetStateAction<CardPlaygroundState>>;
}

export function CardPlayground({ state, onChange }: CardPlaygroundProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const handleReset = () => {
    onChange(defaultCardPlaygroundState);
  };

  const handlePresetChange = (preset: CardPlaygroundPreset) => {
    switch (preset) {
      case "basic":
        onChange({
          ...defaultCardPlaygroundState,
          preset: "basic",
          title: "Team Permissions",
          description: "Role-based access control and workspace rights.",
          showMedia: false,
        });
        break;
      case "statistics":
        onChange({
          ...defaultCardPlaygroundState,
          preset: "statistics",
          title: "$124,500",
          description: "Monthly Recurring Revenue",
          showMedia: false,
          showBadge: true,
        });
        break;
      case "media":
        onChange({
          ...defaultCardPlaygroundState,
          preset: "media",
          title: "Universal Design Tokens",
          description: "Cross-platform styling architecture for Web and Mobile.",
          showMedia: true,
        });
        break;
      case "form":
        onChange({
          ...defaultCardPlaygroundState,
          preset: "form",
          title: "New Integration",
          description: "Connect your repository to automated Seam Check.",
          showMedia: false,
          footerActionType: "double",
        });
        break;
    }
  };

  // Generate clean JSX string matching the actual component API
  const generatedCode = React.useMemo(() => {
    const lines: string[] = [];
    const sizeAttr = state.size === "sm" ? ' size="sm"' : "";
    const interAttr = state.interactive ? " interactive" : "";
    lines.push(`<Card${sizeAttr}${interAttr} className="w-[380px]">`);

    if (state.showMedia) {
      lines.push(`  <div className="h-32 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl" />`);
    }

    if (state.showHeader) {
      lines.push(`  <CardHeader>`);
      if (state.showBadge) {
        lines.push(`    <div className="flex items-center gap-1.5 mb-1">`);
        lines.push(`      <Badge variant="brand" appearance="soft" size="xs">Active</Badge>`);
        lines.push(`    </div>`);
      }
      lines.push(`    <CardTitle>${state.title}</CardTitle>`);
      lines.push(`    <CardDescription>${state.description}</CardDescription>`);
      if (state.showHeaderAction) {
        lines.push(`    <CardAction>`);
        lines.push(`      <Button size="sm" variant="outline">Settings</Button>`);
        lines.push(`    </CardAction>`);
      }
      lines.push(`  </CardHeader>`);
    }

    if (state.showContent) {
      lines.push(`  <CardContent>`);
      if (state.preset === "form") {
        lines.push(`    <div className="space-y-3">`);
        lines.push(`      <Input label="Webhook URL" placeholder="https://api.mintforge.dev/v1" />`);
        lines.push(`    </div>`);
      } else if (state.preset === "statistics") {
        lines.push(`    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">`);
        lines.push(`      <span>+14.8% growth vs last month</span>`);
        lines.push(`    </div>`);
      } else {
        lines.push(`    <p className="text-sm text-[#64748B]">`);
        lines.push(`      Streamline deployments with unified contract monitoring.`);
        lines.push(`    </p>`);
      }
      lines.push(`  </CardContent>`);
    }

    if (state.showFooter && state.footerActionType !== "none") {
      lines.push(`  <CardFooter className="justify-between">`);
      if (state.footerActionType === "double") {
        lines.push(`    <Button size="sm" variant="ghost">Cancel</Button>`);
        lines.push(`    <Button size="sm">Save Changes</Button>`);
      } else {
        lines.push(`    <Button size="sm" className="w-full">Continue</Button>`);
      }
      lines.push(`  </CardFooter>`);
    }

    lines.push(`</Card>`);
    return lines.join("\n");
  }, [state]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Header bar with Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "preview"
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#111827] hover:bg-slate-50"
              }`}
            >
              <Eye size={13} />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("code")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "code"
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#111827] hover:bg-slate-50"
              }`}
            >
              <Code2 size={13} />
              <span>Generated Code</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy JSX"}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            title="Reset playground"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#64748B] hover:text-[#111827] hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Preview (Left) + Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs min-h-[440px] flex items-center justify-center relative overflow-hidden bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:16px_16px]">
            {viewMode === "preview" ? (
              <div className="w-full flex justify-center py-4">
                <Card
                  size={state.size}
                  interactive={state.interactive}
                  className="w-full max-w-sm overflow-hidden transition-all duration-300"
                >
                  {/* Optional Media */}
                  {state.showMedia && (
                    <div className="h-32 w-full bg-gradient-to-r from-[#5145FF] to-[#8B5CF6] p-4 flex flex-col justify-between text-white relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                          Preview Media
                        </span>
                        <Sparkles size={16} className="text-white/80" />
                      </div>
                      <h4 className="text-base font-bold">Universal Design System</h4>
                    </div>
                  )}

                  {/* Header */}
                  {state.showHeader && (
                    <CardHeader>
                      {state.showBadge && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Badge variant="brand" appearance="soft" size="xs">
                            Active
                          </Badge>
                        </div>
                      )}
                      <CardTitle>{state.title || "Untitled Card"}</CardTitle>
                      <CardDescription>{state.description}</CardDescription>
                      {state.showHeaderAction && (
                        <CardAction>
                          <Button size="sm" variant="outline" className="text-xs h-8">
                            Settings
                          </Button>
                        </CardAction>
                      )}
                    </CardHeader>
                  )}

                  {/* Content Body */}
                  {state.showContent && (
                    <CardContent>
                      {state.preset === "form" ? (
                        <div className="space-y-3">
                          <Input label="Webhook URL" placeholder="https://api.mintforge.dev/v1" />
                        </div>
                      ) : state.preset === "statistics" ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                          <TrendingUp size={14} />
                          <span>+14.8% growth vs last month</span>
                        </div>
                      ) : (
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          Streamline deployments with unified contract monitoring and automated schema drift checks.
                        </p>
                      )}
                    </CardContent>
                  )}

                  {/* Footer */}
                  {state.showFooter && state.footerActionType !== "none" && (
                    <CardFooter className="justify-between border-t border-[#EEF2F6] pt-3">
                      {state.footerActionType === "double" ? (
                        <>
                          <Button size="sm" variant="ghost" className="text-xs h-8">
                            Cancel
                          </Button>
                          <Button size="sm" className="text-xs h-8">
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="w-full text-xs h-8">
                          Continue
                        </Button>
                      )}
                    </CardFooter>
                  )}
                </Card>
              </div>
            ) : (
              <div className="w-full h-full p-2">
                <div className="mf-dark-terminal p-4">
                  <CardCodeHighlighter code={generatedCode} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EEF2F6]">
              <Sliders size={16} className="text-[#5145FF]" />
              <h3 className="text-sm font-bold text-[#111827]">Card Customizer</h3>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">Preset Template</label>
              <div className="grid grid-cols-4 gap-1 bg-[#F8F9FC] p-1 rounded-lg border border-[#EEF2F6]">
                {(["basic", "statistics", "media", "form"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePresetChange(p)}
                    className={`py-1 text-xs font-medium rounded capitalize transition-colors cursor-pointer ${
                      state.preset === p
                        ? "bg-white text-[#5145FF] font-semibold shadow-2xs"
                        : "text-[#64748B] hover:text-[#111827]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111827]">Card Size</label>
              <div className="grid grid-cols-2 gap-2">
                {(["default", "sm"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, size: s }))}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      state.size === s
                        ? "border-[#5145FF] bg-[#F2F0FF] text-[#5145FF] font-semibold"
                        : "border-[#E5E7EB] bg-white text-[#64748B] hover:bg-slate-50"
                    }`}
                  >
                    {s === "default" ? "Default (p-6)" : "Compact (sm, p-4)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Editable Title & Description */}
            <div className="space-y-3 pt-2 border-t border-[#EEF2F6]">
              <Input
                label="Card Title"
                value={state.title}
                onChange={(e) => onChange((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Card Title"
              />
              <Input
                label="Card Description"
                value={state.description}
                onChange={(e) => onChange((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Supporting description text"
              />
            </div>

            {/* Section Visibility Toggles */}
            <div className="space-y-2 pt-2 border-t border-[#EEF2F6]">
              <label className="text-xs font-semibold text-[#111827]">Section Visibility</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showHeader}
                    onChange={(e) => onChange((prev) => ({ ...prev, showHeader: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>CardHeader</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showHeaderAction}
                    onChange={(e) => onChange((prev) => ({ ...prev, showHeaderAction: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>CardAction</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showContent}
                    onChange={(e) => onChange((prev) => ({ ...prev, showContent: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>CardContent</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showFooter}
                    onChange={(e) => onChange((prev) => ({ ...prev, showFooter: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>CardFooter</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showMedia}
                    onChange={(e) => onChange((prev) => ({ ...prev, showMedia: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>Media Banner</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.showBadge}
                    onChange={(e) => onChange((prev) => ({ ...prev, showBadge: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span>Status Badge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={state.interactive}
                    onChange={(e) => onChange((prev) => ({ ...prev, interactive: e.target.checked }))}
                    className="rounded border-[#CBD5E1] text-[#5145FF] focus:ring-[#5145FF]"
                  />
                  <span className="text-[#5145FF] font-semibold">Hover Lift Effect</span>
                </label>
              </div>
            </div>

            {/* Footer Action Buttons Mode */}
            <div className="space-y-1.5 pt-2 border-t border-[#EEF2F6]">
              <label className="text-xs font-semibold text-[#111827]">Footer Actions</label>
              <div className="grid grid-cols-3 gap-1 bg-[#F8F9FC] p-1 rounded-lg border border-[#EEF2F6]">
                {(["double", "single", "none"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, footerActionType: mode }))}
                    className={`py-1 text-xs font-medium rounded capitalize transition-colors cursor-pointer ${
                      state.footerActionType === mode
                        ? "bg-white text-[#5145FF] font-semibold shadow-2xs"
                        : "text-[#64748B] hover:text-[#111827]"
                    }`}
                  >
                    {mode === "double" ? "Save/Cancel" : mode === "single" ? "Single CTA" : "None"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
