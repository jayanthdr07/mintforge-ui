"use client";

import { useState } from "react";
import Link from "next/link";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import {
  Globe,
  FileCode,
  Share2,
  Package,
  Server,
  Check,
  Copy,
  FolderTree,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

type RegistryItemType = "registry:ui" | "registry:block" | "registry:hook" | "registry:theme";

export default function DocsRegistryPage() {
  const [itemType, setItemType] = useState<RegistryItemType>("registry:ui");
  const [componentName, setComponentName] = useState("pricing-card");
  const [includeDependencies, setIncludeDependencies] = useState(true);
  const [includeTailwindConfig, setIncludeTailwindConfig] = useState(false);
  const [copiedGenerated, setCopiedGenerated] = useState(false);

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "how-it-works", title: "How It Works" },
    { id: "interactive-builder", title: "Interactive Schema Builder" },
    { id: "installation-methods", title: "Installing from Registries" },
    { id: "registry-structure", title: "Directory Structure" },
    { id: "hosting-options", title: "Hosting & Distribution" },
    { id: "components-json", title: "Namespaces in components.json" },
    { id: "schema-reference", title: "Schema Reference" },
  ];

  // Dynamic registry item schema generator
  const getGeneratedSchema = () => {
    const formattedTitle = componentName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const baseObject: Record<string, unknown> = {
      $schema: "https://mintforge.dev/schema/registry-item.json",
      name: componentName,
      type: itemType,
      title: formattedTitle,
      description: `A reusable ${itemType.replace("registry:", "")} component built for the Mintforge ecosystem.`,
    };

    if (includeDependencies) {
      baseObject.dependencies = ["lucide-react"];
      baseObject.devDependencies = [];
      baseObject.registryDependencies = ["button", "badge"];
    }

    baseObject.files = [
      {
        path: itemType === "registry:hook" 
          ? `hooks/${componentName}.ts`
          : itemType === "registry:block"
          ? `components/blocks/${componentName}.tsx`
          : `components/ui/${componentName}.tsx`,
        type: itemType,
        target: itemType === "registry:hook"
          ? `src/hooks/${componentName}.ts`
          : itemType === "registry:block"
          ? `src/components/blocks/${componentName}.tsx`
          : `src/components/ui/${componentName}.tsx`,
      },
    ];

    if (includeTailwindConfig) {
      baseObject.tailwind = {
        config: {
          theme: {
            extend: {
              keyframes: {
                "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
              },
            },
          },
        },
      };
      baseObject.cssVars = {
        light: { "--pricing-card-accent": "var(--mf-brand)" },
        dark: { "--pricing-card-accent": "var(--mf-brand)" },
      };
    }

    return JSON.stringify(baseObject, null, 2);
  };

  const handleCopyGenerated = async () => {
    const jsonStr = getGeneratedSchema();
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopiedGenerated(true);
      setTimeout(() => setCopiedGenerated(false), 2000);
    } catch {
      window.prompt("Copy JSON Schema:", jsonStr);
    }
  };

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Open Registry"
          description="Build, host, and distribute your own custom component libraries, UI blocks, hooks, and design themes using the open Mintforge registry standard."
          badge="Ecosystem"
          prevHref="/docs/skills"
          nextHref="/docs/components"
        />

        {/* Feature Callout */}
        <div className="mf-docs-callout mf-docs-callout-success">
          <div>
            <strong>Decentralized Component Distribution:</strong> Mintforge UI is built on an open registry architecture. You can turn any GitHub repository or static HTTP server into a registry and allow developers to install your components with <span className="mf-inline-code">npx mintforge add &lt;url-or-name&gt;</span>.
          </div>
        </div>

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24">
          <p className="mf-docs-paragraph">
            Traditional component libraries distribute opaque JavaScript bundles via NPM packages. If you want to modify internal component styles, add customized brand behaviors, or distribute private design system modules across internal company projects, NPM packages present friction.
          </p>
          <p className="mf-docs-paragraph">
            The <strong>Mintforge Open Registry</strong> solves this by standardizing source code distribution. A registry is simply an HTTP endpoint or public GitHub repository that serves structured JSON metadata files describing how source files, dependencies, and Tailwind tokens should be unpacked into a user&apos;s project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                <Globe size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Zero Lock-In</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Host your registry on GitHub, Cloudflare Pages, Vercel, or internal company VPCs with plain JSON files.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                <Share2 size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Namespaced Scopes</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Support for scoped aliases like <span className="font-mono text-xs text-brand">@company/button</span> mapped directly in <span className="mf-inline-code">components.json</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
                <Package size={18} />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Dependency Resolution</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Mintforge CLI automatically resolves transitive NPM dependencies, icons, and peer component primitives.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section id="how-it-works" className="scroll-mt-24">
          <h2 className="mf-docs-h2">How It Works</h2>
          <p className="mf-docs-paragraph">
            The registry lifecycle follows a deterministic three-step contract:
          </p>

          <div className="space-y-3 my-4">
            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-surface-secondary text-brand font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">Author Components & Registry JSON</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You build your React/Next.js components in your repository and generate corresponding JSON metadata describing required packages, file targets, and design tokens.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-surface-secondary text-brand font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">Serve Static JSON Endpoints</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Publish your JSON files publicly or behind your team&apos;s authentication proxy (e.g. <span className="font-mono text-xs">https://ui.acme.com/r/pricing-card.json</span>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-surface-secondary text-brand font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">Scaffold with the Mintforge CLI</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Developers run <span className="mf-inline-code">npx mintforge add &lt;item&gt;</span>. The CLI fetches the JSON, unpacks source code into their configured aliases, and installs required NPM packages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Schema Builder */}
        <section id="interactive-builder" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Interactive Schema Builder</h2>
          <p className="mf-docs-paragraph">
            Configure your component parameters below to preview the exact <span className="mf-inline-code">registry-item.json</span> payload expected by the Mintforge CLI:
          </p>

          <div className="p-5 rounded-xl border border-border bg-card my-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Item Type (<span className="font-mono text-brand">type</span>)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["registry:ui", "registry:block", "registry:hook", "registry:theme"] as RegistryItemType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setItemType(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer border ${
                        itemType === t
                          ? "bg-brand-subtle text-brand border-brand/50 font-bold shadow-sm"
                          : "bg-surface-secondary border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Component Identifier (<span className="font-mono text-brand">name</span>)
                </label>
                <input
                  type="text"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="e.g. pricing-card, user-avatar"
                  className="w-full h-10 px-3 text-xs rounded-lg border border-border bg-surface-secondary text-foreground outline-none focus:border-brand font-mono"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Kebab-case name used in CLI command arguments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeDependencies}
                  onChange={(e) => setIncludeDependencies(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand focus:ring-brand accent-brand"
                />
                <span className="text-xs text-foreground font-medium">Include Registry & NPM Dependencies</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeTailwindConfig}
                  onChange={(e) => setIncludeTailwindConfig(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand focus:ring-brand accent-brand"
                />
                <span className="text-xs text-foreground font-medium">Include Custom CSS Variables & Animations</span>
              </label>
            </div>

            {/* Live Schema Output Header */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <FileCode size={14} className="text-brand" />
                  <span>public/r/{componentName || "item"}.json</span>
                </span>
                <button
                  onClick={handleCopyGenerated}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-surface-secondary hover:bg-surface-tertiary text-foreground border border-border transition-colors cursor-pointer"
                >
                  {copiedGenerated ? <Check size={13} className="text-brand" /> : <Copy size={13} />}
                  <span>{copiedGenerated ? "Copied JSON" : "Copy Payload"}</span>
                </button>
              </div>

              <ComponentCode
                code={getGeneratedSchema()}
                language="json"
                filename={`${componentName || "item"}.json`}
                showLineNumbers
              />
            </div>
          </div>
        </section>

        {/* Section 4: Installation Methods */}
        <section id="installation-methods" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Installing from Registries</h2>
          <p className="mf-docs-paragraph">
            The Mintforge CLI supports multiple flexible syntax forms to fetch components from any registry:
          </p>

          <div className="space-y-4 my-4">
            {/* Method 1: Direct URL */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-foreground">1. Direct HTTP JSON URL</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted-foreground font-mono">
                  Universal
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Install any component directly from any public or internal HTTPS endpoint:
              </p>
              <ComponentCode
                code="npx mintforge@latest add https://ui.acme.com/r/pricing-card.json"
                language="bash"
              />
            </div>

            {/* Method 2: GitHub Repository */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-foreground">2. Public GitHub Repository Shorthand</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted-foreground font-mono">
                  Zero Hosting
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Directly reference a component inside any public GitHub repository:
              </p>
              <ComponentCode
                code="npx mintforge@latest add https://github.com/acme/ui-blocks/tree/main/registry/auth-modal"
                language="bash"
              />
            </div>

            {/* Method 3: Configured Scope */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-foreground">3. Scoped Namespace (@scope/item)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-subtle text-brand border border-brand/20 font-mono font-bold">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                When you configure registries in <span className="mf-inline-code">components.json</span>, developers can install items with clean scoped names:
              </p>
              <ComponentCode
                code="npx mintforge@latest add @acme/pricing-card"
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Section 5: Directory Structure */}
        <section id="registry-structure" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Registry Project Directory Structure</h2>
          <p className="mf-docs-paragraph">
            To build a custom registry using Next.js or a static site generator, structure your repository like this:
          </p>

          <div className="p-4 rounded-xl border border-border bg-surface-secondary font-mono text-xs my-4 space-y-1 text-muted-foreground leading-relaxed overflow-x-auto">
            <div className="text-foreground font-bold flex items-center gap-2 mb-2">
              <FolderTree size={14} className="text-brand" />
              <span>my-custom-registry/</span>
            </div>
            <div className="pl-4">├── registry.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand"># Root registry index and manifest</span></div>
            <div className="pl-4">├── src/</div>
            <div className="pl-8">├── components/</div>
            <div className="pl-12">├── ui/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground"># Source implementation files</span></div>
            <div className="pl-16">├── button.tsx</div>
            <div className="pl-16">└── pricing-card.tsx</div>
            <div className="pl-8">└── hooks/</div>
            <div className="pl-12">└── use-clipboard.ts</div>
            <div className="pl-4">└── public/</div>
            <div className="pl-8">└── r/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand"># Built static JSON payloads</span></div>
            <div className="pl-12">├── index.json &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground"># Directory list of all items</span></div>
            <div className="pl-12">├── button.json</div>
            <div className="pl-12">└── pricing-card.json</div>
          </div>
        </section>

        {/* Section 6: Hosting Options */}
        <section id="hosting-options" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Hosting & Distribution</h2>
          <p className="mf-docs-paragraph">
            Because a registry is composed of static JSON files, hosting is cost-effective and straightforward:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <FaGithub size={18} />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">GitHub Pages / Raw Repo</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Place your JSON files in your repository&apos;s <span className="font-mono text-xs">public/r</span> directory or enable GitHub Pages. No backend server or database is required.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-border font-mono text-[11px] text-brand">
                raw.githubusercontent.com/.../r/
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                  <Server size={18} />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">Next.js App Router (Dynamic / Auth)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Serve registries through Route Handlers (<span className="font-mono text-xs">src/app/r/[name]/route.ts</span>) to enforce API keys, rate limits, or role-based team access.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-border font-mono text-[11px] text-brand">
                api.acme.com/v1/registry/
              </div>
            </div>
          </div>

          <p className="mf-docs-paragraph mt-4">
            Example Next.js App Router Route Handler (<span className="mf-inline-code">src/app/r/[name]/route.ts</span>):
          </p>

          <ComponentCode
            code={`import { NextRequest, NextResponse } from "next/server";
import { REGISTRY_ITEMS } from "@/lib/registry-items";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = REGISTRY_ITEMS[name];

  if (!item) {
    return NextResponse.json({ error: "Component not found in registry" }, { status: 404 });
  }

  // Optional: Verify team bearer token / API key
  const authHeader = request.headers.get("Authorization");
  if (process.env.REGISTRY_API_KEY && authHeader !== \`Bearer \${process.env.REGISTRY_API_KEY}\`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(item, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}`}
            language="tsx"
            filename="src/app/r/[name]/route.ts"
            showLineNumbers
          />
        </section>

        {/* Section 7: components.json Reference */}
        <section id="components-json" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Namespaces in components.json</h2>
          <p className="mf-docs-paragraph">
            To make your custom registry accessible via shorthand names, add it to the <span className="mf-inline-code">registries</span> field in your project&apos;s <span className="mf-inline-code">components.json</span>:
          </p>

          <ComponentCode
            code={`{
  "$schema": "https://mintforge.dev/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "emerald",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "registries": {
    "@acme": "https://ui.acme.com/r/{name}.json",
    "@community": "https://raw.githubusercontent.com/community/mintforge-blocks/main/r/{name}.json"
  }
}`}
            language="json"
            filename="components.json"
            showLineNumbers
          />

          <p className="mf-docs-paragraph mt-4">
            Once declared, any developer in your team can run:
          </p>

          <ComponentCode
            commands={{
              pnpm: "pnpm dlx mintforge@latest add @acme/pricing-card",
              npm: "npx mintforge@latest add @acme/pricing-card",
              yarn: "yarn dlx mintforge@latest add @acme/pricing-card",
              bun: "bunx mintforge@latest add @acme/pricing-card",
            }}
            packageManagerTabs
          />
        </section>

        {/* Section 8: Schema Reference */}
        <section id="schema-reference" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Schema Reference</h2>
          <p className="mf-docs-paragraph">
            The schema specification guarantees complete interoperability across CLI versions:
          </p>

          <div className="overflow-x-auto my-4 border border-border rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface-secondary border-b border-border text-foreground">
                <tr>
                  <th className="p-3 font-bold">Field</th>
                  <th className="p-3 font-bold">Type</th>
                  <th className="p-3 font-bold">Required</th>
                  <th className="p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">name</td>
                  <td className="p-3 font-mono">string</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Kebab-case component identifier used in CLI add arguments.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">type</td>
                  <td className="p-3 font-mono">&quot;registry:ui&quot; | &quot;registry:block&quot; | &quot;registry:hook&quot; | &quot;registry:theme&quot;</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Category defining default installation directory target.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">title</td>
                  <td className="p-3 font-mono">string</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Human-readable component title displayed in docs and CLI menus.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">dependencies</td>
                  <td className="p-3 font-mono">string[]</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Required NPM packages automatically installed by the CLI.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">registryDependencies</td>
                  <td className="p-3 font-mono">string[]</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Other Mintforge primitives this component depends upon (e.g. [&quot;button&quot;]).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">files</td>
                  <td className="p-3 font-mono">RegistryFile[]</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Array of file path, content, and installation target specifications.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-brand font-bold">cssVars</td>
                  <td className="p-3 font-mono">Record&lt;string, Record&lt;string, string&gt;&gt;</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Semantic design tokens and CSS variables injected into global CSS.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Next Steps Footer */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="text-center sm:text-left">
            Ready to explore our accessible primitives?
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
