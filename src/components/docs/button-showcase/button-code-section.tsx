"use client";

import * as React from "react";
import { ButtonPlaygroundState } from "./button-playground";
import { ButtonCodeHighlighter } from "./button-code-highlighter";
import { Copy, Check, Terminal, Code2, Layers, DownloadCloud } from "lucide-react";

interface ButtonBigCodeSectionProps {
  playgroundState: ButtonPlaygroundState;
}

export function ButtonBigCodeSection({ playgroundState }: ButtonBigCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<
    "playground" | "patterns" | "asChild" | "source" | "cli"
  >("playground");
  const [copied, setCopied] = React.useState(false);

  // 1. Generate live code based on playground state
  const generatePlaygroundSnippet = (state: ButtonPlaygroundState): string => {
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

    const importsList = [
      `import { Button } from "@/components/ui/button";`,
      iconImports.length > 0
        ? `import { ${Array.from(new Set(iconImports)).join(", ")} } from "lucide-react";`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const propsList: string[] = [];

    if (state.variant !== "default") {
      propsList.push(`variant="${state.variant}"`);
    }

    if (state.size !== "default") {
      propsList.push(`size="${state.size}"`);
    }

    if (state.disabled) {
      propsList.push("disabled");
    }

    if (state.isLoading) {
      propsList.push("isLoading");
    }

    if (state.fullWidth) {
      propsList.push(`className="w-full"`);
    }

    if (state.size === "icon") {
      propsList.push(`aria-label="${state.label}"`);
    } else {
      if (state.hasLeadingIcon) {
        const iconName =
          state.leadingIconType.charAt(0).toUpperCase() +
          state.leadingIconType.slice(1);
        const iconSize =
          state.size === "sm" ? 13 : state.size === "lg" ? 18 : 15;
        propsList.push(`leftIcon={<${iconName} size={${iconSize}} />}`);
      }

      if (state.hasTrailingIcon) {
        const iconName =
          state.trailingIconType === "arrowRight"
            ? "ArrowRight"
            : state.trailingIconType === "chevronRight"
            ? "ChevronRight"
            : "ExternalLink";
        const iconSize =
          state.size === "sm" ? 13 : state.size === "lg" ? 18 : 15;
        propsList.push(`rightIcon={<${iconName} size={${iconSize}} />}`);
      }
    }

    const propsString =
      propsList.length > 0 ? " " + propsList.join(" ") : "";

    const innerContent =
      state.size === "icon"
        ? `<${
            state.leadingIconType.charAt(0).toUpperCase() +
            state.leadingIconType.slice(1)
          } size={16} />`
        : state.label;

    return `${importsList}

export default function ButtonDemo() {
  return (
    <Button${propsString}>
      ${innerContent}
    </Button>
  );
}`;
  };

  // 2. Practical Patterns snippet
  const patternsSnippet = `import { Button } from "@/components/ui/button";
import { Save, Trash2, ArrowRight, Download, Plus } from "lucide-react";

export function ButtonRecipes() {
  return (
    <div className="space-y-6">
      {/* 1. Form Save & Cancel Pair */}
      <div className="flex items-center justify-end gap-2.5">
        <Button variant="ghost">Cancel</Button>
        <Button variant="default" leftIcon={<Save size={15} />}>
          Save Changes
        </Button>
      </div>

      {/* 2. Destructive Confirm & Delete Pair */}
      <div className="flex items-center justify-end gap-2.5">
        <Button variant="outline">Dismiss</Button>
        <Button variant="destructive" leftIcon={<Trash2 size={15} />}>
          Delete Workspace
        </Button>
      </div>

      {/* 3. Wizard Next Step Stepper */}
      <div className="flex items-center justify-between">
        <Button variant="ghost">Previous Step</Button>
        <Button variant="default" rightIcon={<ArrowRight size={15} />}>
          Continue
        </Button>
      </div>

      {/* 4. Action Buttons with Leading Icons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="default" leftIcon={<Plus size={16} />}>
          Create Project
        </Button>
        <Button variant="outline" leftIcon={<Download size={16} />}>
          Export PDF
        </Button>
      </div>
    </div>
  );
}`;

  // 3. asChild Slot composition snippet
  const asChildSnippet = `import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

/**
 * The asChild pattern renders the child element (e.g. Next.js <Link>)
 * with all Button classes, states, and accessibility props,
 * without rendering an invalid nested <button> inside an <a> tag.
 */
export function NavigationButton() {
  return (
    <Button asChild variant="outline" rightIcon={<ExternalLink size={14} />}>
      <Link href="/docs/installation">
        View Installation Guide
      </Link>
    </Button>
  );
}`;

  // 4. Source code snippet for Button
  const sourceCodeSnippet = `import { Loader2 } from "lucide-react";
import React from "react";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const variantStyles: Record<ButtonVariant, string> = {
      default:
        "bg-[#5145FF] text-white hover:bg-[#4338CA] shadow-xs active:bg-[#3730A3]",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200/80 border border-slate-200/60 shadow-2xs",
      outline:
        "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-2xs",
      ghost:
        "bg-transparent text-[#111827] hover:bg-slate-100/80 active:bg-slate-200/60",
      destructive:
        "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-xs active:bg-[#991B1B]",
      link:
        "bg-transparent text-[#5145FF] underline-offset-4 hover:underline hover:text-[#4338CA] p-0 h-auto font-medium shadow-none active:scale-100",
    };

    // Support both "default" and "md" for full backwards-compatibility
    const resolvedSize = size === "md" ? "default" : size;

    const sizeStyles: Record<"default" | "sm" | "lg" | "icon", string> = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
      default: "h-10 px-4 py-2 text-sm gap-2 rounded-lg",
      lg: "h-11 px-6 text-base gap-2.5 rounded-lg",
      icon: "h-10 w-10 p-0 text-sm rounded-lg shrink-0 justify-center",
    };

    const sizeClass =
      variant === "link"
        ? size === "icon"
          ? "p-1"
          : "text-sm"
        : sizeStyles[resolvedSize] || sizeStyles.default;

    const mergedClassName = \`\${baseStyles} \${variantStyles[variant]} \${sizeClass} \${className}\`.trim();

    // asChild slot composition pattern
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        disabled?: boolean;
        "aria-busy"?: boolean;
        children?: React.ReactNode;
      }>;

      return React.cloneElement(child, {
        className: \`\${mergedClassName} \${child.props.className || ""}\`.trim(),
        disabled: disabled || isLoading || child.props.disabled,
        "aria-busy": isLoading || undefined,
        children: (
          <>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
            ) : (
              leftIcon
            )}
            {child.props.children}
            {!isLoading && rightIcon}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : undefined}
        className={mergedClassName}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";`;

  // 5. CLI snippet
  const cliSnippet = `# Add the Button component to your Next.js project
npx mintforge add button

# Or install required peer icons if not already present
npm install lucide-react`;

  const getActiveCode = () => {
    switch (activeTab) {
      case "playground":
        return generatePlaygroundSnippet(playgroundState);
      case "patterns":
        return patternsSnippet;
      case "asChild":
        return asChildSnippet;
      case "source":
        return sourceCodeSnippet;
      case "cli":
        return cliSnippet;
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
              button.tsx — Mintforge UI
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
              onClick={() => setActiveTab("asChild")}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === "asChild"
                  ? "bg-[#5145FF] text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              asChild Slot
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

        {/* Terminal Body with Code Highlighter */}
        <div className="p-4 sm:p-5 overflow-x-auto max-h-[520px] scrollbar-thin scrollbar-thumb-slate-700">
          <ButtonCodeHighlighter code={getActiveCode()} />
        </div>
      </div>
    </section>
  );
}
