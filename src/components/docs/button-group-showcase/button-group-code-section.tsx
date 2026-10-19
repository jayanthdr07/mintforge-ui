"use client";

import * as React from "react";
import { ButtonGroupPlaygroundState } from "./button-group-playground";
import { ButtonGroupCodeHighlighter } from "./button-group-code-highlighter";
import { Copy, Check, Code2 } from "lucide-react";

interface ButtonGroupCodeSectionProps {
  playgroundState: ButtonGroupPlaygroundState;
}

export function ButtonGroupCodeSection({
  playgroundState,
}: ButtonGroupCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<
    "playground" | "patterns" | "split" | "source" | "cli"
  >("playground");
  const [copied, setCopied] = React.useState(false);

  // 1. Generate live code based on playground state
  const generatePlaygroundSnippet = (state: ButtonGroupPlaygroundState): string => {
    const props: string[] = [];
    if (state.orientation === "vertical") props.push('orientation="vertical"');
    if (!state.attached) props.push("attached={false}");
    if (state.size !== "default") props.push(`size="${state.size}"`);

    const openTag = props.length > 0 ? `<ButtonGroup ${props.join(" ")}>` : `<ButtonGroup>`;

    const lucideIcons: string[] = [];
    if (state.iconMode === "iconOnly" || state.size === "icon") lucideIcons.push("Sparkles");
    else if (state.iconMode === "left") lucideIcons.push("Layers");
    const lucideImport =
      lucideIcons.length > 0
        ? `\nimport { ${lucideIcons.join(", ")} } from "lucide-react";`
        : "";

    const labels = ["Overview", "Analytics", "Exports", "Sharing", "Folders"];
    const items: string[] = [];

    for (let i = 0; i < state.buttonCount; i++) {
      const label = labels[i] || `Action ${i + 1}`;
      const isActive = state.activeIndex === i;
      const btnVariant = isActive ? "default" : state.variant;
      const variantProp = btnVariant !== "default" ? ` variant="${btnVariant}"` : "";
      const pressedProp = isActive ? ' aria-pressed="true"' : "";
      const disabledProp = state.disabled ? " disabled" : "";

      if (state.iconMode === "iconOnly" || state.size === "icon") {
        items.push(
          `      <Button${variantProp} size="icon"${pressedProp}${disabledProp} aria-label="${label}">\n        <Sparkles size={15} />\n      </Button>`
        );
      } else if (state.iconMode === "left") {
        items.push(
          `      <Button${variantProp}${pressedProp}${disabledProp} leftIcon={<Layers size={15} />}>\n        ${label}\n      </Button>`
        );
      } else {
        items.push(
          `      <Button${variantProp}${pressedProp}${disabledProp}>\n        ${label}\n      </Button>`
        );
      }

      if (state.showSeparators && i < state.buttonCount - 1) {
        items.push(`      <ButtonGroupSeparator />`);
      }
    }

    return `import { Button } from "@/components/ui/button";
import { ButtonGroup${state.showSeparators ? ", ButtonGroupSeparator" : ""} } from "@/components/ui/button-group";${lucideImport}

export default function ButtonGroupDemo() {
  return (
    ${openTag}
${items.join("\n")}
    </ButtonGroup>
  );
}`;
  };

  // 2. Patterns snippet
  const patternsSnippet = `import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Bold, Italic, Underline, ChevronLeft, ChevronRight } from "lucide-react";

// Pattern 1: Horizontal Segmented Filter
export function TimeframeFilter() {
  return (
    <ButtonGroup orientation="horizontal" size="sm">
      <Button variant="default">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  );
}

// Pattern 2: Icon Formatting Toolbar with Separators
export function FormattingToolbar() {
  return (
    <ButtonGroup orientation="horizontal" size="sm" role="toolbar" aria-label="Text formatting">
      <Button variant="outline" size="icon" aria-label="Bold"><Bold size={14} /></Button>
      <Button variant="outline" size="icon" aria-label="Italic"><Italic size={14} /></Button>
      <Button variant="outline" size="icon" aria-label="Underline"><Underline size={14} /></Button>
      <ButtonGroupSeparator />
      <Button variant="default" size="sm">Save Draft</Button>
    </ButtonGroup>
  );
}

// Pattern 3: Pagination with Text Counter
export function PaginationGroup() {
  return (
    <ButtonGroup orientation="horizontal" size="sm">
      <Button variant="outline" size="icon" aria-label="Previous page"><ChevronLeft size={14} /></Button>
      <ButtonGroupText>Page 3 of 12</ButtonGroupText>
      <Button variant="outline" size="icon" aria-label="Next page"><ChevronRight size={14} /></Button>
    </ButtonGroup>
  );
}`;

  // 3. Split button snippet
  const splitSnippet = `import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronDown, Download, Check } from "lucide-react";

export function SplitButtonDemo() {
  const [open, setOpen] = React.useState(false);
  const [format, setFormat] = React.useState("PDF Document (.pdf)");

  return (
    <div className="relative inline-block text-left">
      <ButtonGroup orientation="horizontal" size="default">
        {/* Main Action Button */}
        <Button variant="default" leftIcon={<Download size={14} />}>
          Export {format.split(" ")[0]}
        </Button>

        {/* Independent Chevron Trigger */}
        <Button
          variant="default"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Additional export formats"
          className="px-2 border-l border-white/20"
        >
          <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
        </Button>
      </ButtonGroup>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-white border border-[#E5E7EB] shadow-lg py-1.5 z-50">
          {["PDF Document (.pdf)", "Excel Spreadsheet (.xlsx)", "CSV Delimited (.csv)"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setFormat(opt); setOpen(false); }}
              className="w-full px-3 py-1.5 text-xs text-[#111827] hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{opt}</span>
              {format === opt && <Check size={14} className="text-[#5145FF]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`;

  // 4. Component Source code
  const sourceCodeSnippet = `"use client";

import * as React from "react";
import { type ButtonSize, type ButtonVariant } from "./button";

export type ButtonGroupOrientation = "horizontal" | "vertical";

interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  size?: ButtonSize;
  variant?: ButtonVariant;
  attached: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({
  orientation: "horizontal",
  attached: true,
});

export function useButtonGroup() {
  return React.useContext(ButtonGroupContext);
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
  size?: ButtonSize;
  variant?: ButtonVariant;
  attached?: boolean;
  role?: "group" | "toolbar";
  "aria-label"?: string;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = "horizontal",
      size,
      variant,
      attached = true,
      role = "group",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const attachedClasses =
      orientation === "horizontal"
        ? "inline-flex items-center -space-x-px isolate [&>*:hover]:z-10 [&>*:focus-visible]:z-20 [&>*:active]:z-10 [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none"
        : "inline-flex flex-col -space-y-px items-stretch w-fit isolate [&>*:hover]:z-10 [&>*:focus-visible]:z-20 [&>*:active]:z-10 [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none";

    const spacedClasses =
      orientation === "horizontal"
        ? "inline-flex items-center gap-2"
        : "inline-flex flex-col items-stretch gap-2 w-fit";

    const baseClasses = attached ? attachedClasses : spacedClasses;

    return (
      <ButtonGroupContext.Provider
        value={{ orientation, size, variant, attached }}
      >
        <div
          ref={ref}
          role={role}
          data-orientation={orientation}
          data-slot="button-group"
          className={\`\${baseClasses} \${className}\`.trim()}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export interface ButtonGroupSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
}

export const ButtonGroupSeparator = React.forwardRef<
  HTMLDivElement,
  ButtonGroupSeparatorProps
>(({ orientation: customOrientation, className = "", ...props }, ref) => {
  const context = useButtonGroup();
  const orientation = customOrientation || context.orientation;

  const orientationClass =
    orientation === "horizontal"
      ? "h-4 w-px my-auto mx-1 bg-[#E5E7EB] shrink-0"
      : "w-full h-px mx-auto my-1 bg-[#E5E7EB] shrink-0";

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      className={\`\${orientationClass} \${className}\`.trim()}
      {...props}
    />
  );
});
ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

export interface ButtonGroupTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ButtonSize;
}

export const ButtonGroupText = React.forwardRef<
  HTMLSpanElement,
  ButtonGroupTextProps
>(({ size: customSize, className = "", children, ...props }, ref) => {
  const context = useButtonGroup();
  const size = customSize || context.size || "default";

  const sizeClasses: Record<"default" | "sm" | "lg" | "icon" | "md", string> = {
    sm: "h-8 px-2.5 text-xs",
    default: "h-9 px-3 text-xs",
    md: "h-9 px-3 text-xs",
    lg: "h-10 px-4 text-sm",
    icon: "h-9 w-9 p-0 justify-center",
  };

  const resolvedSizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <span
      ref={ref}
      data-slot="button-group-text"
      className={\`inline-flex items-center font-medium text-[#64748B] bg-slate-50 border border-[#E5E7EB] select-none \${resolvedSizeClass} \${className}\`.trim()}
      {...props}
    >
      {children}
    </span>
  );
});
ButtonGroupText.displayName = "ButtonGroupText";`;

  // 5. CLI snippet
  const cliSnippet = `# Add Button Group primitive to your Next.js project
npx mintforge add button-group

# Ensure the core Button component is present
npx mintforge add button`;

  const getActiveCode = (): string => {
    switch (activeTab) {
      case "playground":
        return generatePlaygroundSnippet(playgroundState);
      case "patterns":
        return patternsSnippet;
      case "split":
        return splitSnippet;
      case "source":
        return sourceCodeSnippet;
      case "cli":
        return cliSnippet;
    }
  };

  const currentCode = getActiveCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", currentCode);
    }
  };

  return (
    <section className="mt-14 space-y-4">
      {/* Header with Title and Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Code2 size={24} className="text-[#5145FF]" />
            <span>Implementation &amp; Code Export</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Production-ready component source, dynamic playground exports, and composition patterns.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-600" />
              <span className="text-emerald-600">Copied snippet!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="text-[#5145FF]" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Dark Terminal Shell */}
      <div className="mf-dark-terminal">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 px-4 py-2.5 bg-[#0B0F19]/90">
          {/* Window control dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
              button-group.tsx — Mintforge UI
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <button
              type="button"
              onClick={() => setActiveTab("playground")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "playground"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Playground Export
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("patterns")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "patterns"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Action Patterns
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("split")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "split"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Split Button
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("source")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "source"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              Component Source
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cli")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "cli"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              CLI Add
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 bg-[#0B0F19]">
          <ButtonGroupCodeHighlighter code={currentCode} />
        </div>
      </div>
    </section>
  );
}
