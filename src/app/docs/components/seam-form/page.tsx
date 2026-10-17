"use client";

import * as React from "react";
import { SeamForm, SeamFormField } from "@/components/ui/seam-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function SeamFormDocPage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "synced-form", title: "Synchronized Contract Form" },
    { id: "drift-detection", title: "Real-Time Casing Drift Detection" },
    { id: "how-it-works", title: "How Seam Form Works" },
    { id: "installation", title: "Installation" },
  ];

  const syncedCode = `<Card className="max-w-md">
  <CardHeader>
    <CardTitle>Register Developer Account</CardTitle>
    <CardDescription>
      Create a verified user in your full-stack environment.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <SeamForm
      endpoint="/api/v1/auth/register"
      method="POST"
      backendModel="UserRegisterRequest"
      expectedFields={["user_name", "email_address", "password_hash"]}
    >
      <SeamFormField name="user_name" label="Username" required>
        <Input placeholder="sarah_dev" />
      </SeamFormField>
      <SeamFormField name="email_address" label="Email Address" required>
        <Input type="email" placeholder="sarah@example.com" />
      </SeamFormField>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </SeamForm>
  </CardContent>
</Card>`;

  const driftCode = `<!-- Notice the frontend field uses camelCase "userName", but the FastAPI backend expects "user_name" -->
<SeamForm
  endpoint="/api/v1/auth/register"
  method="POST"
  backendModel="UserRegisterRequest"
  expectedFields={["user_name", "email_address"]}
>
  <SeamFormField name="userName" label="Username (with casing drift)" required>
    <Input placeholder="sarah_dev" />
  </SeamFormField>
</SeamForm>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Seam Form"
          description="A contract-aware form wrapper that unifies UI layout with backend contract intelligence, catching field-casing drift and missing parameters in real time."
        />

        <div className="space-y-10 mt-6">
          {/* Synchronized Example */}
          <section id="synced-form" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Synchronized Contract Form
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When form inputs match the FastAPI schema, the header displays a verified contract badge with zero drift. Clicking &quot;Inspect&quot; opens the live schema mapping modal.
            </p>
            <ComponentPreview code={syncedCode}>
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle>Register Developer Account</CardTitle>
                  <CardDescription>
                    Create a verified user in your full-stack environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SeamForm
                    endpoint="/api/v1/auth/register"
                    method="POST"
                    backendModel="UserRegisterRequest"
                    expectedFields={["user_name", "email_address"]}
                  >
                    <SeamFormField name="user_name" label="Username" required>
                      <Input placeholder="sarah_dev" />
                    </SeamFormField>
                    <SeamFormField name="email_address" label="Email Address" required>
                      <Input type="email" placeholder="sarah@example.com" />
                    </SeamFormField>
                    <Button type="button" className="w-full mt-2">
                      Create Account
                    </Button>
                  </SeamForm>
                </CardContent>
              </Card>
            </ComponentPreview>
          </section>

          {/* Drift Detection Example */}
          <section id="drift-detection" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Real-Time Casing Drift Detection
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If a developer inadvertently uses JavaScript <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">userName</code> while the FastAPI Pydantic schema expects Python <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">user_name</code>, the component visually highlights the discrepancy before sending an invalid HTTP 422 payload.
            </p>
            <ComponentPreview code={driftCode}>
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle>Live Casing Warning</CardTitle>
                  <CardDescription>
                    Interactive demonstration of automatic drift warning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SeamForm
                    endpoint="/api/v1/auth/register"
                    method="POST"
                    backendModel="UserRegisterRequest"
                    expectedFields={["user_name", "email_address"]}
                  >
                    <SeamFormField name="userName" label="Username" required>
                      <Input placeholder="sarah_dev" />
                    </SeamFormField>
                    <Button type="button" className="w-full mt-2">
                      Submit Payload
                    </Button>
                  </SeamForm>
                </CardContent>
              </Card>
            </ComponentPreview>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              How Seam Form Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                  <CheckCircle2 size={16} />
                  <span>In-Dev Visual Feedback</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  During development, forms show the live parity badge. Clicking it reveals the field breakdown, types, and backend schema target.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>CI Verification with CLI</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In production or CI pipelines, <code className="text-emerald-500 font-mono">npx mintforge check</code> statically inspects all forms and prevents breaking pull requests before deploy.
                </p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Installation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add the Seam Form primitive to your project:
            </p>
            <ComponentCode
              code="npx mintforge add seam-form"
              language="bash"
            />
          </section>
        </div>

        <div className="mt-16">
          <ComponentPagination currentHref="/docs/components/seam-form" />
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
