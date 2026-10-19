"use client";

import * as React from "react";
import { Button, ButtonVariant, ButtonSize } from "@/components/ui/button";
import {
  Sparkles,
  Download,
  Plus,
  Search,
  Mail,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Sliders,
  Copy,
  Check,
  Code2,
  Eye,
  Ban,
  Loader2,
  Maximize2,
} from "lucide-react";

export interface ButtonPlaygroundState {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  hasLeadingIcon: boolean;
  leadingIconType: "sparkles" | "download" | "plus" | "search" | "mail";
  hasTrailingIcon: boolean;
  trailingIconType: "arrowRight" | "chevronRight" | "externalLink";
  disabled: boolean;
  isLoading: boolean;
  fullWidth: boolean;
}

export const defaultButtonPlaygroundState: ButtonPlaygroundState = {
  variant: "default",
  size: "default",
  label: "Button",
  hasLeadingIcon: false,
  leadingIconType: "sparkles",
  hasTrailingIcon: false,
  trailingIconType: "arrowRight",
  disabled: false,
  isLoading: false,
  fullWidth: false,
};

interface ButtonPlaygroundProps {
  state: ButtonPlaygroundState;
  onChange: React.Dispatch<React.SetStateAction<ButtonPlaygroundState>>;
}

export function ButtonPlayground({ state, onChange }: ButtonPlaygroundProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const getLeadingIconNode = () => {
    if (!state.hasLeadingIcon || state.size === "icon") return undefined;
    const iconSize = state.size === "sm" ? 12 : state.size === "lg" ? 16 : 14;
    switch (state.leadingIconType) {
      case "sparkles":
        return <Sparkles size={iconSize} />;
      case "download":
        return <Download size={iconSize} />;
      case "plus":
        return <Plus size={iconSize} />;
      case "search":
        return <Search size={iconSize} />;
      case "mail":
        return <Mail size={iconSize} />;
      default:
        return undefined;
    }
  };

  const getTrailingIconNode = () => {
    if (!state.hasTrailingIcon || state.size === "icon") return undefined;
    const iconSize = state.size === "sm" ? 12 : state.size === "lg" ? 16 : 14;
    switch (state.trailingIconType) {
      case "arrowRight":
        return <ArrowRight size={iconSize} />;
      case "chevronRight":
        return <ChevronRight size={iconSize} />;
      case "externalLink":
        return <ExternalLink size={iconSize} />;
      default:
        return undefined;
    }
  };

  const getIconOnlyNode = () => {
    const iconSize = state.size === "sm" ? 13 : state.size === "lg" ? 16 : 14;
    switch (state.leadingIconType) {
      case "sparkles":
        return <Sparkles size={iconSize} />;
      case "download":
        return <Download size={iconSize} />;
      case "plus":
        return <Plus size={iconSize} />;
      case "search":
        return <Search size={iconSize} />;
      case "mail":
        return <Mail size={iconSize} />;
      default:
        return <Sparkles size={iconSize} />;
    }
  };

  // Generate complete JSX code for everything selected
  const generateSnippet = (): string => {
    const iconImports: string[] = [];

    if (state.size === "icon") {
      const name =
        state.leadingIconType.charAt(0).toUpperCase() +
        state.leadingIconType.slice(1);
      iconImports.push(name);
    } else {
      if (state.hasLeadingIcon) {
        const name =
          state.leadingIconType.charAt(0).toUpperCase() +
          state.leadingIconType.slice(1);
        iconImports.push(name);
      }
      if (state.hasTrailingIcon) {
        const name =
          state.trailingIconType === "arrowRight"
            ? "ArrowRight"
            : state.trailingIconType === "chevronRight"
            ? "ChevronRight"
            : "ExternalLink";
        iconImports.push(name);
      }
    }

    const imports = [
      `import { Button } from "@/components/ui/button";`,
      iconImports.length > 0
        ? `import { ${Array.from(new Set(iconImports)).join(", ")} } from "lucide-react";`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const props: string[] = [];
    if (state.variant !== "default") props.push(`variant="${state.variant}"`);
    if (state.size !== "default") props.push(`size="${state.size}"`);
    if (state.disabled) props.push("disabled");
    if (state.isLoading) props.push("isLoading");
    if (state.fullWidth) props.push('className="w-full"');

    if (state.size === "icon") {
      props.push(`aria-label="${state.label || "Action"}"`);
    } else {
      if (state.hasLeadingIcon) {
        const iconName =
          state.leadingIconType.charAt(0).toUpperCase() +
          state.leadingIconType.slice(1);
        const iconSize = state.size === "sm" ? 12 : state.size === "lg" ? 16 : 14;
        props.push(`leftIcon={<${iconName} size={${iconSize}} />}`);
      }
      if (state.hasTrailingIcon) {
        const iconName =
          state.trailingIconType === "arrowRight"
            ? "ArrowRight"
            : state.trailingIconType === "chevronRight"
            ? "ChevronRight"
            : "ExternalLink";
        const iconSize = state.size === "sm" ? 12 : state.size === "lg" ? 16 : 14;
        props.push(`rightIcon={<${iconName} size={${iconSize}} />}`);
      }
    }

    const propsStr = props.length > 0 ? " " + props.join(" ") : "";
    const children =
      state.size === "icon"
        ? `\n      <${
            state.leadingIconType.charAt(0).toUpperCase() +
            state.leadingIconType.slice(1)
          } size={15} />\n    `
        : state.label;

    return `${imports}

export default function Example() {
  return (
    <Button${propsStr}>
      ${children}
    </Button>
  );
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
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
              onClick={() => onChange(defaultButtonPlaygroundState)}
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
          <div className="relative min-h-[140px] p-6 rounded-2xl bg-gradient-to-b from-[#F8FAFC] to-white border border-[#E5E7EB] shadow-2xs flex flex-col items-center justify-center mb-4 overflow-hidden">
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            <div className={`relative z-10 ${state.fullWidth ? "w-full" : ""}`}>
              <Button
                variant={state.variant}
                size={state.size}
                disabled={state.disabled}
                isLoading={state.isLoading}
                leftIcon={getLeadingIconNode()}
                rightIcon={getTrailingIconNode()}
                className={state.fullWidth ? "w-full" : ""}
                aria-label={state.size === "icon" ? state.label : undefined}
              >
                {state.size === "icon" ? getIconOnlyNode() : state.label}
              </Button>
            </div>

            {/* Live Property Tag Badge */}
            <span className="relative z-10 text-[10px] font-mono text-[#64748B] mt-4 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              variant=&quot;{state.variant}&quot; &middot; size=&quot;{state.size}&quot;
            </span>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-[#0B0F19] border border-slate-800 p-3.5 mb-4 shadow-inner min-h-[140px] flex flex-col justify-between">
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
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed scrollbar-thin">
              <code>{generateSnippet()}</code>
            </pre>
          </div>
        )}

        {/* Quick Copy One-Liner (Always visible below preview) */}
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 mb-4 text-xs">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <Code2 size={13} className="text-[#5145FF] shrink-0" />
            <code className="text-[11px] font-mono text-[#111827] truncate">
              {`<Button variant="${state.variant}" size="${state.size}"${
                state.isLoading ? " isLoading" : ""
              }${state.disabled ? " disabled" : ""}>${
                state.size === "icon" ? "..." : state.label
              }</Button>`}
            </code>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5145FF] hover:text-[#4338CA] shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="space-y-3.5">
          {/* 1. Variant Selector */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Variant
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(
                [
                  "default",
                  "secondary",
                  "outline",
                  "ghost",
                  "destructive",
                  "link",
                ] as const
              ).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, variant: v }))}
                  className={`text-xs font-medium py-1.5 px-2 rounded-lg border transition-all capitalize cursor-pointer text-center ${
                    state.variant === v
                      ? "bg-[#5145FF] text-white border-[#5145FF] font-semibold shadow-xs"
                      : "bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Size Selector */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Size
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["sm", "default", "lg", "icon"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, size: s }))}
                  className={`text-xs font-medium py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                    state.size === s
                      ? "bg-[#5145FF] text-white border-[#5145FF] font-semibold shadow-xs"
                      : "bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Button Label (when not icon size) */}
          {state.size !== "icon" && (
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Label Text
              </label>
              <input
                type="text"
                value={state.label}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, label: e.target.value }))
                }
                className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5145FF] focus:border-[#5145FF] transition-all"
                placeholder="Button label..."
              />
            </div>
          )}

          {/* 4. Leading Icon Dropdown (Styled properly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                {state.size === "icon" ? "Icon Graphic" : "Leading Icon"}
              </label>
              <select
                value={
                  state.size === "icon"
                    ? state.leadingIconType
                    : state.hasLeadingIcon
                    ? state.leadingIconType
                    : "none"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "none") {
                    onChange((prev) => ({ ...prev, hasLeadingIcon: false }));
                  } else {
                    onChange((prev) => ({
                      ...prev,
                      hasLeadingIcon: true,
                      leadingIconType: val as ButtonPlaygroundState["leadingIconType"],
                    }));
                  }
                }}
                className="w-full text-xs px-2.5 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5145FF] cursor-pointer shadow-2xs font-medium"
              >
                {state.size !== "icon" && <option value="none">None</option>}
                <option value="sparkles">Sparkles (✨)</option>
                <option value="download">Download (↓)</option>
                <option value="plus">Plus (+)</option>
                <option value="search">Search (🔍)</option>
                <option value="mail">Mail (✉)</option>
              </select>
            </div>

            {/* Trailing Icon Dropdown (Styled properly) */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Trailing Icon
              </label>
              <select
                disabled={state.size === "icon"}
                value={
                  state.size === "icon"
                    ? "none"
                    : state.hasTrailingIcon
                    ? state.trailingIconType
                    : "none"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "none") {
                    onChange((prev) => ({ ...prev, hasTrailingIcon: false }));
                  } else {
                    onChange((prev) => ({
                      ...prev,
                      hasTrailingIcon: true,
                      trailingIconType: val as ButtonPlaygroundState["trailingIconType"],
                    }));
                  }
                }}
                className="w-full text-xs px-2.5 py-2 rounded-lg bg-white border border-[#E2E8F0] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#5145FF] cursor-pointer shadow-2xs font-medium disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
              >
                <option value="none">None</option>
                <option value="arrowRight">Arrow Right (→)</option>
                <option value="chevronRight">Chevron Right (›)</option>
                <option value="externalLink">External Link (↗)</option>
              </select>
            </div>
          </div>

          {/* 5. Sleek iOS / Modern Toggle Switches for the Remaining 3 Options */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            {/* Toggle 1: Disabled */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  <Ban size={13} />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#111827] block leading-tight">
                    Disabled State
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    Blocks pointer and click events
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={state.disabled}
                onClick={() =>
                  onChange((prev) => ({ ...prev, disabled: !prev.disabled }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] focus:ring-offset-1 ${
                  state.disabled ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    state.disabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Loading Spinner */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  <Loader2 size={13} />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#111827] block leading-tight">
                    Loading Spinner
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    Sets aria-busy and shows spinner
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={state.isLoading}
                onClick={() =>
                  onChange((prev) => ({ ...prev, isLoading: !prev.isLoading }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] focus:ring-offset-1 ${
                  state.isLoading ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    state.isLoading ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Full Width Presentation */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                  <Maximize2 size={13} />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#111827] block leading-tight">
                    Full Width Presentation
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    Expands width to 100% container
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={state.fullWidth}
                onClick={() =>
                  onChange((prev) => ({ ...prev, fullWidth: !prev.fullWidth }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5145FF] focus:ring-offset-1 ${
                  state.fullWidth ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    state.fullWidth ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
