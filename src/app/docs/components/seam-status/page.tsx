"use client";

import * as React from "react";
import { SeamStatus } from "@/components/ui/seam-status";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { Sparkles } from "lucide-react";

export default function SeamStatusDocPage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "interactive-pill", title: "Dev Pill (Click to Inspect)" },
    { id: "form-integration", title: "Form Header Banner" },
    { id: "card-widget", title: "Contract Dashboard Card" },
    { id: "installation", title: "Installation" },
  ];

  const pillCode = `<SeamStatus
  variant="pill"
  endpoint={{
    method: "POST",
    path: "/v1/interviews/{session_id}/feedback",
    backendModel: "SubmitTeamFeedbackRequest",
    status: "synced",
    fields: [
      { frontendKey: "scores", backendKey: "scores", status: "synced", required: true },
      { frontendKey: "strengths", backendKey: "strengths", status: "synced", required: true },
      { frontendKey: "improvements", backendKey: "improvements", status: "synced", required: true },
      { frontendKey: "recommendations", backendKey: "recommendations", status: "synced", required: true },
      { frontendKey: "detailed_feedback", backendKey: "detailed_feedback", status: "synced", required: true },
    ],
  }}
/>`;

  const formBannerCode = `<Card className="max-w-md">
  <CardHeader>
    <SeamStatus variant="banner" />
    <CardTitle>Submit Interview Evaluation</CardTitle>
    <CardDescription>Official candidate grading rubric.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-3">
    <Input label="Detailed Feedback" placeholder="Candidate demonstrated strong algorithmic skills..." />
    <Input label="Strengths" placeholder="Clear system architecture..." />
  </CardContent>
  <CardFooter>
    <Button className="w-full">Save Evaluation</Button>
  </CardFooter>
</Card>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Seam Status"
          description="Contract-aware UI widget and live inspector bringing real-time FastAPI contract verification directly into your frontend components."
          badge="Full-Stack"
        />

        {/* Feature Banner */}
        <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 my-6">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                The First UI Library with Built-In Contract Intelligence
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Rather than treating UI forms and backend APIs as disconnected worlds, Mintforge bridges them.
                <code>&lt;SeamStatus /&gt;</code> provides a live in-browser badge and inspector that validates your active form
                fields against your FastAPI Pydantic models.
              </p>
            </div>
          </div>
        </div>

        <section id="interactive-pill" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Interactive Dev Pill</h2>
          <p className="text-xs text-muted-foreground">
            A compact floating pill designed for dev mode or navigation bars. <strong>Click the pill</strong> to open the live Seam Check Inspector modal:
          </p>
          <ComponentPreview code={pillCode}>
            <div className="flex items-center justify-center p-8">
              <SeamStatus
                variant="pill"
                endpoint={{
                  method: "POST",
                  path: "/v1/interviews/{session_id}/feedback",
                  backendModel: "SubmitTeamFeedbackRequest",
                  status: "synced",
                  fields: [
                    { frontendKey: "scores", backendKey: "scores", status: "synced", required: true },
                    { frontendKey: "strengths", backendKey: "strengths", status: "synced", required: true },
                    { frontendKey: "improvements", backendKey: "improvements", status: "synced", required: true },
                    { frontendKey: "recommendations", backendKey: "recommendations", status: "synced", required: true },
                    { frontendKey: "detailed_feedback", backendKey: "detailed_feedback", status: "synced", required: true },
                  ],
                }}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="form-integration" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Form Header Banner</h2>
          <p className="text-xs text-muted-foreground">
            Embed <code>variant=&quot;banner&quot;</code> directly inside form cards or modals. It verifies the contract before the user hits submit:
          </p>
          <ComponentPreview code={formBannerCode}>
            <div className="w-full max-w-md mx-auto p-2">
              <Card>
                <CardHeader className="space-y-3">
                  <SeamStatus variant="banner" />
                  <div>
                    <CardTitle>Submit Interview Evaluation</CardTitle>
                    <CardDescription>Official candidate grading rubric.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    label="Detailed Feedback *"
                    placeholder="Candidate demonstrated strong algorithmic skills..."
                    defaultValue="Candidate demonstrated strong algorithmic skills..."
                  />
                  <Input
                    label="Key Strengths"
                    placeholder="Clear system architecture..."
                    defaultValue="Clear system architecture, great communication."
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit Verified Evaluation</Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </section>

        <section id="card-widget" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Contract Dashboard Card</h2>
          <ComponentPreview
            code={`<SeamStatus
  variant="card"
  endpoints={[
    { method: "POST", path: "/v1/interviews/{id}/feedback", status: "synced" },
    { method: "GET",  path: "/v1/projects/student/{id}/comments", status: "synced" },
    { method: "POST", path: "/v1/orders", status: "synced" },
  ]}
/>`}
          >
            <div className="w-full max-w-md mx-auto p-2">
              <SeamStatus
                variant="card"
                endpoints={[
                  { method: "POST", path: "/v1/interviews/{id}/feedback", status: "synced" },
                  { method: "GET", path: "/v1/projects/student/{id}/comments", status: "synced" },
                  { method: "POST", path: "/v1/orders", status: "synced" },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <p className="text-xs text-muted-foreground mb-2">CLI install:</p>
          <ComponentCode code={`npx mintforge add seam-status`} language="bash" />
          <p className="text-xs text-muted-foreground mt-4 mb-2">Import:</p>
          <ComponentCode
            code={`import { SeamStatus } from "@/components/ui/seam-status";`}
            language="tsx"
          />
        </section>

        <ComponentPagination currentHref="/docs/components/seam-status" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
