"use client";

import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { RefreshCw } from "lucide-react";

export default function AlertDocPage() {
  const [dismissed, setDismissed] = React.useState(false);

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "designs", title: "Visual Designs" },
    { id: "statuses", title: "Status Types" },
    { id: "compound", title: "Compound Subcomponents" },
    { id: "with-action", title: "With Action Slot" },
    { id: "dismissible", title: "Dismissible Alert" },
    { id: "installation", title: "Installation" },
  ];

  const exampleCode = `<Alert
  status="brand"
  design="subtle"
  title="New Design Tokens Available"
  description="Mintforge v0.1.2 features revamped color scales, dark-mode surfaces, and zero-drift tokens."
/>`;

  const designsCode = `<Alert
  status="info"
  design="rail"
  title="Scheduled Maintenance"
  description="API endpoints will undergo automated zero-downtime database upgrades on Sunday at 02:00 UTC."
/>

<Alert
  status="success"
  design="card"
  title="Deployment Complete"
  description="Production release v2.4.0 is now healthy across all 12 global edge regions."
/>

<Alert
  status="destructive"
  design="solid"
  title="Critical Security Warning"
  description="A legacy API key was detected in a public repository commit. Revoke and rotate immediately."
/>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Alert"
          description="Contextual notification banners featuring distinct architectural designs (subtle, accent rail, card, solid, outline), semantic status palettes, action slots, and dismissal controls."
          badge="Feedback"
        />

        {/* Live Example */}
        <section id="interactive" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Live Example</h2>
          <p className="text-xs text-muted-foreground">
            Standard subtle banner with signature Mintforge emerald brand palette, icon badge, and typography hierarchy.
          </p>
          <ComponentPreview code={exampleCode}>
            <div className="w-full max-w-lg p-2">
              <Alert
                status="brand"
                design="subtle"
                title="New Design Tokens Available"
                description="Mintforge v0.1.2 features revamped color scales, dark-mode surfaces, and zero-drift tokens."
              />
            </div>
          </ComponentPreview>
        </section>

        {/* Visual Designs */}
        <section id="designs" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Visual Designs</h2>
          <p className="text-xs text-muted-foreground">
            Switch between <code>design=&quot;subtle&quot;</code>, <code>&quot;rail&quot;</code> (4px left accent bar), <code>&quot;card&quot;</code> (clean elevated surface), <code>&quot;solid&quot;</code> (high-urgency filled), or <code>&quot;outline&quot;</code>.
          </p>
          <ComponentPreview code={designsCode}>
            <div className="w-full max-w-lg space-y-3 p-2">
              <Alert
                status="info"
                design="rail"
                title="Scheduled Maintenance"
                description="API endpoints will undergo automated zero-downtime database upgrades on Sunday at 02:00 UTC."
              />
              <Alert
                status="success"
                design="card"
                title="Deployment Complete"
                description="Production release v2.4.0 is now healthy across all 12 global edge regions."
              />
              <Alert
                status="destructive"
                design="solid"
                title="Critical Security Warning"
                description="A legacy API key was detected in a public repository commit. Revoke and rotate immediately."
              />
            </div>
          </ComponentPreview>
        </section>

        {/* Status Types */}
        <section id="statuses" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Status Types</h2>
          <p className="text-xs text-muted-foreground">
            Built-in semantic palettes with matching icons for <code>brand</code>, <code>info</code>, <code>success</code>, <code>warning</code>, <code>destructive</code>, and <code>neutral</code>.
          </p>
          <ComponentPreview
            code={`<Alert status="success" title="Payment Succeeded" description="Invoice #INV-2026-981 has been processed." />
