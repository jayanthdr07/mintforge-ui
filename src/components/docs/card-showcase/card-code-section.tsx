"use client";

import * as React from "react";
import { CardPlaygroundState } from "./card-playground";
import { CardCodeHighlighter } from "./card-code-highlighter";
import {
  Copy,
  Check,
  Terminal,
  FileCode2,
  Layers,
  BookOpen,
  Boxes,
} from "lucide-react";

interface CardCodeSectionProps {
  playgroundState: CardPlaygroundState;
}

type MainTab = "playground" | "primitives" | "examples" | "source" | "cli";
type PrimitiveTab =
  | "Card"
  | "CardHeader"
  | "CardTitle"
  | "CardDescription"
  | "CardAction"
  | "CardContent"
  | "CardFooter";

type ExampleTab =
  | "basic"
  | "header-action"
  | "compact"
  | "footer-actions"
  | "media"
  | "statistics"
  | "form"
  | "interactive"
  | "badges"
  | "spacing";

export function CardCodeSection({ playgroundState }: CardCodeSectionProps) {
  const [activeTab, setActiveTab] = React.useState<MainTab>("playground");
  const [activePrimitive, setActivePrimitive] = React.useState<PrimitiveTab>("Card");
  const [activeExample, setActiveExample] = React.useState<ExampleTab>("basic");
  const [activePm, setActivePm] = React.useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
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

  // 2. Individual Component Primitives Code
  const primitiveSnippets: Record<PrimitiveTab, string> = {
    Card: `// 1. Root Container Primitive: Card
import { Card } from "@/components/ui/card";

// Default Size (p-6 / 24px internal padding)
<Card className="w-full max-w-sm">
  {/* Composable children slots */}
</Card>

// Compact Size (p-4 / 16px internal padding for sidebars)
<Card size="sm" className="w-full">
  {/* High density content */}
</Card>`,

    CardHeader: `// 2. Header Container Primitive: CardHeader
import { CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

<CardHeader>
  <CardTitle>Team Workspace</CardTitle>
  <CardDescription>Manage organization members and workspace access.</CardDescription>
  <CardAction>
    <Button size="sm" variant="outline">Settings</Button>
  </CardAction>
</CardHeader>`,

    CardTitle: `// 3. Heading Primitive: CardTitle
import { CardTitle } from "@/components/ui/card";

// Renders semantic <h3> with automatic font scale (text-lg on default, text-base on sm)
<CardTitle>Enterprise Analytics</CardTitle>
<CardTitle className="text-emerald-600">Active Pipeline</CardTitle>`,

    CardDescription: `// 4. Supporting Text Primitive: CardDescription
import { CardDescription } from "@/components/ui/card";

// Renders semantic <p> with muted text color (#64748B) and balanced line-height
<CardDescription>
  Real-time telemetry, transaction volumes, and latency spikes across nodes.
</CardDescription>`,

    CardAction: `// 5. Header Action Primitive: CardAction
import { CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Positions controls in top-right without colliding with CardTitle / CardDescription
<CardAction>
  <Button size="sm" variant="outline">Revoke</Button>
</CardAction>

// Or status indicator badge
<CardAction>
  <Badge variant="success" appearance="soft" size="sm">Passing</Badge>
</CardAction>`,

    CardContent: `// 6. Content Body Primitive: CardContent
import { CardContent } from "@/components/ui/card";

// Main container body (p-6 pt-0 in default mode, p-4 pt-0 in sm mode)
<CardContent>
  <p className="text-sm text-[#64748B] leading-relaxed">
    Includes unlimited event streaming and custom dashboard widgets.
  </p>
</CardContent>`,

    CardFooter: `// 7. Footer Action Bar Primitive: CardFooter
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Bottom action bar with flex alignment (justify-between, justify-end, or full-width)
<CardFooter className="justify-between">
  <span className="text-xs text-[#64748B]">8 active seats</span>
  <Button size="sm">Manage Plan</Button>
</CardFooter>`,
  };

  // 3. Examples Code Snippets
  const exampleSnippets: Record<ExampleTab, string> = {
    basic: `// Section 4.A: Basic Card
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export function BasicCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Team Workspace</CardTitle>
        <CardDescription>Manage organization members and workspace access.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[#64748B]">Invite collaborators to review published components.</p>
      </CardContent>
      <CardFooter className="justify-between text-xs text-[#64748B] border-t border-[#EEF2F6] pt-4 mt-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Users size={14} className="text-[#5145FF]" /> 8 active members
        </span>
        <span className="text-[11px] text-[#94A3B8]">Updated 2h ago</span>
      </CardFooter>
    </Card>
  );
}`,

    "header-action": `// Section 4.B: Card With Header Action
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeaderActionDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Key Provisioning</CardTitle>
        <CardDescription>Production endpoints and telemetry secret tokens.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Revoke</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-mono">sk_live_94827018a...</p>
      </CardContent>
    </Card>
  );
}`,

    compact: `// Section 4.C: Compact vs Default Size Comparison
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CompactDemo() {
  return (
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Compact Sidebar Widget</CardTitle>
        <CardDescription>Padding: 16px (p-4)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[#64748B]">Density-optimized for sidebars and small viewports.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">Action</Button>
      </CardFooter>
    </Card>
  );
}`,

    "footer-actions": `// Section 4.D: Card With Footer Actions
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FooterActionsDemo() {
  return (
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Discard Changes?</CardTitle>
        <CardDescription>Unsaved draft will be lost.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="ghost">Cancel</Button>
        <Button size="sm" variant="destructive">Discard</Button>
      </CardFooter>
    </Card>
  );
}`,

    media: `// Section 4.E: Card With Image / Media Banner
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MediaCardDemo() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="h-36 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl" />
      <CardHeader className="pt-4">
        <CardTitle>Universal Design Tokens</CardTitle>
        <CardDescription>Calibrated for web and React Native.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[#64748B]">Tokens adapt between Tailwind utilities and native styles.</p>
      </CardContent>
      <CardFooter className="justify-between border-t border-[#EEF2F6] pt-3">
        <span className="text-xs text-[#5145FF]">v2.4</span>
        <Button size="sm" variant="outline">Explore</Button>
      </CardFooter>
    </Card>
  );
}`,

    statistics: `// Section 4.F: Information and Statistics Card
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function StatsCardDemo() {
  return (
    <Card size="sm" interactive className="w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs">Monthly Recurring Revenue</CardDescription>
        <CardTitle className="text-2xl font-bold">$124,500</CardTitle>
        <CardAction>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <TrendingUp size={12} /> +14.8%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-[11px] text-[#64748B]">Compared to previous 30-day billing cycle.</p>
      </CardContent>
    </Card>
  );
}`,

    form: `// Section 4.G: Card With Form Content
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={(e) => e.preventDefault()}>
        <CardHeader>
          <CardTitle>Create Repository</CardTitle>
          <CardDescription>Initialize a new component library repo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input label="Project Name" defaultValue="ecommerce-dashboard" required />
          <Input label="Description" placeholder="Optional brief description" />
        </CardContent>
        <CardFooter className="justify-between border-t border-[#EEF2F6] pt-4 mt-2">
          <Button type="button" variant="ghost" size="sm">Cancel</Button>
          <Button type="submit" size="sm">Create Project</Button>
        </CardFooter>
      </form>
    </Card>
  );
}`,

    interactive: `// Section 4.H: Interactive / Clickable Card
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function ClickableCardDemo() {
  return (
    <div role="button" tabIndex={0} className="group block outline-none cursor-pointer">
      <Card size="sm" className="transition-all duration-200 group-hover:border-[#5145FF]/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-[#5145FF]">
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            <span>FastAPI & Express Bridge</span>
            <ChevronRight size={16} className="text-[#94A3B8] group-hover:text-[#5145FF] group-hover:translate-x-1 transition-transform" />
          </CardTitle>
          <CardDescription>Inspect automated schema translation rules.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}`,

    badges: `// Section 4.I: Badges and Status Indicators
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BadgesDemo() {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-1.5 mb-1">
          <Badge variant="brand" appearance="soft" size="xs">Featured</Badge>
          <Badge variant="neutral" appearance="soft" size="xs">v2.0</Badge>
        </div>
        <CardTitle className="text-sm">Seam Contract Suite</CardTitle>
        <CardDescription>AI-native runtime drift monitor.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[#64748B]">Automated detection for snake_case and camelCase drift.</p>
      </CardContent>
    </Card>
  );
}`,

    spacing: `// Section 4.J: Content Spacing Variations
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContentOnlyDemo() {
  return (
    <Card size="sm">
      <CardContent className="pt-4">
        <h4 className="text-sm font-semibold">No Header Container</h4>
        <p className="text-xs text-[#64748B]">CardContent maintains top padding when Header is omitted.</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button size="sm" variant="outline">Dismiss</Button>
      </CardFooter>
    </Card>
  );
}`,
  };

  // 4. Source Code (`src/components/ui/card.tsx`)
  const sourceCode = `import * as React from "react";

export type CardSize = "default" | "sm";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      size = "default",
      interactive = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        data-size={size}
        data-interactive={interactive ? "true" : undefined}
        className={\`group/card rounded-xl border border-[#E5E7EB] bg-white text-[#111827] shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-md \${
          interactive
            ? "hover:-translate-y-1.5 hover:border-[#5145FF]/45 hover:shadow-lg hover:shadow-[#5145FF]/10 active:scale-[0.985] cursor-pointer"
            : ""
        } \${size === "sm" ? "text-sm" : ""} \${className}\`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

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

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

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

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

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

export type CardActionProps = React.HTMLAttributes<HTMLDivElement>;

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

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

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

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

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

  // 5. Package Managers & CLI Commands
  const cliCommands: Record<"pnpm" | "npm" | "yarn" | "bun", string> = {
    pnpm: `# 1. Install component via Mintforge CLI
pnpm dlx mintforge add card

# 2. Import into your application
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`,
    npm: `# 1. Install component via Mintforge CLI
npx mintforge add card

# 2. Import into your application
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`,
    yarn: `# 1. Install component via Mintforge CLI
yarn dlx mintforge add card

# 2. Import into your application
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`,
    bun: `# 1. Install component via Mintforge CLI
bunx mintforge add card

# 2. Import into your application
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";`,
  };

  const activeSnippet =
    activeTab === "playground"
      ? playgroundSnippet
      : activeTab === "primitives"
      ? primitiveSnippets[activePrimitive]
      : activeTab === "examples"
      ? exampleSnippets[activeExample]
      : activeTab === "source"
      ? sourceCode
      : cliCommands[activePm];

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Code &amp; Integration Hub
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Full code for every component primitive, live customizer output, example templates, and CLI installation.
          </p>
        </div>
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
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0B0F19] border-b border-[#1E293B] gap-2">
          {/* Main Top-Level Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("playground")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "playground"
                  ? "bg-[#1E293B] text-white font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <FileCode2 size={13} />
              <span>Live Playground</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("primitives")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "primitives"
                  ? "bg-[#1E293B] text-white font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Boxes size={13} />
              <span>All Component Primitives</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("examples")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "examples"
                  ? "bg-[#1E293B] text-white font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Layers size={13} />
              <span>All 10 Examples</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("source")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "source"
                  ? "bg-[#1E293B] text-white font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <BookOpen size={13} />
              <span>Source (card.tsx)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cli")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "cli"
                  ? "bg-[#1E293B] text-white font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Terminal size={13} />
              <span>CLI &amp; Install</span>
            </button>
          </div>

          {/* Sub-Tabs / Pills based on active top-level tab */}
          {activeTab === "primitives" && (
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {(
                [
                  "Card",
                  "CardHeader",
                  "CardTitle",
                  "CardDescription",
                  "CardAction",
                  "CardContent",
                  "CardFooter",
                ] as PrimitiveTab[]
              ).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePrimitive(p)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    activePrimitive === p
                      ? "bg-[#5145FF] text-white font-bold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  &lt;{p}&gt;
                </button>
              ))}
            </div>
          )}

          {activeTab === "examples" && (
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {(
                [
                  { id: "basic", label: "Basic" },
                  { id: "header-action", label: "Header Action" },
                  { id: "compact", label: "Compact" },
                  { id: "footer-actions", label: "Footer Actions" },
                  { id: "media", label: "Media" },
                  { id: "statistics", label: "Statistics" },
                  { id: "form", label: "Form" },
                  { id: "interactive", label: "Clickable" },
                  { id: "badges", label: "Badges" },
                  { id: "spacing", label: "Spacing" },
                ] as { id: ExampleTab; label: string }[]
              ).map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setActiveExample(ex.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activeExample === ex.id
                      ? "bg-[#5145FF] text-white font-bold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === "cli" && (
            <div className="flex items-center gap-1 bg-[#141C2E] p-0.5 rounded-md border border-[#1E293B]">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setActivePm(pm)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                    activePm === pm
                      ? "bg-[#1E293B] text-[#34D399] font-bold"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Code Output Canvas */}
        <div className="p-4 overflow-x-auto max-h-[520px]">
          <CardCodeHighlighter code={activeSnippet} />
        </div>
      </div>
    </div>
  );
}
