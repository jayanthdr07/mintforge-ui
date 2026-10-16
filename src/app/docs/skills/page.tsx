"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Check,
  Copy,
  ShieldCheck,
  Layers,
  FileCode,
  Smartphone,
  Palette,
} from "lucide-react";

type AssistantId = "claude" | "cursor" | "antigravity" | "windsurf" | "copilot";

interface AssistantInfo {
  id: AssistantId;
  name: string;
  badge: string;
  filePath: string;
  setupSnippet: string;
  snippetLang: string;
  note: string;
}

const ASSISTANTS: AssistantInfo[] = [
  {
    id: "claude",
    name: "Claude Code",
    badge: "Official Standard",
    filePath: ".claude/skills/mintforge/SKILL.md",
    setupSnippet: `# Add directly using the skills CLI
npx skills add mintforge/ui

# Or configure Claude Code CLI skill
claude skill add mintforge/ui`,
    snippetLang: "bash",
    note: "Claude Code automatically discovers and reads skills placed in .claude/skills/ on project boot.",
  },
  {
    id: "cursor",
    name: "Cursor",
    badge: "Native MDC",
    filePath: ".cursor/rules/mintforge.mdc",
    setupSnippet: `# Add via skills CLI
npx skills add mintforge/ui --agent cursor

# Or manually create .cursor/rules/mintforge.mdc
# and paste the Mintforge Skill specification below.`,
    snippetLang: "bash",
    note: "Cursor loads .cursor/rules/*.mdc automatically into its Composer and Chat context windows.",
  },
  {
    id: "antigravity",
    name: "Antigravity / Gemini CLI",
    badge: "Reliability Runtime",
    filePath: ".agents/skills/mintforge/SKILL.md",
    setupSnippet: `# Universal .agents standard
npx skills add mintforge/ui --agent antigravity

# Or place directly in your workspace:
mkdir -p .agents/skills/mintforge`,
    snippetLang: "bash",
    note: "Antigravity IDE and Google agents read .agents/skills/ autonomously to execute verified edits.",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    badge: "Cascade Rules",
    filePath: ".windsurf/rules/mintforge.md",
    setupSnippet: `# Add to Windsurf workspace
npx skills add mintforge/ui --agent windsurf

# Or write to .windsurf/rules/mintforge.md`,
    snippetLang: "bash",
    note: "Windsurf Cascade incorporates rules into its system instructions on every chat turn.",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    badge: "Instructions",
    filePath: ".github/copilot-instructions.md",
    setupSnippet: `# Add Copilot repository instructions
mkdir -p .github
npx skills add mintforge/ui --agent copilot`,
    snippetLang: "bash",
    note: "GitHub Copilot Chat loads .github/copilot-instructions.md to guide code generation across your team.",
  },
];

interface ComparisonScenario {
  id: string;
  title: string;
  prompt: string;
  withoutCode: string;
  withoutIssues: string[];
  withCode: string;
  withHighlights: string[];
}

