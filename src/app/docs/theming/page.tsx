"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Search, SlidersHorizontal, Sparkles, ArrowRight, Layers } from "lucide-react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";

type TokenCategory = "all" | "surfaces" | "typography" | "brand" | "borders" | "scales";
type TokenType = "color" | "dimension" | "shadow" | "font";

interface MintforgeToken {
  category: "surfaces" | "typography" | "brand" | "borders" | "scales";
  token: string;
  utility: string;
  type: TokenType;
  light: string;
  dark: string;
  controls: string;
  components: string[];
  shadcnEquivalent: string;
}

const tocItems = [
  { id: "mintforge-tokens", title: "Mintforge Token System" },
  { id: "oklch-colors", title: "OKLCH Color Space" },
  { id: "color-palettes", title: "Color Palettes" },
  { id: "components-json", title: "components.json Configuration" },
  { id: "token-convention", title: "Token Convention" },
  { id: "radius-scale", title: "Radius & Typography Scales" },
  { id: "dark-mode-setup", title: "Dark Mode with next-themes" },
  { id: "theme-tokens", title: "Theme Tokens Table" },
  { id: "token-inspector", title: "Live Token Inspector" },
  { id: "shadcn-mapping", title: "Shadcn/ui Cross-Reference" },
];

const componentsJsonCode = `{
  "$schema": "https://mintforge.dev/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "emerald",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`;

