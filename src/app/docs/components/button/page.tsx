"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function ButtonDocPage() {
  const meta = COMPONENT_REGISTRY.button;
  const [variant, setVariant] = useState<"default" | "secondary" | "outline" | "ghost" | "destructive">("default");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [loading, setLoading] = useState(false);

  const tocItems = [
    { id: "interactive", title: "Interactive Playground" },
    { id: "variants", title: "Variants & Sizes" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Core Primitive" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Interactive Playground</h2>

          <div className="flex flex-wrap items-center gap-3 p-3 bg-secondary rounded-md border border-border text-xs">
            <span className="font-semibold text-foreground">Variant:</span>
            {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-2 py-1 rounded capitalize ${
                  variant === v
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-card text-foreground"
                }`}
              >
                {v}
              </button>
            ))}

            <span className="font-semibold text-foreground ml-3">Size:</span>
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2 py-1 rounded uppercase ${
                  size === s
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-card text-foreground"
                }`}
              >
                {s}
              </button>
            ))}

            <button
              onClick={() => setLoading(!loading)}
              className={`px-2 py-1 rounded ml-auto ${
                loading ? "bg-amber-600 text-white" : "bg-card text-foreground"
              }`}
            >
              Toggle Loading
            </button>
          </div>

          <ComponentPreview
            code={`<Button variant="${variant}" size="${size}"${loading ? " isLoading" : ""}>Click Me</Button>`}
          >
            <Button variant={variant} size={size} isLoading={loading}>
              Click Me
            </Button>
          </ComponentPreview>
        </section>

        <section id="variants" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Variants & Sizes</h2>
          <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg bg-card">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button leftIcon={<Sparkles size={16} />}>With Icon</Button>
            <Button rightIcon={<ArrowRight size={16} />}>Proceed</Button>
          </div>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-muted-foreground mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Props Reference</h2>
          <ComponentPropsTable
            props={meta.props as unknown as Parameters<typeof ComponentPropsTable>[0]["props"]}
          />
        </section>

        <ComponentPagination currentHref="/docs/components/button" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