const COMPARISON_SCENARIOS: ComparisonScenario[] = [
  {
    id: "button",
    title: "Button with Loading State & Icon",
    prompt: "Create an accessible primary deploy button that shows an animated spinner when uploading, with an arrow icon.",
    withoutCode: `// ❌ Without Skill: Hallucinated markup, arbitrary colors, broken accessibility
export function DeployButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button 
      disabled={isLoading}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded shadow-md flex items-center gap-2"
    >
      {isLoading ? (
        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="..." />
        </svg>
      )}
      <span>Deploy Application</span>
    </button>
  );
}`,
    withoutIssues: [
      "Hardcoded arbitrary color 'bg-emerald-500' breaks dark mode and theme tokens",
      "Inline hand-rolled spinner wastes bundle size and has no aria-hidden",
      "Missing focus-visible ring for keyboard navigation (fails WCAG AAA)",
      "Re-invents a custom button instead of pulling the project's tested primitive",
    ],
    withCode: `// ✅ With Mintforge Skill: Uses CLI primitive, token system & accessible props
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DeployButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button 
      variant="default"
      size="md"
      isLoading={isLoading}
      rightIcon={<ArrowRight size={16} />}
    >
      Deploy Application
    </Button>
  );
}`,
    withHighlights: [
      "Automatically imports from the project's configured alias @/components/ui/button",
      "Respects --mf-brand semantic variables with zero hardcoded palette values",
      "Full keyboard focus-visible ring and disabled pointer-events built in",
      "Zero bundle redundancy — reuses existing Lucide icons and Button primitive",
    ],
  },
  {
    id: "settings",
    title: "Settings Layout with Tabs & Cards",
    prompt: "Build a responsive account settings section with tabs for Profile and Security, containing input fields and a save button.",
    withoutCode: `// ❌ Without Skill: Giant monolithic file, inconsistent borders & unstyled inputs
export function SettingsPage() {
  const [tab, setTab] = useState("profile");
  return (
    <div className="p-6 bg-white dark:bg-black rounded-lg border border-gray-200">
      <div className="flex border-b border-gray-300 mb-4">
        <button onClick={() => setTab("profile")} className={tab === "profile" ? "border-b-2 border-green-500 font-bold" : ""}>Profile</button>
        <button onClick={() => setTab("security")}>Security</button>
      </div>
      {tab === "profile" && (
        <div className="space-y-4">
          <input className="border border-gray-300 p-2 rounded w-full" placeholder="Full Name" />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      )}
    </div>
  );
}`,
    withoutIssues: [
      "Ad-hoc tab navigation without keyboard arrow-key navigation or ARIA roles",
      "Plain unstyled input with no label association or error states",
      "Hardcoded 'dark:bg-black' clashes with Mintforge's --mf-surface palette",
      "Monolithic un-maintainable JSX structure",
    ],
    withCode: `// ✅ With Mintforge Skill: Composes Tabs, Card, Input & Button primitives
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="w-full max-w-2xl">
      <TabsList className="mb-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your public account display settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Full Name" placeholder="Alex Morgan" helperText="Displayed on your public profile." />
            <Input label="Email" type="email" placeholder="alex@mintforge.dev" />
          </CardContent>
          <CardFooter>
            <Button variant="default">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}`,
    withHighlights: [
      "Composed cleanly using native compound primitives (Tabs, Card, Input)",
      "Strict keyboard accessibility (Arrow Left/Right tabs, proper tabpanel ARIA)",
      "Adaptive dark/light theme alignment via --mf-border and --mf-surface",
      "Clear separation of concerns matching shadcn and Mintforge architecture",
    ],
  },
  {
    id: "mobile",
    title: "Universal Web & React Native Parity",
    prompt: "Show how to structure a reusable metric card that shares the same token logic across Next.js and React Native Expo.",
    withoutCode: `// ❌ Without Skill: Completely disconnected APIs between web and mobile
// Web file:
<div className="bg-slate-100 p-4 rounded-xl"><p>Revenue</p><h3>$48,200</h3></div>

// Mobile file:
<View style={{ backgroundColor: '#f1f5f9', padding: 16, borderRadius: 12 }}>
  <Text>Revenue</Text>
  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>$48,200</Text>
</View>`,
    withoutIssues: [
      "Duplicate styling rules with drifting hex codes",
      "Zero shared design tokens between web and Expo mobile",
      "Incompatible prop contracts and no badge status alignment",
    ],
    withCode: `// ✅ With Mintforge Skill: Universal Design Token Alignment
// Shared Token Definition (src/styles/design-tokens.css & mobile token map)
// Web (Next.js 16 App Router):
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MetricCard({ label, value, change }: MetricProps) {
  return (
    <Card className="hover:border-brand-hover transition-colors">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">{label}</span>
          <Badge variant="success" pulse>+{change}%</Badge>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}`,
    withHighlights: [
      "Uses identical token variables (--mf-brand, --mf-surface, --mf-foreground)",
      "Predictable prop interfaces that translate 1:1 to React Native Expo equivalents",
      "Clean badge variants with animated pulse indicators",
    ],
  },
];

