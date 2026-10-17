"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function AlertDialogDocPage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "destructive-example", title: "Destructive Confirmation" },
    { id: "standard-example", title: "Standard Confirmation" },
    { id: "installation", title: "Installation" },
  ];

  const destructiveCode = `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Delete Workspace</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently remove your
        contract configurations, schemas, and API telemetry data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete Workspace</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

  const standardCode = `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="default">Deploy Contract Spec</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Production Deployment</AlertDialogTitle>
      <AlertDialogDescription>
        You are about to push this verified contract to staging.
        Endpoints with verified zero-drift will be marked live.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Deploy Now</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Alert Dialog"
          description="A modal confirmation dialog that interrupts the user with critical context and requires explicit action before proceeding."
        />

        <div className="space-y-10 mt-6">
          {/* Destructive Example */}
          <section id="destructive-example" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Destructive Confirmation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use destructive alert dialogs for irreversible actions such as deleting projects, resetting contract mappings, or wiping cache.
            </p>
            <ComponentPreview code={destructiveCode}>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive">Delete Workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove your
                      contract configurations, schemas, and API telemetry data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                      Delete Workspace
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentPreview>
          </section>

          {/* Standard Confirmation */}
          <section id="standard-example" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Standard Confirmation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard confirmations ensure the user deliberately agrees before publishing or deploying changes.
            </p>
            <ComponentPreview code={standardCode}>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="default">Deploy Contract Spec</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Production Deployment</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to push this verified contract to staging.
                      Endpoints with verified zero-drift will be marked live.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Deploy Now</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentPreview>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Installation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Install via the zero-dependency Mintforge CLI:
            </p>
            <ComponentCode
              code="npx mintforge add alert-dialog"
              language="bash"
            />
          </section>
        </div>

        <div className="mt-16">
          <ComponentPagination currentHref="/docs/components/alert-dialog" />
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
