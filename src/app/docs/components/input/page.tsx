"use client";

import { useState } from "react";
import { Mail, Lock, Search } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Input } from "@/components/ui/input";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function InputDocPage() {
  const meta = COMPONENT_REGISTRY.input;
  const [val, setVal] = useState("alex@mintforge.dev");
  const [hasError, setHasError] = useState(false);

  const tocItems = [
    { id: "interactive", title: "Interactive Playground" },
    { id: "examples", title: "Input Examples" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Forms" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Interactive Playground</h2>

          <div className="flex gap-3 mb-2">
            <button
              onClick={() => setHasError(!hasError)}
              className={`px-3 py-1.5 text-xs rounded-[var(--mf-radius-md)] border cursor-pointer ${
                hasError
                  ? "bg-red-500/10 border-red-500 text-red-500 font-semibold"
                  : "bg-[var(--mf-surface-secondary)] border-[var(--mf-border)] text-[var(--mf-foreground)]"
              }`}
            >
              {hasError ? "Clear Error State" : "Trigger Validation Error"}
            </button>
          </div>

          <ComponentPreview
            code={`<Input
  label="Email Address"
  placeholder="name@domain.com"
  value="${val}"
  leftIcon={<Mail size={16} />}
  ${hasError ? 'error="Please enter a valid email address."' : 'helperText="We will never share your email address."'}
/>`}
          >
            <div className="w-full max-w-sm">
              <Input
                label="Email Address"
                placeholder="name@domain.com"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                leftIcon={<Mail size={16} />}
                error={hasError ? "Please enter a valid email address." : undefined}
                helperText={!hasError ? "We will never share your email address." : undefined}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="examples" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)] bg-[var(--mf-surface)]">
            <Input label="Search docs" placeholder="Search..." leftIcon={<Search size={16} />} />
            <Input label="Master Password" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} />
            <Input label="Disabled state" disabled value="Read only token" />
            <Input label="Helper only" placeholder="Username" helperText="Alphanumeric characters only." />
          </div>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Props Reference</h2>
          <ComponentPropsTable props={meta.props} />
        </section>

        <ComponentPagination currentHref="/docs/components/input" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
