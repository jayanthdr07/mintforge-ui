"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function DialogDocPage() {
  const meta = COMPONENT_REGISTRY.dialog;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Modal Dialog" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <Dialog>
              <DialogTrigger>
                <Button>Open Modal Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Project Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this repository? This action is permanent and cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Yes, Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-muted-foreground mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/dialog" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
