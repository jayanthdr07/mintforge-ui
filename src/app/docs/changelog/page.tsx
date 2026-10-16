"use client";

import { useState } from "react";
import Link from "next/link";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";

type VersionFilter = "all" | "v0.1.2" | "v0.1.1" | "v0.1.0";

interface ChangelogEntry {
  version: string;
  tag: string;
  date: string;
  title: string;
  summary: string;
  highlights: {
    category: string;
    description: string;
    link?: { label: string; href: string };
  }[];
  codeSnippet?: {
    code: string;
    language: string;
    filename?: string;
  };
}

const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "v0.1.2",
    tag: "Latest",
    date: "October 16, 2026",
    title: "Open Registry Standard & Agent Skills",
    summary:
      "Major ecosystem release introducing decentralized component registries, universal AI Agent Skills for IDEs, and developer monospace typography enhancements.",
    highlights: [
      {
        category: "Open Registry",
        description:
          "Published the Mintforge Open Registry specification, allowing teams and community creators to host and distribute custom UI blocks, hooks, and themes via public Git repositories or static JSON endpoints.",
        link: { label: "Read Open Registry Guide", href: "/docs/registry" },
      },
      {
        category: "Agent Skills",
        description:
          "Added native Agent Skills adhering to open coding agent protocols for Claude Code, Cursor (.cursor/rules), Windsurf, GitHub Copilot, and Antigravity (.agents/skills). Enforces design tokens and stops LLM hallucinations.",
        link: { label: "Explore Agent Skills", href: "/docs/skills" },
      },
      {
        category: "Typography",
        description:
          "Applied JetBrains Mono programming ligatures and Geist Mono font weights across all interactive documentation code viewers and terminal simulators.",
      },
      {
        category: "Developer Experience",
        description:
          "Added universal 'npx skills add mintforge/ui' CLI runner integration for automated assistant onboarding.",
      },
    ],
    codeSnippet: {
      code: `# Add the official Mintforge Agent Skill to your IDE
npx skills add mintforge/ui

# Install components from custom community registries
npx mintforge@latest add @acme/pricing-card`,
      language: "bash",
      filename: "Terminal",
    },
  },
  {
    version: "v0.1.1",
    tag: "Documentation",
    date: "October 15, 2026",
    title: "Component Catalog, AI Elements & Theming Engine",
    summary:
      "Comprehensive redesign of the documentation website, first 6 core UI primitives in the registry, interactive terminal simulators, and LLM-ready AI Elements.",
    highlights: [
      {
        category: "UI Primitives",
        description:
          "Released the foundational 6 accessible primitives: Button (5 variants, loading states), Input (helpers, prefixes), Card (compound structure), Badge (pulse indicators), Dialog (keyboard focus trap), and Tabs.",
        link: { label: "Browse Component Catalog", href: "/docs/components" },
      },
      {
        category: "AI Elements",
        description:
          "Introduced conversational LLM chat primitives including auto-resizing prompt inputs, multi-model dropdown selectors, collapsible reasoning traces, and Vercel AI SDK integration.",
        link: { label: "View AI Elements", href: "/docs/ai-elements" },
      },
      {
        category: "Design Tokens",
        description:
          "Engineered the OKLCH semantic token engine with --mf-* CSS variables, supporting seamless light and dark mode toggling with zero hydration mismatch.",
        link: { label: "Theming & Design Tokens", href: "/docs/theming" },
      },
      {
        category: "Interactive CLI",
        description:
          "Built interactive terminal simulators for init, add, and diff commands with real-time output previews.",
        link: { label: "CLI Documentation", href: "/docs/cli" },
      },
      {
        category: "Typeset",
        description:
          "Standardized typography hierarchy powered by Plus Jakarta Sans for UI text and monospace fonts for technical snippets.",
        link: { label: "Typeset Guide", href: "/docs/typeset" },
      },
    ],
    codeSnippet: {
      code: `// Compound Card & Accessible Button Primitive Usage
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MetricsWidget() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>System Performance</CardTitle>
          <Badge variant="success" pulse>Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">99.98% Uptime</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">View Logs</Button>
      </CardFooter>
    </Card>
  );
}`,
      language: "tsx",
      filename: "src/components/metrics-widget.tsx",
    },
  },
  {
    version: "v0.1.0",
    tag: "Initial Launch",
    date: "October 14, 2026",
    title: "Mintforge UI Project Genesis",
    summary:
      "Initial launch of Mintforge UI by NEXYOUTH Pvt. Ltd. Grounded in React 19, Next.js 16 (App Router + Turbopack), and React Native (Expo 52) parity.",
    highlights: [
      {
        category: "Next.js 16 & React 19",
        description:
          "Initialized full Next.js 16 App Router foundation with partial pre-rendering (PPR), Turbopack CSS loaders, and strict TypeScript contracts.",
      },
      {
        category: "WebGL MagicRings",
        description:
          "Engineered custom WebGL canvas shader with dynamic ambient rings reacting to dark and light mode theme switches in the hero section.",
      },
      {
        category: "Cross-Platform Parity",
        description:
          "Established unified design token architecture shared between web applications and React Native Expo mobile apps.",
      },
      {
        category: "Interactive Landing Page",
        description:
          "Shipped interactive feature explorer, live code preview showcase, framework compatibility cards, and one-click copyable install banners.",
      },
      {
        category: "Accessibility & Standards",
        description:
          "Governed by the Gravitas Engineering Reliability Protocol with zero TypeScript errors and WCAG AAA compliance.",
      },
    ],
    codeSnippet: {
      code: `# Clone and start development
git clone https://github.com/rakshithkumar608/mintforge-ui.git
cd mintforge-ui
npm install
npm run dev`,
      language: "bash",
      filename: "Quickstart",
    },
  },
];

