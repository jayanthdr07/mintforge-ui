"use client";

import { useState } from "react";
import {
  Sparkles,
  Sliders,
  Table as TableIcon,
  Code as CodeIcon,
  CheckCircle2,
} from "lucide-react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";

type ActiveTab = "preview" | "code";

interface TypographyScaleItem {
  level: string;
  element: string;
  size: string;
  weight: string;
  tracking: string;
  utility: string;
  token: string;
  usage: string;
  sample: string;
}

const TYPE_SCALE_ITEMS: TypographyScaleItem[] = [
  {
    level: "Display",
    element: "h1 (Hero)",
    size: "48px (3rem)",
    weight: "800 (Extrabold)",
    tracking: "-0.025em",
    utility: "text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Hero display headings, high-impact marketing titles",
    sample: "Build Consistently.",
  },
  {
    level: "Heading 1",
    element: "h1",
    size: "36px (2.25rem)",
    weight: "800 (Extrabold)",
    tracking: "-0.025em",
    utility: "text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Primary documentation titles, page root headings",
    sample: "Typeset & Typography",
  },
  {
    level: "Heading 2",
    element: "h2",
    size: "30px (1.875rem)",
    weight: "600 (Semibold)",
    tracking: "-0.02em",
    utility: "text-3xl font-semibold tracking-tight border-b border-border pb-2 text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Major section headers with subtle bottom divider",
    sample: "Type Scale Reference",
  },
  {
    level: "Heading 3",
    element: "h3",
    size: "24px (1.5rem)",
    weight: "600 (Semibold)",
    tracking: "-0.015em",
    utility: "text-2xl font-semibold tracking-tight text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Subsection titles, modal titles, card headers",
    sample: "Interactive Playground",
  },
  {
    level: "Heading 4",
    element: "h4",
    size: "20px (1.25rem)",
    weight: "600 (Semibold)",
    tracking: "-0.01em",
    utility: "text-xl font-semibold tracking-tight text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Sub-items, widget headers, settings group titles",
    sample: "Design Token Settings",
  },
  {
    level: "Lead",
    element: "p (Lead)",
    size: "20px (1.25rem)",
    weight: "400 (Regular)",
    tracking: "normal",
    utility: "text-xl text-muted-foreground",
    token: "var(--mf-font-sans)",
    usage: "Hero subtitles, article introductions",
    sample: "A developer-first UI ecosystem built for velocity and craftsmanship.",
  },
  {
    level: "Paragraph",
    element: "p",
    size: "16px (1rem)",
    weight: "400 (Regular)",
    tracking: "normal",
    utility: "leading-7 [&:not(:first-child)]:mt-6 text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Standard editorial content, longform guides",
    sample: "Mintforge primitives adapt automatically to light and dark themes using semantic tokens.",
  },
  {
    level: "Large",
    element: "div.large",
    size: "18px (1.125rem)",
    weight: "600 (Semibold)",
    tracking: "normal",
    utility: "text-lg font-semibold text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Emphasized body callouts, highlight bullets",
    sample: "Strictly typed React 19 components with zero runtime CSS bloat.",
  },
  {
    level: "Small",
    element: "small",
    size: "14px (0.875rem)",
    weight: "500 (Medium)",
    tracking: "normal",
    utility: "text-sm font-medium leading-none text-foreground",
    token: "var(--mf-font-sans)",
    usage: "Form labels, control buttons, micro-navigation",
    sample: "Email address (required)",
  },
  {
    level: "Muted",
    element: "p.muted",
    size: "14px (0.875rem)",
    weight: "400 (Regular)",
    tracking: "normal",
    utility: "text-sm text-muted-foreground",
    token: "var(--mf-font-sans)",
    usage: "Helper text, footnotes, input captions",
    sample: "We will never share your email with third parties.",
  },
  {
    level: "Inline Code",
    element: "code",
    size: "13px (0.8125rem)",
    weight: "600 (Semibold)",
    tracking: "normal",
    utility: "bg-muted border border-border px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground",
    token: "var(--mf-font-mono)",
    usage: "Identifiers, file paths, CLI flags, tokens",
    sample: "@mintforge/ui/button",
  },
];

const typographyComponentCode = `import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "lead"
    | "large"
    | "small"
    | "muted"
    | "quote"
    | "code";
  as?: React.ElementType;
}

const variantStyles: Record<string, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground",
  h2: "scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
  p: "leading-7 [&:not(:first-child)]:mt-6 text-foreground",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold text-foreground",
  small: "text-sm font-medium leading-none text-foreground",
  muted: "text-sm text-muted-foreground",
  quote: "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
  code: "relative rounded bg-muted border border-border px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground",
};

const defaultElementMap: Record<string, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  quote: "blockquote",
  code: "code",
};

export function Typography({
  variant = "p",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as || defaultElementMap[variant] || "p";

  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
}`;

