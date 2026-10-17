"use client";

import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import Link from "next/link";
import { ArrowRight, Layers, Smartphone, Sparkles, Palette, ShieldCheck, Zap } from "lucide-react";

export default function DocsIntroductionPage() {
  const tocItems = [
    { id: "what-is-mintforge", title: "What is Mintforge UI?" },
    { id: "universal-primitives", title: "Universal Primitives" },
    { id: "open-code", title: "Open Code & Zero Lock-in" },
    { id: "token-engine", title: "OKLCH Token Engine" },
    { id: "ai-ready", title: "AI-Ready & LLM-Native" },
    { id: "seam-verification", title: "Seam Verification" },
    { id: "react-native", title: "React Native & Expo Parity" },
    { id: "ecosystem", title: "The Mintforge Ecosystem" },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Introduction"
          description="Mintforge UI is a next-generation open-source design system and UI ecosystem for React 19, Next.js 16 (App Router), and React Native (Expo 52). Engineered by NEXYOUTH for developer speed, WCAG AAA accessibility, universal cross-platform parity, agentic AI readiness, and full-stack API contract verification."
          nextHref="/docs/installation"
        />

        <p className="mf-docs-statement">
          This is not just another component library. It is your foundation to build, own, and scale your product&apos;s design system.
        </p>

        {/* Section 1: What is Mintforge UI? */}
        <section id="what-is-mintforge" className="scroll-mt-24">
          <h2 className="mf-docs-h2">What is Mintforge UI?</h2>
          <p className="mf-docs-paragraph">
            Most traditional UI libraries distribute compiled, pre-packaged binaries from NPM. You install a package, import a component, and use it in your app. This approach works until you need to customize an element to match your brand guidelines or implement a complex responsive interaction.
          </p>
          <p className="mf-docs-paragraph">
            <strong>Often, you end up wrapping library components in layers of custom divs, overriding styles with !important hacks, or mixing disparate libraries with incompatible APIs.</strong>
          </p>
          <p className="mf-docs-paragraph">
            Mintforge UI eliminates this friction entirely. Instead of hiding the implementation behind a node_modules barrier, Mintforge distributes <strong>clean, copyable, TypeScript source code directly into your repository</strong>. You have complete transparency, total control, and zero runtime dependencies.
          </p>
        </section>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-8">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
              <Zap size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Zero Runtime Overhead</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Components compile down to native HTML and Tailwind utilities. No bulky JS runtime or redundant CSS bundles.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Seam Verification</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero-codegen static linter verifying Next.js &amp; Expo frontend forms against FastAPI Pydantic models.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
              <Smartphone size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Universal Web &amp; Mobile</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Single unified design token system powering both Next.js web applications and React Native / Expo iOS &amp; Android apps.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <Sparkles size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Agentic AI Native</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Standardized prop signatures and flat file schemas designed so LLMs and coding agents can effortlessly read and generate UI.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2.5">
              <Palette size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">WCAG AAA Accessibility</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full ARIA attributes, keyboard navigation traps, focus visible rings, and screen-reader announcements out of the box.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
              <Layers size={18} />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">42+ UI Primitives</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Production building blocks from buttons and form inputs to dialogs, bottom sheets, and charts.
            </p>
          </div>
        </div>

        {/* Section 2: Universal Primitives */}
        <section id="universal-primitives" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Universal Primitives</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI provides over 42 atomic primitives built from the ground up to feel cohesive, predictable, and interchangeable:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Action Primitives</strong>: Button, Button Group, Dropdown Menu, Context Menu, Command Palette.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Form & Input Controls</strong>: Text Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Date Picker.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Feedback & Overlays</strong>: Dialog Modal, Drawer / Sheet, Toast, Alert, Tooltip, Popover.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Layout & Surfaces</strong>: Card, Aspect Ratio, Collapsible Accordion, Tabs, Resizable Panels, Scroll Area.
            </li>
          </ul>
        </section>

        {/* Section 3: Open Code */}
        <section id="open-code" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Open Code & Zero Lock-in</h2>
          <p className="mf-docs-paragraph">
            When you add a Mintforge component, its source code is copied into your <span className="mf-inline-code">src/components/ui/</span> directory. This gives you:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Complete Code Ownership</strong>: You can inspect every line of TypeScript, customize any Tailwind class, or integrate custom Framer Motion transitions.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Zero Breaking Version Upgrades</strong>: An update to Mintforge will never break your production app because you decide when and what to update.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Seamless Tree-Shaking</strong>: Only the components you actively copy are bundled by Turbopack or Vite.
            </li>
          </ul>
        </section>

        {/* Section 4: OKLCH Token Engine */}
        <section id="token-engine" className="scroll-mt-24">
          <h2 className="mf-docs-h2">OKLCH Semantic Token Engine</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI is powered by the modern <strong>OKLCH color space</strong>. Unlike legacy sRGB or HSL hex codes, OKLCH ensures uniform perceived brightness and contrast ratios across all hues, enabling true wide-gamut (Display P3) rendering on modern screens.
          </p>
          <p className="mf-docs-paragraph">
            All colors are mapped to semantic tokens like <span className="mf-inline-code">background</span>,{" "}
            <span className="mf-inline-code">foreground</span>, <span className="mf-inline-code">primary</span>,{" "}
            <span className="mf-inline-code">muted</span>, and <span className="mf-inline-code">border</span>. Switching from light to dark mode requires no CSS class changes inside your components—the underlying token scales handle the inversion automatically.
          </p>
        </section>

        {/* Section 5: AI-Ready & LLM-Native */}
        <section id="ai-ready" className="scroll-mt-24">
          <h2 className="mf-docs-h2">AI-Ready & LLM-Native</h2>
          <p className="mf-docs-paragraph">
            In modern software engineering, coding agents (like Antigravity, Claude, and GitHub Copilot) write and modify code constantly. Mintforge UI is engineered specifically to be read, manipulated, and extended by LLMs:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Flat File Schema</strong>: Every component exists in its own isolated file with explicit TypeScript exports.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Consistent API Signatures</strong>: Predictable prop patterns (<span className="mf-inline-code">variant</span>, <span className="mf-inline-code">size</span>, <span className="mf-inline-code">leftIcon</span>, <span className="mf-inline-code">isLoading</span>) across all interactive elements.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Zero Hallucination Surface</strong>: Because the source is directly in your project, agents can inspect the actual implementation instead of guessing external library internals.
            </li>
          </ul>
        </section>

        {/* Section 6: React Native & Expo Parity */}
        <section id="react-native" className="scroll-mt-24">
          <h2 className="mf-docs-h2">React Native & Expo Parity</h2>
          <p className="mf-docs-paragraph">
            Building a web app and a mobile app shouldn&apos;t feel like two different worlds. Mintforge UI includes cross-platform primitives configured for <strong>React Native and Expo 52</strong>:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Shared Token Contracts</strong>: Use the exact same semantic color and radius variables across React DOM and React Native StyleSheet.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Native Haptics & Gestures</strong>: Built-in support for <span className="mf-inline-code">expo-haptics</span> and smooth bottom sheets using <span className="mf-inline-code">react-native-reanimated</span>.
            </li>
          </ul>
        </section>

        {/* Section 6: Seam Verification */}
        <section id="seam-verification" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Full-Stack Seam Verification</h2>
          <p className="mf-docs-paragraph">
            The hardest runtime bugs in full-stack applications occur at the boundary between frontend forms and backend API models. 
            Mintforge includes <strong>Seam Check</strong>—a zero-codegen, static AST linter that validates Next.js and Expo frontend code directly against FastAPI Pydantic models:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Schema Drift</strong>: Compares Pydantic models to Zod schemas, flagging missing fields, extra keys, and type discrepancies.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Endpoint Drift</strong>: Ensures every frontend <span className="mf-inline-code">fetch()</span> or <span className="mf-inline-code">axios</span> call matches an active FastAPI route by HTTP method and path.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Payload Drift</strong>: Verifies frontend request body keys match backend request schemas, catching <span className="mf-inline-code">camelCase</span> vs <span className="mf-inline-code">snake_case</span> mismatches before runtime.
            </li>
          </ul>
        </section>

        {/* Section 7: The Ecosystem */}
        <section id="ecosystem" className="scroll-mt-24">
          <h2 className="mf-docs-h2">The Mintforge Ecosystem</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI is more than a set of buttons—it is an end-to-end full-stack toolkit:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
            <Link
              href="/docs/components"
              className="p-4 rounded-xl border border-border bg-card hover:border-brand transition-all group"
            >
              <Layers size={18} className="text-emerald-500 mb-2" />
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                Primitives
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                42+ accessible atomic UI building blocks.
              </p>
            </Link>

            <Link
              href="/docs/seam-check"
              className="p-4 rounded-xl border border-border bg-card hover:border-brand transition-all group"
            >
              <ShieldCheck size={18} className="text-emerald-500 mb-2" />
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                Seam Check
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Zero-codegen FastAPI &amp; Next.js contract linter.
              </p>
            </Link>

            <Link
              href="/docs/ai-elements"
              className="p-4 rounded-xl border border-border bg-card hover:border-brand transition-all group"
            >
              <Sparkles size={18} className="text-emerald-500 mb-2" />
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                AI Elements
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Prompt inputs, streaming messages, and copilot UI.
              </p>
            </Link>

            <Link
              href="/docs/theming"
              className="p-4 rounded-xl border border-border bg-card hover:border-brand transition-all group"
            >
              <Palette size={18} className="text-emerald-500 mb-2" />
              <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                Tokens &amp; Theming
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                OKLCH color engine and multi-brand themes.
              </p>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Ready to build your component library?</span>
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
            >
              <span>Explore Installation Guide</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}