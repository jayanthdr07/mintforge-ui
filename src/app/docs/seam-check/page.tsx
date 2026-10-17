"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  Check,
  Copy,
  Layers,
  ArrowRight,
  Workflow,
} from "lucide-react";

export default function SeamCheckDocsPage() {
  const [activeTab, setActiveTab] = useState<"schema" | "endpoint" | "payload">("schema");
  const [copiedFinding, setCopiedFinding] = useState(false);

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "the-problem", title: "The Seam Problem" },
    { id: "core-checks", title: "The 3 Core Checks" },
    { id: "live-finding-preview", title: "CLI Finding Output" },
    { id: "configuration", title: "Configuration (seamcheck.yaml)" },
    { id: "cli-usage", title: "CLI Usage" },
    { id: "github-action", title: "GitHub Action CI" },
  ];

  const copyFindingText = () => {
    navigator.clipboard.writeText(
      `ERROR  orders.schema.ts:14  OrderCreate.discount_code\n       Frontend sends "discountCode". Backend expects "discount_code" at app/routes/orders.py:31.`
    );
    setCopiedFinding(true);
    setTimeout(() => setCopiedFinding(false), 2000);
  };

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="Seam Check"
          description="Built-in contract drift verifier finding mismatches between FastAPI backends and Next.js / Expo frontends before runtime."
          badge="New"
          prevHref="/docs/cli"
          nextHref="/docs/typeset"
        />

        {/* Hero Callout Banner */}
        <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 my-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Zero Codegen. Zero Server Overhead. Pure AST Verification.
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Mintforge Seam Check analyzes your frontend forms (Zod schemas, <code>fetch</code>/<code>axios</code> calls) 
                directly against your FastAPI Pydantic models using Python <code>ast</code> and TypeScript <code>tree-sitter</code>.
                It flags casing discrepancies, missing keys, and HTTP route drift before you ship.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: The Problem */}
        <section id="the-problem" className="scroll-mt-24">
          <h2 className="mf-docs-h2">The Seam Problem</h2>
          <p className="text-sm text-muted-foreground mb-4">
            When building full-stack applications with <strong>Next.js / Expo (TypeScript)</strong> and a <strong>FastAPI (Python)</strong> backend, 
            the boundary between the two languages is notoriously brittle:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="w-8 h-8 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
                <AlertTriangle size={18} />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Casing Drift</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Frontend sends <code>discountCode</code> (camelCase) while FastAPI expects <code>discount_code</code> (snake_case). Result: silent <code>422 Unprocessable Entity</code>.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Layers size={18} />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Optionality Drift</h4>
              <p className="text-xs text-muted-foreground mt-1">
                A field made optional on the backend is still marked required in the frontend form, blocking user submissions unnecessarily.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="w-8 h-8 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Workflow size={18} />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Endpoint Path Drift</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Frontend calls <code>/api/orders</code> instead of <code>/api/v1/orders/</code>, returning an immediate <code>404 Not Found</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The 3 Core Checks */}
        <section id="core-checks" className="scroll-mt-24">
          <h2 className="mf-docs-h2">The 3 Core Checks</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Seam Check focuses exclusively on 3 high-impact static verification checks:
          </p>

          <div className="flex items-center gap-2 border-b border-border mb-4">
            <button
              onClick={() => setActiveTab("schema")}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "schema"
                  ? "border-brand text-brand font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              1. Schema Drift
            </button>
            <button
              onClick={() => setActiveTab("endpoint")}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "endpoint"
                  ? "border-brand text-brand font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              2. Endpoint Drift
            </button>
            <button
              onClick={() => setActiveTab("payload")}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "payload"
                  ? "border-brand text-brand font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              3. Payload Drift
            </button>
          </div>

          {activeTab === "schema" && (
            <div className="p-4 rounded-lg border border-border bg-card space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Pydantic Model vs Zod Schema</h4>
              <p className="text-xs text-muted-foreground">
                Compares fields in a Python Pydantic <code>BaseModel</code> directly against a TypeScript <code>z.object(&#123;...&#125;)</code>. 
                Flags missing fields, extra fields, optional vs required conflicts, and explicit type mismatches (e.g. <code>str</code> vs <code>z.number()</code>).
              </p>
              <ComponentCode
                language="typescript"
                code={`// frontend: orders.schema.ts
export const OrderCreateSchema = z.object({
  productId: z.string(),
  quantity: z.number().int(),
  discountCode: z.string().optional(), // ⚠️ MISMATCH: Backend expects "discount_code"
});`}
              />
            </div>
          )}

          {activeTab === "endpoint" && (
            <div className="p-4 rounded-lg border border-border bg-card space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Frontend API Call vs FastAPI Route</h4>
              <p className="text-xs text-muted-foreground">
                Ensures that every <code>fetch()</code> or <code>axios</code> call in your frontend matches an active 
                FastAPI route decorator (<code>@router.get</code>, <code>@router.post</code>, etc.) by both HTTP method and URL path.
              </p>
              <ComponentCode
                language="python"
                code={`# backend: app/routes/orders.py
@router.post("/api/v1/orders", response_model=OrderResponse)
async def create_order(payload: OrderCreate):
    ...`}
              />
            </div>
          )}

          {activeTab === "payload" && (
            <div className="p-4 rounded-lg border border-border bg-card space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Frontend Request Body vs Route Request Model</h4>
              <p className="text-xs text-muted-foreground">
                Verifies that the object keys passed in <code>body: JSON.stringify(&#123;...&#125;)</code> or <code>axios.post(url, data)</code> 
                match the expected fields in the FastAPI endpoint&apos;s request model.
              </p>
            </div>
          )}
        </section>

        {/* Section 3: Live Finding Preview */}
        <section id="live-finding-preview" className="scroll-mt-24">
          <h2 className="mf-docs-h2">CLI Finding Output</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Seam Check produces clean, actionable reports with exact file and line numbers:
          </p>

          <div className="relative rounded-lg border border-border bg-[#0d1310] p-4 text-xs font-mono">
            <button
              onClick={copyFindingText}
              className="absolute right-3 top-3 p-1.5 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Copy Finding"
            >
              {copiedFinding ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
            </button>
            <div className="text-red-400 font-bold mb-1">
              ERROR  orders.schema.ts:14  OrderCreate.discount_code
            </div>
            <div className="text-zinc-400 pl-7">
              Frontend sends &quot;discountCode&quot;. Backend expects &quot;discount_code&quot; at app/routes/orders.py:31.
            </div>
          </div>
        </section>

        {/* Section 4: Configuration */}
        <section id="configuration" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Configuration (seamcheck.yaml)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Seam Check follows an explicit contract model. Instead of guessing name matches (which causes false positives), you define mappings in <code>seamcheck.yaml</code>:
          </p>

          <ComponentCode
            language="yaml"
            code={`# seamcheck.yaml
version: 1

backend:
  path: "backend/app"
  framework: "fastapi"

frontend:
  path: "frontend/src"
  framework: "nextjs" # or expo

# Explicit Schema Mappings (Frontend Zod : Backend Pydantic)
mappings:
  UserSignupSchema: "UserSignup"
  OrderCreateSchema: "OrderCreate"
  PaymentIntentSchema: "PaymentIntentCreate"`}
          />
        </section>

        {/* Section 5: CLI Usage */}
        <section id="cli-usage" className="scroll-mt-24">
          <h2 className="mf-docs-h2">CLI Usage</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Run Seam Check anytime locally using the official Mintforge CLI:
          </p>

          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge check",
              npm: "npx mintforge check",
              yarn: "yarn dlx mintforge check",
              bun: "bunx mintforge check",
            }}
          />
        </section>

        {/* Section 6: GitHub Action */}
        <section id="github-action" className="scroll-mt-24">
          <h2 className="mf-docs-h2">GitHub Action CI</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Prevent broken API contracts from merging into <code>main</code> by adding Mintforge Seam Check to your GitHub Actions workflow:
          </p>

          <ComponentCode
            language="yaml"
            code={`# .github/workflows/seam-check.yml
name: Seam Verification

on:
  pull_request:
    branches: [main]

jobs:
  verify-seams:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Run Mintforge Seam Check
        run: npx mintforge check`}
          />
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Ready to configure?</span>
          <Link href="/docs/cli" className="text-brand hover:underline font-medium inline-flex items-center gap-1">
            <span>Explore Mintforge CLI Commands</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
