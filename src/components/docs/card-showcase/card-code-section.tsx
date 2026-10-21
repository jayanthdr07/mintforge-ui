"use client";

import * as React from "react";
import { CardPlaygroundState } from "./card-playground";
import { CardCodeHighlighter } from "./card-code-highlighter";
import { Copy, Check, Terminal, FileCode2, Layers, BookOpen } from "lucide-react";

interface CardCodeSectionProps {
  playgroundState: CardPlaygroundState;
}

export function CardCodeSection({ playgroundState }: CardCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<"playground" | "cli" | "patterns" | "source">("playground");
  const [copied, setCopied] = React.useState(false);

  // 1. Live Playground Snippet
  const playgroundSnippet = React.useMemo(() => {
    const lines: string[] = [];
    lines.push(`import {`);
    lines.push(`  Card,`);
    if (playgroundState.showHeader) {
      lines.push(`  CardHeader,`);
      lines.push(`  CardTitle,`);
      lines.push(`  CardDescription,`);
    }
    if (playgroundState.showHeaderAction) {
      lines.push(`  CardAction,`);
    }
    if (playgroundState.showContent) {
      lines.push(`  CardContent,`);
    }
    if (playgroundState.showFooter && playgroundState.footerActionType !== "none") {
      lines.push(`  CardFooter,`);
    }
    lines.push(`} from "@/components/ui/card";`);
    lines.push(`import { Button } from "@/components/ui/button";`);
    if (playgroundState.showBadge) {
      lines.push(`import { Badge } from "@/components/ui/badge";`);
    }
    lines.push(``);
    lines.push(`export function CustomCard() {`);
    lines.push(`  return (`);

    const sizeAttr = playgroundState.size === "sm" ? ' size="sm"' : "";
    lines.push(`    <Card${sizeAttr} className="w-[380px]">`);

    if (playgroundState.showMedia) {
      lines.push(`      <div className="h-32 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl" />`);
    }

    if (playgroundState.showHeader) {
      lines.push(`      <CardHeader>`);
      if (playgroundState.showBadge) {
        lines.push(`        <div className="flex items-center gap-1.5 mb-1">`);
        lines.push(`          <Badge variant="brand" appearance="soft" size="xs">Active</Badge>`);
        lines.push(`        </div>`);
      }
      lines.push(`        <CardTitle>${playgroundState.title}</CardTitle>`);
      lines.push(`        <CardDescription>${playgroundState.description}</CardDescription>`);
      if (playgroundState.showHeaderAction) {
        lines.push(`        <CardAction>`);
        lines.push(`          <Button size="sm" variant="outline">Settings</Button>`);
        lines.push(`        </CardAction>`);
      }
      lines.push(`      </CardHeader>`);
    }

    if (playgroundState.showContent) {
      lines.push(`      <CardContent>`);
      lines.push(`        <p className="text-sm text-[#64748B]">`);
      lines.push(`          Card content seamlessly inherits typographic and spacing hierarchy.`);
      lines.push(`        </p>`);
      lines.push(`      </CardContent>`);
    }

    if (playgroundState.showFooter && playgroundState.footerActionType !== "none") {
      lines.push(`      <CardFooter className="justify-between">`);
      if (playgroundState.footerActionType === "double") {
        lines.push(`        <Button size="sm" variant="ghost">Cancel</Button>`);
        lines.push(`        <Button size="sm">Save Changes</Button>`);
      } else {
        lines.push(`        <Button size="sm" className="w-full">Continue</Button>`);
      }
      lines.push(`      </CardFooter>`);
    }

    lines.push(`    </Card>`);
    lines.push(`  );`);
    lines.push(`}`);
    return lines.join("\n");
  }, [playgroundState]);

  // 2. CLI Installation Snippet
  const cliSnippet = `// 1. Install via Mintforge CLI
npx mintforge add card

// 2. Or manual import into your React components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`;

  // 3. Patterns Snippet
  const patternsSnippet = `// Pattern A: Header Action (Button or Badge in header)
<Card>
  <CardHeader>
    <CardTitle>API Key Provisioning</CardTitle>
    <CardDescription>Secret credentials for telemetry.</CardDescription>
    <CardAction>
      <Button size="sm" variant="outline">Revoke</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-xs font-mono">sk_live_94827018a...</p>
  </CardContent>
</Card>

// Pattern B: Statistics / KPI Metric Card
<Card size="sm">
  <CardHeader>
    <CardDescription>Monthly Recurring Revenue</CardDescription>
    <CardTitle className="text-2xl font-bold">$124,500</CardTitle>
    <CardAction>
      <span className="text-xs font-bold text-emerald-600">+14.8%</span>
    </CardAction>
  </CardHeader>
</Card>

// Pattern C: Compact High-Density Card
<Card size="sm">
  <CardHeader>
    <CardTitle>Compact Task</CardTitle>
    <CardDescription>Density-optimized for sidebar widgets.</CardDescription>
  </CardHeader>
  <CardFooter className="justify-end gap-2">
    <Button size="sm" variant="ghost">Skip</Button>
    <Button size="sm">Done</Button>
  </CardFooter>
</Card>`;

  // 4. Source Code
  const sourceCode = `import * as React from "react";

export type CardSize = "default" | "sm";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        data-size={size}
        className={\`group/card rounded-xl border border-[#E5E7EB] bg-white text-[#111827] shadow-xs transition-shadow hover:shadow-sm \${
          size === "sm" ? "text-sm" : ""
        } \${className}\`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={\`grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1.5 p-6 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:gap-1 \${className}\`}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <h3
        ref={ref}
        data-slot="card-title"
        className={\`col-start-1 text-lg font-semibold leading-none tracking-tight text-[#111827] group-data-[size=sm]/card:text-base \${className}\`}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={\`col-start-1 text-sm text-[#64748B] group-data-[size=sm]/card:text-xs \${className}\`}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={\`col-start-2 row-span-2 row-start-1 flex items-center justify-end self-start gap-2 \${className}\`}
        {...props}
      />
    );
  }
);
CardAction.displayName = "CardAction";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={\`col-span-2 p-6 pt-0 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:pt-0 \${className}\`}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={\`flex items-center p-6 pt-0 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:pt-0 \${className}\`}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";`;

  const activeSnippet =
    activeTab === "playground"
      ? playgroundSnippet
      : activeTab === "cli"
      ? cliSnippet
      : activeTab === "patterns"
      ? patternsSnippet
      : sourceCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-4 mb-14">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-[#111827]">
          Code &amp; Integration
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
        >
          {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy Code"}</span>
        </button>
      </div>

      <div className="mf-dark-terminal">
        {/* Terminal Header Tabs */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0F19] border-b border-[#1E293B]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("playground")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "playground"
                  ? "bg-[#1E293B] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <FileCode2 size={13} />
              <span>Playground Code</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cli")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "cli"
                  ? "bg-[#1E293B] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Terminal size={13} />
              <span>CLI &amp; Import</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("patterns")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "patterns"
                  ? "bg-[#1E293B] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Layers size={13} />
              <span>Key Patterns</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("source")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "source"
                  ? "bg-[#1E293B] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <BookOpen size={13} />
              <span>Source (card.tsx)</span>
            </button>
          </div>
        </div>

        {/* Code Renderer */}
        <div className="p-4 overflow-x-auto max-h-[500px]">
          <CardCodeHighlighter code={activeSnippet} />
        </div>
      </div>
    </div>
  );
}