export default function DocsChangelogPage() {
  const [filter, setFilter] = useState<VersionFilter>("all");

  const filteredEntries =
    filter === "all"
      ? CHANGELOG_ENTRIES
      : CHANGELOG_ENTRIES.filter((e) => e.version === filter);

  const tocItems = [
    { id: "overview", title: "Overview" },
    ...CHANGELOG_ENTRIES.map((entry) => ({
      id: entry.version.replace(".", "-").replace(".", "-"),
      title: `${entry.version} — ${entry.title}`,
    })),
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Changelog"
          description="Detailed timeline of releases, new UI primitives, ecosystem milestones, and framework updates for Mintforge UI."
          badge="Release History"
          prevHref="/docs/registry"
          nextHref="/docs/components"
        />

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24">
          <p className="mf-docs-paragraph">
            Mintforge UI is maintained as an open-source design system and universal component library by <strong>NEXYOUTH Pvt. Ltd.</strong> and open-source contributors. We publish updates continuously, adhering to semantic versioning and verifiable reliability standards.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-secondary border border-border rounded-xl my-6">
            <span className="text-[11px] font-bold text-muted-foreground uppercase px-2 tracking-wider">
              Filter:
            </span>
            {(
              [
                { id: "all", label: "All Milestones" },
                { id: "v0.1.2", label: "v0.1.2 (Registry & Skills)" },
                { id: "v0.1.1", label: "v0.1.1 (Primitives & AI)" },
                { id: "v0.1.0", label: "v0.1.0 (Genesis)" },
              ] as { id: VersionFilter; label: string }[]
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-card text-foreground shadow-sm border border-border font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Timeline Stream */}
        <div className="relative border-l border-border ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12 my-8">
          {filteredEntries.map((entry) => {
            const sectionId = entry.version.replace(".", "-").replace(".", "-");
            return (
              <section key={entry.version} id={sectionId} className="relative scroll-mt-24">
                {/* Timeline Node Dot */}
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-brand bg-background flex items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                </div>

                {/* Release Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-brand-subtle text-brand border border-brand/20 font-mono text-xs font-bold">
                      {entry.version}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted-foreground font-medium">
                      {entry.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Calendar size={13} className="text-brand" />
                    <span>{entry.date}</span>
                  </div>
                </div>

                {/* Title & Summary */}
                <h3 className="text-lg font-bold text-foreground mt-2 mb-1.5 tracking-tight">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                  {entry.summary}
                </p>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                  {entry.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-border bg-card hover:border-border-strong transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <CheckCircle2 size={14} className="text-brand shrink-0" />
                          <span className="text-xs font-bold text-foreground">{h.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {h.description}
                        </p>
                      </div>

                      {h.link && (
                        <div className="mt-3 pt-2.5 border-t border-border">
                          <Link
                            href={h.link.href}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
                          >
                            <span>{h.link.label}</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Code Snippet */}
                {entry.codeSnippet && (
                  <div className="mt-4">
                    <ComponentCode
                      code={entry.codeSnippet.code}
                      language={entry.codeSnippet.language}
                      filename={entry.codeSnippet.filename}
                      showLineNumbers={false}
                    />
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Next Steps Footer */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="text-center sm:text-left">
            Ready to explore our accessible component primitives?
          </span>
          <Link
            href="/docs/components"
            className="inline-flex items-center gap-1 text-brand hover:underline font-semibold"
          >
            Browse Component Catalog &rarr;
          </Link>
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
