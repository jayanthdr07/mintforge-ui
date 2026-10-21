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
import {
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * 1. Basic Card (Section 4.A)
 * -----------------------------------------------------------------------------------------------*/
export function BasicCardExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Basic Card</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.A
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Standard layout with title, description, content body, and metadata footer with balanced vertical rhythm.
        </p>

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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 2. Card With Header Action (Section 4.B)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithHeaderActionExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Card With Header Action</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.B
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Uses <code>CardAction</code> to position controls in the top-right without colliding with headings.
        </p>

        <div className="space-y-4 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Example 1: Button Action */}
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

          {/* Example 2: Badge Action */}
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 3. Compact Card (Section 4.C)
 * -----------------------------------------------------------------------------------------------*/
export function CompactCardExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Compact vs Default Density</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.C
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          The <code>size=&quot;sm&quot;</code> prop condenses padding to 16px and scales typography for compact sidebars.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Default Size */}
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

          {/* Compact Size */}
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 4. Card With Footer Actions (Section 4.D)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithFooterActionsExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Card With Footer Actions</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.D
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Common action patterns: Save &amp; Cancel, View Details, Accept &amp; Decline, and Checkout.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Save & Cancel */}
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

          {/* Continue to Checkout */}
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 5. Card With Image or Media (Section 4.E)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithMediaExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Card With Image / Media</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.E
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Top banner image seamlessly clipped to the card&apos;s outer rounded corners without overflow.
        </p>

        <div className="flex justify-center p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          <Card className="w-full max-w-sm overflow-hidden">
            {/* Media Banner */}
            <div className="h-36 w-full bg-gradient-to-r from-[#5145FF] to-[#8B5CF6] p-4 flex flex-col justify-between text-white relative">
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 6. Information and Statistics Card (Section 4.F)
 * -----------------------------------------------------------------------------------------------*/
export function StatisticsCardExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Information &amp; Statistics Card</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.F
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Clear visual metric hierarchy with realistic summary statistics, status pills, and trend indicators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Metric 1 */}
          <Card size="sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium">Monthly Active Teams</CardDescription>
              <CardTitle className="text-2xl font-bold">1,482</CardTitle>
              <CardAction>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <TrendingUp size={12} /> +14.2%
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-[#64748B]">Compared to previous 30-day billing cycle.</p>
            </CardContent>
          </Card>

          {/* Metric 2 */}
          <Card size="sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium">Contract Drift Prevention</CardDescription>
              <CardTitle className="text-2xl font-bold">99.8%</CardTitle>
              <CardAction>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
                  <Shield size={12} /> Verified
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-[#64748B]">12,408 endpoint calls checked against Pydantic models.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
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

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Card With Form Content</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.G
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Clean integration with form controls, validation labels, and submission actions.
        </p>

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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 8. Interactive or Clickable Card (Section 4.H)
 * -----------------------------------------------------------------------------------------------*/
export function InteractiveCardExample() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Interactive / Clickable Card</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.H
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Accessible card navigation with keyboard focus indicators and zero nested button tag violations.
        </p>

        <div className="space-y-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Card 1 */}
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

          {/* Card 2 */}
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 9. Card With Badges and Status (Section 4.I)
 * -----------------------------------------------------------------------------------------------*/
export function CardWithBadgesAndStatusExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Badges &amp; Status Indicators</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.I
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Clear visual indicators such as <code>Featured</code>, <code>Active</code>, and <code>Completed</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Card 1: Featured Project */}
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

          {/* Card 2: Completed Milestone */}
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 10. Card Content Spacing (Section 4.J)
 * -----------------------------------------------------------------------------------------------*/
export function CardContentSpacingExample() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">Card Content Spacing</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Section 4.J
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Demonstrates how spacing between sections remains balanced even when headers or footers are omitted.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F8F9FC] rounded-xl border border-[#EEF2F6]">
          {/* Content-Only Card (No Header) */}
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

          {/* Header + Footer Only (No Body) */}
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
      </div>
    </div>
  );
}