const fontLayoutCode = `// src/app/layout.tsx
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${fontSans.variable} \${fontMono.variable}\`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}`;

export default function DocsTypesetPage() {
  // Playground State
  const [sampleText, setSampleText] = useState("Mintforge UI — Build Consistently. Customize Freely.");
  const [fontSize, setFontSize] = useState(28);
  const [fontWeight, setFontWeight] = useState("700");
  const [fontFamily, setFontFamily] = useState<"sans" | "mono">("sans");
  const [letterSpacing, setLetterSpacing] = useState("-0.02");
  const [lineHeight, setLineHeight] = useState("1.3");

  // Tab states for preview/code showcases
  const [h1Tab, setH1Tab] = useState<ActiveTab>("preview");
  const [h2Tab, setH2Tab] = useState<ActiveTab>("preview");
  const [h3Tab, setH3Tab] = useState<ActiveTab>("preview");
  const [leadTab, setLeadTab] = useState<ActiveTab>("preview");
  const [bodyTab, setBodyTab] = useState<ActiveTab>("preview");
  const [quoteTab, setQuoteTab] = useState<ActiveTab>("preview");
  const [tableTab, setTableTab] = useState<ActiveTab>("preview");
  const [listTab, setListTab] = useState<ActiveTab>("preview");
  const [inlineTab, setInlineTab] = useState<ActiveTab>("preview");

  const tocItems = [
    { id: "overview", title: "Overview & Font Stacks" },
    { id: "interactive-tester", title: "Interactive Type Tester" },
    { id: "type-scale", title: "Typography Scale Reference" },
    { id: "headings", title: "Headings (H1 - H4)" },
    { id: "body-copy", title: "Paragraphs & Leads" },
    { id: "quotes-lists", title: "Blockquotes & Lists" },
    { id: "tables", title: "Data Tables" },
    { id: "inline-elements", title: "Inline Code & Badges" },
    { id: "typography-component", title: "Typography Primitives Component" },
    { id: "nextjs-setup", title: "Next.js Font Configuration" },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Typeset"
          description="Typographic scale, heading hierarchy, font family tokens, and responsive text styles crafted for high legibility across dark and light modes."
          prevHref="/docs/cli"
          nextHref="/docs/components"
        />

        {/* Overview Callout */}
        <div className="mf-docs-callout mf-docs-callout-neutral">
          <div>
            Mintforge UI typography is calibrated for <strong>zero ocular fatigue</strong> and instant visual hierarchy. Powered by <span className="mf-inline-code">Plus Jakarta Sans</span> for interface geometry and <span className="mf-inline-code">JetBrains Mono</span> for developer precision.
          </div>
        </div>

        {/* Section 1: Overview & Font Stacks */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Overview & Font Stacks</h2>
          <p className="mf-docs-paragraph">
            All typography in Mintforge UI is anchored to two semantic font family tokens:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-primary">--mf-font-sans</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                  font-sans
                </span>
              </div>
              <p className="text-lg font-bold text-foreground mb-1 font-sans">
                Plus Jakarta Sans
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                Primary UI typeface for headings, labels, button controls, and longform prose. Clean geometric curves with wide apertures for micro-reading.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-primary">--mf-font-mono</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                  font-mono
                </span>
              </div>
              <p className="text-lg font-bold text-foreground mb-1 font-mono">
                JetBrains Mono
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                Monospace stack for code blocks, terminal outputs, CLI commands, keyboard shortcuts, and token references.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Type Tester Playground */}
        <section id="interactive-tester" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-accent text-primary">
              <Sliders size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Interactive Type Tester</h2>
          </div>
          <p className="mf-docs-paragraph">
            Experiment with font size, weight, tracking, and family to preview typography behavior across Mintforge theme tokens:
          </p>

          <div className="mf-typeset-playground">
            {/* Controls Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-5 border-b border-border mb-5">
              {/* Font Family */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Font Family</span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {fontFamily === "sans" ? "Sans" : "Mono"}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 rounded-lg border border-border bg-muted">
                  <button
                    onClick={() => setFontFamily("sans")}
                    className={`py-1 text-xs rounded font-medium transition-all cursor-pointer ${
                      fontFamily === "sans"
                        ? "bg-card text-foreground shadow-xs font-bold"
                        : "text-muted-foreground"
                    }`}
                  >
                    Sans
                  </button>
                  <button
                    onClick={() => setFontFamily("mono")}
                    className={`py-1 text-xs rounded font-medium transition-all cursor-pointer ${
                      fontFamily === "mono"
                        ? "bg-card text-foreground shadow-xs font-bold"
                        : "text-muted-foreground"
                    }`}
                  >
                    Mono
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Size</span>
                  <span className="text-[10px] text-primary font-mono font-bold">
                    {fontSize}px
                  </span>
                </label>
                <input
                  type="range"
                  min="14"
                  max="52"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="mf-typeset-slider"
                />
              </div>

              {/* Font Weight */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Weight</span>
                  <span className="text-[10px] text-primary font-mono font-bold">
                    {fontWeight}
                  </span>
                </label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="h-8 px-2 text-xs rounded-lg border border-border bg-muted text-foreground outline-none cursor-pointer"
                >
                  <option value="400">400 - Regular</option>
                  <option value="500">500 - Medium</option>
                  <option value="600">600 - Semibold</option>
                  <option value="700">700 - Bold</option>
                  <option value="800">800 - Extrabold</option>
                </select>
              </div>

              {/* Tracking / Letter Spacing */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Letter Spacing</span>
                  <span className="text-[10px] text-primary font-mono font-bold">
                    {letterSpacing}em
                  </span>
                </label>
                <input
                  type="range"
                  min="-0.05"
                  max="0.05"
                  step="0.005"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                  className="mf-typeset-slider"
                />
              </div>

              {/* Line Height */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Line Height</span>
                  <span className="text-[10px] text-primary font-mono font-bold">
                    {lineHeight}
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                  className="mf-typeset-slider"
                />
              </div>
            </div>

            {/* Editable Text Sample Input */}
            <div className="mb-4">
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Type your custom text sample here..."
                className="w-full h-9 px-3 text-xs rounded-lg border border-border bg-muted text-foreground outline-none"
              />
            </div>

            {/* Live Canvas Preview */}
            <div className="mf-typeset-preview-box">
              <div
                style={{
                  fontFamily: fontFamily === "sans" ? "var(--mf-font-sans)" : "var(--mf-font-mono)",
                  fontSize: `${fontSize}px`,
                  fontWeight: Number(fontWeight),
                  letterSpacing: `${letterSpacing}em`,
                  lineHeight: Number(lineHeight),
                }}
                className="text-foreground text-center transition-all"
              >
                {sampleText || "Start typing to preview typography..."}
              </div>
            </div>

            {/* Calculated Token Output */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <span>Tailwind:</span>
                <span className="mf-inline-code text-[11px]">
                  text-[{fontSize}px] font-[{fontWeight}] tracking-[{letterSpacing}em] leading-[{lineHeight}]
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-semibold">
                <Sparkles size={13} />
                <span>Computed OKLCH contrast: 14.8:1 (AAA)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Typography Scale Reference */}
        <section id="type-scale" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-accent text-primary">
              <TableIcon size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Typography Scale Reference</h2>
          </div>
          <p className="mf-docs-paragraph">
            The complete hierarchy of standard type styles used across Mintforge components:
          </p>

          <div className="mf-docs-table-wrapper">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "16%" }}>Level</th>
                  <th style={{ width: "16%" }}>Size / Weight</th>
                  <th style={{ width: "32%" }}>Tailwind Utility</th>
                  <th style={{ width: "36%" }}>Visual Sample</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE_ITEMS.map((item) => (
                  <tr key={item.level}>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-foreground">{item.level}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{item.element}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono text-foreground">{item.size}</span>
                        <span className="text-[10px] text-muted-foreground">{item.weight}</span>
                      </div>
                    </td>
                    <td>
                      <span className="mf-inline-code text-[11px] font-mono">
                        {item.utility}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm font-semibold text-foreground line-clamp-1">
                        {item.sample}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Headings (H1 - H4) */}
        <section id="headings" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Headings (H1 - H4)</h2>
          <p className="mf-docs-paragraph">
            Headings are designed with snug letter-spacing (<span className="mf-inline-code">tracking-tight</span>) to ensure balanced density across responsive viewports.
          </p>

          {/* H1 Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">h1 (Heading 1)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setH1Tab("preview")}
                  className={`mf-docs-tab-btn ${h1Tab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setH1Tab("code")}
                  className={`mf-docs-tab-btn ${h1Tab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {h1Tab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground m-0">
                  Build Consistently. Customize Freely.
                </h1>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
  Build Consistently. Customize Freely.
</h1>`}
              />
            )}
          </div>

          {/* H2 Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">h2 (Heading 2 with Divider)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setH2Tab("preview")}
                  className={`mf-docs-tab-btn ${h2Tab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setH2Tab("code")}
                  className={`mf-docs-tab-btn ${h2Tab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {h2Tab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <h2 className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground m-0">
                  The People of the Kingdom
                </h2>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<h2 className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground">
  The People of the Kingdom
</h2>`}
              />
            )}
          </div>

          {/* H3 Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">h3 (Heading 3)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setH3Tab("preview")}
                  className={`mf-docs-tab-btn ${h3Tab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setH3Tab("code")}
                  className={`mf-docs-tab-btn ${h3Tab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {h3Tab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground m-0">
                  The Joke Tax Chronicles
                </h3>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
  The Joke Tax Chronicles
</h3>`}
              />
            )}
          </div>
        </section>

        {/* Section 5: Paragraphs & Leads */}
        <section id="body-copy" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Paragraphs & Leads</h2>

          {/* Lead Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">p.lead (Introductory Copy)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLeadTab("preview")}
                  className={`mf-docs-tab-btn ${leadTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setLeadTab("code")}
                  className={`mf-docs-tab-btn ${leadTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {leadTab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <p className="text-xl text-muted-foreground m-0 leading-relaxed">
                  A modal window opens over the current page, focusing attention on a high-intent user interaction while preserving underlying context.
                </p>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<p className="text-xl text-muted-foreground leading-relaxed">
  A modal window opens over the current page, focusing attention on a high-intent user interaction while preserving underlying context.
</p>`}
              />
            )}
          </div>

          {/* Body P Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">p (Standard Paragraph)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setBodyTab("preview")}
                  className={`mf-docs-tab-btn ${bodyTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setBodyTab("code")}
                  className={`mf-docs-tab-btn ${bodyTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {bodyTab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <p className="leading-7 text-foreground m-0">
                  The king thought long and hard, and even resolved to poll the citizens himself about the tax. But after three days of silence, the court jester proposed a wager that would settle the treasury once and for all.
                </p>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<p className="leading-7 text-foreground">
  The king thought long and hard, and even resolved to poll the citizens himself about the tax.
</p>`}
              />
            )}
          </div>
        </section>

        {/* Section 6: Blockquotes & Lists */}
        <section id="quotes-lists" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Blockquotes & Lists</h2>

          {/* Blockquote Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">blockquote (Accent Quote)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuoteTab("preview")}
                  className={`mf-docs-tab-btn ${quoteTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setQuoteTab("code")}
                  className={`mf-docs-tab-btn ${quoteTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {quoteTab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground m-0">
                  &ldquo;After all, jokes are about bringing people together. If you tax them, what reason is there left to gather at the feast?&rdquo;
                </blockquote>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
  "After all, jokes are about bringing people together. If you tax them, what reason is there left to gather at the feast?"
</blockquote>`}
              />
            )}
          </div>

          {/* List Demo */}
          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">ul (Bulleted List)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setListTab("preview")}
                  className={`mf-docs-tab-btn ${listTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setListTab("code")}
                  className={`mf-docs-tab-btn ${listTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {listTab === "preview" ? (
              <div className="mf-typography-preview-canvas">
                <ul className="my-0 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                  <li>1st level of puns: 5 gold coins</li>
                  <li>2nd level of jokes: 10 gold coins</li>
                  <li>3rd level of sarcasm: Direct appearance before the throne</li>
                </ul>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm text-muted-foreground">
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of sarcasm: Direct appearance before the throne</li>
</ul>`}
              />
            )}
          </div>
        </section>

        {/* Section 7: Data Tables */}
        <section id="tables" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Data Tables</h2>
          <p className="mf-docs-paragraph">
            Tabular text displays use calibrated border colors and uppercase muted headers:
          </p>

          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">table (Data Matrix)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTableTab("preview")}
                  className={`mf-docs-tab-btn ${tableTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setTableTab("code")}
                  className={`mf-docs-tab-btn ${tableTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {tableTab === "preview" ? (
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
                      <th className="py-2 px-3 font-semibold">King&apos;s Treasury</th>
                      <th className="py-2 px-3 font-semibold">People&apos;s Response</th>
                      <th className="py-2 px-3 font-semibold text-right">Tax Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Empty</td>
                      <td className="py-2.5 px-3 text-muted-foreground">Overflowing with laughter</td>
                      <td className="py-2.5 px-3 text-right font-mono">$0.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Modest</td>
                      <td className="py-2.5 px-3 text-muted-foreground">Occasional chuckles</td>
                      <td className="py-2.5 px-3 text-right font-mono text-primary font-bold">$12,450.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">Full</td>
                      <td className="py-2.5 px-3 text-muted-foreground">Complete silence</td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-500 font-bold">$99,999.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<div className="w-full overflow-y-auto">
  <table className="w-full border-collapse text-xs">
    <thead>
      <tr className="border-b border-border text-muted-foreground uppercase text-[10px]">
        <th className="py-2 px-3 font-semibold">King's Treasury</th>
        <th className="py-2 px-3 font-semibold">People's Response</th>
        <th className="py-2 px-3 font-semibold text-right">Tax Revenue</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border text-foreground">
      <tr>
        <td className="py-2.5 px-3 font-medium">Empty</td>
        <td className="py-2.5 px-3 text-muted-foreground">Overflowing</td>
        <td className="py-2.5 px-3 text-right font-mono">$0.00</td>
      </tr>
    </tbody>
  </table>
</div>`}
              />
            )}
          </div>
        </section>

        {/* Section 8: Inline Elements */}
        <section id="inline-elements" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Inline Elements</h2>
          <p className="mf-docs-paragraph">
            Inline code chips and keyboard shortcuts are styled using standard <span className="mf-inline-code">font-mono</span> and high-contrast boundaries:
          </p>

          <div className="mf-typography-preview-card">
            <div className="mf-typography-preview-header">
              <span className="text-xs font-mono font-semibold text-foreground">code & kbd (Inline Chips)</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setInlineTab("preview")}
                  className={`mf-docs-tab-btn ${inlineTab === "preview" ? "active" : ""}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setInlineTab("code")}
                  className={`mf-docs-tab-btn ${inlineTab === "code" ? "active" : ""}`}
                >
                  Code
                </button>
              </div>
            </div>
            {inlineTab === "preview" ? (
              <div className="mf-typography-preview-canvas flex flex-wrap items-center gap-4">
                <span className="mf-inline-code text-sm">@mintforge/primitives</span>
                <span className="mf-inline-code text-sm font-bold text-primary">--mf-brand</span>
                <kbd className="px-2 py-1 rounded bg-muted border border-border font-mono text-xs text-foreground shadow-xs">
                  ⌘K
                </kbd>
                <kbd className="px-2 py-1 rounded bg-muted border border-border font-mono text-xs text-foreground shadow-xs">
                  Esc
                </kbd>
              </div>
            ) : (
              <ComponentCode
                language="tsx"
                code={`<code className="relative rounded bg-muted border border-border px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">
  @mintforge/primitives
</code>

<kbd className="px-2 py-1 rounded bg-muted border border-border font-mono text-xs text-foreground shadow-sm">
  ⌘K
</kbd>`}
              />
            )}
          </div>
        </section>

        {/* Section 9: Typography Primitives Component */}
        <section id="typography-component" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-accent text-primary">
              <CodeIcon size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Typography Primitives Component</h2>
          </div>
          <p className="mf-docs-paragraph">
            You can drop this versatile, strictly-typed <span className="mf-inline-code">&lt;Typography&gt;</span> component into your repository at <span className="mf-inline-code">src/components/ui/typography.tsx</span>:
          </p>

          <ComponentCode
            filename="src/components/ui/typography.tsx"
            language="tsx"
            showLineNumbers
            code={typographyComponentCode}
          />

          <p className="mf-docs-paragraph mt-4">
            Usage in your Next.js pages:
          </p>

          <ComponentCode
            language="tsx"
            code={`import { Typography } from "@/components/ui/typography";

export default function HeroSection() {
  return (
    <div className="space-y-4">
      <Typography variant="h1">Build Consistently.</Typography>
      <Typography variant="lead">The developer-first UI ecosystem.</Typography>
      <Typography variant="quote">Crafted with precision.</Typography>
      <Typography variant="code">npm install</Typography>
    </div>
  );
}`}
          />
        </section>

        {/* Section 10: Next.js Font Setup */}
        <section id="nextjs-setup" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-accent text-primary">
              <CheckCircle2 size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Next.js Font Configuration</h2>
          </div>
          <p className="mf-docs-paragraph">
            To achieve zero cumulative layout shift (CLS) with automatic self-hosting, configure <span className="mf-inline-code">next/font/google</span> in <span className="mf-inline-code">src/app/layout.tsx</span>:
          </p>

          <ComponentCode
            filename="src/app/layout.tsx"
            language="tsx"
            showLineNumbers
            code={fontLayoutCode}
          />
        </section>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