<Alert status="warning" title="Storage Quota" description="You have reached 85% of your available team storage." />
<Alert status="neutral" title="Tip" description="Press Command + K anytime to open the global search modal." />`}
          >
            <div className="w-full max-w-lg space-y-3 p-2">
              <Alert
                status="success"
                title="Payment Succeeded"
                description="Invoice #INV-2026-981 has been successfully processed and receipt emailed."
              />
              <Alert
                status="warning"
                title="Storage Quota"
                description="You have reached 85% of your available team storage limit. Upgrade to expand capacity."
              />
              <Alert
                status="neutral"
                title="Quick Tip"
                description="Press Command + K anytime from anywhere in the application to open the command palette."
              />
            </div>
          </ComponentPreview>
        </section>

        {/* Compound Subcomponents */}
        <section id="compound" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Compound Subcomponents</h2>
          <p className="text-xs text-muted-foreground">
            For advanced custom layouts or rich markup, compose alerts using <code>AlertTitle</code> and <code>AlertDescription</code>.
          </p>
          <ComponentPreview
            code={`<Alert status="brand" design="card">
  <AlertTitle>Custom Compound Layout</AlertTitle>
  <AlertDescription>
    You can render rich text, custom links, or inline badges within the compound body.
  </AlertDescription>
</Alert>`}
          >
            <div className="w-full max-w-lg p-2">
              <Alert status="brand" design="card">
                <AlertTitle>Custom Compound Layout</AlertTitle>
                <AlertDescription>
                  You can render rich text, custom links, or inline badges within the compound body.
                </AlertDescription>
              </Alert>
            </div>
          </ComponentPreview>
        </section>

        {/* Action Slot */}
        <section id="with-action" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">With Action Slot</h2>
          <p className="text-xs text-muted-foreground">
            Provide interactive recovery or confirmation buttons via the <code>action</code> slot.
          </p>
          <ComponentPreview
            code={`<Alert
  status="warning"
  design="rail"
  title="Sync Paused"
  description="Background cloud synchronization was suspended due to a network interruption."
  action={<Button size="sm" variant="secondary">Resume Sync</Button>}
/>`}
          >
            <div className="w-full max-w-lg p-2">
              <Alert
                status="warning"
                design="rail"
                title="Sync Paused"
                description="Background cloud synchronization was suspended due to a network interruption."
                action={<Button size="sm" variant="secondary">Resume Sync</Button>}
              />
            </div>
          </ComponentPreview>
        </section>

        {/* Dismissible Alert */}
        <section id="dismissible" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Dismissible Alert</h2>
          <p className="text-xs text-muted-foreground">
            Pass an <code>onClose</code> callback to automatically render an accessible dismiss button.
          </p>
          <ComponentPreview
            code={`const [dismissed, setDismissed] = React.useState(false);

{dismissed ? (
  <Button size="sm" variant="outline" onClick={() => setDismissed(false)}>
    Reset Alert
  </Button>
) : (
  <Alert
    status="info"
    title="Cookie Preferences"
    description="We use privacy-preserving cookies to improve your workspace experience."
    onClose={() => setDismissed(true)}
  />
)}`}
          >
            <div className="w-full max-w-lg p-2">
              {dismissed ? (
                <div className="flex items-center justify-between p-3 rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                  <span>Alert was dismissed.</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDismissed(false)}
                    leftIcon={<RefreshCw size={13} />}
                  >
                    Reset Alert
                  </Button>
                </div>
              ) : (
                <Alert
                  status="info"
                  title="Cookie Preferences"
                  description="We use privacy-preserving cookies to analyze anonymous metrics and remember your theme."
                  onClose={() => setDismissed(true)}
                />
              )}
            </div>
          </ComponentPreview>
        </section>

        {/* Installation */}
        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <p className="text-xs text-muted-foreground mb-2">CLI install:</p>
          <ComponentCode code={`npx mintforge add alert`} language="bash" />
          <p className="text-xs text-muted-foreground mt-4 mb-2">Import:</p>
          <ComponentCode
            code={`import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert";`}
            language="tsx"
          />
        </section>

        <ComponentPagination currentHref="/docs/components/alert" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
