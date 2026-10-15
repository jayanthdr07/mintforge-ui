"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function BadgeDocPage() {
  const meta = COMPONENT_REGISTRY.badge;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Feedback" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="default">Default Pill</Badge>
              <Badge variant="brand">Brand Highlight</Badge>
              <Badge variant="outline">Outline Border</Badge>
              <Badge variant="success">Completed</Badge>
              <Badge variant="warning">In Review</Badge>
              <Badge variant="destructive">Critical Error</Badge>
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Props Reference</h2>
          <ComponentPropsTable
            props={meta.props as unknown as Parameters<typeof ComponentPropsTable>[0]["props"]}
          />
        </section>

        <ComponentPagination currentHref="/docs/components/badge" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