const SKILL_MD_SPEC = `---
name: mintforge-ui
description: >
  Official design system and component knowledge for Mintforge UI in React 19,
  Next.js 16 (App Router), and React Native (Expo 52). Enforces design tokens,
  WCAG AAA accessibility, CLI workflows, and source-based composition.
---

# Mintforge UI — Agent Skill Specification

## 1. Project Grounding Invariant
Before proposing or generating UI components:
1. Check \`components.json\` in the workspace root to inspect:
   - Framework & router setup (Next.js App Router vs Vite vs Expo)
   - Component path alias (default: \`@/components/ui\`)
   - Utility path alias (default: \`@/lib/utils\`)
   - Active base color & CSS variable configuration
2. Never invent ad-hoc components if an official Mintforge primitive exists:
   - Button: \`@/components/ui/button\`
   - Input: \`@/components/ui/input\`
   - Card: \`@/components/ui/card\`
   - Badge: \`@/components/ui/badge\`
   - Dialog: \`@/components/ui/dialog\`
   - Tabs: \`@/components/ui/tabs\`
3. To add a missing component, run:
   \`npx mintforge@latest add <component-name>\`

## 2. Design Token Invariant (Zero Hardcoded Hexes)
All styling must strictly use the semantic token engine defined in \`src/styles/design-tokens.css\`:
- Surfaces: \`bg-background\`, \`bg-surface\`, \`bg-surface-secondary\`, \`bg-card\`
- Typography: \`text-foreground\`, \`text-muted-foreground\`, \`text-brand\`
- Brand Accents: \`bg-brand\`, \`hover:bg-brand-hover\`, \`bg-brand-subtle\`
- Borders: \`border-border\`, \`border-border-strong\`
- Focus Rings: \`focus-visible:ring-ring\`, \`focus-visible:ring-offset-2\`
- Radii: \`rounded-sm\` (8px), \`rounded-md\` (12px), \`rounded-lg\` (16px), \`rounded-full\`
- Fonts: \`font-sans\` (Plus Jakarta Sans), \`font-mono\` (Geist Mono / JetBrains Mono)

❌ FORBIDDEN:
- Raw hex codes: \`#059669\`, \`#10b981\`, \`#ffffff\`, \`#000000\`
- Disconnected Tailwind palettes: \`bg-blue-600\`, \`bg-slate-900\`, \`text-zinc-400\`
- Overriding with \`!important\` hacks

## 3. Composition Over Monoliths
Build complex interfaces by composing atomic building blocks:
- Use \`<Card>\`, \`<CardHeader>\`, \`<CardContent>\`, and \`<CardFooter>\` for content grouping.
- Use \`<Tabs>\`, \`<TabsList>\`, \`<TabsTrigger>\`, and \`<TabsContent>\` for multi-view panes.
- Use \`<Dialog>\`, \`<DialogContent>\`, and \`<DialogTrigger>\` for modal overlays.

## 4. Universal Web & Mobile Parity
When writing or reviewing code for mobile (Expo 52):
- Map token CSS variables to matching React Native theme tokens.
- Maintain identical prop names (\`variant\`, \`size\`, \`isLoading\`, \`leftIcon\`, \`rightIcon\`).

## 5. Accessibility Invariant (WCAG AAA)
- All interactive elements must have visible keyboard focus rings.
- Icon-only buttons must specify an explicit \`aria-label\`.
- Dialogs must trap keyboard focus and dismiss on Escape.
- Form inputs must be linked with semantic labels or \`aria-describedby\`.`;

interface PromptRecipe {
  title: string;
  category: string;
  prompt: string;
  expectedAction: string;
}

