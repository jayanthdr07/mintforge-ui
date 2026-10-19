"use client";

import * as React from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  type ButtonGroupOrientation,
} from "@/components/ui/button-group";
import { ButtonGroupCodeHighlighter } from "./button-group-code-highlighter";
import {
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Code2,
  Eye,
  Layers,
  Star,
  Download,
  Share2,
  Folder,
} from "lucide-react";

export interface ButtonGroupPlaygroundState {
  orientation: ButtonGroupOrientation;
  buttonCount: number;
  variant: ButtonVariant;
  size: ButtonSize;
  iconMode: "none" | "left" | "iconOnly";
  showSeparators: boolean;
  attached: boolean;
  disabled: boolean;
  activeIndex: number | null;
}

export const defaultButtonGroupPlaygroundState: ButtonGroupPlaygroundState = {
  orientation: "horizontal",
  buttonCount: 3,
  variant: "outline",
  size: "default",
  iconMode: "left",
  showSeparators: false,
  attached: true,
  disabled: false,
  activeIndex: 1, // second button active by default
};

interface ButtonGroupPlaygroundProps {
  state: ButtonGroupPlaygroundState;
  onChange: React.Dispatch<React.SetStateAction<ButtonGroupPlaygroundState>>;
}

export function ButtonGroupPlayground({
  state,
  onChange,
}: ButtonGroupPlaygroundProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const buttonConfigs = [
    { label: "Overview", icon: Layers, iconName: "Layers" },
    { label: "Analytics", icon: Star, iconName: "Star" },
    { label: "Exports", icon: Download, iconName: "Download" },
    { label: "Sharing", icon: Share2, iconName: "Share2" },
    { label: "Folders", icon: Folder, iconName: "Folder" },
  ];

  const generateSnippet = (): string => {
    const isVertical = state.orientation === "vertical";
    const orientProp = isVertical ? ' orientation="vertical"' : "";
    const attachedProp = !state.attached ? " attached={false}" : "";
    const sizeProp = state.size !== "default" ? ` size="${state.size}"` : "";

    const items: string[] = [];
    for (let i = 0; i < state.buttonCount; i++) {
      const cfg = buttonConfigs[i] || {
        label: `Action ${i + 1}`,
        icon: Star,
        iconName: "Star",
      };
      const isActive = state.activeIndex === i;
      const isIconOnly = state.iconMode === "iconOnly" || state.size === "icon";

      const btnVariant = isActive ? "default" : state.variant;
      const variantProp = btnVariant !== "default" ? ` variant="${btnVariant}"` : "";
      const pressedProp = isActive ? ' aria-pressed="true"' : "";
      const disabledProp = state.disabled ? " disabled" : "";

      if (isIconOnly) {
        items.push(
          `  <Button${variantProp} size="icon"${pressedProp}${disabledProp} aria-label="${cfg.label}">\n    <${cfg.iconName} size={14} />\n  </Button>`
        );
      } else if (state.iconMode === "left") {
        items.push(
          `  <Button${variantProp}${pressedProp}${disabledProp} leftIcon={<${cfg.iconName} size={14} />}>\n    ${cfg.label}\n  </Button>`
        );
      } else {
        items.push(
          `  <Button${variantProp}${pressedProp}${disabledProp}>\n    ${cfg.label}\n  </Button>`
        );
      }

      if (state.showSeparators && i < state.buttonCount - 1) {
        items.push(`  <ButtonGroupSeparator />`);
      }
    }

    return `<ButtonGroup${orientProp}${attachedProp}${sizeProp}>\n${items.join("\n")}\n</ButtonGroup>`;
  };

  const codeSnippet = generateSnippet();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy snippet:", codeSnippet);
    }
  };

  return (
    <div className="mf-showcase-card">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-[#5145FF]" />
            <h3 className="text-sm font-bold text-[#111827]">
              Interactive Playground
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Mode Toggle: Preview / Code */}
            <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === "preview"
                    ? "bg-white text-[#111827] shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                <Eye size={12} />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("code")}
                className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                  viewMode === "code"
                    ? "bg-white text-[#5145FF] shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                <Code2 size={12} />
                <span>Code</span>
              </button>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={() => onChange(defaultButtonGroupPlaygroundState)}
              className="p-1.5 text-[#64748B] hover:text-[#111827] rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset all settings"
              aria-label="Reset all settings"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Live Stage: Either Preview Canvas or Code Box */}
        {viewMode === "preview" ? (
          <div className="relative min-h-[160px] p-6 rounded-2xl bg-gradient-to-b from-[#F8FAFC] to-white border border-[#E5E7EB] shadow-2xs flex flex-col items-center justify-center mb-4 overflow-hidden">
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className="relative z-10 max-w-full overflow-x-auto flex justify-center py-2">
              <ButtonGroup
                orientation={state.orientation}
                attached={state.attached}
                size={state.size}
                aria-label="Interactive demo button group"
              >
                {Array.from({ length: state.buttonCount }).map((_, index) => {
                  const cfg = buttonConfigs[index] || {
                    label: `Action ${index + 1}`,
                    icon: Star,
                  };
                  const IconComponent = cfg.icon;
                  const isActive = state.activeIndex === index;
                  const isIconOnly =
                    state.iconMode === "iconOnly" || state.size === "icon";

                  return (
                    <React.Fragment key={index}>
                      <Button
                        variant={isActive ? "default" : state.variant}
                        size={state.size}
                        disabled={state.disabled}
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            activeIndex: prev.activeIndex === index ? null : index,
                          }))
                        }
                        aria-pressed={isActive}
                        leftIcon={
                          !isIconOnly && state.iconMode === "left" ? (
                            <IconComponent size={14} />
                          ) : undefined
                        }
                      >
                        {isIconOnly ? (
                          <IconComponent size={14} />
                        ) : (
                          cfg.label
                        )}
                      </Button>
                      {state.showSeparators && index < state.buttonCount - 1 && (
                        <ButtonGroupSeparator />
                      )}
                    </React.Fragment>
                  );
                })}
              </ButtonGroup>
            </div>

            {/* Live Property Tag Badge */}
            <span className="relative z-10 text-[10px] font-mono text-[#64748B] mt-3 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {state.orientation} &middot; {state.buttonCount} buttons &middot; {state.variant}
            </span>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-[#0B0F19] border border-slate-800 p-3.5 mb-4 shadow-inner min-h-[160px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
                Live Generated JSX
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="max-h-[140px] overflow-y-auto">
              <ButtonGroupCodeHighlighter code={codeSnippet} />
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="space-y-3.5 text-xs">
          {/* Orientation Toggle */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1">
              Orientation
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({ ...prev, orientation: "horizontal" }))
                }
                className={`py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  state.orientation === "horizontal"
                    ? "bg-white text-[#111827] shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Horizontal
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({ ...prev, orientation: "vertical" }))
                }
                className={`py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  state.orientation === "vertical"
                    ? "bg-white text-[#111827] shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Vertical
              </button>
            </div>
          </div>

          {/* Button Count */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#111827]">
                Button Count
              </label>
              <span className="text-xs font-mono font-semibold text-[#5145FF]">
                {state.buttonCount}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-slate-100 border border-slate-200">
              {[2, 3, 4, 5].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({ ...prev, buttonCount: cnt }))
                  }
                  className={`py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    state.buttonCount === cnt
                      ? "bg-white text-[#111827] shadow-2xs"
                      : "text-[#64748B] hover:text-[#111827]"
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Select */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1">
              Variant
            </label>
            <select
              value={state.variant}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  variant: e.target.value as ButtonVariant,
                }))
              }
              className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5145FF] cursor-pointer shadow-2xs font-medium"
            >
              <option value="outline">Outline (Default for Groups)</option>
              <option value="default">Default (Accent)</option>
              <option value="secondary">Secondary (Slate)</option>
              <option value="ghost">Ghost (Subtle)</option>
              <option value="destructive">Destructive</option>
            </select>
          </div>

          {/* Size Select */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1">
              Size Scale
            </label>
            <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-slate-100 border border-slate-200">
              {(["sm", "default", "lg", "icon"] as ButtonSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, size: sz }))}
                  className={`py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    state.size === sz
                      ? "bg-white text-[#111827] shadow-2xs"
                      : "text-[#64748B] hover:text-[#111827]"
                  }`}
                >
                  {sz === "default" ? "md" : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Icon Mode */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1">
              Icon Mode
            </label>
            <select
              value={state.iconMode}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  iconMode: e.target.value as "none" | "left" | "iconOnly",
                }))
              }
              className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5145FF] cursor-pointer shadow-2xs font-medium"
            >
              <option value="left">Icon + Label</option>
              <option value="iconOnly">Icon Only</option>
              <option value="none">Text Only</option>
            </select>
          </div>

          {/* Modern Toggle Switches */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            {/* Attached */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#111827]">
                Attached Borders
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={state.attached}
                onClick={() =>
                  onChange((prev) => ({ ...prev, attached: !prev.attached }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] ${
                  state.attached ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    state.attached ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Separators */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#111827]">
                Separators
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={state.showSeparators}
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    showSeparators: !prev.showSeparators,
                  }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] ${
                  state.showSeparators ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    state.showSeparators ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Disabled */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#111827]">
                Disabled
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={state.disabled}
                onClick={() =>
                  onChange((prev) => ({ ...prev, disabled: !prev.disabled }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] ${
                  state.disabled ? "bg-[#DC2626]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    state.disabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Copy Snippet Bar at bottom */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={handleCopyCode}
            leftIcon={
              copied ? (
                <Check size={13} className="text-emerald-500" />
              ) : (
                <Copy size={13} />
              )
            }
          >
            {copied ? "Copied JSX!" : "Copy JSX Code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
