"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function TabsDocPage() {
  const meta = COMPONENT_REGISTRY.tabs;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Navigation" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <div className="w-full max-w-md">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="p-4 border border-border rounded-md text-xs text-muted-foreground">
                    Overview dashboard showing total requests, API health, and cluster latency.
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="p-4 border border-border rounded-md text-xs text-muted-foreground">
                    Telemetry metrics, uptime SLAs, and serverless invocations per region.
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="p-4 border border-border rounded-md text-xs text-muted-foreground">
                    API token controls, webhooks, and team access credentials.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-muted-foreground mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/tabs" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