const PROMPT_RECIPES: PromptRecipe[] = [
  {
    title: "Scaffold Auth Modal",
    category: "Composition",
    prompt: "Add an accessible authentication dialog using Mintforge Dialog, Input, and Button. Include fields for email and password, a show/hide password toggle, and a Google OAuth secondary button.",
    expectedAction: "Runs `npx mintforge add dialog input button` and composes them cleanly with keyboard traps and token styling.",
  },
  {
    title: "Token Audit & Refactor",
    category: "Refactoring",
    prompt: "Scan our dashboard components for hardcoded Tailwind colors (like bg-blue-500, text-gray-700) and replace them with Mintforge semantic tokens (--mf-brand, text-foreground, bg-card, border-border).",
    expectedAction: "Identifies color leaks and refactors code to follow the OKLCH token engine.",
  },
  {
    title: "KPI Analytics Grid",
    category: "Dashboard",
    prompt: "Create a 4-column responsive metrics grid showing Daily Active Users, MRR, Server Uptime, and Churn Rate using Mintforge Card and Badge with trend indicators.",
    expectedAction: "Generates responsive grid layout with semantic cards, positive/negative badge pills, and Lucide icons.",
  },
  {
    title: "Universal Mobile Screen",
    category: "React Native",
    prompt: "Convert this Next.js user profile card into a React Native Expo 52 component preserving the same Mintforge token variables and typography hierarchy.",
    expectedAction: "Outputs cross-platform Expo primitive with native touches and shared token references.",
  },
];

