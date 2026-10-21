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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CardCodeHighlighter } from "./card-code-highlighter";
import {
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * Reusable Showcase Card Container with Preview / Code Toggle
 * -----------------------------------------------------------------------------------------------*/
interface ShowcaseCardProps {
  title: string;
  sectionBadge: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

function ShowcaseCard({
  title,
  sectionBadge,
  description,
  code,
  children,
}: ShowcaseCardProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#111827]">{title}</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {sectionBadge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center bg-[#F8F9FC] border border-[#E5E7EB] rounded-lg p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setView("preview")}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                  view === "preview"
                    ? "bg-white text-[#5145FF] font-semibold shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setView("code")}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                  view === "code"
                    ? "bg-white text-[#5145FF] font-semibold shadow-2xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Code
              </button>
            </div>
            {view === "code" && (
              <button
                type="button"
                onClick={handleCopy}
                title="Copy Code"
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:text-[#111827] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-[#64748B] mb-5">{description}</p>

        {view === "preview" ? (
          children
        ) : (
          <div className="mf-dark-terminal p-3 max-h-[340px] overflow-y-auto">
            <CardCodeHighlighter code={code} />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 1. Basic Card (Section 4.A)
 * -----------------------------------------------------------------------------------------------*/
export function BasicCardExample() {
  const code = `import {
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
        <CardDescription>
          Manage organization members and workspace access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Invite collaborators to join your design system repositories and review published components.
        </p>
      </CardContent>
      <CardFooter className="justify-between text-xs text-[#64748B] border-t border-[#EEF2F6] pt-4 mt-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Users size={14} className="text-[#5145FF]" /> 8 active members
        </span>
        <span className="text-[11px] text-[#94A3B8]">Updated 2h ago</span>
      </CardFooter>
    </Card>
  );
}`;

  return (
    <ShowcaseCard
      title="Basic Card"
      sectionBadge="Section 4.A"
      description="Standard layout with title, description, content body, and metadata footer with balanced vertical rhythm."
      code={code}
    >
      <div className="flex justify-center p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Team Workspace</CardTitle>
            <CardDescription>Manage organization members and workspace access.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Invite collaborators to join your design system repositories and review published components.
            </p>
          </CardContent>
          <CardFooter className="justify-between text-xs text-[#64748B] border-t border-[#EEF2F6] pt-4 mt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Users size={14} className="text-[#5145FF]" /> 8 active members
            </span>
            <span className="text-[11px] text-[#94A3B8]">Updated 2h ago</span>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 2. Card With Header Action (Section 4.B)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithHeaderActionExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeaderActionDemo() {
  return (
    <div className="space-y-4">
      {/* Action Button */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>API Key Provisioning</CardTitle>
          <CardDescription>Production endpoints and telemetry secret tokens.</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline" className="text-xs h-8">
              Revoke
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 flex items-center justify-between">
            <span>sk_live_94827018a...</span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Badge */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Continuous Integration</CardTitle>
          <CardDescription>Automated tests running against PR #18.</CardDescription>
          <CardAction>
            <Badge variant="success" appearance="soft" size="sm">
              Passing
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[#64748B]">All 12 backend scanners passed cleanly.</p>
        </CardContent>
      </Card>
    </div>
  );
}`;

  return (
    <ShowcaseCard
      title="Card With Header Action"
      sectionBadge="Section 4.B"
      description="Uses CardAction to position controls in the top-right without colliding with headings."
      code={code}
    >
      <div className="space-y-4 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>API Key Provisioning</CardTitle>
            <CardDescription>Production endpoints and telemetry secret tokens.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline" className="text-xs h-8">
                Revoke
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 flex items-center justify-between">
              <span>sk_live_94827018a...</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Continuous Integration</CardTitle>
            <CardDescription>Automated tests running against PR #18.</CardDescription>
            <CardAction>
              <Badge variant="success" appearance="soft" size="sm">
                Passing
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">All 12 backend scanners and drift checks passed cleanly.</p>
          </CardContent>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 3. Compact Card (Section 4.C)
 * -----------------------------------------------------------------------------------------------*/
export function CompactCardExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DensityComparisonDemo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Default (24px padding) */}
      <Card size="default">
        <CardHeader>
          <CardTitle>Default Size</CardTitle>
          <CardDescription>Padding: 24px (p-6)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#64748B]">Generous spacing for dashboards.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Compact (16px padding) */}
      <Card size="sm">
        <CardHeader>
          <CardTitle>Compact Size</CardTitle>
          <CardDescription>Padding: 16px (p-4)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[#64748B]">High-density spacing for sidebars.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline" className="h-7 text-xs">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`;

  return (
    <ShowcaseCard
      title="Compact vs Default Density"
      sectionBadge="Section 4.C"
      description="The size=&quot;sm&quot; prop condenses padding to 16px and scales typography for compact sidebars."
      code={code}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card size="default" className="w-full">
          <CardHeader>
            <CardTitle>Default Size</CardTitle>
            <CardDescription>Padding: 24px (p-6)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#64748B]">
              Generous spacing suited for standalone widgets and primary dashboards.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card size="sm" className="w-full">
          <CardHeader>
            <CardTitle>Compact Size</CardTitle>
            <CardDescription>Padding: 16px (p-4)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">
              Condensed spacing suited for high-density tables and sidebars.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Action
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 4. Card With Footer Actions (Section 4.D)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithFooterActionsExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FooterActionsDemo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Pattern 1: Discard / Cancel */}
      <Card size="sm">
        <CardHeader>
          <CardTitle>Discard Changes?</CardTitle>
          <CardDescription>Unsaved draft will be lost.</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end gap-2">
          <Button size="sm" variant="ghost">Cancel</Button>
          <Button size="sm" variant="destructive">Discard</Button>
        </CardFooter>
      </Card>

      {/* Pattern 2: Upgrade Checkout */}
      <Card size="sm">
        <CardHeader>
          <CardTitle>Pro Plan Upgrade</CardTitle>
          <CardDescription>$29/month per active seat.</CardDescription>
        </CardHeader>
        <CardFooter className="justify-between items-center">
          <span className="text-xs font-bold text-[#111827]">$29.00</span>
          <Button size="sm">Continue to Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`;

  return (
    <ShowcaseCard
      title="Card With Footer Actions"
      sectionBadge="Section 4.D"
      description="Common action patterns: Save & Cancel, View Details, Accept & Decline, and Checkout."
      code={code}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Discard Changes?</CardTitle>
            <CardDescription>Unsaved work in draft will be lost.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">Are you sure you want to revert to the published version?</p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button size="sm" variant="ghost" className="h-8 text-xs">
              Cancel
            </Button>
            <Button size="sm" variant="destructive" className="h-8 text-xs">
              Discard
            </Button>
          </CardFooter>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Pro Plan Upgrade</CardTitle>
            <CardDescription>$29/month per active seat.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">Includes unlimited private registries and Seam Check.</p>
          </CardContent>
          <CardFooter className="justify-between items-center">
            <span className="text-xs font-bold text-[#111827]">$29.00</span>
            <Button size="sm" className="h-8 text-xs">
              Continue to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 5. Card With Image or Media (Section 4.E)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithMediaExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MediaCardDemo() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {/* Top Banner Media */}
      <div className="h-36 w-full bg-gradient-to-r from-[#5145FF] to-[#8B5CF6] p-4 flex flex-col justify-between text-white">
        <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded w-max">
          Design System
        </span>
        <h4 className="text-lg font-bold">Universal Tokens</h4>
      </div>

      <CardHeader className="pt-4">
        <CardTitle>Color & Typography Engine</CardTitle>
        <CardDescription>Calibrated for web & React Native.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[#64748B]">
          Tokens adapt seamlessly between Tailwind utility classes and native stylesheets.
        </p>
      </CardContent>
      <CardFooter className="justify-between border-t border-[#EEF2F6] pt-3">
        <span className="text-xs font-medium text-[#5145FF]">v2.4 Ready</span>
        <Button size="sm" variant="outline" className="text-xs h-8">Explore Tokens</Button>
      </CardFooter>
    </Card>
  );
}`;

  return (
    <ShowcaseCard
      title="Card With Image / Media"
      sectionBadge="Section 4.E"
      description="Top banner image seamlessly clipped to the card's outer rounded corners without overflow."
      code={code}
    >
      <div className="flex justify-center p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card className="w-full max-w-sm overflow-hidden" interactive>
          <div className="h-36 w-full bg-gradient-to-r from-[#5145FF] to-[#8B5CF6] p-4 flex flex-col justify-between text-white relative overflow-hidden transition-transform duration-500 ease-out group-hover/card:scale-[1.03]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                Design System
              </span>
              <Sparkles size={16} className="text-white/80" />
            </div>
            <div>
              <p className="text-xs text-white/80 font-medium">Mintforge Foundation</p>
              <h4 className="text-lg font-bold">Universal Tokens</h4>
            </div>
          </div>

          <CardHeader className="pt-4">
            <CardTitle>Color &amp; Typography Engine</CardTitle>
            <CardDescription>Cross-platform variables calibrated for web &amp; React Native.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Tokens automatically adapt between HSL Tailwind utility classes and native stylesheet objects.
            </p>
          </CardContent>
          <CardFooter className="justify-between border-t border-[#EEF2F6] pt-3">
            <span className="text-xs font-medium text-[#5145FF]">v2.4 Ready</span>
            <Button size="sm" variant="outline" className="text-xs h-8">
              Explore Tokens
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 6. Information and Statistics Card (Section 4.F)
 * -----------------------------------------------------------------------------------------------*/
export function StatisticsCardExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, Shield } from "lucide-react";

export function StatisticsCardDemo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Metric 1 */}
      <Card size="sm" interactive>
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">Monthly Active Teams</CardDescription>
          <CardTitle className="text-2xl font-bold">1,482</CardTitle>
          <CardAction>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <TrendingUp size={12} /> +14.2%
            </span>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-[11px] text-[#64748B]">Compared to previous 30-day billing cycle.</p>
        </CardContent>
      </Card>

      {/* Metric 2 */}
      <Card size="sm" interactive>
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">Contract Drift Prevention</CardDescription>
          <CardTitle className="text-2xl font-bold">99.8%</CardTitle>
          <CardAction>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5145FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5145FF]" />
              </span>
              <Shield size={12} /> Verified
            </span>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-[11px] text-[#64748B]">12,408 endpoint calls checked against Pydantic models.</p>
        </CardContent>
      </Card>
    </div>
  );
}`;

  return (
    <ShowcaseCard
      title="Information & Statistics Card"
      sectionBadge="Section 4.F"
      description="Clear visual metric hierarchy with realistic summary statistics, status pills, and trend indicators."
      code={code}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card size="sm" interactive>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Monthly Active Teams</CardDescription>
            <CardTitle className="text-2xl font-bold">1,482</CardTitle>
            <CardAction>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <TrendingUp size={12} /> +14.2%
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-[#64748B]">Compared to previous 30-day billing cycle.</p>
          </CardContent>
        </Card>

        <Card size="sm" interactive>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Contract Drift Prevention</CardDescription>
            <CardTitle className="text-2xl font-bold">99.8%</CardTitle>
            <CardAction>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5145FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5145FF]"></span>
                </span>
                <Shield size={12} /> Verified
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-[#64748B]">12,408 endpoint calls checked against Pydantic models.</p>
          </CardContent>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 7. Card With Form Content (Section 4.G)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithFormExample() {
  const [projectName, setProjectName] = React.useState("ecommerce-dashboard");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const code = `import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
}`;

  return (
    <ShowcaseCard
      title="Card With Form Content"
      sectionBadge="Section 4.G"
      description="Clean integration with form controls, validation labels, and submission actions."
      code={code}
    >
      <div className="flex justify-center p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Create Repository</CardTitle>
              <CardDescription>Initialize a new component library repo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-component-system"
                required
              />
              <Input
                label="Description"
                placeholder="Optional brief description"
              />
            </CardContent>
            <CardFooter className="justify-between border-t border-[#EEF2F6] pt-4 mt-2">
              <Button type="button" variant="ghost" size="sm" className="text-xs h-8">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs h-8">
                {submitted ? "Created!" : "Create Project"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 8. Interactive or Clickable Card (Section 4.H)
 * -----------------------------------------------------------------------------------------------*/
export function InteractiveCardExample() {
  const [clicked, setClicked] = React.useState(false);

  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function ClickableCardDemo() {
  return (
    <div
      role="button"
      tabIndex={0}
      className="group block outline-none cursor-pointer"
    >
      <Card
        size="sm"
        className="transition-all duration-200 group-hover:border-[#5145FF]/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-[#5145FF] group-focus-visible:ring-offset-2"
      >
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
}`;

  return (
    <ShowcaseCard
      title="Interactive / Clickable Card"
      sectionBadge="Section 4.H"
      description="Accessible card navigation with keyboard focus indicators and zero nested button tag violations."
      code={code}
    >
      <div className="space-y-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setClicked(true);
            setTimeout(() => setClicked(false), 1500);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setClicked(true);
              setTimeout(() => setClicked(false), 1500);
            }
          }}
          className="group block outline-none cursor-pointer"
        >
          <Card
            size="sm"
            className={`transition-all duration-200 group-hover:border-[#5145FF]/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-[#5145FF] group-focus-visible:ring-offset-2 ${
              clicked ? "border-[#5145FF] bg-[#F2F0FF]/30" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>FastAPI &amp; Express Bridge</span>
                <ChevronRight
                  size={16}
                  className="text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#5145FF]"
                />
              </CardTitle>
              <CardDescription>
                {clicked ? "Navigating to documentation..." : "Inspect automated schema translation rules."}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div
          role="button"
          tabIndex={0}
          className="group block outline-none cursor-pointer"
        >
          <Card
            size="sm"
            className="transition-all duration-200 group-hover:border-[#5145FF]/40 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-[#5145FF] group-focus-visible:ring-offset-2"
          >
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Universal Figma Sync</span>
                <ExternalLink
                  size={15}
                  className="text-[#94A3B8] transition-colors group-hover:text-[#5145FF]"
                />
              </CardTitle>
              <CardDescription>Export design tokens to Tailwind JSON tokens.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 9. Card With Badges and Status (Section 4.I)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithBadgesAndStatusExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BadgesAndStatusDemo() {
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
}`;

  return (
    <ShowcaseCard
      title="Badges & Status Indicators"
      sectionBadge="Section 4.I"
      description="Clear visual indicators such as Featured, Active, and Completed."
      code={code}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card size="sm">
          <CardHeader>
            <div className="flex items-center gap-1.5 mb-1">
              <Badge variant="brand" appearance="soft" size="xs">
                Featured
              </Badge>
              <Badge variant="neutral" appearance="soft" size="xs">
                v2.0
              </Badge>
            </div>
            <CardTitle className="text-sm">Seam Contract Suite</CardTitle>
            <CardDescription>AI-native runtime drift monitor.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">Automated detection for snake_case and camelCase drift.</p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <div className="flex items-center gap-1.5 mb-1">
              <Badge variant="success" appearance="soft" size="xs">
                Completed
              </Badge>
            </div>
            <CardTitle className="text-sm">Universal Button Group</CardTitle>
            <CardDescription>Shipped in PR #17.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-[#64748B]">Zero extra dependencies with collapsed borders.</p>
          </CardContent>
        </Card>
      </div>
    </ShowcaseCard>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 10. Card Content Spacing (Section 4.J)
 * -----------------------------------------------------------------------------------------------*/
export function CardContentSpacingExample() {
  const code = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SpacingDemo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Content Only (No Header Container) */}
      <Card size="sm">
        <CardContent className="pt-4">
          <h4 className="text-sm font-semibold">No Header Container</h4>
          <p className="text-xs text-[#64748B]">CardContent maintains top padding when header is omitted.</p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button size="sm" variant="outline" className="text-xs h-7">Dismiss</Button>
        </CardFooter>
      </Card>

      {/* Header + Footer Only (No Content Body) */}
      <Card size="sm">
        <CardHeader>
          <CardTitle className="text-sm">Compact Status</CardTitle>
          <CardDescription>Direct footer pairing without body.</CardDescription>
        </CardHeader>
        <CardFooter className="justify-between pt-1">
          <span className="text-xs text-emerald-600 font-medium">Operational</span>
          <Button size="sm" variant="ghost" className="text-xs h-7">Logs</Button>
        </CardFooter>
      </Card>
    </div>
  );
}`;

  return (
    <ShowcaseCard
      title="Card Content Spacing"
      sectionBadge="Section 4.J"
      description="Demonstrates how spacing between sections remains balanced even when headers or footers are omitted."
      code={code}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
        <Card size="sm">
          <CardContent className="pt-4">
            <span className="text-[10px] uppercase font-bold text-[#5145FF] tracking-wider">Quick Notice</span>
            <h4 className="text-sm font-semibold text-[#111827] mt-1 mb-1">No Header Container</h4>
            <p className="text-xs text-[#64748B]">
              CardContent maintains top padding when Header is omitted, ensuring text never touches the outer border.
            </p>
          </CardContent>
          <CardFooter className="pt-2">
            <Button size="sm" variant="outline" className="text-xs h-7">
              Dismiss
            </Button>
          </CardFooter>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-sm">Compact Status</CardTitle>
            <CardDescription>Direct footer pairing without body container.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-between pt-1">
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> Operational
            </span>
            <Button size="sm" variant="ghost" className="text-xs h-7">
              Logs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseCard>
  );
}