const palettes = [
  {
    name: "Emerald (Mintforge Signature)",
    hex: "#10b981",
    swatches: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"],
  },
  {
    name: "Zinc",
    hex: "#71717a",
    swatches: ["#fafafa", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b", "#09090b"],
  },
  {
    name: "Slate",
    hex: "#64748b",
    swatches: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"],
  },
  {
    name: "Violet",
    hex: "#8b5cf6",
    swatches: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"],
  },
  {
    name: "Rose",
    hex: "#f43f5e",
    swatches: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"],
  },
  {
    name: "Blue",
    hex: "#3b82f6",
    swatches: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
  },
];

const mintforgeTokens: MintforgeToken[] = [
    // Surfaces & Backgrounds
    {
      category: "surfaces",
      token: "--mf-background",
      utility: "bg-background",
      type: "color",
      light: "#fafcfb",
      dark: "#080f0c",
      controls: "Default page and viewport canvas background color.",
      components: ["Page Shell", "HTML Body", "Layout Wrapper"],
      shadcnEquivalent: "--background",
    },
    {
      category: "surfaces",
      token: "--mf-surface",
      utility: "bg-card / bg-surface",
      type: "color",
      light: "#ffffff",
      dark: "#0f1915",
      controls: "Primary elevated surface container color for cards, panels, and popups.",
      components: ["Card", "DialogContent", "Popover", "DropdownMenu"],
      shadcnEquivalent: "--card / --popover",
    },
    {
      category: "surfaces",
      token: "--mf-surface-secondary",
      utility: "bg-secondary / bg-muted",
      type: "color",
      light: "#f3f7f5",
      dark: "#14221c",
      controls: "Subtle nested surface, input backgrounds, and inactive well containers.",
      components: ["Input", "TabsList", "Badge default", "Secondary Button"],
      shadcnEquivalent: "--secondary / --muted",
    },
    {
      category: "surfaces",
      token: "--mf-surface-tertiary",
      utility: "bg-surface-tertiary",
      type: "color",
      light: "#e7f0ec",
      dark: "#1b2d26",
      controls: "Hover highlights on secondary buttons, table header wells, and sunken rows.",
      components: ["Button hover", "Table header", "Active selection well"],
      shadcnEquivalent: "--secondary-hover / --accent",
    },

    // Typography & Foregrounds
    {
      category: "typography",
      token: "--mf-foreground",
      utility: "text-foreground",
      type: "color",
      light: "#0d1a16",
      dark: "#f2faf6",
      controls: "High-emphasis primary text, active headings, and standard icon fills.",
      components: ["CardTitle", "DialogTitle", "Heading 1-6", "Active Nav Link"],
      shadcnEquivalent: "--foreground",
    },
    {
      category: "typography",
      token: "--mf-foreground-secondary",
      utility: "text-muted-foreground",
      type: "color",
      light: "#4b6158",
      dark: "#9cb5ab",
      controls: "Medium-emphasis body copy, subtitles, helper text, and form labels.",
      components: ["CardDescription", "DialogDescription", "Label", "Table Cell"],
      shadcnEquivalent: "--muted-foreground",
    },
    {
      category: "typography",
      token: "--mf-foreground-muted",
      utility: "text-muted-foreground",
      type: "color",
      light: "#7d938a",
      dark: "#6b857a",
      controls: "Low-emphasis placeholders, chevrons, disabled text, and breadcrumbs.",
      components: ["Input placeholder", "Breadcrumb", "Icon muted", "Kbd"],
      shadcnEquivalent: "--muted-foreground / --disabled",
    },

    // Brand & Action Accents
    {
      category: "brand",
      token: "--mf-brand",
      utility: "bg-primary, text-brand",
      type: "color",
      light: "#059669",
      dark: "#10b981",
      controls: "Signature emerald primary action color, focus ring outline, and brand accents.",
      components: ["Button primary", "Focus ring", "Active Tab", "Logo Accent"],
      shadcnEquivalent: "--primary / --ring",
    },
    {
      category: "brand",
      token: "--mf-brand-hover",
      utility: "hover:bg-primary-hover",
      type: "color",
      light: "#047857",
      dark: "#34d399",
      controls: "Interactive hover and pressed state for primary actions and CTA elements.",
      components: ["Button:hover", "Interactive links", "CTA Buttons"],
      shadcnEquivalent: "--primary-hover",
    },
    {
      category: "brand",
      token: "--mf-brand-subtle",
      utility: "bg-brand-subtle, text-brand",
      type: "color",
      light: "#ecfdf5",
      dark: "#0d281e",
      controls: "Translucent tinted emerald surface for status tags, category chips, and active pills.",
      components: ["Badge brand", "Sidebar active pill", "Status Dot Glow"],
      shadcnEquivalent: "--accent / --primary-subtle",
    },
    {
      category: "brand",
      token: "--mf-brand-foreground",
      utility: "text-primary-foreground",
      type: "color",
      light: "#ffffff",
      dark: "#041d13",
      controls: "High-contrast text and icon color overlaid on top of brand surfaces (WCAG AAA).",
      components: ["Button label", "Solid Brand Badge", "CTA Icon"],
      shadcnEquivalent: "--primary-foreground",
    },

    // Borders & Dividers
    {
      category: "borders",
      token: "--mf-border",
      utility: "border-border",
      type: "color",
      light: "#e3ebe7",
      dark: "#1a2c24",
      controls: "Default hairline border divider for containers, cards, and input fields.",
      components: ["Card border", "Dialog border", "Input border", "Table divider"],
      shadcnEquivalent: "--border / --input",
    },
    {
      category: "borders",
      token: "--mf-border-strong",
      utility: "border-border-strong",
      type: "color",
      light: "#cdd9d2",
      dark: "#2a4438",
      controls: "Emphasized structural borders, hover ring outlines, and active dividers.",
      components: ["Input hover", "Active tab line", "Step badge outline"],
      shadcnEquivalent: "--border-strong / --ring-offset",
    },

    // Corner Radii & Scales
    {
      category: "scales",
      token: "--mf-radius-sm",
      utility: "rounded-sm",
      type: "dimension",
      light: "8px",
      dark: "8px",
      controls: "Subtle rounding for compact elements, badges, and inline chips.",
      components: ["Badge", "Tooltip", "Inline Code", "Kbd"],
      shadcnEquivalent: "calc(var(--radius) - 4px)",
    },
    {
      category: "scales",
      token: "--mf-radius-md",
      utility: "rounded-md",
      type: "dimension",
      light: "12px",
      dark: "12px",
      controls: "Standard rounding for all primary controls, buttons, and inputs.",
      components: ["Button", "Input", "Select", "TabsList", "TabsTrigger"],
      shadcnEquivalent: "var(--radius)",
    },
    {
      category: "scales",
      token: "--mf-radius-lg",
      utility: "rounded-lg",
      type: "dimension",
      light: "16px",
      dark: "16px",
      controls: "Large container rounding for elevated surfaces, modals, and sheets.",
      components: ["Card", "DialogContent", "Popover", "Command Palette"],
      shadcnEquivalent: "calc(var(--radius) + 4px)",
    },
    {
      category: "scales",
      token: "--mf-radius-full",
      utility: "rounded-full",
      type: "dimension",
      light: "9999px",
      dark: "9999px",
      controls: "Fully rounded circular pill corners.",
      components: ["Avatar", "Pill Button", "Status Dot", "Badge full"],
      shadcnEquivalent: "rounded-full",
    },

    // Elevation & Shadows
    {
      category: "scales",
      token: "--mf-shadow-sm",
      utility: "shadow-sm",
      type: "shadow",
      light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      dark: "0 1px 2px 0 rgba(0, 0, 0, 0.35)",
      controls: "Subtle border lift and tactile depth for interactive buttons and inputs.",
      components: ["Button shadow", "Input depth", "Tabs active shadow"],
      shadcnEquivalent: "shadow-xs / shadow-sm",
    },
    {
      category: "scales",
      token: "--mf-shadow-md",
      utility: "shadow-md",
      type: "shadow",
      light: "0 4px 14px 0 rgba(10, 30, 20, 0.06)",
      dark: "0 4px 16px 0 rgba(0, 0, 0, 0.45)",
      controls: "Medium floating elevation for cards and dropdown menus.",
      components: ["Card hover", "DropdownMenu", "Popover"],
      shadcnEquivalent: "shadow-md",
    },
    {
      category: "scales",
      token: "--mf-shadow-lg",
      utility: "shadow-lg",
      type: "shadow",
      light: "0 10px 30px -4px rgba(10, 30, 20, 0.08)",
      dark: "0 12px 36px -4px rgba(0, 0, 0, 0.6)",
      controls: "High-elevation overlay shadow for modals, sheets, and command palette.",
      components: ["DialogContent", "Command Palette", "Sheet / Drawer"],
      shadcnEquivalent: "shadow-xl / shadow-2xl",
    },

    // Typography
    {
      category: "typography",
      token: "--mf-font-sans",
      utility: "font-sans",
      type: "font",
      light: "Plus Jakarta Sans, sans-serif",
      dark: "Plus Jakarta Sans, sans-serif",
      controls: "Primary application font stack for headings, body copy, and UI text.",
      components: ["All UI copy", "Buttons", "Headings", "Labels"],
      shadcnEquivalent: "font-sans",
    },
    {
      category: "typography",
      token: "--mf-font-mono",
      utility: "font-mono",
      type: "font",
      light: "JetBrains Mono, monospace",
      dark: "JetBrains Mono, monospace",
      controls: "Monospace font stack for code snippets, tokens, keyboard shortcuts, and numbers.",
      components: ["ComponentCode", "Kbd", "Token table", "CLI commands"],
      shadcnEquivalent: "font-mono",
    },
  ];

export default function DocsThemingPage() {
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (tokenName: string) => {
    navigator.clipboard.writeText(tokenName);
    setCopiedToken(tokenName);
    setTimeout(() => {
      setCopiedToken(null);
    }, 2000);
  };

  const filteredTokens = useMemo(() => {
    return mintforgeTokens.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.token.toLowerCase().includes(query) ||
        item.utility.toLowerCase().includes(query) ||
        item.controls.toLowerCase().includes(query) ||
        item.components.some((c) => c.toLowerCase().includes(query)) ||
        item.shadcnEquivalent.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: mintforgeTokens.length,
      surfaces: mintforgeTokens.filter((t) => t.category === "surfaces").length,
      typography: mintforgeTokens.filter((t) => t.category === "typography").length,
      brand: mintforgeTokens.filter((t) => t.category === "brand").length,
      borders: mintforgeTokens.filter((t) => t.category === "borders").length,
      scales: mintforgeTokens.filter((t) => t.category === "scales").length,
    };
  }, []);

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Theming"
          description="Using CSS variables, OKLCH color spaces, and Mintforge semantic theme tokens for scalable dark and light mode styling."
          prevHref="/docs/installation"
          nextHref="/docs/components"
        />

        {/* Neutral Callout */}
        <div className="mf-docs-callout mf-docs-callout-neutral">
          <div>
            Want to build your theme visually? Use <span className="mf-inline-code">mintforge/create</span> to preview colors, radius, fonts, and icons, then generate a preset for your project.
          </div>
        </div>

        {/* Section 1: Mintforge Tokens */}
        <section id="mintforge-tokens" className="scroll-mt-24">
          <h2 className="mf-docs-h2">The Mintforge Token System</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI uses semantic CSS variables prefixed with <span className="mf-inline-code">--mf-*</span>. This ensures that every primitive (<span className="mf-inline-code">Button</span>, <span className="mf-inline-code">Card</span>, <span className="mf-inline-code">Dialog</span>, <span className="mf-inline-code">Input</span>) automatically adapts to light and dark themes without hardcoding hex values into your components.
          </p>

          <p className="mf-docs-paragraph">
            In Tailwind CSS v4, these tokens are mapped directly via <span className="mf-inline-code">@theme inline</span> inside <span className="mf-inline-code">src/app/globals.css</span>:
          </p>

          <ComponentCode
            filename="src/app/globals.css"
            language="css"
            code={`@theme inline {
  --color-mf-background: var(--mf-background);
  --color-mf-surface: var(--mf-surface);
  --color-mf-surface-secondary: var(--mf-surface-secondary);
  --color-mf-foreground: var(--mf-foreground);
  --color-mf-foreground-secondary: var(--mf-foreground-secondary);
  --color-mf-brand: var(--mf-brand);
  --color-mf-border: var(--mf-border);
  --font-sans: var(--mf-font-sans);
  --font-mono: var(--mf-font-mono);
}`}
          />

          <p className="mf-docs-paragraph mt-4">
            You can use these tokens with standard, clean Tailwind classes throughout your app:
          </p>

          <ComponentCode
            language="tsx"
            code={`// Clean, standard Tailwind classes (recommended):
<div className="bg-card text-foreground border border-border rounded-lg shadow-sm" />

// Primary CTA buttons & badges:
<button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-md" />
<span className="bg-brand-subtle text-brand border border-brand/20 rounded-full" />`}
          />
        </section>

        {/* Section 2: OKLCH Color Space */}
        <section id="oklch-colors" className="scroll-mt-24">
          <h2 className="mf-docs-h2">OKLCH Color Space</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI is engineered natively on the <strong>OKLCH color space</strong>. OKLCH (Lightness, Chroma, Hue) solves the historic flaws of sRGB and HSL:
          </p>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Perceptual Uniformity</strong>: Two colors with the same Lightness value appear equally bright to the human eye, regardless of hue.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Display P3 Wide Gamut</strong>: Access to vibrant, saturated emeralds, purples, and blues on modern Apple Retina and OLED displays.
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Predictable Contrast Ratios</strong>: Generating accessible WCAG AAA compliant text pairings across dynamic themes is mathematical and effortless.
            </li>
          </ul>
        </section>

        {/* Section 3: Color Palettes */}
        <section id="color-palettes" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Base Color Palettes</h2>
          <p className="mf-docs-paragraph">
            Mintforge ships with 6 curated base color palettes. You can choose your base palette during <span className="mf-inline-code">init</span> or swap the token variables anytime:
          </p>

          <div className="mf-palette-grid">
            {palettes.map((p) => (
              <div key={p.name} className="mf-palette-card">
                <div className="mf-palette-header">
                  <span className="mf-palette-title">{p.name}</span>
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: p.hex }} />
                </div>
                <div className="mf-palette-swatches">
                  {p.swatches.map((color, idx) => (
                    <div
                      key={idx}
                      className="mf-swatch-chip"
                      style={{ background: color }}
                      title={`${p.name} stop ${idx * 100}: ${color}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: components.json */}
        <section id="components-json" className="scroll-mt-24">
          <h2 className="mf-docs-h2">components.json Configuration</h2>
          <p className="mf-docs-paragraph">
            To use CSS variables for theming, ensure <span className="mf-inline-code">tailwind.cssVariables</span> is set to <span className="mf-inline-code">true</span> in your <span className="mf-inline-code">components.json</span> file. This is enabled by default:
          </p>

          <ComponentCode
            filename="components.json"
            code={componentsJsonCode}
            language="json"
            showLineNumbers
          />

          <p className="mf-docs-paragraph">
            Tailwind maps these tokens into utilities like <span className="mf-inline-code">bg-mf-background</span>,{" "}
            <span className="mf-inline-code">text-mf-foreground</span>,{" "}
            <span className="mf-inline-code">border-mf-border</span>, and{" "}
            <span className="mf-inline-code">bg-mf-brand</span>.
          </p>
        </section>

        {/* Section 5: Token Convention */}
        <section id="token-convention" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Token Convention</h2>
          <p className="mf-docs-paragraph">
            We use semantic surface and foreground pairings. The surface token controls background elevation, while the corresponding foreground token guarantees high-contrast text and icons:
          </p>

          <div className="mf-docs-callout mf-docs-callout-neutral">
            <div>
              For example, <span className="mf-inline-code">--mf-brand</span> is paired with <span className="mf-inline-code">--mf-brand-foreground</span>, ensuring buttons always maintain WCAG AAA contrast ratios in both light and dark modes.
            </div>
          </div>

          <p className="mf-docs-paragraph">
            Given the following Mintforge token definitions:
          </p>

          <ComponentCode
            language="css"
            code={`/* In globals.css :root (Light Theme) */
--mf-brand: #059669;
--mf-brand-foreground: #ffffff;

/* In globals.css .dark (Dark Theme) */
--mf-brand: #10b981;
--mf-brand-foreground: #041d13;`}
          />

          <p className="mf-docs-paragraph">
            The background will be <span className="mf-inline-code">var(--mf-brand)</span> and text color will automatically be <span className="mf-inline-code">var(--mf-brand-foreground)</span>:
          </p>

          <ComponentCode
            language="tsx"
            code={`<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover shadow-sm">
  Action Button
</button>`}
          />
        </section>

        {/* Section 6: Radius Scale */}
        <section id="radius-scale" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Radius & Typography Scales</h2>
          <p className="mf-docs-paragraph">
            All corner radii are scaled proportionally using standardized Mintforge tokens. Adjusting these values globally refines all buttons, inputs, dialogs, and cards:
          </p>

          <ComponentCode
            filename="src/styles/design-tokens.css"
            language="css"
            code={`:root {
  --mf-radius-sm: 8px;     /* Badges, tags, micro-pills */
  --mf-radius-md: 12px;    /* Buttons, inputs, textareas, selects */
  --mf-radius-lg: 16px;    /* Cards, modal dialogs, sheets */
  --mf-radius-full: 9999px; /* Rounded pill buttons, avatars */

  --mf-font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --mf-font-mono: "JetBrains Mono", "Fira Code", monospace;
}`}
          />
        </section>

        {/* Section 7: Dark Mode with next-themes */}
        <section id="dark-mode-setup" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Dark Mode Setup with next-themes</h2>
          <p className="mf-docs-paragraph">
            In Next.js 16 App Router, dark mode is toggled by attaching the <span className="mf-inline-code">.dark</span> class to the HTML document tag. We recommend <span className="mf-inline-code">next-themes</span> for zero flash of unstyled content (FOUC):
          </p>

          <ComponentCode
            filename="src/components/layout/theme-provider.tsx"
            language="tsx"
            code={`"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`}
          />
        </section>

        {/* Section 8: Mintforge Theme Tokens Table */}
        <section id="theme-tokens" className="scroll-mt-24">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-brand-subtle text-brand">
                <SlidersHorizontal size={16} />
              </span>
              <h2 className="mf-docs-h2 mt-0 mb-0">Mintforge Theme Tokens Table</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              All 21 semantic CSS variables from <span className="mf-inline-code">src/styles/design-tokens.css</span>, their active Tailwind utilities, live values, and component consumers.
            </p>
          </div>

          {/* Interactive Toolbar */}
          <div className="mf-token-toolbar">
            {/* Search Box */}
            <div className="mf-token-search-box">
              <Search size={14} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tokens, utilities, components..."
                className="mf-token-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[10px] text-muted-foreground hover:text-foreground px-1 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg border border-border bg-secondary text-xs">
              {(["all", "surfaces", "brand", "typography", "borders", "scales"] as TokenCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat
                      ? "bg-brand-subtle text-brand font-bold"
                      : "text-muted-foreground"
                  }`}>
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tokens Table */}
          <div className="mf-docs-table-wrapper">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "27%" }}>Token & Utility</th>
                  <th style={{ width: "23%" }}>Values (Light / Dark)</th>
                  <th style={{ width: "27%" }}>What it controls</th>
                  <th style={{ width: "23%" }}>Used by</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                      No theme tokens found matching &quot;{searchQuery}&quot;. Try resetting your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredTokens.map((item) => {
                    const isCopied = copiedToken === item.token;
                    return (
                      <tr key={item.token}>
                        <td>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="mf-inline-code font-bold font-mono text-[11px] text-brand">
                                {item.token}
                              </span>
                              <button
                                onClick={() => handleCopy(item.token)}
                                title="Copy token variable"
                                className="p-1 rounded hover:bg-surface-tertiary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                              >
                                {isCopied ? (
                                  <Check size={12} className="text-brand" />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-muted-foreground">
                                {item.utility}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.type === "color" ? (
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-xs font-mono">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                                  style={{ background: item.light }}
                                />
                                <span className="text-[11px] text-foreground">{item.light}</span>
                                <span className="text-[10px] text-muted-foreground">(light)</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-mono">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                                  style={{ background: item.dark }}
                                />
                                <span className="text-[11px] text-foreground">{item.dark}</span>
                                <span className="text-[10px] text-muted-foreground">(dark)</span>
                              </div>
                            </div>
                          ) : item.type === "dimension" ? (
                            <div className="flex items-center gap-2.5">
                              <div
                                className="mf-token-radius-box"
                                style={{ borderRadius: item.light }}
                                title={`Corner Radius Preview: ${item.light}`}
                              />
                              <div className="text-xs font-mono font-medium text-foreground">
                                {item.light}
                              </div>
                            </div>
                          ) : item.type === "shadow" ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div
                                  className="mf-token-shadow-box"
                                  style={{ boxShadow: item.light }}
                                  title={`Shadow Elevation Preview: ${item.light}`}
                                />
                                <span className="text-[10px] font-mono text-muted-foreground line-clamp-1">
                                  {item.light}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs font-mono text-foreground">
                              {item.light}
                            </div>
                          )}
                        </td>
                        <td className="text-xs leading-relaxed text-muted-foreground">
                          {item.controls}
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {item.components.map((comp) => (
                              <span key={comp} className="mf-token-comp-pill">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9: Live Token Inspector */}
        <section id="token-inspector" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-brand-subtle text-brand">
              <Sparkles size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Live Semantic Token Inspector</h2>
          </div>
          <p className="mf-docs-paragraph">
            The preview card below is rendered directly with Mintforge theme tokens. Every visual attribute maps to an active variable in the token table:
          </p>

          <div className="mf-token-inspector-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-xs" />
                  <h3 className="text-base font-bold text-foreground m-0">
                    Interactive Component Surface
                  </h3>
                  <span className="mf-token-comp-pill text-[10px]">--mf-surface</span>
                </div>
                <p className="text-xs text-muted-foreground m-0">
                  Container elevated with <span className="mf-inline-code">bg-card</span> and bounded by <span className="mf-inline-code">border-border</span>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-subtle text-brand border border-brand/20">
                  --mf-brand-subtle
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Input Field</span>
                  <span className="text-[10px] text-muted-foreground font-mono">--mf-surface-secondary</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value="test-project-preset"
                  className="h-10 px-3 text-sm rounded-md border border-border bg-secondary text-foreground outline-none"
                />
                <span className="text-[11px] text-muted-foreground">
                  Styled using <span className="mf-inline-code">rounded-md</span> (12px)
                </span>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Action Trigger</span>
                  <span className="text-[10px] text-muted-foreground font-mono">--mf-brand</span>
                </label>
                <div className="flex items-center gap-2">
                  <button className="h-10 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
                    <span>Deploy Preset</span>
                    <ArrowRight size={13} />
                  </button>
                  <button className="h-10 px-4 rounded-md border border-border hover:bg-surface-tertiary text-foreground text-xs font-semibold transition-all cursor-pointer">
                    Cancel
                  </button>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Foreground text contrast auto-satisfies WCAG AAA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Shadcn/ui Cross-Reference */}
        <section id="shadcn-mapping" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-brand-subtle text-brand">
              <Layers size={16} />
            </span>
            <h2 className="mf-docs-h2 mt-0 mb-0">Shadcn/ui & Tailwind v4 Cross-Reference</h2>
          </div>
          <p className="mf-docs-paragraph">
            If you are migrating existing code from shadcn/ui or pairing Mintforge primitives with traditional Tailwind setups, here is the exact 1-to-1 token correspondence:
          </p>

          <div className="mf-docs-table-wrapper">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "26%" }}>Mintforge Token</th>
                  <th style={{ width: "26%" }}>Tailwind Utility</th>
                  <th style={{ width: "26%" }}>Shadcn Equivalent</th>
                  <th style={{ width: "22%" }}>Architectural Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-brand</span></td>
                  <td><code className="text-xs font-mono">bg-primary / text-brand</code></td>
                  <td><span className="mf-inline-code">--primary</span></td>
                  <td className="text-xs">Wide-gamut OKLCH saturation without color shift</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-brand-foreground</span></td>
                  <td><code className="text-xs font-mono">text-primary-foreground</code></td>
                  <td><span className="mf-inline-code">--primary-foreground</span></td>
                  <td className="text-xs">Calculated contrast pairing ensures AAA accessibility</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-brand-subtle</span></td>
                  <td><code className="text-xs font-mono">bg-brand-subtle</code></td>
                  <td><span className="mf-inline-code">--primary/10</span></td>
                  <td className="text-xs">Solid tinted surface avoids dark-mode subpixel bleed</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-background</span></td>
                  <td><code className="text-xs font-mono">bg-background</code></td>
                  <td><span className="mf-inline-code">--background</span></td>
                  <td className="text-xs">Deep obsidian dark mode tuned for zero glare</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-surface</span></td>
                  <td><code className="text-xs font-mono">bg-card / bg-surface</code></td>
                  <td><span className="mf-inline-code">--card / --popover</span></td>
                  <td className="text-xs">Unified elevated tier across cards, dialogs, & menus</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-surface-secondary</span></td>
                  <td><code className="text-xs font-mono">bg-secondary / bg-muted</code></td>
                  <td><span className="mf-inline-code">--muted / --secondary</span></td>
                  <td className="text-xs">Sunken well background for inputs and tab tracks</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-border</span></td>
                  <td><code className="text-xs font-mono">border-border</code></td>
                  <td><span className="mf-inline-code">--border / --input</span></td>
                  <td className="text-xs">1px boundary calibrated for light & dark elevation</td>
                </tr>
                <tr>
                  <td><span className="mf-inline-code text-brand">--mf-radius-md</span></td>
                  <td><code className="text-xs font-mono">rounded-md</code></td>
                  <td><span className="mf-inline-code">--radius (12px)</span></td>
                  <td className="text-xs">Proportional geometric radius for harmonious curves</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