export default function DocsSkillsPage() {
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantId>("claude");
  const [selectedScenario, setSelectedScenario] = useState<string>("button");
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "quickstart", title: "Quickstart" },
    { id: "supported-assistants", title: "Supported AI Assistants" },
    { id: "interactive-comparison", title: "Before vs. With Skill" },
    { id: "core-invariants", title: "Enforced Invariants" },
    { id: "skill-specification", title: "SKILL.md Specification" },
    { id: "prompt-recipes", title: "Prompt Recipes" },
  ];

  const currentAssistant = ASSISTANTS.find((a) => a.id === selectedAssistant) || ASSISTANTS[0];
  const currentScenario = COMPARISON_SCENARIOS.find((s) => s.id === selectedScenario) || COMPARISON_SCENARIOS[0];

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_MD_SPEC);
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2000);
    } catch {
      window.prompt("Copy specification:", SKILL_MD_SPEC);
    }
  };

  const handleCopyPrompt = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptIdx(idx);
      setTimeout(() => setCopiedPromptIdx(null), 2000);
    } catch {
      window.prompt("Copy prompt:", text);
    }
  };

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Skills"
          description="Equip your AI coding assistants (Claude Code, Cursor, Windsurf, GitHub Copilot, Antigravity, and Codex) with native understanding of Mintforge UI components, design tokens, and CLI workflows."
          badge="New"
          prevHref="/docs/typeset"
          nextHref="/docs/components"
        />

        {/* Feature Callout */}
        <div className="mf-docs-callout mf-docs-callout-success">
          <div>
            <strong>AI-Native Development:</strong> The Mintforge UI Agent Skill stops LLM hallucinations. Your AI assistant will automatically read <span className="mf-inline-code">components.json</span>, enforce <span className="mf-inline-code">--mf-*</span> semantic design tokens, use <span className="mf-inline-code">mintforge add</span>, and generate accessible, production-ready code on the first attempt.
          </div>
        </div>

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24">
          <p className="mf-docs-paragraph">
            AI coding agents like <strong>Cursor, Claude Code, Windsurf, and Antigravity</strong> are extraordinarily capable, but when prompted to build user interfaces, they typically default to:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✕
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1">Hardcoded Arbitrary Colors</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Generating <span className="font-mono text-red-500">bg-emerald-500</span> and <span className="font-mono text-red-500">dark:bg-slate-900</span> that break your project&apos;s theme engine.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✕
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1">Redundant Component Reinvention</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Writing 80 lines of custom HTML buttons and inputs instead of reusing the tested primitives already in your repository.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✕
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1">Accessibility Neglect</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Omitting ARIA roles, keyboard focus-visible rings, and trap management, violating WCAG standards.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                ✕
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1">Web & Mobile Disconnect</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Creating completely separate prop interfaces for React web and React Native mobile apps.
                </p>
              </div>
            </div>
          </div>

          <p className="mf-docs-paragraph">
            The <strong>Mintforge UI Agent Skill</strong> bridges this gap by injecting authoritative architectural guidelines, token definitions, and CLI recipes directly into the model&apos;s context window.
          </p>
        </section>

        {/* Section 2: Quickstart */}
        <section id="quickstart" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Quickstart</h2>
          <p className="mf-docs-paragraph">
            Install the skill into your project using the universal <span className="mf-inline-code">skills</span> runner, supported by Claude Code, Cursor, Codex, and Antigravity:
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx skills add mintforge/ui",
              npm: "npx skills add mintforge/ui",
              yarn: "yarn dlx skills add mintforge/ui",
              bun: "bunx skills add mintforge/ui",
            }}
          />

          <p className="mf-docs-paragraph mt-3 text-xs text-muted-foreground">
            Alternatively, if you already have the Mintforge CLI installed:
          </p>

          <ComponentCode
            code="npx mintforge@latest skills add"
            language="bash"
          />
        </section>

        {/* Section 3: Supported AI Assistants */}
        <section id="supported-assistants" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Supported AI Assistants</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI Agent Skills adhere to open agent standards. Select your preferred assistant to see setup instructions and file paths:
          </p>

          {/* Assistant Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-surface-secondary border border-border rounded-xl mb-4">
            {ASSISTANTS.map((assistant) => {
              const active = assistant.id === selectedAssistant;
              return (
                <button
                  key={assistant.id}
                  onClick={() => setSelectedAssistant(assistant.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-card text-foreground shadow-sm border border-border font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <Bot size={14} className={active ? "text-brand" : ""} />
                  <span>{assistant.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      active
                        ? "bg-brand-subtle text-brand font-bold"
                        : "bg-surface-tertiary text-muted-foreground"
                    }`}
                  >
                    {assistant.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Assistant Card */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-subtle text-brand flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {currentAssistant.name} Configuration
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground mt-0.5">
                    <FileCode size={12} className="text-brand" />
                    <span>{currentAssistant.filePath}</span>
                  </div>
                </div>
              </div>
              <span className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-full bg-surface-secondary border border-border text-foreground font-medium">
                {currentAssistant.badge}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {currentAssistant.note}
            </p>

            <ComponentCode
              code={currentAssistant.setupSnippet}
              language={currentAssistant.snippetLang}
            />
          </div>
        </section>

        {/* Section 4: Interactive Comparison */}
        <section id="interactive-comparison" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Before vs. With Mintforge Skill</h2>
          <p className="mf-docs-paragraph">
            See the exact difference in generated code quality. Select a real-world frontend scenario below to inspect how the skill eliminates hallucinations:
          </p>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            {COMPARISON_SCENARIOS.map((scenario) => {
              const active = scenario.id === selectedScenario;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? "border-brand bg-brand-subtle/40 text-foreground shadow-sm"
                      : "border-border bg-card hover:bg-surface-secondary text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${active ? "text-brand" : "text-foreground"}`}>
                      {scenario.title}
                    </span>
                    <Sparkles size={12} className={active ? "text-brand" : "text-muted-foreground"} />
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {scenario.prompt}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Prompt Display */}
          <div className="p-3.5 rounded-xl border border-border bg-surface-secondary mb-4 flex items-start gap-2.5">
            <span className="text-[11px] font-bold text-brand uppercase tracking-wider shrink-0 mt-0.5">
              Prompt:
            </span>
            <p className="text-xs text-foreground italic">
              &quot;{currentScenario.prompt}&quot;
            </p>
          </div>

          {/* Comparison Side-by-Side Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Without Skill Column */}
            <div className="flex flex-col rounded-xl border border-red-500/30 bg-card overflow-hidden">
              <div className="p-3 bg-red-500/10 border-b border-red-500/20 flex items-center justify-between">
                <span className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                  <span>✕</span> Without Agent Skill (Raw LLM)
                </span>
                <span className="text-[10px] text-red-500/80 font-mono">Hallucinations detected</span>
              </div>
              <div className="p-3 flex-1">
                <ComponentCode code={currentScenario.withoutCode} language="tsx" />
              </div>
              <div className="p-3 bg-red-500/5 border-t border-red-500/20 space-y-1">
                <div className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1">
                  Why this fails in production:
                </div>
                {currentScenario.withoutIssues.map((issue, i) => (
                  <div key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* With Skill Column */}
            <div className="flex flex-col rounded-xl border border-emerald-500/30 bg-card overflow-hidden">
              <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span>✓</span> With Mintforge Skill
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">100% Token & Contract Compliant</span>
              </div>
              <div className="p-3 flex-1">
                <ComponentCode code={currentScenario.withCode} language="tsx" />
              </div>
              <div className="p-3 bg-emerald-500/5 border-t border-emerald-500/20 space-y-1">
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  Engineered benefits:
                </div>
                {currentScenario.withHighlights.map((hl, i) => (
                  <div key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold shrink-0">•</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Core Invariants */}
        <section id="core-invariants" className="scroll-mt-24">
          <h2 className="mf-docs-h2">The 5 Core Invariants Enforced</h2>
          <p className="mf-docs-paragraph">
            The Mintforge Skill guarantees that any AI assistant working on your codebase follows these 5 non-negotiable architectural invariants:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                <FileCode size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">1. components.json Grounding</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Before generating code, the assistant must read <span className="mf-inline-code">components.json</span> to resolve path aliases (<span className="mf-inline-code">@/components/ui</span>), package versions, and global styling rules.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                <Palette size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">2. Strict Token Integrity</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rejects arbitrary hex colors and off-brand utilities. Enforces semantic variables (<span className="mf-inline-code">bg-brand</span>, <span className="mf-inline-code">text-muted-foreground</span>, <span className="mf-inline-code">border-border</span>).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
                <Layers size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">3. Composition Over Reinvention</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Commands the assistant to run <span className="mf-inline-code">mintforge add</span> or import tested primitives instead of authoring 150-line bloated JSX files from scratch.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
                <Smartphone size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">4. React Native & Web Parity</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Maintains symmetric component prop interfaces (<span className="mf-inline-code">variant</span>, <span className="mf-inline-code">size</span>, <span className="mf-inline-code">isLoading</span>) across Next.js 16 and Expo 52.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card sm:col-span-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">5. WCAG AAA Accessibility Standards</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Requires mandatory <span className="mf-inline-code">aria-label</span> on icon-only buttons, keyboard navigation loops, dialog focus-trapping, and high-contrast focus rings out of the box.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: SKILL.md Specification */}
        <section id="skill-specification" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h2 className="mf-docs-h2 mb-0">SKILL.md Specification</h2>
              <p className="text-xs text-muted-foreground mt-1">
                The exact YAML-frontmatter instruction file loaded into your AI agent environment.
              </p>
            </div>
            <button
              onClick={handleCopySpec}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand text-brand-foreground hover:bg-brand-hover transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
            >
              {copiedSpec ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedSpec ? "Copied Spec!" : "Copy SKILL.md"}</span>
            </button>
          </div>

          <ComponentCode
            code={SKILL_MD_SPEC}
            language="markdown"
            filename="SKILL.md"
            showLineNumbers
          />
        </section>

        {/* Section 7: Prompt Recipes */}
        <section id="prompt-recipes" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Agent Prompt Recipes</h2>
          <p className="mf-docs-paragraph">
            Copy and paste these battle-tested prompts into Cursor, Claude Code, or Antigravity to get immaculate UI implementations on the first try:
          </p>

          <div className="space-y-3 my-4">
            {PROMPT_RECIPES.map((recipe, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-border-strong transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{recipe.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted-foreground font-semibold">
                      {recipe.category}
                    </span>
                  </div>
                  <p className="text-xs text-foreground italic bg-surface-secondary/70 p-2.5 rounded-lg font-mono text-[11px] border border-border/60">
                    &quot;{recipe.prompt}&quot;
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    <strong className="text-brand">Action:</strong> {recipe.expectedAction}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyPrompt(recipe.prompt, idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-surface-secondary hover:bg-surface-tertiary text-foreground border border-border transition-colors cursor-pointer self-start md:self-center shrink-0"
                  aria-label={`Copy prompt for ${recipe.title}`}
                >
                  {copiedPromptIdx === idx ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
                  <span>{copiedPromptIdx === idx ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

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
