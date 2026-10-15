"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";


type SimTab = "init" | "add" | "diff" | "all";

export default function DocsCliPage() {
  const [activeSim, setActiveSim] = useState<SimTab>("init");

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "terminal-simulator", title: "Interactive Terminal" },
    { id: "init-command", title: "init" },
    { id: "add-command", title: "add" },
    { id: "diff-command", title: "diff" },
    { id: "create-command", title: "create" },
    { id: "components-json", title: "components.json Reference" },
    { id: "automation-ci", title: "CI/CD & Headless Usage" },
  ];

  const terminalOutputs: Record<SimTab, { cmd: string; output: string[] }> = {
    init: {
      cmd: "npx mintforge@latest init",
      output: [
        "  ▲ Mintforge UI CLI v0.1.0",
        "",
        "  ✔ Framework detected: Next.js (App Router)",
        "  ✔ Tailoring base color: Emerald",
        "  ✔ Global CSS located: src/app/globals.css",
        "  ✔ Creating configuration: components.json",
        "  ✔ Writing utility helper: src/lib/utils.ts",
        "  ✔ Verifying Tailwind CSS v4 variables...",
        "",
        "  Success! Project initialized. You can now add components:",
        "    npx mintforge@latest add button card dialog",
      ],
    },
    add: {
      cmd: "npx mintforge@latest add button input card",
      output: [
        "  ▲ Mintforge UI CLI v0.1.0",
        "",
        "  ✔ Fetching component metadata from registry...",
        "  ✔ Installing peer dependencies: clsx tailwind-merge lucide-react",
        "  ✔ Writing src/components/ui/button.tsx",
        "  ✔ Writing src/components/ui/input.tsx",
        "  ✔ Writing src/components/ui/card.tsx",
        "",
        "  Installed 3 components in 410ms.",
        "  Ready to import in your pages and layouts!",
      ],
    },
    diff: {
      cmd: "npx mintforge@latest diff button",
      output: [
        "  ▲ Mintforge UI CLI v0.1.0",
        "",
        "  Comparing local src/components/ui/button.tsx with upstream registry...",
        "",
        "  --- local: src/components/ui/button.tsx",
        "  +++ upstream: registry/primitives/button.tsx",
        "  @@ -42,3 +42,4 @@",
        "   +   destructive: \"bg-red-600 text-white hover:bg-red-700 shadow-sm\",",
        "   +   warning: \"bg-amber-500 text-white hover:bg-amber-600 shadow-sm\",",
        "",
        "  1 difference found. Run `npx mintforge@latest add button --overwrite` to update.",
      ],
    },
    all: {
      cmd: "npx mintforge@latest add --all",
      output: [
        "  ▲ Mintforge UI CLI v0.1.0",
        "",
        "  ✔ Scaffolding 42 UI primitives...",
        "  ✔ Writing button, input, card, badge, dialog, tabs...",
        "  ✔ Writing dropdown-menu, sheet, popover, avatar, select...",
        "  ✔ Writing command, table, separator, alert, accordion...",
        "",
        "  All 42 primitives scaffolded into src/components/ui/.",
      ],
    },
  };

  const initOptions = [
    { flag: "-y, --yes", desc: "Skip interactive questionnaire and apply recommended defaults.", default: "false" },
    { flag: "-d, --defaults", desc: "Use default configuration values for all options.", default: "false" },
    { flag: "-f, --force", desc: "Overwrite existing configuration and utility files.", default: "false" },
    { flag: "-c, --cwd <path>", desc: "The working directory. Defaults to current directory.", default: "./" },
  ];

  const addOptions = [
    { flag: "-y, --yes", desc: "Skip confirmation prompt before file writes.", default: "false" },
    { flag: "-o, --overwrite", desc: "Overwrite existing component files in your project.", default: "false" },
    { flag: "-a, --all", desc: "Install all 42+ available primitives from the registry.", default: "false" },
    { flag: "-p, --path <path>", desc: "Custom destination path for component files.", default: "src/components/ui" },
    { flag: "-c, --cwd <path>", desc: "The working directory.", default: "./" },
  ];

  const componentsJsonFields = [
    { key: "$schema", type: "string", desc: "URL to the JSON schema validation file for IDE auto-completion." },
    { key: "style", type: "string", desc: "Design style preset (e.g. `base-nova` or `default`)." },
    { key: "rsc", type: "boolean", desc: "Enables React Server Components support for Next.js App Router." },
    { key: "tailwind.css", type: "string", desc: "Relative path to your global CSS stylesheet containing design tokens." },
    { key: "tailwind.baseColor", type: "string", desc: "Active color palette (`emerald`, `zinc`, `slate`, `neutral`, `violet`, `rose`)." },
    { key: "tailwind.cssVariables", type: "boolean", desc: "Enables OKLCH CSS variables for seamless dark/light mode toggling." },
    { key: "aliases.components", type: "string", desc: "Import path alias for component directories (e.g. `@/components`)." },
    { key: "aliases.utils", type: "string", desc: "Import path alias for helper utilities (e.g. `@/lib/utils`)." },
    { key: "aliases.ui", type: "string", desc: "Import path alias directly for primitives (e.g. `@/components/ui`)." },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="CLI"
          description="Use the Mintforge command-line interface to initialize projects, configure Tailwind design tokens, scaffold components into your repository, and inspect upstream diffs."
          prevHref="/docs/theming"
          nextHref="/docs/typeset"
        />

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24">
          <p className="mf-docs-paragraph">
            The Mintforge CLI distributes uncompiled, copyable source code directly into your repository. You don&apos;t install a bloated runtime library from NPM—instead, you execute commands on-demand via <span className="mf-inline-code">npx</span>, <span className="mf-inline-code">pnpm dlx</span>, or <span className="mf-inline-code">bunx</span>.
          </p>
          <p className="mf-docs-paragraph">
            This guarantees <strong>complete source code ownership</strong>, zero breaking library upgrades, and seamless customization.
          </p>
        </section>

        {/* Section 2: Interactive Terminal Simulator */}
        <section id="terminal-simulator" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Interactive Terminal Simulator</h2>
          <p className="mf-docs-paragraph">
            Click the tabs below to simulate how the Mintforge CLI executes in your development environment:
          </p>

          <div className="mf-terminal-window">
            <div className="mf-terminal-topbar">
              <div className="mf-terminal-dots">
                <span className="mf-terminal-dot red" />
                <span className="mf-terminal-dot yellow" />
                <span className="mf-terminal-dot green" />
              </div>

              <span className="mf-terminal-title">mintforge-cli — bash</span>

              <div className="mf-terminal-tabs">
                {(["init", "add", "diff", "all"] as SimTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveSim(tab)}
                    className={`mf-terminal-tab ${activeSim === tab ? "active" : ""}`}
                  >
                    {tab === "init" ? "init" : tab === "add" ? "add [components]" : tab === "diff" ? "diff" : "add --all"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mf-terminal-content">
              <div className="text-emerald-400 font-semibold mb-2">
                $ {terminalOutputs[activeSim].cmd}
              </div>
              <div className="space-y-0.5 text-zinc-300">
                {terminalOutputs[activeSim].output.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.includes("✔")
                        ? "text-emerald-400 font-medium"
                        : line.includes("+++") || line.includes("---")
                        ? "text-cyan-400 font-bold"
                        : line.includes("+")
                        ? "text-emerald-300"
                        : line.includes("Success!") || line.includes("Installed")
                        ? "text-white font-bold pt-1"
                        : line.includes("▲")
                        ? "text-emerald-400 font-bold"
                        : ""
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: init Command */}
        <section id="init-command" className="scroll-mt-24">
          <h2 className="mf-docs-h2">init</h2>
          <p className="mf-docs-paragraph">
            Initializes configuration and dependencies for a new or existing project. It creates your <span className="mf-inline-code">components.json</span> file, adds the <span className="mf-inline-code">cn()</span> helper to <span className="mf-inline-code">src/lib/utils.ts</span>, and verifies Tailwind CSS v4 tokens.
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge@latest init",
              npm: "npx mintforge@latest init",
              yarn: "yarn dlx mintforge@latest init",
              bun: "bunx mintforge@latest init",
            }}
          />

          <h3 className="mf-docs-h3">Options</h3>
          <div className="mf-docs-table-wrapper">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Flag</th>
                  <th style={{ width: "55%" }}>Description</th>
                  <th style={{ width: "20%" }}>Default</th>
                </tr>
              </thead>
              <tbody>
                {initOptions.map((opt) => (
                  <tr key={opt.flag}>
                    <td>
                      <span className="mf-inline-code font-bold">{opt.flag}</span>
                    </td>
                    <td>{opt.desc}</td>
                    <td>
                      <span className="mf-inline-code text-xs">{opt.default}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: add Command */}
        <section id="add-command" className="scroll-mt-24">
          <h2 className="mf-docs-h2">add</h2>
          <p className="mf-docs-paragraph">
            Scaffolds components from the Mintforge registry into your application. It automatically detects and installs any required dependencies (such as <span className="mf-inline-code">lucide-react</span>):
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge@latest add button card dialog",
              npm: "npx mintforge@latest add button card dialog",
              yarn: "yarn dlx mintforge@latest add button card dialog",
              bun: "bunx mintforge@latest add button card dialog",
            }}
          />

          <h3 className="mf-docs-h3">Common Usage Patterns</h3>
          <ul className="mf-docs-bullets">
            <li className="mf-docs-bullet-item">
              <strong>Add a single component</strong>: <span className="mf-inline-code">npx mintforge@latest add button</span>
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Add multiple components</strong>: <span className="mf-inline-code">npx mintforge@latest add input badge tabs card</span>
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Add AI Elements bundle</strong>: <span className="mf-inline-code">npx mintforge@latest add ai-elements</span>
            </li>
            <li className="mf-docs-bullet-item">
              <strong>Install everything at once</strong>: <span className="mf-inline-code">npx mintforge@latest add --all</span>
            </li>
          </ul>

          <h3 className="mf-docs-h3">Options</h3>
          <div className="mf-docs-table-wrapper">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Flag</th>
                  <th style={{ width: "55%" }}>Description</th>
                  <th style={{ width: "20%" }}>Default</th>
                </tr>
              </thead>
              <tbody>
                {addOptions.map((opt) => (
                  <tr key={opt.flag}>
                    <td>
                      <span className="mf-inline-code font-bold">{opt.flag}</span>
                    </td>
                    <td>{opt.desc}</td>
                    <td>
                      <span className="mf-inline-code text-xs">{opt.default}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: diff Command */}
        <section id="diff-command" className="scroll-mt-24">
          <h2 className="mf-docs-h2">diff</h2>
          <p className="mf-docs-paragraph">
            Compares your local component implementation against the latest version in the upstream Mintforge registry. This allows you to inspect enhancements, bug fixes, or new variants before deciding to overwrite or merge:
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge@latest diff button",
              npm: "npx mintforge@latest diff button",
              yarn: "yarn dlx mintforge@latest diff button",
              bun: "bunx mintforge@latest diff button",
            }}
          />
        </section>

        {/* Section 6: create Command */}
        <section id="create-command" className="scroll-mt-24">
          <h2 className="mf-docs-h2">create</h2>
          <p className="mf-docs-paragraph">
            Scaffolds a complete starter project with Next.js 16, Tailwind CSS v4, and Mintforge UI pre-configured:
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge@latest create my-dashboard -t next",
              npm: "npx mintforge@latest create my-dashboard -t next",
              yarn: "yarn dlx mintforge@latest create my-dashboard -t next",
              bun: "bunx mintforge@latest create my-dashboard -t next",
            }}
          />

          <p className="text-xs text-muted-foreground mt-2">
            Supported templates: <span className="mf-inline-code">next</span> (Next.js 16 App Router),{" "}
            <span className="mf-inline-code">vite</span> (React 19 SPA),{" "}
            <span className="mf-inline-code">astro</span> (Astro 5), and{" "}
            <span className="mf-inline-code">expo</span> (React Native Mobile).
          </p>
        </section>

        {/* Section 7: components.json Configuration */}
        <section id="components-json" className="scroll-mt-24">
          <h2 className="mf-docs-h2">components.json Reference</h2>
          <p className="mf-docs-paragraph">
            The <span className="mf-inline-code">components.json</span> file contains your project configuration schema. Here is the full specification:
          </p>

          <ComponentCode
            filename="components.json"
            language="json"
            showLineNumbers
            code={`{
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
}`}
          />

          <div className="mf-docs-table-wrapper mt-6">
            <table className="mf-docs-table">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Property</th>
                  <th style={{ width: "20%" }}>Type</th>
                  <th style={{ width: "50%" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {componentsJsonFields.map((field) => (
                  <tr key={field.key}>
                    <td>
                      <span className="mf-inline-code font-bold">{field.key}</span>
                    </td>
                    <td>
                      <span className="mf-inline-code text-xs text-cyan-500">{field.type}</span>
                    </td>
                    <td>{field.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 8: CI/CD & Headless Automation */}
        <section id="automation-ci" className="scroll-mt-24">
          <h2 className="mf-docs-h2">CI/CD & Headless Usage</h2>
          <p className="mf-docs-paragraph">
            To run the Mintforge CLI in non-interactive CI environments (GitHub Actions, GitLab CI, Docker builds), pass the <span className="mf-inline-code">-y</span> or <span className="mf-inline-code">--yes</span> flag to bypass all prompts:
          </p>

          <ComponentCode
            language="bash"
            code={`# Headless setup in CI/CD pipeline
npx mintforge@latest init -y --defaults
npx mintforge@latest add button card dialog -y`}
          />
        </section>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
