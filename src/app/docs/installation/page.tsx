"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import { AlertCircle } from "lucide-react";

export default function DocsInstallationPage() {
  const [activeTab, setActiveTab] = useState<"nextjs" | "vite" | "astro" | "expo">("nextjs");

  const tocItems = [
    { id: "cli-init", title: "Automatic Setup (CLI)" },
    { id: "manual-setup", title: "Manual Installation" },
    { id: "framework-guides", title: "Framework Guides" },
    { id: "components-json", title: "components.json Configuration" },
    { id: "troubleshooting", title: "Troubleshooting & FAQs" },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Installation"
          description="How to install dependencies, configure your framework, and scaffold Mintforge UI components."
          prevHref="/docs"
          nextHref="/docs/theming"
        />

        {/* Green Accent Callout */}
        <div className="mf-docs-callout mf-docs-callout-success">
          <div>
            <strong>Recommended for new projects:</strong> Run <span className="mf-inline-code">npx mintforge@latest init</span> to configure design tokens, Tailwind CSS v4 variables, and utility helpers automatically.
          </div>
        </div>

        {/* 3 Starting Setup Cards */}
        <div className="mf-docs-setup-grid">
          <a href="#cli-init" className="mf-docs-setup-card">
            <div className="mf-docs-setup-title">Automatic Setup</div>
            <div className="mf-docs-setup-desc">
              Initialize Mintforge in an existing project with one terminal command.
            </div>
          </a>

          <a href="#manual-setup" className="mf-docs-setup-card">
            <div className="mf-docs-setup-title">Manual Setup</div>
            <div className="mf-docs-setup-desc">
              Step-by-step guide to configure Tailwind tokens and utilities manually.
            </div>
          </a>

          <a href="#framework-guides" className="mf-docs-setup-card">
            <div className="mf-docs-setup-title">Framework Guides</div>
            <div className="mf-docs-setup-desc">
              Tailored walkthroughs for Next.js 16, Vite, Astro, and Expo.
            </div>
          </a>
        </div>

        {/* Section 1: Automatic Setup via CLI */}
        <section id="cli-init" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Automatic Setup (CLI)</h2>
          <p className="mf-docs-paragraph">
            Run the <span className="mf-inline-code">init</span> command in the root directory of your React or Next.js project:
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

          <p className="mf-docs-paragraph mt-4">
            The CLI interactive wizard will guide you through the initial configuration:
          </p>

          <div className="p-4 rounded-xl border border-border bg-secondary font-mono text-xs space-y-1.5 text-muted-foreground my-4">
            <p className="text-brand">✔ Which framework are you using? › Next.js (App Router)</p>
            <p className="text-brand">✔ Which base color would you like? › Emerald (Mintforge Default)</p>
            <p className="text-brand">✔ Where is your global CSS file? › src/app/globals.css</p>
            <p className="text-brand">✔ Do you want to use CSS variables for theming? › yes</p>
            <p className="text-brand">✔ Configure import alias for components: › @/components</p>
            <p className="text-brand">✔ Configure import alias for utilities: › @/lib/utils</p>
          </div>

          <p className="mf-docs-paragraph">
            Once initialized, you can add any component directly into your codebase:
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

          <div className="mt-4 p-4 rounded-xl border border-border bg-card flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-foreground">Building with a FastAPI backend?</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Run <span className="mf-inline-code">npx mintforge check</span> to statically verify your Zod form schemas against Pydantic models with zero codegen.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Manual Installation */}
        <section id="manual-setup" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Manual Installation Guide</h2>
          <p className="mf-docs-paragraph">
            If you prefer configuring your project manually without the CLI, follow these step-by-step instructions:
          </p>

          <div className="mf-install-steps">
            {/* Step 1 */}
            <div className="mf-install-step">
              <div className="mf-step-badge">1</div>
              <h3 className="mf-step-title">Create your Next.js project</h3>
              <p className="mf-step-desc">
                Bootstrap a fresh Next.js application with TypeScript and Tailwind CSS:
              </p>
              <ComponentCode
                packageManagerTabs
                commands={{
                  pnpm: "pnpm create next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
                  npm: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
                  yarn: "yarn create next-app my-app --typescript --tailwind --eslint --app --src-dir",
                  bun: "bun create next-app my-app --typescript --tailwind --eslint --app --src-dir",
                }}
              />
            </div>

            {/* Step 2 */}
            <div className="mf-install-step">
              <div className="mf-step-badge">2</div>
              <h3 className="mf-step-title">Install core dependencies</h3>
              <p className="mf-step-desc">
                Install <span className="mf-inline-code">clsx</span> and <span className="mf-inline-code">tailwind-merge</span> for conditional class combining, plus <span className="mf-inline-code">lucide-react</span> for icons:
              </p>
              <ComponentCode
                packageManagerTabs
                commands={{
                  pnpm: "pnpm add clsx tailwind-merge lucide-react",
                  npm: "npm install clsx tailwind-merge lucide-react",
                  yarn: "yarn add clsx tailwind-merge lucide-react",
                  bun: "bun add clsx tailwind-merge lucide-react",
                }}
              />
            </div>

            {/* Step 3 */}
            <div className="mf-install-step">
              <div className="mf-step-badge">3</div>
              <h3 className="mf-step-title">Add the `cn` utility helper</h3>
              <p className="mf-step-desc">
                Create <span className="mf-inline-code">src/lib/utils.ts</span> to merge Tailwind classes cleanly without conflicts:
              </p>
              <ComponentCode
                filename="src/lib/utils.ts"
                language="typescript"
                code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
              />
            </div>

            {/* Step 4 */}
            <div className="mf-install-step">
              <div className="mf-step-badge">4</div>
              <h3 className="mf-step-title">Configure Tailwind CSS v4 variables</h3>
              <p className="mf-step-desc">
                In <span className="mf-inline-code">src/app/globals.css</span>, import Tailwind and declare your theme tokens under <span className="mf-inline-code">:root</span> and <span className="mf-inline-code">.dark</span>:
              </p>
              <ComponentCode
                filename="src/app/globals.css"
                language="css"
                code={`@import "tailwindcss";

@theme inline {
  --color-mf-background: var(--mf-background);
  --color-mf-surface: var(--mf-surface);
  --color-mf-foreground: var(--mf-foreground);
  --color-mf-brand: var(--mf-brand);
  --color-mf-border: var(--mf-border);
}

:root {
  --mf-background: #fafcfb;
  --mf-surface: #ffffff;
  --mf-surface-secondary: #f3f7f5;
  --mf-foreground: #0d1a16;
  --mf-brand: #059669;
  --mf-border: #e3ebe7;
  --mf-radius-md: 12px;
}

.dark {
  --mf-background: #080f0c;
  --mf-surface: #0f1915;
  --mf-surface-secondary: #14221c;
  --mf-foreground: #f2faf6;
  --mf-brand: #10b981;
  --mf-border: #1a2c24;
}`}
              />
            </div>

            {/* Step 5 */}
            <div className="mf-install-step">
              <div className="mf-step-badge">5</div>
              <h3 className="mf-step-title">Copy your first component</h3>
              <p className="mf-step-desc">
                Create <span className="mf-inline-code">src/components/ui/button.tsx</span> and paste the Button primitive code:
              </p>
              <ComponentCode
                filename="src/components/ui/button.tsx"
                language="tsx"
                code={`import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={\`inline-flex items-center justify-center font-medium transition-all rounded-md cursor-pointer \${
          variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm" : "bg-transparent border border-border text-foreground hover:bg-secondary"
        } \${size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm"} \${className}\`}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";`}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Framework Guides */}
        <section id="framework-guides" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Framework Guides</h2>
          <p className="mf-docs-paragraph">
            Mintforge UI is optimized for all modern meta-frameworks. Select your stack below:
          </p>

          <div className="flex items-center gap-2 border-b border-border pb-2 mb-6">
            {(["nextjs", "vite", "astro", "expo"] as const).map((fw) => (
              <button
                key={fw}
                onClick={() => setActiveTab(fw)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeTab === fw
                    ? "bg-brand-subtle text-brand border border-emerald-500/20"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {fw === "nextjs" ? "Next.js 16" : fw === "vite" ? "Vite + React" : fw === "astro" ? "Astro" : "React Native / Expo"}
              </button>
            ))}
          </div>

          {activeTab === "nextjs" && (
            <div className="space-y-4">
              <h3 className="mf-docs-h3">Next.js 16 (App Router & Turbopack)</h3>
              <p className="mf-docs-paragraph">
                Mintforge UI supports React 19 and Next.js 16 Server Components natively. Interactive components that handle internal state include <span className="mf-inline-code">&quot;use client&quot;</span> directives automatically.
              </p>
              <ComponentCode
                packageManagerTabs
                commands={{
                  pnpm: "pnpm dlx mintforge@latest init -t next",
                  npm: "npx mintforge@latest init -t next",
                  yarn: "yarn dlx mintforge@latest init -t next",
                  bun: "bunx mintforge@latest init -t next",
                }}
              />
            </div>
          )}

          {activeTab === "vite" && (
            <div className="space-y-4">
              <h3 className="mf-docs-h3">Vite (React 19 + TypeScript)</h3>
              <p className="mf-docs-paragraph">
                For Single-Page Applications built with Vite, ensure your <span className="mf-inline-code">vite.config.ts</span> resolves the <span className="mf-inline-code">@/</span> alias:
              </p>
              <ComponentCode
                filename="vite.config.ts"
                language="typescript"
                code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`}
              />
            </div>
          )}

          {activeTab === "astro" && (
            <div className="space-y-4">
              <h3 className="mf-docs-h3">Astro 5</h3>
              <p className="mf-docs-paragraph">
                Use the React integration in Astro: <span className="mf-inline-code">npx astro add react tailwind</span>. When embedding interactive Mintforge primitives in <span className="mf-inline-code">.astro</span> templates, pass <span className="mf-inline-code">client:load</span> or <span className="mf-inline-code">client:visible</span>.
              </p>
              <ComponentCode
                language="astro"
                code={`---
import { Button } from "@/components/ui/button";
---
<Button client:load variant="default">Astro Interactive Button</Button>`}
              />
            </div>
          )}

          {activeTab === "expo" && (
            <div className="space-y-4">
              <h3 className="mf-docs-h3">React Native (Expo SDK 52)</h3>
              <p className="mf-docs-paragraph">
                For universal mobile development, use our native primitives package with NativeWind v4:
              </p>
              <ComponentCode
                packageManagerTabs
                commands={{
                  pnpm: "pnpm add @mintforge/native react-native-reanimated expo-haptics",
                  npm: "npx expo install @mintforge/native react-native-reanimated expo-haptics",
                  yarn: "yarn add @mintforge/native react-native-reanimated expo-haptics",
                  bun: "bun add @mintforge/native react-native-reanimated expo-haptics",
                }}
              />
            </div>
          )}
        </section>

        {/* Section 4: components.json Configuration */}
        <section id="components-json" className="scroll-mt-24">
          <h2 className="mf-docs-h2">components.json Configuration</h2>
          <p className="mf-docs-paragraph">
            The <span className="mf-inline-code">components.json</span> file at your project root defines where the CLI places generated components, tokens, and utility functions:
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
        </section>

        {/* Section 5: Troubleshooting & FAQs */}
        <section id="troubleshooting" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Troubleshooting & FAQs</h2>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                <AlertCircle size={15} className="text-amber-500" />
                Tailwind CSS v4: `@theme` vs `tailwind.config.js`
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tailwind v4 deprecates `tailwind.config.js` in favor of inline `@theme` directives inside your CSS file. If you are using Tailwind v3, set <span className="mf-inline-code">&quot;config&quot;: &quot;tailwind.config.js&quot;</span> in your <span className="mf-inline-code">components.json</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card">
              <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                <AlertCircle size={15} className="text-amber-500" />
                Cannot find module `@/lib/utils`
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensure your <span className="mf-inline-code">tsconfig.json</span> includes the path alias mapping:
                <br />
                <span className="mf-inline-code font-mono text-[11px] block mt-1">
                  &quot;compilerOptions&quot;: &#123; &quot;paths&quot;: &#123; &quot;@/*&quot;: [&quot;./src/*&quot;] &#125; &#125;
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
