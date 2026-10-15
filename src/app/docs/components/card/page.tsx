"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function CardDocPage() {
  const meta = COMPONENT_REGISTRY.card;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Layout" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <Card className="w-[340px]">
              <CardHeader>
                <CardTitle>Enterprise Analytics</CardTitle>
                <CardDescription>Real-time KPI telemetry and events.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[var(--mf-foreground-secondary)]">
                  Includes unlimited event streaming and custom dashboard metrics.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-[var(--mf-foreground-muted)]">Active tier</span>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/card" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
